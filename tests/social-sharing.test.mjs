import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { publicPages } from '../src/data/publicPages.ts';
import { renderHead } from '../scripts/seo-html.mjs';
import { readPngDimensions } from '../scripts/seo-artifacts.mjs';

test('a bare home link supplies a greeting and scoped work summary in initial preview HTML', () => {
  for (const path of ['/', '/about/']) {
    const head = renderHead(getPageMetadata(path, 'ko'));
    assert.match(head, /property="og:title" content="안녕하세요, 서주원입니다\."/);
    const description = head.match(/property="og:description" content="([^"]+)"/)?.[1] ?? '';
    assert.match(description, /디자인 시안/);
    assert.match(description, /웹 프로젝트/);
    assert.ok(description.length <= 100, 'The summary should fit a compact preview rather than becoming a letter');
    assert.match(head, /<title>서주원 \| Brand Designer • Marketer • Developer<\/title>/);
  }
  assert.match(getPageMetadata('/portfolio/one-to-z', 'ko').socialTitle, /1 to Z/);
});

test('sharing introduces the person briefly without changing the browser title or promising availability', () => {
  for (const language of ['ko', 'en']) {
    for (const path of ['/', '/about/', '/portfolio/']) {
      const metadata = getPageMetadata(path, language);
      assert.ok(metadata.socialTitle?.length > 0 && metadata.socialTitle.length <= 70, 'Sharing needs a short title, not the long browser title');
      assert.notEqual(metadata.socialTitle, metadata.title);
      assert.match(metadata.socialTitle, language === 'ko' ? /서주원/ : /Seo Juwon/);
      assert.ok(metadata.socialDescription?.length > 0);
      assert.doesNotMatch(`${metadata.socialTitle} ${metadata.socialDescription}`, /중학생|학교|학년|평일|주말|주당|근무|즉시 채용|available for hire/i);
    }
    assert.equal(getPageMetadata('/', language).title, '서주원 | Brand Designer • Marketer • Developer');
  }
});

test('project shares retain the specific work and prototype scope while aliases resolve consistently', () => {
  for (const language of ['ko', 'en']) {
    const prototype = getPageMetadata('/portfolio/one-to-z/', language);
    assert.match(prototype.socialTitle, /1 to Z/);
    assert.match(prototype.socialDescription, language === 'ko' ? /시안/ : /prototypes/i);
    assert.equal(getPageMetadata('/portfolio/typolab/', language).socialTitle, getPageMetadata('/portfolio/naratmalsami/', language).socialTitle);
    assert.equal(getPageMetadata('/about/', language).socialTitle, getPageMetadata('/', language).socialTitle);
  }
});

test('public sharing titles omit long dash separators across pages and compatibility paths', () => {
  for (const language of ['ko', 'en']) {
    for (const page of publicPages) {
      const metadata = getPageMetadata(page.path, language);
      assert.doesNotMatch(metadata.socialTitle, /[\u2013\u2014]/);
      const head = renderHead(metadata);
      assert.doesNotMatch(head.match(/<meta (?:property|name)="(?:og:title|twitter:title)"[^>]*>/g).join(''), /[\u2013\u2014]/);
    }
  }
});

test('initial crawler HTML publishes one wide card, matching OG and X content and escaped image descriptions', () => {
  for (const language of ['ko', 'en']) {
    for (const page of publicPages) {
      const metadata = getPageMetadata(page.path, language);
      const head = renderHead(metadata);
      assert.equal((head.match(/name="twitter:card" content="summary_large_image"/g) ?? []).length, 1);
      for (const key of ['og:title', 'og:description', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
        assert.equal((head.match(new RegExp(`(?:name|property)="${key}"`, 'g')) ?? []).length, 1, `${key} must not be missing or duplicated`);
      }
      assert.ok(head.includes(`property="og:image" content="https://seoharo.kro.kr/assets/share/seoharo-${language}-v1.png"`));
      assert.ok(head.includes('property="og:image:width" content="1200"'));
      assert.ok(head.includes('property="og:image:height" content="630"'));
      assert.ok(head.includes('property="og:image:type" content="image/png"'));
      assert.ok(metadata.imageAlt?.length > 0);
    }
    const head = renderHead({ ...getPageMetadata('/', language), socialTitle: 'A & B < C', imageAlt: '"description" <script>' });
    assert.ok(head.includes('content="A &amp; B &lt; C"'));
    assert.ok(head.includes('content="&quot;description&quot; &lt;script&gt;"'));
    assert.ok(!head.includes('content=""description"'));
  }
});

test('both sharing images are real, lightweight 1200 by 630 PNG assets', async () => {
  for (const language of ['ko', 'en']) {
    const metadata = getPageMetadata('/', language);
    assert.equal(metadata.imageUrl, `https://seoharo.kro.kr/assets/share/seoharo-${language}-v1.png`);
    const bytes = await readFile(new URL(`../public/assets/share/seoharo-${language}-v1.png`, import.meta.url));
    assert.deepEqual(readPngDimensions(bytes), { width: 1200, height: 630 });
    assert.ok(bytes.length < 5_000_000);
  }
});
