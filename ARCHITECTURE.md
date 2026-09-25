# Architecture

How this backend is put together, and the reasoning behind the parts that are not obvious.

---

## The shape

```
src/
├─ server.ts       Bun.serve on :3001; CORS; routes /trpc/* into tRPC
├─ trpc.ts         initTRPC; exports router + publicProcedure; the context
├─ appRouter.ts    root router; exports `type AppRouter`
├─ routes/
│  └─ healthCheck.ts   one example procedure
└─ db/
   ├─ client.ts    opens SQLite, applies the schema at boot
   └─ schema.sql   REQUIRED; your tables
```

Procedures are grouped per file in `routes/` and mounted in `appRouter.ts`. That is the only
composition rule.

---

## Boot order, and why it fails closed

`src/db/client.ts` runs first: it opens `skelly.db`, sets its PRAGMAs, reads `schema.sql` and
executes it in full. If the schema is invalid the import throws and the server never binds a
port.

That is deliberate. A backend serving requests against half a schema is worse than a backend
that refuses to start, because the first failure surfaces at 3am in production rather than at
boot on your laptop.

Both paths resolve from `process.cwd()`, which is why the server only runs from the repository
root. Because tables use `CREATE TABLE IF NOT EXISTS`, *adding* one needs only a restart —
you do not need to delete the database file. Changing an existing column does.

---

## The empty context

`createContext` returns `{}`, and routes that need the database import `db` from
`src/db/client.ts` directly rather than reading it off `ctx`.

This looks like a missing feature. It is load-bearing. The context is part of the `AppRouter`
type, and `skelly-portal` imports that type into a browser application. Put a `bun:sqlite`
`Database` in the context and its type leaks into the emitted contract, which then drags Bun's
runtime types into a browser app's typecheck. That is exactly the coupling this template used
to have, and removing it is what made the portal build standalone.

Put request-scoped data in the context when you have some — a session, a user id. Never a
runtime handle.

---

## The contract

`bun run types:emit` writes the `AppRouter` type to `dist/types/appRouter.d.ts`. It is the
public surface of this repository: `skelly-portal` copies that one file in and types itself
against it, rather than importing this source tree.

The emit **refuses to write** a contract that references `bun:` or `node:` modules, or that
spills across more than one file. Both would break a standalone frontend build, so the guard
turns a subtle downstream failure into a loud local one. It runs as part of `bun run build`.

---

## What this template is not

There is no auth, no migration system, no logging, no rate limiting. Those are decisions with
real trade-offs and they belong to your product, not to a skeleton. The point of this
repository is that you can read all of it in a few minutes and then own it.
