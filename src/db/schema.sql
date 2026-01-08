/*
====================================================================
 🦴 Skelly Backend — Bootstrap Schema
====================================================================

 Repo: skelly/skelly-backend

 PURPOSE
 -------
 This file is REQUIRED.

 When the Skelly Backend starts, it will execute this schema against
 SQLite to initialize the database.

 If this file is empty or invalid, the backend will fail at runtime.

 This schema is intentionally:
 - Simple
 - Explicit
 - Disposable

 It is designed for:
 - Prototyping
 - Rapid iteration
 - Local-first development

 It is NOT designed for:
 - Migrations
 - Rollbacks
 - Long-lived production databases

 When your data model stabilizes, you are expected to:
 - Introduce migrations, OR
 - Port schemas to another system (Postgres, Supabase, etc.)

 --------------------------------------------------------------------
 HOW TO USE THIS FILE
 --------------------------------------------------------------------
 1. Define your tables here BEFORE running the backend.
 2. Restart the server after making schema changes.
 3. If you change table structures, delete the local SQLite file.

 This friction is intentional.
 It forces clarity over convenience.

====================================================================
*/

/*
--------------------------------------------------------------------
 EXAMPLE TABLE: skelly_meta
--------------------------------------------------------------------
 This table exists purely as a placeholder and reference.

 You should DELETE this table once you add real product tables.

 It demonstrates:
 - Primary keys
 - Required fields
 - Timestamps
--------------------------------------------------------------------
*/

CREATE TABLE IF NOT EXISTS skelly_meta (
  id TEXT PRIMARY KEY,

  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,

  created_at TEXT NOT NULL
);

/*
--------------------------------------------------------------------
 SKELLY RULES ☠️
--------------------------------------------------------------------
 - This schema is the skeleton, not the full body
 - Add only what your product actually needs
 - Delete freely during early development
 - Replace entirely when moving to production data systems

 Remember:
 A clear skeleton makes everything else easier to build.
--------------------------------------------------------------------
*/
