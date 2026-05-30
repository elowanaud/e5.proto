# e5.proto

<div align="center">

**A Next.js template for shipping AI-assisted prototypes quickly.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?style=flat-square&logo=prisma)
![Better Auth](https://img.shields.io/badge/Auth-Better%20Auth-111827?style=flat-square)

[Overview](#overview) • [Features](#features) • [Getting started](#getting-started) • [Project structure](#project-structure) • [Scripts](#scripts)

</div>

## Overview

`e5.proto` is a starter repository for building prototypes with AI in the loop. It gives you a modern Next.js application foundation with authentication, database access, routing guards, UI primitives, and code-quality tooling already wired so you can focus on the experiment instead of the setup.

Use it when you want to quickly turn an idea into a working product surface, internal tool, agent dashboard, or AI-enabled web app.

> [!NOTE]
> This template does not prescribe a specific AI provider or SDK. Add the model layer that fits your prototype, then build on top of the existing app, auth, database, and UI foundation.

## Features

- **Next.js App Router** with React 19, TypeScript, and the React Compiler enabled.
- **Better Auth** configured with email/password authentication and Next.js cookie support.
- **Prisma + PostgreSQL** with generated client output under `src/generated/prisma`.
- **Protected routes** through `src/proxy.ts`, with `/login` kept available for guests.
- **Ready-to-compose UI kit** using shadcn configuration, Base UI primitives, Tailwind CSS 4, Lucide icons, Sonner, charts, drawers, dialogs, forms, tables, and more.
- **Code quality baseline** with Biome formatting, linting, import organization, and recommended React/Next rules.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [pnpm](https://pnpm.io/)
- A PostgreSQL database created with [`create-db`](https://www.npmjs.com/package/create-db)

### 1. Configure environment variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

Create a Postgres database and copy the generated connection string:

```bash
pnpm dlx create-db
```

Then fill in:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
BETTER_AUTH_SECRET="<generated-secret>"
BETTER_AUTH_URL="http://localhost:3000"
```

Generate a Better Auth secret with:

```bash
openssl rand -base64 32
```

> [!IMPORTANT]
> `pnpm install` runs Prisma migration deployment and client generation in `postinstall`, so configure `DATABASE_URL` before installing dependencies.

### 2. Install dependencies and apply migrations

```bash
pnpm install
```

This also runs `prisma migrate deploy` and `prisma generate` through the `postinstall` script.

### 3. Start the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building your prototype

Start from the intentionally small app surface:

- Replace `src/app/(private)/page.tsx` with your authenticated prototype experience.
- Implement the login UI in `src/app/(guest)/login/page.tsx` using `authClient` from `src/lib/auth-client.ts`.
- Add domain models to `prisma/schema.prisma`, then run `pnpm prisma migrate dev`.
- Add AI provider clients, prompts, tools, or agent workflows under `src/lib` and keep route handlers under `src/app`.
- Compose interface quickly from the components in `src/components/ui`.

## Project structure

```text
src/
  app/
    (guest)/login/          Guest-only login route
    (private)/              Authenticated app routes
    (public)/api/auth/      Better Auth route handler
    layout.tsx              Root layout and providers
  components/ui/            Reusable UI primitives
  hooks/                    Shared React hooks
  lib/
    auth.ts                 Better Auth server configuration
    auth-client.ts          Better Auth React client
    prisma.ts               Prisma client singleton
    utils.ts                Shared utilities
  proxy.ts                  Route protection logic
prisma/
  schema.prisma             Database schema
  migrations/               Versioned database migrations
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm build` | Build the production app. |
| `pnpm start` | Start the production server after building. |
| `pnpm code-quality` | Run Biome checks. |
| `pnpm code-quality:fix` | Run Biome checks and apply safe fixes. |
| `pnpm prisma migrate dev` | Apply local schema changes and generate Prisma artifacts. |
| `pnpm prisma generate` | Regenerate the Prisma client after schema changes. |
| `pnpm prisma studio` | Open Prisma Studio for local database inspection. |

## Resources

- [Next.js documentation](https://nextjs.org/docs)
- [Better Auth documentation](https://www.better-auth.com/docs)
- [Prisma documentation](https://www.prisma.io/docs)
- [shadcn documentation](https://ui.shadcn.com/docs)
- [Base UI documentation](https://base-ui.com/react/overview/quick-start)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)

## Troubleshooting

If installation fails during Prisma commands, confirm that `DATABASE_URL` is present and points to a reachable PostgreSQL database.

If authentication callbacks or cookies behave unexpectedly, verify that `BETTER_AUTH_URL` matches the URL where the app is running.
