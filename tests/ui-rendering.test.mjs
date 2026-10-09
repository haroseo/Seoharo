import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { buildSiteSearchIndex } from '../src/data/siteSearch.ts';

let server;
let App;

before(async () => {
  // Load the real TSX and providers without starting another HTTP server.
  server = await createServer({
    server: { middlewareMode: true, hmr: false, watch: null, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: 'custom',
  });
  ({ default: App } = await server.ssrLoadModule('/src/App.tsx'));
});

after(async () => {
  await server?.close();
});

function renderPage(path, language = 'ko') {
  const html = renderToStaticMarkup(createElement(App, { initialPath: path, initialLanguage: language, prerendered: true }));
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
}

test('the home reading flow ends with original work previews and a direct portfolio destination', () => {
  for (const language of ['ko', 'en']) {
    const main = renderPage('/', language);
    const preview = main.match(/<section\b[^>]*id="about-work"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(preview, 'Reading the home page should lead to work before the footer');
    assert.ok(main.indexOf('id="about-work"') > main.indexOf('id="about-skills"'));
    assert.match(preview, /href="\/portfolio#projects"/);
    for (const slug of ['one-to-z', 'designgraphy']) {
      assert.match(preview, new RegExp(`href="/portfolio/${slug}"`));
      assert.match(preview, new RegExp(`src="/assets/${slug}/[^" ]+"`));
    }
    assert.match(preview, language === 'ko' ? /시안/ : /prototype/i);
    assert.doesNotMatch(renderPage('/contact', language), /id="about-work"/);
  }
});

test('return navigation appears on secondary destinations with safe fallback names, never on primary pages', () => {
  for (const [path, label, href] of [
    ['/career', '포트폴리오로 돌아가기', '/portfolio'],
    ['/career/group/freelance', '경력 목록으로 돌아가기', '/career'],
    ['/career/business-operations', '경력 목록으로 돌아가기', '/career'],
    ['/portfolio/company-work', '포트폴리오로 돌아가기', '/portfolio'],
    ['/portfolio/one-to-z', '포트폴리오로 돌아가기', '/portfolio'],
  ]) {
    const main = renderPage(path);
    assert.equal((main.match(/data-return-navigation="true"/g) ?? []).length, 1, path);
    assert.match(main, new RegExp(`href="${href}"[^>]*data-return-navigation="true"`));
    assert.ok(main.includes(label), path);
  }
  assert.match(renderPage('/career', 'en'), /Back to Portfolio/);
  for (const path of ['/', '/about', '/portfolio', '/contact', '/design', '/development', '/marketing', '/operations', '/clubs', '/404']) {
    assert.doesNotMatch(renderPage(path), /data-return-navigation/, path);
  }
});

test('the portfolio uses the supplied LinkedIn banner without replacing the profile identity', () => {
  for (const language of ['ko', 'en']) {
    const main = renderPage('/portfolio', language);
    assert.match(main, /class="profile-banner[^>]*>[\s\S]*?<img src="\/assets\/profile-banner\.jpg"[^>]*width="1400" height="349"/);
    assert.match(main, /id="profile-heading"/);
    assert.match(main, /src="\/assets\/juwon-mark\.svg"/);
    assert.equal((main.match(/src="\/assets\/profile-banner\.jpg"/g) ?? []).length, 1);
  }
});

test('1 to Z shows all 18 original screens with accessible explanations and original-size links', () => {
  for (const language of ['ko', 'en']) {
    const main = renderPage('/portfolio/one-to-z', language);
    assert.equal((main.match(/data-design-screen="/g) ?? []).length, 18);
    assert.equal((main.match(/data-screen-original="/g) ?? []).length, 18);
    assert.equal((main.match(/data-screen-image="/g) ?? []).length, 18);
    assert.match(main, language === 'ko' ? /화면 해설/ : /Screen notes/);
    assert.match(main, language === 'ko' ? /디자인 시안/ : /Design prototype/);
    assert.ok(!main.includes('figma-alpha-api'), 'Temporary export URLs must not become public assets');
  }
});

test('Designgraphy displays the actual Claude screens separately from the Figma archive', () => {
  const main = renderPage('/portfolio/designgraphy');
  assert.equal((main.match(/data-design-screen="/g) ?? []).length, 12);
  assert.match(main, /Claude/);
  assert.match(main, /준비 중/);
  assert.ok(!main.includes('iframe'), 'The source application must not run inside the portfolio');
});

test('rendered design images have real local assets, accurate dimensions and searchable anchors', () => {
  const entries = buildSiteSearchIndex();
  for (const slug of ['one-to-z', 'designgraphy']) {
    const main = renderPage(`/portfolio/${slug}`);
    const images = [...main.matchAll(/<img data-screen-image="([^"]+)" src="([^"]+)"[^>]*width="(\d+)" height="(\d+)"/g)];
    assert.equal(images.length, slug === 'one-to-z' ? 18 : 12);
    for (const [, id, source, width, height] of images) {
      const bytes = readFileSync(new URL(`../public${source}`, import.meta.url));
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 16), 'WEBPVP8 ');
      assert.equal(bytes.readUInt16LE(26) & 0x3fff, Number(width), source);
      assert.equal(bytes.readUInt16LE(28) & 0x3fff, Number(height), source);
      assert.ok(main.includes(`id="screen-${id}"`));
      assert.ok(entries.some(entry => entry.href === `/portfolio/${slug}#screen-${id}`));
    }
  }
});

test('design work links to both source-backed design cases without claiming client deliveries', () => {
  const main = renderPage('/career/freelance-design');
  assert.match(main, /href="\/portfolio\/one-to-z"/);
  assert.match(main, /href="\/portfolio\/designgraphy"/);
  assert.match(main, /개인 프로젝트와 시안/);
});

test('contact with a trailing slash renders the contact screen instead of an empty main', () => {
  const main = renderPage('/contact/');
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
  assert.match(main, /mailto:seoharo0111@gmail.com/);
});

test('company work category does not borrow a former employer logo', () => {
  for (const path of ['/portfolio', '/career/company-work']) {
    const main = renderPage(path);
    assert.match(main, /회사 업무/);
    assert.match(main, /LUXERET/);
    assert.ok(!/src="\/assets\/luxeret-logo\.png"/.test(main), `${path} should not use an employer logo for a category`);
  }
});

test('English portfolio member counts do not contain Korean units', () => {
  const main = renderPage('/portfolio', 'en');
  assert.ok(!/\d+명/.test(main), 'English counts should use English member units');
  assert.match(main, /800 members/);
  assert.match(main, /700 members/);
});

test('the growth journey links directly to the current project instead of ending at past experience', () => {
  const main = renderPage('/');
  const growth = main.split('id="about-growth"')[1]?.split('id="about-skills"')[0] ?? '';
  assert.ok(/href="\/portfolio\/designgraphy"/.test(growth), 'Current work should be reachable from the journey');
});

test('public page families and aliases render one primary heading and unique anchor IDs', () => {
  for (const path of [
    '/', '/about', '/portfolio', '/portfolio/', '/design', '/marketing', '/development', '/operations', '/clubs',
    '/career', '/career/', '/career/group/company', '/career/group/club',
    '/portfolio/company-work', '/career/company-work/', '/career/freelance-design',
    '/career/business-operations', '/career/function-factory',
    '/portfolio/designgraphy', '/portfolio/one-to-z', '/portfolio/planor', '/portfolio/design-pick',
    '/portfolio/naratmalsami', '/portfolio/typolab', '/contact', '/contact/', '/missing-page',
  ]) {
    const main = renderPage(path);
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1, `${path} should render one primary heading`);
    const ids = Array.from(main.matchAll(/\bid="([^"]+)"/g), match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${path} should not have ambiguous anchor targets`);
  }
});
