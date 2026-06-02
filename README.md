a Task Management App

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Task
  - create
  - delete
  - read
- Project
  - create
  - read
- Create and toggle task in optimistic for better UX
- Auth with BetterAuth
- default filters
  - today
  - inbox
  - upcoming
- task done collapsible

## Tools

- better-auth for authentication
- zod for validation layer
- tanstack-query for fetch states and cache layer
- nextjs for framework
- shadcn for ready-use components
