import Database from 'better-sqlite3'

const db = new Database('dev.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

const count = db.prepare('SELECT COUNT(*) as total FROM messages').get() as { total: number }

if (count.total === 0) {
  db.prepare('INSERT INTO messages (content) VALUES (?)').run('Hono + SQLite backend is ready.')
}

export type MessageRow = {
  id: number
  content: string
  created_at: string
}

export function listMessages() {
  return db
    .prepare('SELECT id, content, created_at FROM messages ORDER BY id DESC')
    .all() as MessageRow[]
}

export function createMessage(content: string) {
  const result = db.prepare('INSERT INTO messages (content) VALUES (?)').run(content)

  return db
    .prepare('SELECT id, content, created_at FROM messages WHERE id = ?')
    .get(result.lastInsertRowid) as MessageRow
}
