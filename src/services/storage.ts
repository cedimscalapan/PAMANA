import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

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
  localStorage.setItem(key, value);
  const db = await openNativeDatabase();
  if (db) await db.run(
    'INSERT OR REPLACE INTO app_state (key, value, updated_at) VALUES (?, ?, ?)',
    [key, value, new Date().toISOString()],
  );
}

export async function removeStored(key: string): Promise<void> {
  localStorage.removeItem(key);
  const db = await openNativeDatabase();
  if (db) await db.run('DELETE FROM app_state WHERE key = ?', [key]);
}

export async function clearStoredState(): Promise<void> {
  Object.keys(localStorage)
    .filter((key) => key.startsWith('pamana.'))
    .forEach((key) => localStorage.removeItem(key));
  const db = await openNativeDatabase();
  if (db) {
    await db.execute(`
      DELETE FROM app_state;
      DELETE FROM lesson_progress;
      DELETE FROM writing_practice;
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
