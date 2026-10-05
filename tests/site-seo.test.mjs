import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeAppPath } from '../src/data/siteUrl.ts';
import { publicPages, resolvePublicPage } from '../src/data/publicPages.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';

test('only real detail pages and canonical equivalents are indexable', () => {
  assert.equal(normalizeAppPath('/contact/'), '/contact');
  assert.equal(resolvePublicPage('/career/group/company/').canonicalPath, '/portfolio/company-work/');
  assert.equal(getPageMetadata('/about', 'ko').canonicalUrl, 'https://seoharo.kro.kr/');
  assert.equal(getPageMetadata('/career/not-real', 'ko').robots, 'noindex, follow');
  assert.equal(getPageMetadata('/career/not-real', 'ko').canonicalUrl, null);
  for (const bad of ['//evil.example/a', '/../../escape', '/x\\y', '/%2e%2e/escape', '/x?y']) assert.equal(resolvePublicPage(bad), null);
  assert.deepEqual(publicPages.filter(p => p.indexable).map(p => p.path), [
    '/', '/portfolio/', '/contact/', '/career/', '/portfolio/designgraphy/', '/portfolio/planor/',
    '/portfolio/design-pick/', '/portfolio/naratmalsami/', '/portfolio/company-work/',
    '/career/freelance-design/', '/career/business-operations/', '/career/function-factory/',
  ]);
  assert.equal(publicPages.filter(p => !p.indexable).length, 12);
});

test('metadata describes approved identity without inferring private facts', () => {
  const about = getPageMetadata('/', 'ko');
  assert.match(about.description, /Seoharo.*서주원/);
  const person = about.structuredData['@graph'].find(item => item['@type'] === 'Person');
  assert.equal(person.name, '서주원');
  assert.equal(person.alternateName, 'Seoharo');
  assert.deepEqual(person.sameAs, ['https://github.com/haroseo', 'https://www.linkedin.com/in/seoharo/']);
  assert.doesNotMatch(JSON.stringify(person), /birthDate|worksFor|address|email|school/i);
  const descriptions = publicPages.filter(p => p.indexable).map(p => getPageMetadata(p.path, 'ko').description);
  assert.equal(new Set(descriptions).size, 12);
  assert.equal(getPageMetadata('/portfolio/planor/', 'ko').canonicalUrl, 'https://seoharo.kro.kr/portfolio/planor/');
});

test('search engines receive a concise site identity with public-name and domain fallbacks', () => {
  for (const language of ['ko', 'en']) {
    for (const page of publicPages.filter(page => page.indexable)) {
      const metadata = getPageMetadata(page.path, language);
      const websites = metadata.structuredData['@graph'].filter(item => item['@type'] === 'WebSite');
      assert.equal(websites.length, 1);
      assert.equal(websites[0].name, '서주원');
      assert.deepEqual(websites[0].alternateName, ['Seoharo', 'seoharo.kro.kr']);
      assert.equal(websites[0].url, 'https://seoharo.kro.kr/');
    }
    assert.equal(getPageMetadata('/', language).title, '서주원 | Brand Designer • Marketer • Developer');
  }
});
