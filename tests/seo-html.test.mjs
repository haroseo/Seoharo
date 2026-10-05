import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeHtml, serializeJson, renderHead, renderHtml } from '../scripts/seo-html.mjs';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { parsePageBootstrap } from '../src/data/pageBootstrap.ts';
import { getRevealPolicy } from '../src/data/renderingPolicy.ts';

test('metadata and bootstrap JSON cannot break containing HTML/script', () => {
  assert.equal(escapeHtml('<&"'), '&lt;&amp;&quot;');
  const value = { text: '</script><script>alert(1)</script>\u2028\u2029' };
  const encoded = serializeJson(value);
  assert.equal(encoded.includes('</script>'), false);
  assert.equal(encoded.includes('\u2028'), false);
  assert.deepEqual(JSON.parse(encoded), value);
  const template = '<html lang="ko"><head><!--site-head--></head><body><div id="root"><!--app-html--></div><!--site-bootstrap--></body></html>';
  const page = { html: '<h1>Planor</h1>', metadata: getPageMetadata('/portfolio/planor/', 'ko'), bootstrap: { initialPath: '/portfolio/planor', initialLanguage: 'ko', prerendered: true } };
  const html = renderHtml(template, page);
  assert.match(html, /<h1>Planor<\/h1>/);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.ok(html.includes('https://seoharo.kro.kr/portfolio/planor/'));
  assert.throws(() => renderHtml(template.replace('<!--site-head-->', ''), page));
  assert.throws(() => renderHtml(template + '<!--app-html-->', page));
  assert.throws(() => renderHtml(template, { ...page, html: '' }));
});

test('untrusted bootstrap is rejected and visible/reduced-motion content cannot be hidden', () => {
  for (const value of [null, [], { initialPath: '//evil.example', initialLanguage: 'en', prerendered: true }, { initialPath: '/contact', initialLanguage: 'xx', prerendered: true }, { initialPath: '/unknown', initialLanguage: 'ko', prerendered: true }]) assert.equal(parsePageBootstrap(value), null);
  assert.deepEqual(parsePageBootstrap({ initialPath: '/contact/', initialLanguage: 'en', prerendered: true }), { initialPath: '/contact', initialLanguage: 'en', prerendered: true });
  for (const patch of [{ hydrated: false }, { reducedMotion: true }, { top: 200 }, { viewportHeight: 0 }, { top: NaN }]) assert.equal(getRevealPolicy({ hydrated: true, reducedMotion: false, top: 1000, viewportHeight: 800, ...patch }), 'visible');
  assert.equal(getRevealPolicy({ hydrated: true, reducedMotion: false, top: 1000, viewportHeight: 800 }), 'reveal');
});

test('initial HTML publishes the short search name without changing the browser title or body', () => {
  const metadata = getPageMetadata('/', 'ko');
  const head = renderHead(metadata);
  assert.ok(head.includes('<meta property="og:site_name" content="서주원" />'));
  assert.ok(head.includes('<title>서주원 | Brand Designer • Marketer • Developer</title>'));
  assert.equal((head.match(/property="og:site_name"/g) ?? []).length, 1);
  const template = '<html lang="ko"><head><!--site-head--></head><body><div id="root"><!--app-html--></div><!--site-bootstrap--></body></html>';
  const body = '<h1>SEOHARO</h1><p>Seoharo라는 이름으로 활동해 온 서주원입니다.</p>';
  const rendered = renderHtml(template, { html: body, metadata, bootstrap: { initialPath: '/', initialLanguage: 'ko', prerendered: true } });
  assert.ok(rendered.includes(`<div id="root">${body}</div>`));
});
