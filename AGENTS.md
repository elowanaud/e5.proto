# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-05 14:50 CEST
**Commit:** 4b4eb2a
**Branch:** main

## OVERVIEW

`e5.proto` is a compact Next.js prototype template: App Router, React 19,
TypeScript, Better Auth, Drizzle/Postgres, Tailwind CSS 4, shadcn/Base UI, and
Biome. The live source is intentionally small; most repository volume is hidden
agent skill material under `.agents/`.

## STRUCTURE

```text
./
|-- src/app/                  # App Router route groups and API handlers
|-- src/components/layouts/    # App-specific layout components
|-- src/components/ui/         # shadcn/Base UI primitives; see child AGENTS.md
|-- src/db/                    # Drizzle schema and seed script
|-- src/features/auth/login/   # Login form and TanStack form hook
|-- src/lib/                   # Better Auth, Drizzle client, cn() utility
|-- src/proxy.ts               # Auth route guard
|-- .agents/skills/            # Local opencode skills; do not treat as app code
|-- drizzle.config.ts          # Drizzle Kit config
|-- components.json            # shadcn aliases and style preset
`-- biome.json                 # Formatter/linter config; excludes .agents
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| Private app surface | `src/app/(private)/page.tsx` | Authenticated prototype entry. |
| Guest login page | `src/app/(guest)/login/page.tsx` | Imports `LoginForm`; route is guest-allowed in proxy. |
| Better Auth API | `src/app/(public)/api/auth/[...all]/route.ts` | Exports `GET`/`POST` from `toNextJsHandler(auth)`. |
| Auth server config | `src/lib/auth.ts` | Better Auth + Drizzle adapter + `nextCookies()`. |
| Auth client calls | `src/lib/auth-client.ts` | Used by login and sidebar sign-out. |
| Route protection | `src/proxy.ts` | Redirects unauthenticated users to `/login`; redirects logged-in guests to `/`. |
| Database schema | `src/db/schema.ts` | Better Auth tables plus Drizzle relations. |
| Database seed | `src/db/seed.ts` | Uses `drizzle-seed` and `DATABASE_URL`. |
| UI primitives | `src/components/ui/` | Base UI wrappers, cva variants, `data-slot` markers. |
| Private shell | `src/components/layouts/private-sidebar.tsx` | Client sidebar, sign-out toast, French labels. |

## CODE MAP

| Symbol | Type | Location | Role |
| --- | --- | --- | --- |
| `auth` | const | `src/lib/auth.ts` | Better Auth server instance wired to Drizzle/Postgres. |
| `authClient` | const | `src/lib/auth-client.ts` | Browser-side Better Auth client. |
| `db` | const | `src/lib/db.ts` | Drizzle client from expanded dotenv `DATABASE_URL`. |
| `proxy` | function | `src/proxy.ts` | Request-time route guard. |
| `user`, `session`, `account`, `verification` | tables | `src/db/schema.ts` | Better Auth persistence schema. |
| `PrivateSidebar` | component | `src/components/layouts/private-sidebar.tsx` | Main authenticated navigation and sign-out. |
| `LoginForm` | component | `src/features/auth/login/components/form.tsx` | Login UI bound to `useLoginForm()`. |
| `useLoginForm` | hook | `src/features/auth/login/hooks/use-form.ts` | TanStack form validation + Better Auth sign-in. |

## CONVENTIONS

- Use `@/*` imports for source paths; `tsconfig.json` maps `@` to `src`.
- Format/lint with Biome: 2-space indentation, organized imports, Next/React domains enabled.
- `.agents` is intentionally excluded from Biome and from app hierarchy scoring.
- The active database layer is Drizzle/Postgres, not Prisma. Trust `package.json`,
  `drizzle.config.ts`, and `src/db/*` over stale README Prisma references.
- App route groups are semantic: `(guest)`, `(private)`, `(public)`.
- Auth messages in the current login/sidebar flow are French; keep adjacent copy consistent.
- Tailwind CSS 4 tokens live in `src/globals.css`; shadcn aliases live in `components.json`.

## ANTI-PATTERNS (THIS PROJECT)

- Do not edit generated skill `AGENTS.md` files under `.agents/skills/vercel-*` for app docs.
- Do not add Prisma paths, Prisma commands, or `src/generated/prisma` guidance unless the stack changes back.
- Do not treat `README.md` database sections as authoritative until they are updated.
- Do not place auth/data logic in `src/components/ui`; those files are reusable primitives only.
- Do not remove `nextCookies()` from Better Auth without replacing Next cookie integration.

## COMMANDS

```bash
pnpm dev
pnpm build
pnpm start              # runs drizzle-kit push before next start
pnpm typecheck
pnpm code-quality
pnpm code-quality:fix
pnpm db:push
pnpm db:seed
pnpm db:studio
```

## NOTES

- Required env: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`; `.env.example`
  derives `DATABASE_URL` from `DB_*` values for local Docker Postgres.
- `docker-compose.yml` runs Postgres 15 Alpine with `${DB_PORT}:5432`.
- LSP TypeScript server is not installed in this harness; use `pnpm typecheck` for TS validation.
