export const DATABASE_NAME = 'smart_pamana.db';
export const DATABASE_VERSION = 1;

/** Phase 1 migration contract for the native Capacitor SQLite adapter. */
export const MIGRATIONS: readonly string[] = [
  `CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS learning_categories (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, sort_order INTEGER NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS lessons (id TEXT PRIMARY KEY NOT NULL, category_id TEXT NOT NULL, title TEXT NOT NULL, summary TEXT NOT NULL, duration_minutes INTEGER NOT NULL, content_json TEXT NOT NULL, source_status TEXT NOT NULL DEFAULT 'awaiting_review', FOREIGN KEY(category_id) REFERENCES learning_categories(id));`,
  `CREATE TABLE IF NOT EXISTS lesson_progress (lesson_id TEXT PRIMARY KEY NOT NULL, completed INTEGER NOT NULL DEFAULT 0, progress REAL NOT NULL DEFAULT 0, updated_at TEXT NOT NULL, FOREIGN KEY(lesson_id) REFERENCES lessons(id));`,
  `CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id);`
];
