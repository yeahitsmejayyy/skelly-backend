import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dbPath = join(process.cwd(), "skelly.db");

console.log('🦴 @skelly/backend');
// console.log("🗄️  Initializing SQLite database...");
// console.log("📁 DB path:", dbPath);

const db = new Database(dbPath, { create: true, readwrite: true });


/**
 * SQLite PRAGMAs
 * Predictable, beginner-friendly defaults.
 */
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = DELETE;
`);

// Load and apply schema
const schemaPath = join(process.cwd(), "src/db/schema.sql");
const schema = readFileSync(schemaPath, "utf-8");

db.exec(schema);

console.log("✅ Database ready");

export { db };
