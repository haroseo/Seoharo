import assert from 'node:assert/strict';
import test from 'node:test';
import { withAppRenderer } from './helpers/render-app.mjs';

const destinations = [
  ['email', 'mailto:seoharo0111@gmail.com'],
  ['linkedin', 'https://www.linkedin.com/in/seoharo/'],
  ['github', 'https://github.com/haroseo'],
];

test('every footer offers named icon links to the approved contact destinations without replacing its existing content', async () => {
  await withAppRenderer(async render => {
    for (const language of ['ko', 'en']) {
      for (const path of ['/', '/contact', '/portfolio', '/career']) {
        const html = render({ initialPath: path, initialLanguage: language, prerendered: true });
        const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0] ?? '';
        const icons = footer.match(/<nav\b[^>]*aria-label="(?:연락처 바로가기|Contact shortcuts)"[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? '';
        assert.ok(icons, `${language} ${path}: the footer needs accessible contact shortcuts`);

        const anchors = [...icons.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
        assert.equal(anchors.length, 3);
        for (let i = 0; i < destinations.length; i++) {
          const [id, href] = destinations[i];
          const [, attributes, contents] = anchors[i];
          assert.ok(attributes.includes(`href="${href}"`), `${path}: ${id} links to the approved destination`);
          assert.match(attributes, /aria-label="[^"]+"/);
          assert.match(contents, /<svg\b[^>]*aria-hidden="true"/);
          if (id === 'email') {
            assert.doesNotMatch(attributes, /target="_blank"/);
          } else {
            assert.match(attributes, /target="_blank"/);
            assert.match(attributes, /rel="noopener noreferrer"/);
          }
        }

        const unchangedContent = footer.replace(icons, '');
        for (const href of ['/', '/portfolio', '/contact', '/sitemap.xml']) {
          assert.ok(unchangedContent.includes(`href="${href}"`), `${path}: preserve footer navigation`);
        }
        assert.match(unchangedContent, language === 'ko' ? /오픈소스 라이선스/ : /Open-source licenses/);
        assert.match(unchangedContent, /©/);
        if (path === '/' || path === '/contact') {
          for (const [, href] of destinations) {
            assert.ok(unchangedContent.includes(`href="${href}"`), `${path}: keep the existing text contact list`);
          }
        }
      }
    }
  });
});
