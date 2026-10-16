import { beforeEach, describe, expect, it } from 'vitest';
import {
  deleteWritingRecord,
  listWritingRecords,
  renameWritingRecord,
  saveWritingRecord,
} from './storage';

function makeLocalStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => { values.delete(key); },
    setItem: (key, value) => { values.set(key, String(value)); },
  };
}

describe('writing history browser fallback', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', { value: makeLocalStorage(), configurable: true });
  });

  it('saves, restores, renames, and deletes strokes and previews', async () => {
    const saved = await saveWritingRecord({
      label: 'Pinoy',
      originalText: 'Pinoy',
      hanunooText: '\u1729\u1732\u1728\u1733\u172C\u1734',
      practiceType: 'Word',
      strokes: [[{ x: 10, y: 11 }, { x: 12, y: 13 }]],
      imageDataUrl: 'data:image/png;base64,full',
      thumbnailDataUrl: 'data:image/png;base64,thumb',
      note: 'First attempt',
    });

    expect(await listWritingRecords()).toMatchObject([{ id: saved.id, label: 'Pinoy', note: 'First attempt' }]);
    await renameWritingRecord(saved.id, 'Pinoy practice');
    expect((await listWritingRecords())[0].label).toBe('Pinoy practice');
    await deleteWritingRecord(saved.id);
    expect(await listWritingRecords()).toEqual([]);
  });
});

