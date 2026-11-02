import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { withAppRenderer } from './helpers/render-app.mjs';
import { getProfilePortfolioDisplayItems, filterProjectStatus } from '../src/data/profilePortfolio.ts';
import { buildSiteSearchIndex, searchSiteContent } from '../src/data/siteSearch.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';

test('JobSearching is discoverable by name and keyboard layout among ongoing planning projects', () => {
  const entries = buildSiteSearchIndex();
  for (const query of ['잡서칭', 'JobSearching', 'ㅈㅅㅊ', 'wkqtjcld']) {
    assert.equal(searchSiteContent(entries, query)[0]?.href, '/portfolio/jobsearching', query);
  }
  const projects = getProfilePortfolioDisplayItems('development');
  assert.ok(filterProjectStatus(projects, 'ongoing').some(item => item.detailHref === '/portfolio/jobsearching'));
});

test('JobSearching has bilingual details, the supplied wordmark and only a public website action', async () => {
  await withAppRenderer(render => {
    for (const language of ['ko', 'en']) {
      const html = render({ initialPath: '/portfolio/jobsearching', initialLanguage: language, prerendered: true });
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
      assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
      assert.match(main, /href="https:\/\/jobsearching\.pages\.dev\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
      assert.match(main, /sj-work-visual--brand/);
      const image = main.match(/<img\b[^>]*src="(\/assets\/previews\/jobsearching-cover-preview\.webp)"[^>]*>/);
      assert.ok(image, 'The project should use its supplied wordmark, not an invented screenshot');
      const bytes = readFileSync(new URL(`../public${image[1]}`, import.meta.url));
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.ok(bytes.length < 250_000);
      assert.match(main, /data-return-navigation="true"/);
      assert.doesNotMatch(main, /github\.com|원본 다운로드|Claude/);
      const metadata = getPageMetadata('/portfolio/jobsearching/', language);
      assert.equal(metadata.canonicalUrl, 'https://seoharo.kro.kr/portfolio/jobsearching/');
      assert.equal(metadata.robots, 'index, follow');
      assert.match(metadata.description, language === 'ko' ? /진로 탐색/ : /career exploration/i);
      const portfolio = render({ initialPath: '/portfolio', initialLanguage: language, prerendered: true });
      assert.match(portfolio, /href="\/portfolio\/jobsearching"/);
    }
  });
});
