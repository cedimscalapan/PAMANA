import { describe, expect, it } from 'vitest';
import { offlineVocabulary } from './filipino-vocabulary';
import { transliterateFilipino } from './hanunoo-transliteration';

describe('Filipino to Hanunó’o transliteration', () => {
  it('transliterates Pinoy with shared vowel signs and a final pamudpod', () => {
    const result = transliterateFilipino('Pinoy');
    expect(result.script).toBe('\u1729\u1732\u1728\u1733\u172C\u1734');
    expect(result.syllables).toEqual(['pi', 'no', 'y']);
    expect(result.complete).toBe(true);
    expect(result.exact).toBe(false);
  });

  it('keeps the ng digraph distinct from an n-g sequence', () => {
    expect(transliterateFilipino('mangga').syllables).toEqual(['ma', 'ng', 'ga']);
    expect(transliterateFilipino('maganda').syllables).toEqual(['ma', 'ga', 'n', 'da']);
  });

  it('reports unsupported letters instead of inventing a mapping', () => {
    const result = transliterateFilipino('Jose');
    expect(result.complete).toBe(false);
    expect(result.issues).toContain('“j” has no verified direct mapping in this converter.');
    expect(result.segments.find((segment) => segment.latin === 'j')?.supported).toBe(false);
  });

  it('covers every bundled vocabulary word without an unsupported mapping', () => {
    expect(offlineVocabulary).toHaveLength(20);
    for (const entry of offlineVocabulary) {
      expect(entry.transliteration.complete, entry.word).toBe(true);
      expect(entry.transliteration.script.length, entry.word).toBeGreaterThan(0);
    }
  });
});

