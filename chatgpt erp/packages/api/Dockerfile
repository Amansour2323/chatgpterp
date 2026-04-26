FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm --filter @packages/api build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/packages/api/dist ./packages/api/dist
COPY --from=build /app/packages/api/package.json ./packages/api/package.json
EXPOSE 4000
CMD ["node", "packages/api/dist/server.js"]
