# Ellipsis hackathon

Using nx repo and npm.<br/>
FE uses [Nextjs](https://nextjs.org/), with [Tailwind](https://tailwindcss.com/) as the core styling option. [shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/) used for more commonly used/advanced components.<br/>
BE uses [Nestjs](https://docs.nestjs.com/), running [TypeORM](https://typeorm.io/) as the orm.<br/>
Database is using [postgresql](https://www.postgresql.org/)

Deployed on [fly.io](https://fly.io/), utilising a database from [supabase](https://supabase.com/)

Visit production at: https://ellipsis-aegis.fly.dev/

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

## Settings up enviroment variables

Create a `.env` file at root.

Copy contents of `.env.sample` into the `.env` file.

👉Refer to [google oauth setup](docs/google-oauth-setup.md) to setup stripe (for authentication)
👉Refer to [stripe setup](docs/stripe-setup.md) to setup stripe (for payment)

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

## Seeding mock data

With the project running, run:

```bash
curl http://localhost:2000/admin/seed-mock-data
```

This will seed the stores and products. This only has to be ran once.

```bash
curl http://localhost:2000/admin/seed-listings
```

This will create 10 listings for all products. Run this when products are out of stock.
