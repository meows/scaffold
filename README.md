# Test

An integration of Elysia, Lucia, TanStack Query.

- https://elysiajs.com/life-cycle/overview.html

## Dependencies

- [Bun]

## Installation

Copy environment variables and populate if necessary.
```bash
cp .env.example .env
```

Install JS dependencies.
```bash
bun i
```

Set the schema of the database.
```bash
bun push
```

Seed database with initial data.
```bash
bun seed
```

## Development

Launch the dev server.
```bash
bun dev
```

Launch the DB viewer (optional).
```bash
bun studio
```

[Bun]: https://bun.sh
