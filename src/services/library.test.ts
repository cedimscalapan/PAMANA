import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { setStored } from './storage';
import { changeLibrary, deleteMedia, importPhotos, mediaReferences, mediaUrl, readLibrary, saveMemory, validateMedia } from './library';

vi.mock('./storage', () => ({ setStored: vi.fn(async (key: string, value: string) => localStorage.setItem(key, value)) }));
const fixture = () => new File(['small photo fixture'], 'lake.jpg', { type: 'image/jpeg' });
function storage(): Storage {
  const map = new Map<string, string>();
  return { get length() { return map.size; }, clear: () => map.clear(), key: index => [...map.keys()][index] ?? null, getItem: key => map.get(key) ?? null, setItem: (key, value) => { map.set(key, value); }, removeItem: key => { map.delete(key); } };
}

describe('persistent photo library and memory references', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', storage());
    vi.stubGlobal('window', new EventTarget());
    vi.stubGlobal('indexedDB', new IDBFactory());
    vi.mocked(setStored).mockClear();
  });

  it('keeps the original journal entry when migrating the single-story format', () => {
    localStorage.setItem('pamana.privateStory.title', 'My first visit');
    localStorage.setItem('pamana.privateStory.body', 'A memory from before the redesign.');
    expect(readLibrary().memories[0]).toMatchObject({ title: 'My first visit', description: 'A memory from before the redesign.', occurredAt: '' });
    expect(localStorage.getItem('pamana.privateStory.body')).toContain('before the redesign');
  });

  it('restores the actual photo and memory metadata, edits in place, and protects referenced originals', async () => {
    const saved = await saveMemory({ title: 'By the lake', description: 'An afternoon with family.', location: 'Naujan', occurredAt: '2026-10-17T07:30:00Z', mediaIds: [] }, [fixture()]);
    const memory = saved.memories[0];
    const photo = saved.media[0];
    const restored = readLibrary();
    expect(restored.memories[0]).toEqual(memory);
    const url = await mediaUrl(photo);
    expect(await (await fetch(url)).blob().then(blob => blob.text())).toBe('small photo fixture');
    URL.revokeObjectURL(url);
    await saveMemory({ ...memory, title: 'Our lake visit' });
    expect(readLibrary().memories).toHaveLength(1);
    expect(readLibrary().memories[0].createdAt).toBe(memory.createdAt);
    expect(mediaReferences(readLibrary(), photo.id)).toHaveLength(1);
    await expect(deleteMedia(photo.id)).rejects.toThrow('belongs to a memory');
    expect(readLibrary().media).toHaveLength(1);
    await changeLibrary(state => ({ ...state, memories: [] }));
    expect(readLibrary().media).toHaveLength(1);
    await deleteMedia(photo.id);
    expect(readLibrary().media).toEqual([]);
    await expect(mediaUrl(photo)).rejects.toThrow('unavailable');
  });

  it('preserves existing data and cleans staged files when metadata saving fails', async () => {
    await importPhotos([fixture()], 'my-memories');
    const before = JSON.stringify(readLibrary());
    vi.mocked(setStored).mockRejectedValueOnce(new Error('Storage full'));
    await expect(saveMemory({ title: 'Unsaved', description: 'Must not appear saved.', location: '', occurredAt: '2026-10-17T01:00:00Z', mediaIds: [] }, [fixture()])).rejects.toThrow('Storage full');
    expect(JSON.stringify(readLibrary())).toBe(before);
    // The failed operation must not poison subsequent queued writes.
    await changeLibrary(state => ({ ...state, folders: [...state.folders, { id: 'trip', name: 'My trip', createdAt: '2026-10-17' }] }));
    expect(readLibrary().folders.some(folder => folder.id === 'trip')).toBe(true);
  });

  it('stores a video as bytes and keeps photos reusable without duplicating the original', async () => {
    const initial = await importPhotos([fixture()], 'my-memories');
    const id = initial.media[0].id;
    await saveMemory({ title: 'Photo story', description: 'An existing library picture.', location: '', occurredAt: '2026-10-17T00:00:00Z', mediaIds: [id] });
    const next = await saveMemory({ title: 'Video story', description: 'A video and the same picture.', location: '', occurredAt: '2026-10-17T00:00:00Z', mediaIds: [id] }, [new File(['video fixture'], 'clip.mp4', { type: 'video/mp4' })]);
    expect(next.media).toHaveLength(2);
    expect(mediaReferences(next, id)).toHaveLength(2);
    const url = await mediaUrl(next.media[1]);
    expect(await (await fetch(url)).text()).toBe('video fixture');
    URL.revokeObjectURL(url);
  });

  it('rejects empty, unsupported, and oversized files before writing', () => {
    expect(() => validateMedia(new File([], 'empty.jpg', { type: 'image/jpeg' }))).toThrow('empty');
    expect(() => validateMedia(new File(['text'], 'note.txt', { type: 'text/plain' }))).toThrow('supported');
    const file = fixture(); Object.defineProperty(file, 'size', { value: 51 * 1024 * 1024 });
    expect(() => validateMedia(file)).toThrow('50 MB');
  });
});
