import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSiteSearchIndex, searchSiteContent } from '../src/data/siteSearch.ts';
import { profilePortfolioItems, filterProfilePortfolioItems } from '../src/data/profilePortfolio.ts';
import { createNavigationEntry } from '../src/lib/navigationHistory.ts';
import { withAppRenderer } from './helpers/render-app.mjs';
import { readFileSync } from 'node:fs';
import { aboutIntro } from '../src/data/aboutContent.ts';
import postcss from 'postcss';

test('portfolio color references resolve against the installed palette and shared tokens', () => {
  const portfolioCss = readFileSync(new URL('../src/portfolio.css', import.meta.url), 'utf8');
  const tokenSources = [
    '../node_modules/@toss/tds-colors/colors.css', '../src/index.css', '../src/portfolio.css',
  ];
  const tokens = new Map();
  for (const source of tokenSources) {
    postcss.parse(readFileSync(new URL(source, import.meta.url), 'utf8')).walkDecls(declaration => {
      if (declaration.prop.startsWith('--')) tokens.set(declaration.prop, declaration.value);
    });
  }
  function verifyToken(name, parents = []) {
    assert.ok(tokens.has(name), `Undefined color token: ${name}`);
    assert.ok(!parents.includes(name), `Circular color token: ${name}`);
    for (const reference of tokens.get(name).matchAll(/var\(\s*(--[\w-]+)/g)) {
      verifyToken(reference[1], [...parents, name]);
    }
  }
  postcss.parse(portfolioCss).walkDecls(declaration => {
    for (const reference of declaration.value.matchAll(/var\(\s*(--[\w-]+)/g)) verifyToken(reference[1]);
  });
});

test('the profile avoids repeating the full About introduction while the original About keeps it', async () => {
  await withAppRenderer(render => {
    const portfolio = render({ initialPath: '/portfolio', prerendered: true });
    const about = render({ initialPath: '/', prerendered: true });
    assert.ok(!portfolio.includes(aboutIntro.ko), 'the profile should explain the approach instead of repeating the entire introduction');
    assert.ok(about.includes(aboutIntro.ko), 'the original About introduction must remain intact');
    assert.ok(searchSiteContent(buildSiteSearchIndex(), '자세한 과정').some(entry => entry.href === '/portfolio#about'));
  });
});

test('web project details show dated real screenshot previews after the summary, not invented mockups', async () => {
  await withAppRenderer(render => {
    for (const [slug, filename] of [
      ['planor', 'planor-calendar'], ['design-pick', 'design-pick-color'], ['naratmalsami', 'naratmalsami-typing'],
    ]) {
      const html = render({ initialPath: `/portfolio/${slug}`, prerendered: true });
      const evidencePosition = html.indexOf(`data-project-evidence="${slug}"`);
      assert.ok(evidencePosition > html.indexOf('id="project-notes"'), slug);
      const src = `/assets/previews/evidence-${filename}-2026-10-10-preview.webp`;
      const bytes = readFileSync(new URL(`../public${src}`, import.meta.url));
      assert.ok(bytes.length < 150_000, 'a supporting screenshot should remain lightweight');
      const image = html.match(new RegExp(`<img[^>]*src="${src}"[^>]*>`))?.[0] ?? '';
      assert.equal(bytes.toString('ascii', 8, 16), 'WEBPVP8 ');
      const width = bytes.readUInt16LE(26) & 0x3fff;
      const height = bytes.readUInt16LE(28) & 0x3fff;
      assert.match(image, new RegExp(`width="${width}"`));
      assert.match(image, new RegExp(`height="${height}"`));
      assert.match(image, /loading="lazy"/);
      assert.match(html, /공개 서비스 화면/);
    }
  });
});

test('Design Pick describes the color tools actually available in its public version', () => {
  assert.equal(searchSiteContent(buildSiteSearchIndex(), 'HEX RGB')[0]?.id, 'project:design-pick');
  const project = profilePortfolioItems.find(item => item.id === 'design-pick');
  assert.match(project.description.ko, /컬러 피커/);
  assert.match(project.description.en, /color picker/i);
});

test('the public greeting is searchable and opens the full introduction', () => {
  const results = searchSiteContent(buildSiteSearchIndex(), '서로의 생각');
  assert.ok(results.some(entry => entry.href === '/about#about-greeting'));
});

test('searching the owner name prioritizes the introduction over contact links', () => {
  for (const query of ['Seoharo', '서주원']) {
    assert.equal(searchSiteContent(buildSiteSearchIndex(), query)[0]?.id, 'about:overview', query);
  }
});

test('specific career search results have stable section destinations', () => {
  const entries = buildSiteSearchIndex();
  assert.equal(searchSiteContent(entries, 'Knowly AI')[0].href, '/portfolio/company-work#contribution-company-work-1');
  assert.equal(searchSiteContent(entries, 'RoFolder')[0].href, '/career/business-operations#venture-rofolder');
});

test('a contribution deep link reveals its content even after another specialty was selected', () => {
  const current = createNavigationEntry('/portfolio/company-work');
  current.view.companySpecialty = 'design';
  const next = createNavigationEntry('/portfolio/company-work#contribution-company-work-1', current);
  assert.equal(next.view.companySpecialty, 'all');
  assert.equal(current.view.companySpecialty, 'design', 'previous screen state remains restorable');
});

test('Planor is labeled as planning while remaining discoverable under planning and development', () => {
  assert.equal(profilePortfolioItems.find(item => item.id === 'planor').category, 'planning');
  for (const category of ['planning', 'development', 'all']) {
    assert.ok(filterProfilePortfolioItems(category).some(item => item.id === 'planor'), category);
  }
});

test('case summaries precede all full-length screens and career search anchors exist in the real page', async () => {
  await withAppRenderer(render => {
    for (const [slug, count] of [['one-to-z', 18], ['designgraphy', 12]]) {
      const html = render({ initialPath: `/portfolio/${slug}`, prerendered: true });
      const notes = html.indexOf('id="project-notes"');
      assert.ok(notes >= 0 && notes < html.indexOf('id="screen-'), slug);
      assert.equal((html.match(/data-design-screen=/g) ?? []).length, count, 'no source screens are removed');
    }
    for (const entry of buildSiteSearchIndex().filter(item => /^(contribution|venture):/.test(item.id))) {
      const url = new URL(entry.href, 'https://seoharo.kro.kr');
      assert.ok(url.hash, entry.id);
      const html = render({ initialPath: url.pathname, prerendered: true });
      assert.ok(html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), entry.id);
    }
  });
});
