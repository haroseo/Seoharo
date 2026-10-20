import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { withAppRenderer } from './helpers/render-app.mjs';
import { getProfilePortfolioDisplayItems, filterProjectStatus } from '../src/data/profilePortfolio.ts';
import { buildSiteSearchIndex, searchSiteContent } from '../src/data/siteSearch.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';

test('Packin can be found by either public name, English spelling, initials or a wrong keyboard layout', () => {
  const entries = buildSiteSearchIndex();
  for (const query of ['패킨앱', '패킨웹', 'PackinApp', 'PackinWeb', 'ㅍㅋㅇ', 'vozlsdoq']) {
    assert.equal(searchSiteContent(entries, query)[0]?.href, '/portfolio/packinapp', query);
  }
  const items = getProfilePortfolioDisplayItems('development');
  assert.ok(items.some(item => item.detailHref === '/portfolio/packinapp'));
  assert.ok(filterProjectStatus(items, 'ongoing').some(item => item.detailHref === '/portfolio/packinapp'));
});

test('Packin renders a real local screenshot and only its website action in both languages', async () => {
  await withAppRenderer(render => {
    for (const language of ['ko', 'en']) {
      const html = render({ initialPath: '/portfolio/packinapp', initialLanguage: language, prerendered: true });
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
      assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
      assert.match(main, /data-project-evidence="packinapp"/);
      assert.equal((main.match(/href="https:\/\/packinweb\.pages\.dev\/"/g) ?? []).length, 1);
      assert.doesNotMatch(main, /github\.com|코드 살펴보기|Explore the code/);
      assert.match(main, /data-return-navigation="true"/);
      const image = main.match(/<img\b[^>]*src="(\/assets\/previews\/evidence-packinapp-[^"]+\.webp)"[^>]*width="(\d+)" height="(\d+)"[^>]*>/);
      assert.ok(image, 'The detail must show a bounded public preview, not an invented cover or original download');
      const bytes = readFileSync(new URL(`../public${image[1]}`, import.meta.url));
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 16), 'WEBPVP8 ');
      assert.equal(bytes.readUInt16LE(26) & 0x3fff, Number(image[2]));
      assert.equal(bytes.readUInt16LE(28) & 0x3fff, Number(image[3]));
      assert.ok(Number(image[2]) <= 1200 && Number(image[3]) <= 2400);
      assert.match(image[0], /draggable="false"/);
      assert.ok(bytes.length < 250_000);
      const metadata = getPageMetadata('/portfolio/packinapp/', language);
      assert.equal(metadata.canonicalUrl, 'https://seoharo.kro.kr/portfolio/packinapp/');
      assert.equal(metadata.robots, 'index, follow');
      assert.match(metadata.title, /패킨앱/);
      assert.match(metadata.description, language === 'ko' ? /기능.*검색/ : /feature/i);
    }
    const list = render({ initialPath: '/portfolio', prerendered: true });
    assert.match(list, /href="\/portfolio\/packinapp"/);
  });
});
