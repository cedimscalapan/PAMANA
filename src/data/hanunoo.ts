/**
 * Canonical Hanunó'o character data for Sulat Pamana.
 *
 * The character inventory and orthographic notes follow Richard Ishida's
 * Hanunó'o Orthography Notes and the Unicode Hanunoo chart. Latin labels are
 * reading aids only; the app must not present them as a substitute for
 * community-approved language instruction.
 */
export type HanunooCategory = 'independent_vowel' | 'consonant' | 'vowel_sign' | 'pamudpod' | 'punctuation';

export type HanunooCharacter = {
  codePoint: string;
  glyph: string;
  displayGlyph: string;
  unicodeName: string;
  category: HanunooCategory;
  reading?: string;
  voiceGuide: string;
  note: string;
};

const character = (codePoint: string, unicodeName: string, category: HanunooCategory, reading: string | undefined, note: string, combining = false): HanunooCharacter => {
  const glyph = String.fromCodePoint(Number.parseInt(codePoint, 16));
  return { codePoint: `U+${codePoint}`, glyph, displayGlyph: combining ? `◌${glyph}` : glyph, unicodeName, category, reading, voiceGuide: reading ?? 'silent mark', note };
};

export const hanunooIndependentVowels: HanunooCharacter[] = [
  character('1720', 'HANUNOO LETTER A', 'independent_vowel', 'a', 'Independent vowel; also represents the inherent vowel sound.'),
  character('1721', 'HANUNOO LETTER I', 'independent_vowel', 'i or e', 'Independent vowel; the sound depends on the word.'),
  character('1722', 'HANUNOO LETTER U', 'independent_vowel', 'u or o', 'Independent vowel; the sound depends on the word.'),
];

const consonantDefinitions: Array<[string, string, string]> = [
  ['1723', 'HANUNOO LETTER KA', 'k'],
  ['1724', 'HANUNOO LETTER GA', 'g'],
  ['1725', 'HANUNOO LETTER NGA', 'ŋ'],
  ['1726', 'HANUNOO LETTER TA', 't'],
  ['1727', 'HANUNOO LETTER DA', 'd'],
  ['1728', 'HANUNOO LETTER NA', 'n'],
  ['1729', 'HANUNOO LETTER PA', 'p'],
  ['172A', 'HANUNOO LETTER BA', 'b'],
  ['172B', 'HANUNOO LETTER MA', 'm'],
  ['172C', 'HANUNOO LETTER YA', 'y'],
  ['172D', 'HANUNOO LETTER RA', 'r'],
  ['172E', 'HANUNOO LETTER LA', 'l'],
  ['172F', 'HANUNOO LETTER WA', 'w'],
  ['1730', 'HANUNOO LETTER SA', 's'],
  ['1731', 'HANUNOO LETTER HA', 'h'],
];

const consonantVoiceGuides: Record<string, string> = {
  'U+1723': 'ka', 'U+1724': 'ga', 'U+1725': 'nga', 'U+1726': 'ta', 'U+1727': 'da',
  'U+1728': 'na', 'U+1729': 'pa', 'U+172A': 'ba', 'U+172B': 'ma', 'U+172C': 'ya',
  'U+172D': 'ra', 'U+172E': 'la', 'U+172F': 'wa', 'U+1730': 'sa', 'U+1731': 'ha',
};

export const hanunooConsonants: HanunooCharacter[] = consonantDefinitions.map(([codePoint, unicodeName, reading]) => {
  const item = character(codePoint, unicodeName, 'consonant', reading, 'Consonant with an inherent a vowel.');
  return { ...item, voiceGuide: consonantVoiceGuides[item.codePoint] };
});

export const hanunooVowelSigns: HanunooCharacter[] = [
  character('1732', 'HANUNOO VOWEL SIGN I', 'vowel_sign', 'i or e', 'Combining mark placed above the base consonant.', true),
  character('1733', 'HANUNOO VOWEL SIGN U', 'vowel_sign', 'u or o', 'Combining mark placed below the base consonant.', true),
];

export const hanunooMarksAndPunctuation: HanunooCharacter[] = [
  character('1734', 'HANUNOO SIGN PAMUDPOD', 'pamudpod', undefined, 'Visible vowel-killer mark used for vowel absence, including modern syllable codas.'),
  character('1735', 'PHILIPPINE SINGLE PUNCTUATION', 'punctuation', undefined, 'Short pause.'),
  character('1736', 'PHILIPPINE DOUBLE PUNCTUATION', 'punctuation', undefined, 'Longer or sentence-like pause; may mark the end of a poem.'),
];

/** All 23 assigned characters in the U+1720–U+1736 Hanunoo inventory. */
export const hanunooCharacters: HanunooCharacter[] = [
  ...hanunooIndependentVowels,
  ...hanunooConsonants,
  ...hanunooVowelSigns,
  ...hanunooMarksAndPunctuation,
];

export type HanunooConsonantRow = {
  base: HanunooCharacter;
  noVowelSign: string;
  iOrE: string;
  uOrO: string;
};

/** The complete 15 × 3 consonant practice combinations described by r12a. */
export const hanunooConsonantRows: HanunooConsonantRow[] = hanunooConsonants.map((base) => ({
  base,
  noVowelSign: base.glyph,
  iOrE: `${base.glyph}${hanunooVowelSigns[0].glyph}`,
  uOrO: `${base.glyph}${hanunooVowelSigns[1].glyph}`,
}));

export const hanunooOrthographyNotes = {
  script: 'Hanunó’o',
  unicodeBlock: 'Hanunoo',
  range: 'U+1720–U+173F',
  assignedCharacters: 23,
  writingSystem: 'Abugida',
  inherentVowel: 'a',
  postConsonantVowelSounds: ['i', 'e', 'u', 'o'],
  vowelSigns: 'Two combining marks represent four post-consonant vowel sounds.',
  pamudpod: 'U+1734 marks vowel absence in modern orthography.',
  direction: 'Left to right in horizontal lines; no case distinction.',
  nativeDigits: false,
  sources: [
    'https://r12a.github.io/scripts/hano/hnn.html',
    'https://unicode.org/charts/PDF/U1720.pdf',
  ],
};

/** A neutral local chart sample; it is not presented as a translated word or phrase. */
export const hanunooInventoryText = hanunooCharacters.map((item) => item.glyph).join(' ');
