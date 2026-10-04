import assert from 'node:assert/strict';
import test from 'node:test';
import { withAppRenderer } from './helpers/render-app.mjs';

test('public App renders contact, category, missing detail and full journey without window', async () => {
  await withAppRenderer(async render => {
    const contact = render({ initialPath: '/contact/', initialLanguage: 'ko', prerendered: true });
    assert.ok(contact.includes('mailto:seoharo0111@gmail.com'));
    const design = render({ initialPath: '/design/', initialLanguage: 'ko', prerendered: true });
    assert.match(design, /디자인그래피/);
    assert.doesNotMatch(design, /<h3[^>]*>Planor/);
    const missing = render({ initialPath: '/career/not-real', initialLanguage: 'ko', prerendered: true });
    assert.match(missing, /아직 없는 페이지입니다/);
    assert.equal((missing.match(/<h1\b/g) ?? []).length, 1);
    const about = render({ initialPath: '/', initialLanguage: 'ko', prerendered: true });
    for (const phrase of ['가상 플랫폼 창작 입문', '컴퓨터 프로그래밍 기초 공부', '팀 프로젝트 참여', '에셋 기획 및 서비스 운영', '디자인·마케팅·개발 학습', '프로젝트 운영과 팀 리딩', 'AI']) assert.ok(about.includes(phrase));
    assert.doesNotMatch(about, /opacity:0(?:;|"|\b)/);
    assert.match(render({ initialPath: '/contact', initialLanguage: 'en' }), /Contact/);
  });
});
