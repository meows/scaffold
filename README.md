# Test

An integration of Elysia, Lucia, TanStack Query.

- https://elysiajs.com/life-cycle/overview.html

## Dependencies

- [Bun]
- [Caddy]

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

> ![TIP]
> You can repeatedly run the `bun seed` command to idempotently reset the database.

## Development

Launch the Next server.
```bash
bun dev
```

Launch the API server.
```bash
bun server
```

Launch the application gateway.
```bash
bun gateway
```

Launch the DB viewer (optional).
```bash
bun studio
```

[Bun]: https://bun.sh/docs/installation
[Caddy]: https://caddyserver.com/docs/install
