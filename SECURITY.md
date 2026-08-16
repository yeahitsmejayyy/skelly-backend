# Security Policy

Skelly Backend is a **local-first skeleton**, not a hardened service.

It is small enough that you can read all of it in a few minutes - and you
should. Everything below is checkable against the source.

---

## Supported Versions

Only `main` is supported. There are no releases, tags, or backports.

---

## What It Touches

On boot (`src/db/client.ts`):

* Reads `src/db/schema.sql`, resolved from `process.cwd()`
* Creates/opens `skelly.db` in `process.cwd()`, with `create` and `readwrite`
* Executes that schema file **in full**, as SQL, without inspecting it

At runtime (`src/server.ts`):

* Binds `http://localhost:3001`
* Serves tRPC at `/trpc`
* Sends `Access-Control-Allow-Origin: http://localhost:5173` on every response

That is the whole footprint. Two files, one port.

---

## What It Never Touches

* No files outside `schema.sql` and `skelly.db`
* No outbound network requests, telemetry, or analytics
* No shell commands, no `child_process`
* No credentials, secrets, or environment reads (`src/env.ts` is empty)

---

## Verify It Yourself

```bash
grep -rn "readFileSync\|writeFile\|Database(" src/   # every file touch
grep -rn "fetch(\|child_process\|process.env" src/   # every escape hatch
```

The first shows the two paths above. The second shows the tRPC fetch handler
and nothing else.

---

## Known By Design

These are not vulnerabilities. They are the skeleton being a skeleton:

* No authentication or authorization
* No rate limiting
* No TLS - plain HTTP on localhost
* `schema.sql` is executed as trusted input; do not point it at a file you
  did not write
* No migrations, so schema changes mean deleting the database file

If you ship this beyond localhost, that is your review to do. Add auth,
lock down CORS, and put a real database behind it first.

---

## Reporting

Open an issue: <https://github.com/yeahitsmejayyy/skelly-backend/issues>

If it is a vulnerability, **say so in the title** and leave the details out
until there is a private channel to share them in.
