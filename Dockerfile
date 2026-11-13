FROM node:24-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# --ignore-scripts: иначе prepare запускает husky, которого нет в prod-зависимостях
FROM base AS prod-deps
RUN npm ci --omit=dev --ignore-scripts

FROM base AS build
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
