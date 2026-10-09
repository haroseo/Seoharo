import test from 'node:test';
import assert from 'node:assert/strict';
import * as routes from '../src/data/portfolioRoutes.ts';

test('secondary pages return to the actual referring screen rather than a fixed category', () => {
  assert.deepEqual(routes.getReturnDestination?.('/career', '/portfolio#experience', 'ko'), { href: '/portfolio#experience', label: '포트폴리오로 돌아가기' });
  assert.deepEqual(routes.getReturnDestination?.('/career/group/business', '/#about-experience', 'ko'), { href: '/#about-experience', label: '소개로 돌아가기' });
  assert.deepEqual(routes.getReturnDestination?.('/portfolio/one-to-z', '/career/freelance-design', 'ko'), { href: '/career/freelance-design', label: '프리랜서 디자인으로 돌아가기' });
  assert.deepEqual(routes.getReturnDestination?.('/portfolio/planor', '/portfolio/one-to-z', 'en'), { href: '/portfolio/one-to-z', label: 'Back to 1 to Z' });
});

test('primary pages and field filters never expose a return control even with history', () => {
  for (const path of ['/', '/about/', '/portfolio/', '/contact/', '/design', '/marketing', '/development', '/operations', '/clubs', '/404', '/portfolio/not-real']) {
    assert.equal(routes.getReturnDestination?.(path, '/career', 'ko'), null, path);
  }
});

test('missing, external, unsafe and same-screen origins use related-list fallback destinations', () => {
  for (const previous of [null, 'https://evil.example/career', '//evil.example/career', '/career\\escape', '/../../career', '/unknown', '/career#same']) {
    assert.deepEqual(routes.getReturnDestination?.('/career', previous, 'ko'), { href: '/portfolio', label: '포트폴리오로 돌아가기' });
  }
  assert.deepEqual(routes.getReturnDestination?.('/career/group/freelance', null, 'ko'), { href: '/career', label: '경력 목록으로 돌아가기' });
  assert.deepEqual(routes.getReturnDestination?.('/portfolio/typolab', '/portfolio/naratmalsami', 'ko'), { href: '/portfolio', label: '포트폴리오로 돌아가기' });
});

test('anchors, aliases and portfolio field tabs are one screen when calculating the previous view', () => {
  assert.equal(routes.getNavigationScreenKey?.('/about#about-growth'), 'about');
  assert.equal(routes.getNavigationScreenKey?.('/design#projects'), 'work');
  assert.equal(routes.getNavigationScreenKey?.('/portfolio/typolab/'), 'project:naratmalsami');
  assert.equal(routes.getNavigationScreenKey?.('/career/group/freelance'), 'career:freelance-design');
  assert.equal(routes.getNavigationScreenKey?.('/career/freelance-design'), 'career:freelance-design');
  assert.equal(routes.getNavigationScreenKey?.('//evil.example'), null);
});

test('navigation targets only an explicit decoded anchor, not a nonexistent default section on the career index', () => {
  assert.equal(routes.getNavigationAnchor?.(''), '');
  assert.equal(routes.getNavigationAnchor?.('#experience'), 'experience');
  assert.equal(routes.getNavigationAnchor?.('#%EC%84%B1%EC%9E%A5'), '성장');
  assert.equal(routes.getNavigationAnchor?.('#%broken'), '');
});
