import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeAppPath } from '../src/data/siteUrl.ts';
import { publicPages, resolvePublicPage } from '../src/data/publicPages.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { selectedWorks } from '../src/data/portfolioContent.ts';
import { aboutHeroIntro, aboutPublicWorkSlugs } from '../src/data/aboutContent.ts';

test('only real detail pages and canonical equivalents are indexable', () => {
  assert.equal(normalizeAppPath('/contact/'), '/contact');
  assert.equal(resolvePublicPage('/career/group/company/').canonicalPath, '/portfolio/company-work/');
  assert.equal(getPageMetadata('/about', 'ko').canonicalUrl, 'https://seoharo.kro.kr/');
  assert.equal(getPageMetadata('/career/not-real', 'ko').robots, 'noindex, follow');
  assert.equal(getPageMetadata('/career/not-real', 'ko').canonicalUrl, null);
  for (const bad of ['//evil.example/a', '/../../escape', '/x\\y', '/%2e%2e/escape', '/x?y']) assert.equal(resolvePublicPage(bad), null);
  assert.deepEqual(publicPages.filter(p => p.indexable).map(p => p.path), [
    '/', '/portfolio/', '/contact/', '/career/', '/portfolio/designgraphy/', '/portfolio/one-to-z/', '/portfolio/packinapp/', '/portfolio/jobsearching/', '/portfolio/k-00/', '/portfolio/formulazip/', '/portfolio/planor/',
    '/portfolio/design-pick/', '/portfolio/naratmalsami/', '/portfolio/company-work/',
    '/career/freelance-design/', '/career/business-operations/', '/career/function-factory/',
  ]);
  assert.equal(publicPages.filter(p => !p.indexable).length, 12);
});

test('metadata describes approved identity without inferring private facts', () => {
  const about = getPageMetadata('/', 'ko');
  assert.match(about.description, /서주원\(Seoharo\).*공식집.*K-00/);
  const person = about.structuredData['@graph'].find(item => item['@type'] === 'Person');
  assert.equal(person.name, '서주원');
  assert.deepEqual(person.alternateName, ['Seoharo', 'Seo Juwon']);
  assert.equal(person.description, aboutHeroIntro.ko);
  assert.equal(person.mainEntityOfPage['@id'], 'https://seoharo.kro.kr/#page');
  const profile = about.structuredData['@graph'].find(item => item['@type'] === 'ProfilePage');
  assert.deepEqual(profile.mentions.map(item => item['@id']), aboutPublicWorkSlugs.map(slug => `https://seoharo.kro.kr/portfolio/${slug}/#project`));
  assert.deepEqual(person.sameAs, ['https://github.com/haroseo', 'https://www.linkedin.com/in/seoharo/']);
  assert.doesNotMatch(JSON.stringify(person), /birthDate|worksFor|address|email|school/i);
  const descriptions = publicPages.filter(p => p.indexable).map(p => getPageMetadata(p.path, 'ko').description);
  assert.equal(new Set(descriptions).size, descriptions.length);
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

test('project metadata connects the visible work to its creator and public destination', () => {
  for (const language of ['ko', 'en']) {
    for (const work of selectedWorks) {
      const metadata = getPageMetadata(`/portfolio/${work.slug}`, language);
      const graph = metadata.structuredData['@graph'];
      const person = graph.find(item => item['@type'] === 'Person');
      const page = graph.find(item => item['@type'] === 'WebPage');
      const project = graph.find(item => item['@type'] === 'CreativeWork');
      assert.equal(person['@id'], 'https://seoharo.kro.kr/#person');
      assert.equal(page.author['@id'], person['@id']);
      assert.equal(page.mainEntity['@id'], project['@id']);
      assert.equal(project.creator['@id'], person['@id']);
      assert.equal(project.mainEntityOfPage['@id'], page['@id']);
      assert.equal(project.name, work.title);
      assert.equal(project.url, work.href ?? metadata.canonicalUrl);
      assert.equal(project.description, work.summary[language]);
      for (const note of work.notes) assert.ok(project.text.includes(note.body[language]));
      assert.ok(metadata.description.includes(work.title));
      assert.match(metadata.description, language === 'ko' ? /서주원/ : /Seo Juwon/);
      assert.doesNotMatch(JSON.stringify(person), /birthDate|worksFor|address|email|school/i);
    }
  }
});

test('portfolio collection lists actual canonical projects once in display order', () => {
  const metadata = getPageMetadata('/portfolio', 'ko');
  const graph = metadata.structuredData['@graph'];
  const page = graph.find(item => item['@type'] === 'CollectionPage');
  const list = graph.find(item => item['@type'] === 'ItemList');
  assert.equal(page.mainEntity['@id'], list['@id']);
  assert.equal(list.numberOfItems, selectedWorks.length);
  assert.deepEqual(list.itemListElement.map(item => item.url), selectedWorks.map(work => `https://seoharo.kro.kr/portfolio/${work.slug}/`));
  assert.deepEqual(list.itemListElement.map(item => item.position), selectedWorks.map((_, index) => index + 1));
  assert.equal(new Set(list.itemListElement.map(item => item.url)).size, list.numberOfItems);
  assert.equal(getPageMetadata('/contact', 'ko').structuredData['@graph'].find(item => item['@type'] === 'ContactPage').url, 'https://seoharo.kro.kr/contact/');
});
