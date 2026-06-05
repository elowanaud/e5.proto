<div align="center">

<pre>
  ███████╗   ███████╗    ██████╗ ██████╗  ██████╗ ████████╗ ██████╗ 
  ██╔════╝   ██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗
  █████╗     ███████╗    ██████╔╝██████╔╝██║   ██║   ██║   ██║   ██║
  ██╔══╝     ╚════██║    ██╔═══╝ ██╔══██╗██║   ██║   ██║   ██║   ██║
  ███████╗██╗███████║    ██║     ██║  ██║╚██████╔╝   ██║   ╚██████╔╝
  ╚══════╝╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ 
</pre>

  A compact Next.js prototype template with authentication, Postgres, Drizzle, Tailwind CSS, shadcn/Base UI primitives, and Biome already wired together.

  [Features](#features) • [Getting started](#getting-started) • [Scripts](#scripts) • [Project structure](#project-structure)
</div>

## Features

- **Next.js App Router** with React Compiler enabled and semantic route groups for guest, private, and public surfaces.
- **Better Auth email/password** using the Drizzle adapter and Next.js cookie integration.
- **Protected private shell** with a sidebar layout, guest redirects, and sign-out flow.
- **Postgres schema and seed flow** powered by Drizzle ORM, Drizzle Kit, and `drizzle-seed`.
- **Tailwind CSS 4 + shadcn/Base UI** component primitives with Lucide icons and neutral design tokens.
- **Biome quality tooling** for formatting, linting, import organization, and React/Next rules.

## Tech stack

| Area | Tools |
| --- | --- |
| App | Next.js 16, React 19, TypeScript 5 |
| Auth | Better Auth, `@better-auth/drizzle-adapter` |
| Database | PostgreSQL, Drizzle ORM, Drizzle Kit |
| UI | Tailwind CSS 4, shadcn, Base UI, Lucide React, Sonner |
| Forms | TanStack React Form, Zod |
| Quality | Biome 2 |

## Getting started

### Prerequisites

- Node.js 20+
- pnpm
- Docker, if you want to run the local Postgres service

### Duplicate the template

Clone the repository with a shallow history, remove the original Git metadata, and initialize a fresh repository without creating any commit:

```bash
printf "App name: " && read -r app && test -n "$app" && git clone --depth 1 git@github.com:elowanaud/e5.proto.git "$app" && cd "$app" && rm -rf .git && git init && pnpm install && cp .env.example .env && BETTER_AUTH_SECRET="$(openssl rand -base64 32)" perl -0pi -e 's|^BETTER_AUTH_SECRET=.*|BETTER_AUTH_SECRET=$ENV{BETTER_AUTH_SECRET}|m' .env
```

> [!NOTE]
> The command above gives you a clean working tree with no inherited commits. Create your first commit only when your new project is ready.

### Configure the environment

The bootstrap command creates `.env` from `.env.example` and fills `BETTER_AUTH_SECRET`. Review the remaining values for your local setup:

Required variables:

| Variable | Purpose |
| --- | --- |
| `DB_HOST` | Postgres host, usually `127.0.0.1` locally |
| `DB_PORT` | Postgres port, usually `5432` |
| `DB_USER` | Postgres user |
| `DB_PASSWORD` | Postgres password |
| `DB_DATABASE` | Postgres database name |
| `DATABASE_URL` | Expanded Postgres connection string used by Drizzle and the app |
| `BETTER_AUTH_SECRET` | Better Auth secret, for example from `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | App base URL, usually `http://localhost:3000` locally |

### Start the database

The included Compose file starts PostgreSQL 15 Alpine using the `DB_*` values from `.env`:

```bash
docker compose --env-file .env up -d
pnpm db:push
```

Optionally seed the database with local data:

```bash
pnpm db:seed
```

The seed creates a local QA user:

```text
Email: qa@example.com
Password: password
```

### Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated requests are redirected to `/login`; authenticated users can access the private shell at `/`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production app |
| `pnpm start` | Push the Drizzle schema, then start the production server |
| `pnpm typecheck` | Run TypeScript without emitting files |
| `pnpm code-quality` | Run Biome checks |
| `pnpm code-quality:fix` | Run Biome checks with safe fixes |
| `pnpm db:push` | Push the Drizzle schema to Postgres |
| `pnpm db:seed` | Reset and seed the database |
| `pnpm db:studio` | Open Drizzle Studio |

## Project structure

```text
src/
|-- app/                  # App Router route groups and API handlers
|-- components/layouts/   # App-specific layouts, including the private sidebar
|-- components/ui/        # shadcn/Base UI primitives
|-- db/                   # Drizzle schema and seed script
|-- features/auth/login/  # Login form and form hook
|-- hooks/                # Shared React hooks
|-- lib/                  # Better Auth, Drizzle client, and utilities
`-- proxy.ts              # Route protection and auth redirects
```

Key files:

- `src/lib/auth.ts` configures Better Auth with Drizzle/Postgres and `nextCookies()`.
- `src/app/(public)/api/auth/[...all]/route.ts` exposes the Better Auth API handler.
- `src/proxy.ts` redirects guests to `/login` and authenticated visitors away from guest routes.
- `src/db/schema.ts` defines the Better Auth persistence tables and relations.
- `components.json` stores shadcn aliases and Tailwind integration settings.

## Authentication flow

The login page lives at `src/app/(guest)/login/page.tsx` and renders `LoginForm`. The form uses TanStack React Form with Zod validation, then calls `authClient.signIn.email()`.

Protected routes are guarded in `src/proxy.ts`. Public auth API routes are excluded, `/login` remains guest-accessible, and private routes redirect unauthenticated users back to `/login`.

## Troubleshooting

> [!IMPORTANT]
> If database commands fail, confirm Postgres is running and that `DATABASE_URL` expands correctly from the `DB_*` values in `.env`.

> [!TIP]
> If sign-in fails after changing the schema or seed data, run `pnpm db:push` and then `pnpm db:seed` again for a clean local QA account.

## Resources

- [Next.js documentation](https://nextjs.org/docs)
- [Better Auth documentation](https://www.better-auth.com/docs)
- [Drizzle documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [shadcn documentation](https://ui.shadcn.com/docs)
- [Biome documentation](https://biomejs.dev/guides/getting-started/)
