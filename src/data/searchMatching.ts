// Search-only spellings, not new public names or claims about these projects.
const nameAliases: readonly (readonly string[])[] = [
  ['RoFolder', '로폴더'],
  ['Limited', '리미티드'],
  ['Roblox Gallery', 'RoGallery', '로블갤러리'],
  ['LUXERET', '룩세렛'],
  ['Designgraphy', '디자인그래피'],
  ['Design Pick', '디자인픽'],
  ['Planor', '플래너'],
  ['Naratmalsami', '나랏말싸미'],
  ['Cokform', '콕폼'],
  ['F(x) Factory', 'Function Factory', '펑션팩토리'],
  ['Knowly', '놀리'],
  ['Return', '리턴'],
  ['GitHub', '깃허브'],
  ['LinkedIn', '링크드인'],
  ['Email', '이메일'],
];

const initialKeys = ['r', 'R', 's', 'e', 'E', 'f', 'a', 'q', 'Q', 't', 'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g'];
const vowelKeys = ['k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'hk', 'ho', 'hl', 'y', 'n', 'nj', 'np', 'nl', 'b', 'm', 'ml', 'l'];
const finalKeys = ['', 'r', 'R', 'rt', 's', 'sw', 'sg', 'e', 'f', 'fr', 'fa', 'fq', 'ft', 'fx', 'fv', 'fg', 'a', 'q', 'qt', 't', 'T', 'd', 'w', 'c', 'z', 'x', 'v', 'g'];

function compact(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

// Comparing key sequences supports both wrong-layout directions without an IME.
// NFD also makes compound vowels/finals and partially composed input searchable.
function keyboardForm(value: string): string {
  return compact(Array.from(value.normalize('NFKC').normalize('NFD'), character => {
    const code = character.codePointAt(0)!;
    if (code >= 0x1100 && code <= 0x1112) return initialKeys[code - 0x1100];
    if (code >= 0x1161 && code <= 0x1175) return vowelKeys[code - 0x1161];
    if (code >= 0x11a8 && code <= 0x11c2) return finalKeys[code - 0x11a7];
    return character;
  }).join(''));
}

function initials(value: string): string {
  return Array.from(value.normalize('NFKC'), character => {
    const code = character.codePointAt(0)!;
    if (code >= 0xac00 && code <= 0xd7a3) return String.fromCodePoint(0x1100 + Math.floor((code - 0xac00) / 588));
    if (code >= 0x1100 && code <= 0x1112) return character;
    return '';
  }).join('');
}

const aliasGroups = nameAliases.map(names => ({
  names,
  text: names.map(compact),
  keyboard: names.map(keyboardForm),
  initials: names.map(initials),
}));
const aliasesByName = new Map(aliasGroups.flatMap(group => group.text.map(name => [name, group.names] as const)));

function aliasesFor(values: readonly string[]): string[] {
  return [...new Set(values.flatMap(value => aliasesByName.get(compact(value)) ?? []))];
}

export interface SearchTextFields {
  names: string[];
  sections: string[];
  excerpts: string[];
  keywords: string[];
}

interface SearchTerm {
  text: string;
  keyboard: string;
  initialOnly: boolean;
  completeHangul: boolean;
  alternatives: string[];
}

export interface SearchQuery {
  whole: SearchTerm;
  terms: SearchTerm[];
}

function prepareTerm(value: string): SearchTerm {
  const text = compact(value);
  const keyboard = keyboardForm(value);
  const initialOnly = /^[\u1100-\u1112]{2,}$/u.test(text);
  const alternatives = [...new Set(aliasGroups.filter(group =>
    group.text.includes(text)
    || (!initialOnly && keyboard.length >= 3 && group.keyboard.includes(keyboard))
    || (initialOnly && group.initials.includes(text)),
  ).flatMap(group => group.text))];
  return { text, keyboard, initialOnly, completeHangul: /^[가-힣]+$/u.test(text), alternatives };
}

export function prepareSearchQuery(value: string): SearchQuery | null {
  if (value.length > 160) return null;
  const whole = prepareTerm(value);
  if (!whole.text) return null;
  const tokens = [...new Set(value.trim().split(/\s+/u))].map(prepareTerm).filter(term => term.text);
  return { whole, terms: tokens };
}

interface SearchField {
  text: string;
  keyboard: string;
  initials: string;
  hasHangul: boolean;
  weight: number;
}

function fieldsFor(values: readonly string[], weight: number, matchInitials = false): SearchField[] {
  return [...new Set(values)].map(value => ({
    text: compact(value),
    keyboard: keyboardForm(value),
    initials: matchInitials ? initials(value) : '',
    hasHangul: /[\u1100-\u11ff가-힣]/u.test(compact(value)),
    weight,
  }));
}

function matchScore(field: SearchField, query: SearchTerm): number {
  let score = 0;
  if (query.initialOnly) {
    if (field.initials.includes(query.text)) score = field.weight * (field.initials === query.text ? 0.65 : 0.45);
  } else {
    if (field.text === query.text) score = field.weight;
    else if (field.text.startsWith(query.text)) score = field.weight * 0.8;
    else if (field.text.includes(query.text)) score = field.weight * 0.6;
    // Tiny Latin queries such as "AI" must not turn into arbitrary Hangul hits.
    else if (query.keyboard.length >= 3 && (!query.completeHangul || !field.hasHangul) && field.keyboard.includes(query.keyboard)) {
      score = field.weight * (field.keyboard === query.keyboard ? 0.5 : 0.3);
    }
  }
  // Expand known names in the query as well as the index, so a Korean alias
  // also finds an English mention in a parent career or a project description.
  for (const alternative of query.alternatives) {
    if (field.text === alternative) score = Math.max(score, field.weight * 0.9);
    else if (field.text.startsWith(alternative)) score = Math.max(score, field.weight * 0.7);
    else if (field.text.includes(alternative)) score = Math.max(score, field.weight * 0.5);
  }
  return score;
}

export function scoreSearchFields(source: SearchTextFields, query: SearchQuery): number {
  const aliases = aliasesFor([...source.names, ...source.keywords]);
  const fields = [
    ...fieldsFor(source.names, 240, true),
    ...fieldsFor(aliases, 220, true),
    ...fieldsFor(source.keywords, 100),
    ...fieldsFor(source.sections, 70),
    ...fieldsFor(source.excerpts, 30),
  ];
  const bestScore = (term: SearchTerm) => Math.max(0, ...fields.map(field => matchScore(field, term)));
  const wholeScore = bestScore(query.whole);
  const termScores = query.terms.map(bestScore);
  // An entire compact phrase can match despite spaces within a name; otherwise
  // every word must be present, including mixed-language name + field queries.
  if (!wholeScore && termScores.some(score => score === 0)) return 0;
  return wholeScore * 2 + termScores.reduce((total, score) => total + score, 0);
}
