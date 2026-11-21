# syntax = docker/dockerfile:1

ARG NODE_VERSION=26.13.1
FROM node:${NODE_VERSION}-trixie-slim AS base

LABEL fly_launch_runtime="NodeJS"

WORKDIR /app
ENV NODE_ENV=production

# Dependencies only; no native modules, so no apt build toolchain.
FROM base AS deps
COPY --link package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

FROM base
COPY --from=deps --chown=1000:1000 /app/node_modules ./node_modules
COPY --link --chown=1000:1000 package.json main.js ./
COPY --link --chown=1000:1000 public ./public

USER node
EXPOSE 8080
CMD [ "node", "main.js" ]
