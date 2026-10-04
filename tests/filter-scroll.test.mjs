import test from 'node:test';
import assert from 'node:assert/strict';
import { getFilterHeightReserve } from '../src/lib/filterScroll.ts';

test('filter height reserve keeps enough document space to retain the reader position', () => {
  assert.equal(getFilterHeightReserve({ sectionHeight: 900, documentHeight: 3000, scrollY: 1465, viewportHeight: 859 }), 224);
});

test('filter height reserve adds no whitespace when the rest of the document is tall enough', () => {
  assert.equal(getFilterHeightReserve({ sectionHeight: 900, documentHeight: 3000, scrollY: 100, viewportHeight: 859 }), 0);
});

test('filter height reserve rounds up fractional geometry without losing a pixel of scroll space', () => {
  assert.equal(getFilterHeightReserve({ sectionHeight: 900.25, documentHeight: 3000, scrollY: 1465.625, viewportHeight: 859 }), 225);
});
