# UI PRIMITIVES KNOWLEDGE BASE

**Scope:** `src/components/ui/*`

## OVERVIEW

Reusable shadcn/Base UI primitive wrappers. Keep these files framework-light,
variant-driven, and free of app-specific auth, routing, or database behavior.

## WHERE TO LOOK

| Need | File pattern | Notes |
| --- | --- | --- |
| Base primitive wrappers | `*.tsx` importing `@base-ui/react/*` | Preserve primitive prop types. |
| Variant APIs | files with `cva(...)` | Export variant helper when consumers need it. |
| Slot markers | `data-slot="..."` | Used throughout for styling and composition selectors. |
| Render prop plumbing | `badge.tsx`, `breadcrumb.tsx`, `item.tsx`, `sidebar.tsx` | Uses Base UI `useRender` + `mergeProps`. |
| Complex primitive | `sidebar.tsx` | Largest component; owns sidebar cookie and keyboard shortcut. |
| Global tokens | `../../globals.css` | Tailwind 4 theme variables, neutral palette, sidebar tokens. |

## CONVENTIONS

- Client-only primitives start with exact `"use client"`; static wrappers omit it.
- Imports use `@/components/ui/*`, `@/hooks/*`, and `@/lib/utils` aliases.
- Use `cn(...)` for class merging and keep caller `className` last in merge order.
- Use `cva` plus `VariantProps` for reusable variant surfaces.
- Preserve `data-slot` names when editing; many selectors depend on them.
- Base UI wrappers should pass through primitive props rather than inventing app props.
- `biome-ignore ...: shadcn` comments are accepted for generated primitive patterns only.
- Icons come from `lucide-react`; default SVG sizing is usually enforced in wrapper classes.

## ANTI-PATTERNS

- Do not add auth, database, route, or feature-specific state here.
- Do not remove `data-slot` markers during cleanup.
- Do not replace Base UI primitives with raw elements unless the file already does so.
- Do not add barrel exports; consumers import concrete files through the `@/components/ui` alias.
- Do not use this directory for app layouts; app-specific shells belong in `src/components/layouts`.

## NOTES

- `sidebar.tsx` intentionally writes `sidebar_state` to `document.cookie` and carries a shadcn Biome waiver.
- `field.tsx`, `input-group.tsx`, and similar form primitives use structural selectors heavily.
- `direction.tsx` re-exports Base UI direction provider and is client-only.
