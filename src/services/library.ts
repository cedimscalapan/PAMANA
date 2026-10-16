import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { setStored } from './storage';

export type PhotoFolder = { id: string; name: string; coverId?: string; createdAt: string };
export type LibraryMedia = {
  id: string; title: string; description: string; kind: 'photo' | 'video'; mime: string;
  folderIds: string[]; createdAt: string; fileName: string; bytes: number;
  path?: string; thumbnailPath?: string;
};
export type Memory = {
  id: string; title: string; description: string; location: string; latitude?: number; longitude?: number;
  occurredAt: string; createdAt: string; updatedAt: string; mediaIds: string[];
};
export type LibraryState = { version: 1; folders: PhotoFolder[]; media: LibraryMedia[]; memories: Memory[] };
export type MemoryDraft = Omit<Memory, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };
const stateKey = 'pamana.library.v1';
const personalFolder = { id: 'my-memories', name: 'My memories', createdAt: '2026-10-17T00:00:00Z' };
const fileDatabase = 'pamana-media-v1';
export const MAX_MEDIA_BYTES = 50 * 1024 * 1024;
export const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function readLibrary(): LibraryState {
  const raw = localStorage.getItem(stateKey);
  if (raw) {
    const state = JSON.parse(raw) as LibraryState;
    if (state.version !== 1 || !Array.isArray(state.folders) || !Array.isArray(state.media) || !Array.isArray(state.memories)) {
      throw new Error('This photo library cannot be read. Your stored files have been kept.');
    }
    return state;
  }
  // Preserve the original single-entry journal without removing its old keys.
  const title = localStorage.getItem('pamana.privateStory.title');
  const description = localStorage.getItem('pamana.privateStory.body');
  const now = new Date().toISOString();
  return { version: 1, folders: [personalFolder], media: [], memories: title && description ? [{
    id: 'legacy-private-story', title, description, location: '', occurredAt: '', createdAt: now,
    updatedAt: now, mediaIds: [],
  }] : [] };
}

let writeQueue: Promise<unknown> = Promise.resolve();
export function changeLibrary(update: (state: LibraryState) => LibraryState): Promise<LibraryState> {
  const operation = writeQueue.then(async () => {
    const next = update(readLibrary());
    await setStored(stateKey, JSON.stringify(next));
    window.dispatchEvent(new Event('pamana-library-changed'));
    return next;
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}

function openFiles(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(fileDatabase, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onerror = () => reject(new Error('Device media storage is unavailable. Please enable storage and retry.'));
    request.onsuccess = () => resolve(request.result);
  });
}

async function fileTransaction<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openFiles();
  try {
    return await new Promise<T>((resolve, reject) => {
      const tx = db.transaction('files', mode);
      const request = action(tx.objectStore('files'));
      tx.oncomplete = () => resolve(request.result);
      tx.onabort = tx.onerror = () => reject(new Error('There was not enough device storage. Your memory was not saved.'));
    });
  } finally { db.close(); }
}

function base64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('This media file could not be read. Please select it again.'));
    reader.readAsDataURL(blob);
  });
}

async function writeFile(key: string, blob: Blob): Promise<string | undefined> {
  if (Capacitor.isNativePlatform()) {
    const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif', 'image/heic': 'heic', 'image/heif': 'heif', 'video/mp4': 'mp4', 'video/webm': 'webm', 'video/quicktime': 'mov', 'video/3gpp': '3gp', 'video/ogg': 'ogv' } as Record<string, string>)[blob.type] ?? 'bin';
    const path = `memories/${key}.${extension}`;
    await Filesystem.writeFile({ path, directory: Directory.Data, data: await base64(blob), recursive: true });
    return path;
  }
  await fileTransaction('readwrite', store => store.put(blob, key));
  return undefined;
}

async function eraseFile(key: string, path?: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    if (path) {
      try { await Filesystem.deleteFile({ path, directory: Directory.Data }); }
      catch { /* An already missing file needs no further deletion. */ }
    }
  } else { await fileTransaction('readwrite', store => store.delete(key)); }
}

export async function mediaUrl(item: LibraryMedia, thumbnail = false): Promise<string> {
  const path = thumbnail && item.thumbnailPath ? item.thumbnailPath : item.path;
  if (Capacitor.isNativePlatform() && path) {
    const result = await Filesystem.getUri({ path, directory: Directory.Data });
    return Capacitor.convertFileSrc(result.uri);
  }
  const key = thumbnail && item.kind === 'photo' ? `${item.id}-thumb` : item.id;
  const blob = await fileTransaction('readonly', store => store.get(key)) as Blob | undefined;
  if (!blob) throw new Error('This media file is unavailable on this device.');
  return URL.createObjectURL(blob);
}

export function validateMedia(file: File): void {
  if (!/^(image\/(jpeg|png|webp|gif|heic|heif|avif)|video\/(mp4|webm|quicktime|3gpp|ogg))$/.test(file.type)) {
    throw new Error('Choose a supported photo or video (JPG, PNG, WebP, HEIC, AVIF, MP4, WebM, MOV, or 3GP).');
  }
  if (file.size === 0) throw new Error('This file is empty. Please choose another photo or video.');
  if (file.size > MAX_MEDIA_BYTES) throw new Error('Choose a file smaller than 50 MB, or record a shorter video.');
}

async function thumbnail(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || typeof createImageBitmap !== 'function') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 640 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return await new Promise<Blob>(resolve => canvas.toBlob(blob => resolve(blob ?? file), 'image/jpeg', .8));
  } catch { return file; }
}

async function prepareMedia(file: File, folderId: string): Promise<LibraryMedia> {
  validateMedia(file);
  const item: LibraryMedia = {
    id: newId(), title: file.name.replace(/\.[^.]+$/, ''), description: '', kind: file.type.startsWith('image/') ? 'photo' : 'video',
    mime: file.type, fileName: file.name, bytes: file.size, folderIds: [folderId], createdAt: new Date().toISOString(),
  };
  try {
    item.path = await writeFile(item.id, file);
    if (item.kind === 'photo') item.thumbnailPath = await writeFile(`${item.id}-thumb`, await thumbnail(file));
    return item;
  } catch (error) {
    await eraseMediaFiles(item).catch(() => undefined);
    throw error;
  }
}

async function eraseMediaFiles(item: LibraryMedia): Promise<void> {
  await eraseFile(item.id, item.path);
  if (item.kind === 'photo') await eraseFile(`${item.id}-thumb`, item.thumbnailPath);
}

export async function importPhotos(files: File[], folderId: string): Promise<LibraryState> {
  const additions: LibraryMedia[] = [];
  try {
    for (const file of files) {
      if (!file.type.startsWith('image/')) throw new Error('Photo folders accept pictures. Add videos through Kuwento.');
      additions.push(await prepareMedia(file, folderId));
    }
    return await changeLibrary(state => ({ ...state, media: [...state.media, ...additions] }));
  } catch (error) { await Promise.all(additions.map(eraseMediaFiles)); throw error; }
}

export async function saveMemory(draft: MemoryDraft, files: File[] = []): Promise<LibraryState> {
  if (!draft.title.trim() || !draft.description.trim()) throw new Error('Add a title and description before saving.');
  if (draft.occurredAt && Number.isNaN(new Date(draft.occurredAt).getTime())) throw new Error('Choose a valid date and time.');
  const additions: LibraryMedia[] = [];
  try {
    for (const file of files) additions.push(await prepareMedia(file, personalFolder.id));
    return await changeLibrary(state => {
      const existing = state.memories.find(item => item.id === draft.id);
      const now = new Date().toISOString();
      const memory: Memory = { ...draft, id: draft.id ?? newId(), title: draft.title.trim(), description: draft.description.trim(),
        mediaIds: [...draft.mediaIds, ...additions.map(item => item.id)], createdAt: existing?.createdAt ?? now, updatedAt: now };
      return { ...state, media: [...state.media, ...additions], memories: [memory, ...state.memories.filter(item => item.id !== memory.id)] };
    });
  } catch (error) { await Promise.all(additions.map(eraseMediaFiles)); throw error; }
}

export function mediaReferences(state: LibraryState, id: string): Memory[] {
  return state.memories.filter(memory => memory.mediaIds.includes(id));
}

export async function deleteMedia(id: string): Promise<LibraryState> {
  const item = readLibrary().media.find(media => media.id === id);
  const next = await changeLibrary(state => {
    if (mediaReferences(state, id).length) throw new Error('This photo belongs to a memory. Remove it from that memory before deleting the original.');
    return { ...state, media: state.media.filter(media => media.id !== id), folders: state.folders.map(folder => folder.coverId === id ? { ...folder, coverId: undefined } : folder) };
  });
  if (item) await eraseMediaFiles(item);
  return next;
}

export async function clearMediaLibrary(): Promise<void> {
  const state = readLibrary();
  await Promise.all(state.media.map(eraseMediaFiles));
  if (!Capacitor.isNativePlatform()) await fileTransaction('readwrite', store => store.clear());
}

export function localDateTime(date = new Date()): string {
  const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return shifted.toISOString().slice(0, 16);
}
