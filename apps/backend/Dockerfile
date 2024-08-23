FROM --platform=linux/amd64 node:21.5.0-bookworm-slim as builder
WORKDIR /app

# To allow calls to sudo in postinstall scripts to run
# TODO: look for alternate solution
RUN apt-get update && apt-get install -y sudo

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ENV NX_DAEMON false

# If we want to skip cache.
# RUN npx nx run --skip-nx-cache backend:build:production
RUN npx nx run backend:build:production

RUN node trace.js dist/apps/backend ./traced-deps
# tslib doesn't get installed
# https://github.com/nrwl/nx/issues/2625
#RUN yarn add tslib

FROM node:21.5.0-bookworm-slim as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend
COPY --from=builder --chown=backend:nodejs /app/traced-deps ./
COPY --from=builder --chown=backend:nodejs /app/dist/apps/backend/ ./
USER backend

ENV NODE_ENV production
EXPOSE 2000

CMD [ "node", "./main.js" ]