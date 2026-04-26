FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm --filter @apps/admin build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/admin/.next ./apps/admin/.next
COPY --from=build /app/apps/admin/package.json ./apps/admin/package.json
EXPOSE 3001
CMD ["node", "apps/admin/node_modules/next/dist/bin/next", "start", "-p", "3001", "apps/admin"]
