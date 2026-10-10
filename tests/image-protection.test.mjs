import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { withAppRenderer } from './helpers/render-app.mjs';

test('image copy handlers suppress image events but preserve text, links and keyboard behavior', async () => {
  const { preventImageCopy } = await import('../src/lib/imageCopyPolicy.ts');
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'Element');
  // Node has no DOM. This double only models the native Element/closest boundary.
  class TestElement {
    constructor(tag) { this.tag = tag; }
    closest(selector) { return selector === 'img' && this.tag === 'img' ? this : null; }
  }
  Object.defineProperty(globalThis, 'Element', { configurable: true, value: TestElement });
  try {
    for (const tag of ['img', 'p', 'a', 'input', 'button']) {
      let prevented = 0;
      preventImageCopy({ target: new TestElement(tag), preventDefault() { prevented++; } });
      assert.equal(prevented, tag === 'img' ? 1 : 0, tag);
    }
    for (const target of [null, {}, { closest() { return {}; } }]) {
      preventImageCopy({ target, preventDefault() { assert.fail('Non-elements must remain unchanged'); } });
    }
  } finally {
    if (previous) Object.defineProperty(globalThis, 'Element', previous); else delete globalThis.Element;
  }
});

test('the shared image policy is bound only to image context-menu and drag events', () => {
  const source = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(source, /onContextMenuCapture=\{preventImageCopy\}/);
  assert.match(source, /onDragStartCapture=\{preventImageCopy\}/);
  assert.ok(!/on(?:Copy|KeyDown|KeyUp)(?:Capture)?=\{preventImageCopy\}/.test(source));
});

test('the preview generator does not add watermark overlays', () => {
  const source = readFileSync(new URL('../scripts/prepare-portfolio-previews.mjs', import.meta.url), 'utf8');
  assert.ok(!/\.composite\(|PORTFOLIO PREVIEW|<text\b/.test(source), 'Only resize and encode the original capture');
});

test('portfolio pages do not expose design editor or direct image download links', async () => {
  await withAppRenderer(render => {
    for (const path of ['/', '/portfolio', '/portfolio/one-to-z', '/portfolio/designgraphy', '/portfolio/planor', '/portfolio/design-pick', '/portfolio/naratmalsami']) {
      for (const language of ['ko', 'en']) {
        const html = render({ initialPath: path, initialLanguage: language, prerendered: true });
        const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
        assert.ok(!hrefs.some(href => /\.(?:png|jpe?g|webp|svg)(?:[?#]|$)/i.test(href)), `Direct image link on ${path}`);
        assert.ok(!hrefs.some(href => /^https:\/\/(?:www\.)?(?:figma\.com|claude\.ai)\//i.test(href)), `Source editor link on ${path}`);
        assert.ok(!/https:\/\/(?:www\.)?(?:figma\.com\/design|claude\.ai\/artifact)\//i.test(html), `Source URL leaked into ${path}`);
      }
    }
  });
});

test('all design and evidence images render bounded local previews with native dragging disabled', async () => {
  await withAppRenderer(render => {
    for (const [slug, count] of [['one-to-z', 18], ['designgraphy', 12], ['planor', 1], ['design-pick', 1], ['naratmalsami', 1]]) {
      const html = render({ initialPath: `/portfolio/${slug}`, prerendered: true });
      const images = [...html.matchAll(/<img\b[^>]*src="(\/assets\/previews\/[^"?#]+\.webp)"[^>]*>/g)];
      assert.equal(images.length, count, slug);
      for (const [tag, source] of images) {
        assert.match(tag, /draggable="false"/);
        const width = Number(tag.match(/width="(\d+)"/)?.[1]);
        const height = Number(tag.match(/height="(\d+)"/)?.[1]);
        assert.ok(width > 0 && width <= 1200 && height > 0 && height <= 2400, source);
        const bytes = readFileSync(new URL(`../public${source}`, import.meta.url));
        assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
        assert.equal(bytes.toString('ascii', 8, 16), 'WEBPVP8 ');
        assert.equal(bytes.readUInt16LE(26) & 0x3fff, width);
        assert.equal(bytes.readUInt16LE(28) & 0x3fff, height);
        assert.ok(bytes.length < 250_000, source);
      }
    }
  });
});

test('original gallery and evidence asset directories are not in the public deploy input', () => {
  for (const name of ['one-to-z', 'designgraphy', 'project-evidence']) {
    assert.equal(existsSync(new URL(`../public/assets/${name}`, import.meta.url)), false, `Originals are still public: ${name}`);
  }
});
