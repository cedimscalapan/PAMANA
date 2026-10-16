import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export type StrokePoint = { x: number; y: number };
export type WritingStroke = StrokePoint[];
export type PracticeType = 'Character' | 'Word' | 'Tracing' | 'Freehand';

export type WritingRecord = {
  id: string;
  label: string;
  originalText: string;
  hanunooText: string;
  practiceType: PracticeType;
  strokes: WritingStroke[];
  imageDataUrl: string;
  thumbnailDataUrl: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
  thumbnailPath?: string;
};

export type NewWritingRecord = Omit<WritingRecord, 'id' | 'createdAt' | 'updatedAt' | 'imagePath' | 'thumbnailPath'>;

const databaseName = 'smart_pamana';
const sqlite = new SQLiteConnection(CapacitorSQLite);
let database: SQLiteDBConnection | undefined;
let initialization: Promise<void> | undefined;

const schema = `
  CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS lesson_progress (
    lesson_id TEXT PRIMARY KEY NOT NULL,
    status TEXT NOT NULL,
    completed_at TEXT
  );
  CREATE TABLE IF NOT EXISTS writing_practice (
    id INTEGER PRIMARY KEY NOT NULL,
    script TEXT NOT NULL,
    status TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS writing_records (
    id TEXT PRIMARY KEY NOT NULL,
    label TEXT NOT NULL,
    original_text TEXT NOT NULL,
    hanunoo_text TEXT NOT NULL,
    practice_type TEXT NOT NULL,
    strokes_json TEXT NOT NULL,
    image_path TEXT,
    thumbnail_path TEXT,
    image_data TEXT,
    thumbnail_data TEXT,
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS quest_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    attempted_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS collection_items (
    item_id TEXT PRIMARY KEY NOT NULL,
    collected_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS private_stories (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`;

const isNative = () => Capacitor.isNativePlatform();
const browserWritingKey = 'pamana.writing.records.v2';

const makeRecordId = () => typeof crypto.randomUUID === 'function'
  ? crypto.randomUUID()
  : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const dataUrlPayload = (dataUrl: string) => dataUrl.includes(',') ? dataUrl.slice(dataUrl.indexOf(',') + 1) : dataUrl;

async function writePrivateImage(path: string, dataUrl: string): Promise<string | undefined> {
  if (!isNative()) return undefined;
  try {
    await Filesystem.writeFile({
      path,
      data: dataUrlPayload(dataUrl),
      directory: Directory.Data,
      recursive: true,
    });
    return path;
  } catch (error) {
    console.warn('Could not write a private practice image; SQLite fallback will be used.', error);
    return undefined;
  }
}

async function readPrivateImage(path?: string, fallback = ''): Promise<string> {
  if (!path || !isNative()) return fallback;
  try {
    const result = await Filesystem.readFile({ path, directory: Directory.Data });
    return typeof result.data === 'string' ? `data:image/png;base64,${result.data}` : fallback;
  } catch (error) {
    console.warn('Could not read a private practice image.', error);
    return fallback;
  }
}

async function deletePrivateImage(path?: string): Promise<void> {
  if (!path || !isNative()) return;
  try {
    await Filesystem.deleteFile({ path, directory: Directory.Data });
  } catch {
    // Missing files are already in the desired state.
  }
}

function readBrowserWritingRecords(): WritingRecord[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(browserWritingKey) ?? '[]');
    return Array.isArray(parsed) ? parsed as WritingRecord[] : [];
  } catch {
    return [];
  }
}

function writeBrowserWritingRecords(records: WritingRecord[]): void {
  localStorage.setItem(browserWritingKey, JSON.stringify(records));
}

async function openNativeDatabase(): Promise<SQLiteDBConnection | undefined> {
  if (!isNative()) return undefined;
  if (database) return database;
  database = await sqlite.createConnection(databaseName, false, 'no-encryption', 1, false);
  await database.open();
  await database.execute(schema);
  return database;
}

async function readRows(db: SQLiteDBConnection) {
  const result = await db.query('SELECT key, value FROM app_state');
  return (result.values ?? []) as Array<{ key: string; value: string }>;
}

/**
 * Opens the native database when running inside Capacitor and mirrors its
 * state into localStorage so the browser preview remains usable offline.
 * Existing browser state is migrated into SQLite on first native launch.
 */
export function initializeStorage(): Promise<void> {
  if (!initialization) {
    initialization = (async () => {
      const db = await openNativeDatabase();
      if (!db) return;

      const rows = await readRows(db);
      const nativeState = new Map(rows.map((row) => [row.key, row.value]));
      const browserKeys = Object.keys(localStorage).filter((key) => key.startsWith('pamana.'));

      for (const [key, value] of nativeState) {
        localStorage.setItem(key, value);
      }
      for (const key of browserKeys) {
        if (!nativeState.has(key)) {
          const value = localStorage.getItem(key);
          if (value !== null) await db.run(
            'INSERT OR REPLACE INTO app_state (key, value, updated_at) VALUES (?, ?, ?)',
            [key, value, new Date().toISOString()],
          );
        }
      }
    })().catch((error) => {
      // A browser preview or an older installed build may not expose the
      // native plugin. LocalStorage remains a safe offline fallback.
      console.warn('SQLite unavailable; using device web storage fallback.', error);
    });
  }
  return initialization;
}

export async function setStored(key: string, value: string): Promise<void> {
  const db = await openNativeDatabase();
  if (db) await db.run(
    'INSERT OR REPLACE INTO app_state (key, value, updated_at) VALUES (?, ?, ?)',
    [key, value, new Date().toISOString()],
  );
  localStorage.setItem(key, value);
}

export async function removeStored(key: string): Promise<void> {
  localStorage.removeItem(key);
  const db = await openNativeDatabase();
  if (db) await db.run('DELETE FROM app_state WHERE key = ?', [key]);
}

export async function saveWritingRecord(input: NewWritingRecord): Promise<WritingRecord> {
  const id = makeRecordId();
  const timestamp = new Date().toISOString();
  const imagePath = await writePrivateImage(`writing/${id}.png`, input.imageDataUrl);
  const thumbnailPath = await writePrivateImage(`writing/${id}-thumb.png`, input.thumbnailDataUrl);
  const record: WritingRecord = { ...input, id, createdAt: timestamp, updatedAt: timestamp, imagePath, thumbnailPath };
  const db = await openNativeDatabase();

  if (db) {
    await db.run(
      `INSERT INTO writing_records (
        id, label, original_text, hanunoo_text, practice_type, strokes_json,
        image_path, thumbnail_path, image_data, thumbnail_data, note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        record.label,
        record.originalText,
        record.hanunooText,
        record.practiceType,
        JSON.stringify(record.strokes),
        imagePath ?? null,
        thumbnailPath ?? null,
        imagePath ? null : record.imageDataUrl,
        thumbnailPath ? null : record.thumbnailDataUrl,
        record.note,
        timestamp,
        timestamp,
      ],
    );
  } else {
    writeBrowserWritingRecords([record, ...readBrowserWritingRecords()]);
  }

  return record;
}

type WritingRow = {
  id: string;
  label: string;
  original_text: string;
  hanunoo_text: string;
  practice_type: PracticeType;
  strokes_json: string;
  image_path?: string;
  thumbnail_path?: string;
  image_data?: string;
  thumbnail_data?: string;
  note: string;
  created_at: string;
  updated_at: string;
};

export async function listWritingRecords(): Promise<WritingRecord[]> {
  const db = await openNativeDatabase();
  if (!db) return readBrowserWritingRecords().sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const result = await db.query('SELECT * FROM writing_records ORDER BY created_at DESC');
  const rows = (result.values ?? []) as WritingRow[];
  return Promise.all(rows.map(async (row) => ({
    id: row.id,
    label: row.label,
    originalText: row.original_text,
    hanunooText: row.hanunoo_text,
    practiceType: row.practice_type,
    strokes: JSON.parse(row.strokes_json) as WritingStroke[],
    imageDataUrl: await readPrivateImage(row.image_path, row.image_data ?? ''),
    thumbnailDataUrl: await readPrivateImage(row.thumbnail_path, row.thumbnail_data ?? ''),
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    imagePath: row.image_path,
    thumbnailPath: row.thumbnail_path,
  })));
}

export async function renameWritingRecord(id: string, label: string): Promise<void> {
  const cleanLabel = label.trim();
  if (!cleanLabel) return;
  const timestamp = new Date().toISOString();
  const db = await openNativeDatabase();
  if (db) {
    await db.run('UPDATE writing_records SET label = ?, updated_at = ? WHERE id = ?', [cleanLabel, timestamp, id]);
    return;
  }
  writeBrowserWritingRecords(readBrowserWritingRecords().map((record) => (
    record.id === id ? { ...record, label: cleanLabel, updatedAt: timestamp } : record
  )));
}

export async function deleteWritingRecord(id: string): Promise<void> {
  const db = await openNativeDatabase();
  if (db) {
    const result = await db.query('SELECT image_path, thumbnail_path FROM writing_records WHERE id = ?', [id]);
    const paths = (result.values?.[0] ?? {}) as { image_path?: string; thumbnail_path?: string };
    await deletePrivateImage(paths.image_path);
    await deletePrivateImage(paths.thumbnail_path);
    await db.run('DELETE FROM writing_records WHERE id = ?', [id]);
    return;
  }
  writeBrowserWritingRecords(readBrowserWritingRecords().filter((record) => record.id !== id));
}

/** Opens the native Android share sheet with an exported PNG copy. */
export async function exportWritingImage(record: WritingRecord): Promise<boolean> {
  if (!isNative() || !record.imageDataUrl) return false;
  const safeName = record.label.toLocaleLowerCase('fil-PH').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const path = `sulat-pamana-${safeName || record.id}.png`;
  await Filesystem.writeFile({
    path,
    data: dataUrlPayload(record.imageDataUrl),
    directory: Directory.Cache,
  });
  const file = await Filesystem.getUri({ path, directory: Directory.Cache });
  await Share.share({
    title: `Sulat Pamana — ${record.label}`,
    text: 'Offline handwriting practice exported from SMART PAMANA.',
    url: file.uri,
    dialogTitle: 'Export writing image',
  });
  return true;
}

export async function clearStoredState(): Promise<void> {
  const { clearMediaLibrary } = await import('./library');
  await clearMediaLibrary();
  Object.keys(localStorage)
    .filter((key) => key.startsWith('pamana.'))
    .forEach((key) => localStorage.removeItem(key));
  const db = await openNativeDatabase();
  if (db) {
    const imageRows = await db.query('SELECT image_path, thumbnail_path FROM writing_records');
    for (const row of (imageRows.values ?? []) as Array<{ image_path?: string; thumbnail_path?: string }>) {
      await deletePrivateImage(row.image_path);
      await deletePrivateImage(row.thumbnail_path);
    }
    await db.execute(`
      DELETE FROM app_state;
      DELETE FROM lesson_progress;
      DELETE FROM writing_practice;
      DELETE FROM writing_records;
      DELETE FROM quest_attempts;
      DELETE FROM collection_items;
      DELETE FROM private_stories;
    `);
  }
}

export const storageInfo = {
  nativeDatabase: isNative(),
  databaseName,
};
