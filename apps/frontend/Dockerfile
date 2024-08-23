# syntax=docker/dockerfile:1

FROM node:20.13.1-alpine3.19@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa289f71f37ea08e23 as build
WORKDIR /app
# To allow calls to sudo in postinstall scripts to run, look for alternate solution
RUN apk add sudo
ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_TELEMETRY_DISABLED 1
ENV NX_DAEMON false
COPY . .
RUN npm ci
# This extra installation step is needed to install the correct set of swc for the docker environment
RUN npm install -D @swc/cli @swc/core
ENV NODE_ENV production
RUN npx nx run frontend:build:production

FROM node:20.13.1-alpine3.19@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa289f71f37ea08e23 as runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# TODO: The standalone output paths from nextjs are wrong so we have to move them all to the right locations
# Should be changed back to only copy ./.next/standalone, ./.next/static and ./public when it is fixed
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/frontend/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/frontend/.next/standalone/dist/apps/frontend/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/frontend/.next/standalone/apps/frontend/server.js ./server.js
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/frontend/public ./public
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/frontend/.next/static ./.next/static
# nextjs generates the wrong distDir path in server.js so we need to replace `./../../dist/packages/frontend/.next` with `./.next`
RUN sed -i 's,./../../dist/apps/frontend,.,g' ./server.js

USER nextjs

# For some reason, port 80 does not work in fly.io when using nextjs
# If you change this, remember to change fly's .toml files' internal_port setting to match
EXPOSE 3000
ENV PORT 3000

CMD [ "node", "server.js" ]
