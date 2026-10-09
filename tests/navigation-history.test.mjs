import test from 'node:test';
import assert from 'node:assert/strict';
import * as history from '../src/lib/navigationHistory.ts';

const entry = { index: 2, href: '/design#projects', previous: { index: 0, href: '/' }, scrollY: 1842, view: { projectStatus: 'ongoing', heightReserve: 270 } };

test('history state restores only a validated matching internal entry with its display preferences', () => {
  assert.deepEqual(history.readNavigationEntry?.({ seoharoNavigation: entry, unrelated: 'kept' }, '/design#projects'), entry);
  for (const value of [null, {}, { seoharoNavigation: { ...entry, href: '//evil.example' } }, { seoharoNavigation: { ...entry, index: -1 } }, { seoharoNavigation: { ...entry, scrollY: NaN } }, { seoharoNavigation: { ...entry, previous: { index: 5, href: '/contact' } } }]) {
    assert.equal(history.readNavigationEntry?.(value, '/design#projects'), null);
  }
  assert.equal(history.readNavigationEntry?.({ seoharoNavigation: entry }, '/contact'), null);
  assert.equal(history.readNavigationEntry?.({ seoharoNavigation: { ...entry, previous: { index: 0, href: 42 } } }, '/design#projects'), null);
});

test('a detail records its immediate source, but hash and field-filter navigation skip same-screen entries', () => {
  assert.deepEqual(history.createNavigationEntry?.('/portfolio/one-to-z', entry), { index: 3, href: '/portfolio/one-to-z', previous: { index: 2, href: '/design#projects' }, scrollY: 0, view: {} });
  assert.deepEqual(history.createNavigationEntry?.('/development#projects', entry), { index: 3, href: '/development#projects', previous: { index: 0, href: '/' }, scrollY: 0, view: entry.view });
  assert.deepEqual(history.createNavigationEntry?.('/portfolio', entry, true), { index: 2, href: '/portfolio', previous: null, scrollY: 0, view: {} });
});

test('fresh direct entry has no fake previous page or stored filter', () => {
  assert.deepEqual(history.createNavigationEntry?.('/career'), { index: 0, href: '/career', previous: null, scrollY: 0, view: {} });
});
