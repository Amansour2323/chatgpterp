# Stationery E-Commerce Monorepo (Step 1)

This repository is now scaffolded as a Turborepo monorepo with:

- `apps/web`: Next.js 14 storefront (Arabic-first placeholder)
- `apps/admin`: Next.js 14 admin dashboard shell
- `packages/api`: Express + TypeScript API foundation shell
- `packages/database`: Prisma package scaffold
- `packages/shared`: shared constants/utilities package

## Run with Docker

```bash
docker compose up --build
```

## SSL Termination (Nginx)

1. Provision certificates (Let's Encrypt recommended via certbot on host).
2. Mount cert/key into the nginx container (for example `/etc/nginx/ssl/fullchain.pem` and `/etc/nginx/ssl/privkey.pem`).
3. Add an HTTPS server block listening on `443 ssl` and redirect `80 -> 443`.
4. Update `proxy_set_header X-Forwarded-Proto https;` to preserve secure origin.

## Notes

- This commit intentionally implements **execution order step 1 (monorepo setup + docker baseline)**.
- Step 2 onward should build the production schema and full feature modules.
