# Fullstack template

Using nx repo and npm

## To run:

First install packages with npm
```bash
npm i
```

To run both FE and BE:
```bash
npm run dev
```

Only BE:
```bash
npx nx run backend:dev
```

Only FE:
```bash
npx nx run frontend:dev
```

## Packages

1. Backend (Nest.js)
2. Frontend (Next.js)
3. Utils

## Other stuff

1. docker-compose (postgres db)
2. Dockerfile (BE)
3. Dockerfile (FE)

## Directory structure

> [!TIP]
> Apps directory is used for stuff that will end up being the final product
> Packages directory is for stuff that apps depends on

```
apps/
  - backend/
  - frontend/

packages/
  - ui/
  - utils/
```
