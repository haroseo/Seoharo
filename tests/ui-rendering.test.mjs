import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

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
    '/portfolio/designgraphy', '/portfolio/planor', '/portfolio/design-pick',
    '/portfolio/naratmalsami', '/portfolio/typolab', '/contact', '/contact/', '/missing-page',
  ]) {
    const main = renderPage(path);
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1, `${path} should render one primary heading`);
    const ids = Array.from(main.matchAll(/\bid="([^"]+)"/g), match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${path} should not have ambiguous anchor targets`);
  }
});
