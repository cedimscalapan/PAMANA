import {
  hanunooConsonants,
  hanunooIndependentVowels,
  hanunooMarksAndPunctuation,
  hanunooVowelSigns,
} from './hanunoo';

export type TransliterationSegment = {
  latin: string;
  glyph: string;
  reading: string;
  explanation: string;
  supported: boolean;
};

export type TransliterationResult = {
  input: string;
  normalized: string;
  script: string;
  syllables: string[];
  segments: TransliterationSegment[];
  issues: string[];
  notes: string[];
  complete: boolean;
  exact: boolean;
};

type LetterToken = { text: string; kind: 'consonant' | 'vowel' | 'separator' | 'unsupported' };

const independentVowels: Record<string, string> = {
  a: hanunooIndependentVowels[0].glyph,
  i: hanunooIndependentVowels[1].glyph,
  e: hanunooIndependentVowels[1].glyph,
  u: hanunooIndependentVowels[2].glyph,
  o: hanunooIndependentVowels[2].glyph,
};

const consonants = Object.fromEntries(
  hanunooConsonants.map((item) => [item.reading === 'ŋ' ? 'ng' : item.reading ?? '', item.glyph]),
) as Record<string, string>;

const vowelSigns: Record<string, string> = {
  a: '',
  i: hanunooVowelSigns[0].glyph,
  e: hanunooVowelSigns[0].glyph,
  u: hanunooVowelSigns[1].glyph,
  o: hanunooVowelSigns[1].glyph,
};

const pamudpod = hanunooMarksAndPunctuation.find((item) => item.category === 'pamudpod')?.glyph ?? '\u1734';
const supportedConsonants = new Set(Object.keys(consonants));
const supportedVowels = new Set(Object.keys(independentVowels));
const accentedVowels: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };

function tokenize(value: string): LetterToken[] {
  const normalized = value.trim().toLocaleLowerCase('fil-PH').normalize('NFC');
  const tokens: LetterToken[] = [];

  for (let index = 0; index < normalized.length; index += 1) {
    const current = normalized[index];
    const pair = normalized.slice(index, index + 2);

    if (pair === 'ng') {
      tokens.push({ text: 'ng', kind: 'consonant' });
      index += 1;
    } else if (supportedConsonants.has(current)) {
      tokens.push({ text: current, kind: 'consonant' });
    } else if (supportedVowels.has(current)) {
      tokens.push({ text: current, kind: 'vowel' });
    } else if (accentedVowels[current]) {
      tokens.push({ text: current, kind: 'vowel' });
    } else if (current === ' ' || current === '-') {
      tokens.push({ text: current, kind: 'separator' });
    } else {
      tokens.push({ text: current, kind: 'unsupported' });
    }
  }

  return tokens;
}

/**
 * Sound-based Filipino/Tagalog to Hanunó'o script transliteration.
 *
 * This is deliberately not a translation into the Hanunó'o language. It uses
 * the modern pamudpod for vowel-less consonants and reports every unsupported
 * character instead of silently inventing an equivalent.
 */
export function transliterateFilipino(input: string): TransliterationResult {
  const tokens = tokenize(input);
  const segments: TransliterationSegment[] = [];
  const syllables: string[] = [];
  const issues: string[] = [];
  const notes = new Set<string>();
  const output: string[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token.kind === 'separator') {
      if (output.at(-1) !== ' ') output.push(' ');
      if (token.text === '-') notes.add('The hyphen is shown as a word boundary; Hanunó’o has no equivalent hyphen in this converter.');
      continue;
    }

    if (token.kind === 'unsupported') {
      issues.push(`“${token.text}” has no verified direct mapping in this converter.`);
      segments.push({
        latin: token.text,
        glyph: '',
        reading: token.text,
        explanation: 'Unsupported character; omitted from the partial script result.',
        supported: false,
      });
      continue;
    }

    if (token.kind === 'vowel') {
      const vowel = accentedVowels[token.text] ?? token.text;
      const glyph = independentVowels[vowel];
      output.push(glyph);
      syllables.push(vowel);
      segments.push({
        latin: token.text,
        glyph,
        reading: vowel,
        explanation: `Independent vowel ${vowel}.`,
        supported: true,
      });
      if (accentedVowels[token.text]) notes.add('Stress marks are not encoded; the accented vowel was represented by its base vowel.');
      if (vowel === 'e' || vowel === 'i') notes.add('Hanunó’o uses the same independent vowel/sign for i and e; context preserves the intended reading.');
      if (vowel === 'o' || vowel === 'u') notes.add('Hanunó’o uses the same independent vowel/sign for u and o; context preserves the intended reading.');
      continue;
    }

    const next = tokens[index + 1];
    const hasFollowingVowel = next?.kind === 'vowel';
    const base = consonants[token.text];

    if (hasFollowingVowel) {
      const vowel = accentedVowels[next.text] ?? next.text;
      const glyph = `${base}${vowelSigns[vowel]}`;
      const syllable = `${token.text}${vowel}`;
      output.push(glyph);
      syllables.push(syllable);
      segments.push({
        latin: `${token.text}${next.text}`,
        glyph,
        reading: syllable,
        explanation: vowel === 'a'
          ? `${token.text.toUpperCase()} carries its inherent a vowel.`
          : `${token.text.toUpperCase()} with the ${vowel === 'i' || vowel === 'e' ? 'i/e' : 'u/o'} vowel sign.`,
        supported: true,
      });
      if (accentedVowels[next.text]) notes.add('Stress marks are not encoded; the accented vowel was represented by its base vowel.');
      if (vowel === 'e' || vowel === 'i') notes.add('Hanunó’o uses one vowel sign for i and e, so the script alone does not distinguish them.');
      if (vowel === 'o' || vowel === 'u') notes.add('Hanunó’o uses one vowel sign for u and o, so the script alone does not distinguish them.');
      index += 1;
    } else {
      const glyph = `${base}${pamudpod}`;
      output.push(glyph);
      syllables.push(token.text);
      segments.push({
        latin: token.text,
        glyph,
        reading: token.text,
        explanation: `${token.text.toUpperCase()} with pamudpod to suppress the inherent a vowel.`,
        supported: true,
      });
    }
  }

  const script = output.join('').replace(/\s+/g, ' ').trim();
  const noteList = Array.from(notes);
  const complete = issues.length === 0 && script.length > 0;

  return {
    input,
    normalized: tokens.map((token) => accentedVowels[token.text] ?? token.text).join(''),
    script,
    syllables,
    segments,
    issues,
    notes: noteList,
    complete,
    exact: complete && noteList.length === 0,
  };
}

export const hanunooTransliterationSources = [
  {
    label: 'Hanunó’o Orthography Notes — Richard Ishida',
    url: 'https://r12a.github.io/scripts/hano/hnn',
  },
  {
    label: 'Unicode Hanunoo chart',
    url: 'https://unicode.org/charts/PDF/U1720.pdf',
  },
];

