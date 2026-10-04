import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getPortfolioRoute } from '../src/data/portfolioRoutes.ts';
import { aboutDisciplines, aboutGrowth } from '../src/data/aboutContent.ts';
import { careerEntries, selectedWorks, skillGroups } from '../src/data/portfolioContent.ts';
import { contactChannels } from '../src/data/contactChannels.ts';
import { hiddenPortfolioIds } from '../src/data/siteRevision.ts';
import { profilePortfolioItems } from '../src/data/profilePortfolio.ts';
import { buildSiteSearchIndex, searchSiteContent } from '../src/data/siteSearch.ts';

test('site-wide index includes each visible content family once and omits hidden project IDs', () => {
  const entries = buildSiteSearchIndex();
  const ids = entries.map(entry => entry.id);
  assert.equal(new Set(ids).size, ids.length, 'search entry ids should be unique');
  assert.ok(entries.some(entry => entry.id === 'about:overview'));
  for (const step of aboutGrowth) assert.ok(entries.some(entry => entry.id === `about:growth:${step.id}`));
  for (const discipline of aboutDisciplines) assert.ok(entries.some(entry => entry.id === `about:${discipline.id}`));
  for (const career of careerEntries) assert.ok(entries.some(entry => entry.id === `career:${career.slug}`));
  for (const career of careerEntries) {
    for (let index = 0; index < (career.contributions?.length ?? 0); index += 1) {
      assert.ok(entries.some(entry => entry.id === `contribution:${career.slug}:${index}`));
    }
    for (const venture of career.ventures ?? []) {
      assert.ok(entries.some(entry => entry.id === `venture:${career.slug}:${venture.name.toLocaleLowerCase()}`), `${venture.name} should be searchable`);
    }
  }
  for (const work of selectedWorks) {
    const matches = entries.filter(entry => entry.id === `project:${work.slug}`);
    assert.equal(matches.length, 1, `${work.slug} should be indexed once`);
    assert.equal(matches[0].title.ko, work.title);
  }
  for (const item of profilePortfolioItems.filter(item => item.kind === 'project' && !item.detailHref)) {
    assert.ok(entries.some(entry => entry.id === `project:${item.id}`));
  }
  for (const skill of skillGroups.flatMap(group => group.items.ko)) assert.ok(entries.some(entry => entry.title.ko === skill));
  for (const channel of contactChannels) assert.ok(entries.some(entry => entry.id === `contact:${channel.id}`));
  for (const id of hiddenPortfolioIds) assert.ok(!ids.includes(id), `${id} should stay out of search`);
});

test('site search finds bilingual content, trims and ignores case, and handles empty or punctuation queries', () => {
  const entries = buildSiteSearchIndex();
  assert.ok(searchSiteContent(entries, '  PLANOR  ').some(entry => entry.id === 'project:planor'));
  assert.ok(searchSiteContent(entries, '가상 플랫폼').some(entry => entry.id === 'about:growth:platform'));
  assert.ok(searchSiteContent(entries, 'PHASE 06').some(entry => entry.id === 'about:growth:community-operations'));
  assert.ok(searchSiteContent(entries, '디자인그래피').some(entry => entry.id === 'project:designgraphy'));
  assert.ok(searchSiteContent(entries, 'Knowly AI').some(entry => entry.id === 'contribution:company-work:1'));
  assert.ok(searchSiteContent(entries, 'team leadership').some(entry => entry.title.en === 'Team leadership'));
  assert.ok(searchSiteContent(entries, 'seoharo0111@gmail.com').some(entry => entry.id === 'contact:email'));
  assert.equal(searchSiteContent(entries, 'SNS 마케팅')[0].id, 'contribution:company-work:0', 'specific title matches should rank before broader About copy');
  assert.equal(searchSiteContent(entries, 'RoFolder')[0].id, 'venture:business-operations:rofolder', 'an exact venture match should rank before a mention in a summary');
  assert.deepEqual(searchSiteContent(entries, '   '), []);
  assert.deepEqual(searchSiteContent(entries, '@@@'), []);
  assert.deepEqual(searchSiteContent(entries, 'no-such-public-content'), []);
});

test('growth search opens the matched phase instead of the start of the entire journey', () => {
  const entries = buildSiteSearchIndex();
  const first = searchSiteContent(entries, '가상 플랫폼 창작 입문')[0];
  const last = searchSiteContent(entries, '프로젝트 운영과 팀 리딩')[0];
  assert.equal(first.href, '/#about-growth-phase-1');
  assert.equal(last.href, '/#about-growth-phase-6');
  assert.notEqual(first.href, last.href);
});

// These fail if localized names, keyboard forms or direct-name ranking are lost.
const nameQueries = [
  ['Rofolder', 'venture:business-operations:rofolder'],
  ['로폴더', 'venture:business-operations:rofolder'],
  ['fhvhfej', 'venture:business-operations:rofolder'],
  ['ㄹㅍㄷ', 'venture:business-operations:rofolder'],
  ['Ro Folder', 'venture:business-operations:rofolder'],
  ['로 폴 더', 'venture:business-operations:rofolder'],
  ['ＲＯＦＯＬＤＥＲ', 'venture:business-operations:rofolder'],
  ['로폴더'.normalize('NFD'), 'venture:business-operations:rofolder'],
  ['개래ㅣㅇㄷㄱ', 'venture:business-operations:rofolder'],
  ['리미티드', 'venture:business-operations:limited'],
  ['flalxlem', 'venture:business-operations:limited'],
  ['Roblox Gallery', 'venture:business-operations:로블갤러리'],
  ['RoGallery', 'venture:business-operations:로블갤러리'],
  ['룩세렛', 'career:company-work'],
  ['fnrtpfpt', 'career:company-work'],
  ['디자인픽', 'project:design-pick'],
  ['Designgraphy', 'project:designgraphy'],
  ['elwkdlsrmfovl', 'project:designgraphy'],
  ['콕폼', 'project:cokform'],
  ['zhrvha', 'project:cokform'],
  ['Function Factory', 'career:function-factory'],
  ['펑션팩토리', 'career:function-factory'],
  ['깃허브', 'contact:github'],
  ['링크드인', 'contact:linkedin'],
];

for (const [query, expectedId] of nameQueries) {
  test(`search ranks the intended entry first for ${JSON.stringify(query)}`, () => {
    assert.equal(searchSiteContent(buildSiteSearchIndex(), query)[0]?.id, expectedId);
  });
}

test('search combines bilingual words and aliases without switching the displayed language', () => {
  const entries = buildSiteSearchIndex();
  assert.equal(searchSiteContent(entries, '로폴더 server')[0]?.id, 'venture:business-operations:rofolder');
  assert.equal(searchSiteContent(entries, '룩세렛 마케팅')[0]?.id, 'career:company-work');
  assert.equal(searchSiteContent(entries, '서버찾기')[0]?.id, 'venture:business-operations:rofolder');
  assert.deepEqual(searchSiteContent(entries, '로폴더 없는단어'), []);
  assert.equal(searchSiteContent(entries, 'fhvhfej')[0]?.title.ko, 'RoFolder');
});

test('equivalent names also find the same broader mentions in the same order', () => {
  const entries = buildSiteSearchIndex();
  for (const query of ['Rofolder', '로폴더', 'fhvhfej', 'ㄹㅍㄷ']) {
    assert.deepEqual(searchSiteContent(entries, query).map(entry => entry.id), [
      'venture:business-operations:rofolder',
      'career:business-operations',
    ], `all forms of ${query} should also find the parent career record`);
  }
});

test('exact names outrank keyboard matches and common keywords cannot become blanket aliases', () => {
  const copy = value => ({ ko: value, en: value });
  const entries = [
    { id: 'mention', title: copy('사업 운영'), section: copy('경력'), excerpt: copy('RoFolder를 운영했습니다.'), href: '/career', terms: [] },
    { id: 'keyboard', title: copy('로폴더'), section: copy('사업 운영'), excerpt: copy('서버 찾기'), href: '/career', terms: [] },
    { id: 'literal', title: copy('fhvhfej'), section: copy('프로젝트'), excerpt: copy('별도 이름'), href: '/portfolio', terms: [] },
  ];
  assert.equal(searchSiteContent(entries, 'fhvhfej')[0]?.id, 'literal');
  assert.equal(searchSiteContent(entries, '로폴더')[0]?.id, 'keyboard');
  assert.ok(!searchSiteContent(entries, 'fh').some(entry => entry.id === 'keyboard'), 'short Latin strings should not match arbitrary Korean keyboard forms');
  assert.deepEqual(searchSiteContent(entries, 'ㄹ'), [], 'one initial should not flood results');
  assert.deepEqual(searchSiteContent(entries, '없는사업'), []);
});

test('normalization handles punctuation and does not resurrect deleted or unrelated content', () => {
  const entries = buildSiteSearchIndex();
  assert.equal(searchSiteContent(entries, '  RO-FOLDER!  ')[0]?.id, 'venture:business-operations:rofolder');
  assert.equal(searchSiteContent(entries, 'SNS마케팅')[0]?.id, 'contribution:company-work:0');
  assert.deepEqual(searchSiteContent(entries, '!!!'), []);
  assert.deepEqual(searchSiteContent(entries, 'mindmap'), []);
  assert.deepEqual(searchSiteContent(entries, 'Mapfit'), []);
  assert.deepEqual(searchSiteContent(entries, '123456789012345678901234567890'), []);
  assert.deepEqual(searchSiteContent(entries, 'x'.repeat(1000)), []);
});

test('complete Korean words do not become different Korean words through keyboard matching', () => {
  const copy = value => ({ ko: value, en: value });
  const entries = ['가', '까', '갑', '값', '로폴더'].map(name => ({
    id: name, title: copy(name), section: copy('예시'), excerpt: copy('이름'), href: '/portfolio', terms: [],
  }));
  assert.ok(!searchSiteContent(entries, '가').some(entry => entry.id === '까'));
  assert.ok(!searchSiteContent(entries, '갑').some(entry => entry.id === '값'));
  assert.equal(searchSiteContent(entries, '로ㅍ')[0]?.id, '로폴더', 'partially composed Korean should still find the intended name');
});

test('every internal search destination resolves to a public route and an existing section when it has a hash', () => {
  const entries = buildSiteSearchIndex();
  const anchors = new Map([
    ['/', new Set(['about-growth', ...aboutGrowth.map(step => step.anchorId)])],
    ['/about', new Set(['about', ...aboutDisciplines.map(item => `about-${item.id}`)])],
    ['/portfolio', new Set(['experience', 'projects', 'skills'])],
    ['/contact', new Set(['contact'])],
  ]);
  for (const entry of entries) {
    assert.ok(entry.id && entry.title.ko.trim() && entry.title.en.trim());
    assert.ok(entry.section.ko.trim() && entry.section.en.trim());
    assert.ok(entry.excerpt.ko.trim() && entry.excerpt.en.trim());
    const target = new URL(entry.href, 'https://seoharo.kro.kr');
    assert.equal(target.origin, 'https://seoharo.kro.kr');
    assert.notEqual(getPortfolioRoute(target.pathname).page, 'missing', `${entry.id} should resolve: ${entry.href}`);
    if (target.hash) {
      const expectedAnchors = anchors.get(target.pathname);
      assert.ok(expectedAnchors?.has(decodeURIComponent(target.hash.slice(1))), `${entry.id} hash should be a known section: ${entry.href}`);
    }
  }
});

test('search dialog exposes keyboard-operable combobox results without persisting or transmitting queries', () => {
  const dialog = readFileSync(new URL('../src/components/SiteSearchDialog.tsx', import.meta.url), 'utf8');
  assert.match(dialog, /role="dialog"[\s\S]*?aria-modal="true"/);
  assert.match(dialog, /role="combobox"/);
  assert.match(dialog, /aria-activedescendant=\{activeOptionId\}/);
  assert.match(dialog, /role="listbox"/);
  assert.match(dialog, /role="option"/);
  assert.match(dialog, /event\.key === 'Escape'/);
  assert.match(dialog, /event\.key === 'ArrowDown'/);
  assert.match(dialog, /event\.key === 'ArrowUp'/);
  assert.match(dialog, /event\.key === 'Enter'/);
  assert.match(dialog, /activeOptionRef\.current\?\.scrollIntoView\(\{ block: 'nearest' \}\)/);
  assert.match(dialog, /onClose\(\)/);
  assert.match(dialog, /navigate\(entry\.href\)/);
  assert.match(dialog, /buildSiteSearchIndex\(\)/);
  assert.match(dialog, /searchSiteContent\(/);
  assert.match(dialog, /검색 결과가 없습니다/);
  assert.doesNotMatch(dialog, /\bfetch\s*\(|localStorage|sessionStorage|analytics|trackEvent/i);
});
