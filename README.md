# Ellipsis hackathon

Using nx repo and npm.
FE uses [Nextjs](https://nextjs.org/), with [Tailwind](https://tailwindcss.com/) as the core styling option. [shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/) used for more commonly used/advanced components.
BE uses [Nestjs](https://docs.nestjs.com/), running [TypeORM](https://typeorm.io/) as the orm.
Database is using [postgresql](https://www.postgresql.org/)

Deployed on [fly.io](https://fly.io/), utilising a database from [supabase](https://supabase.com/)

## Setting up:

Project is running on node **v21.5.0**. Either install it manually, or use [nvm](https://github.com/nvm-sh/nvm), and installing the release with:

```bash
nvm use
```

Next, install packages with npm

```bash
npm i
```

## Starting up the database

Ensure docker compose is installed.

Start database container with:

```bash
docker compose up -d
```

## Running the project

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

## Packages structure

1. Backend (Nest.js)
2. Frontend (Next.js)
3. Utils

## Other stuff included

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
