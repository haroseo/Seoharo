import assert from 'node:assert/strict';
import test from 'node:test';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { withAppRenderer } from './helpers/render-app.mjs';

test('shared home links let readers open the complete greeting without replacing the existing introduction', async () => {
  await withAppRenderer(render => {
    for (const path of ['/', '/about/']) {
      const html = render({ initialPath: path, initialLanguage: 'ko' });
      const greeting = html.match(/<details\b[^>]*id="about-greeting"[\s\S]*?<\/details>/)?.[0] ?? '';
      assert.ok(greeting, 'The home page needs a user-opened full greeting, not metadata alone');
      assert.doesNotMatch(greeting.match(/<details\b[^>]*>/)?.[0] ?? '', /\bopen(?:=|\s|>)/);
      assert.match(greeting, /<summary\b[^>]*>[\s\S]*?인사글 전체 보기[\s\S]*?<\/summary>/);
      assert.equal((greeting.match(/<p\b/g) ?? []).length, 3);
      const sharing = getPageMetadata(path, 'ko');
      assert.ok(greeting.includes(sharing.socialTitle));
      for (const paragraph of sharing.socialDescription.split('\n\n')) {
        assert.ok(greeting.includes(paragraph), 'On-site readers must be able to read every sharing paragraph');
      }
      assert.match(greeting, /href="\/contact"/);
      assert.match(html, /href="\/portfolio#projects"/);
      assert.match(html, /id="about-experience"/);
      assert.match(html, /id="about-work"/);
      assert.match(html, /mailto:seoharo0111@gmail.com/);
    }
  });
});

test('the full greeting respects the selected language and stays off unrelated primary pages', async () => {
  await withAppRenderer(render => {
    const english = render({ initialPath: '/', initialLanguage: 'en' });
    const greeting = english.match(/<details\b[^>]*id="about-greeting"[\s\S]*?<\/details>/)?.[0] ?? '';
    assert.ok(greeting);
    assert.match(greeting, /<summary\b[^>]*>[\s\S]*?Read my introduction[\s\S]*?<\/summary>/);
    assert.doesNotMatch(greeting, /[가-힣]/);
    assert.equal((greeting.match(/<p\b/g) ?? []).length, 3);
    for (const path of ['/portfolio', '/contact', '/career']) {
      assert.doesNotMatch(render({ initialPath: path }), /id="about-greeting"/);
    }
  });
});
