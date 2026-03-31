# Fullstack Monorepo

## Apps

- `apps/frontend`: React + Vite + shadcn/ui + Lucide
- `apps/backend`: Hono + SQLite

## Package Management

- `Rush` manages the monorepo
- `pnpm` is used by Rush as the underlying package manager

## Commands

- `rush install`: install dependencies for the repo
- `rush dev`: run frontend and backend together
- `rush build`: build all projects
- `rush typecheck`: run TypeScript checks for all projects
