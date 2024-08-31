# Ellipsis Techseries 2024 hackathon

## Description

Food waste is a significant issue in Singapore, with restaurants discarding a large amount of edible food due to overproduction or lack of awareness of their wasteful habits. This contributes to environmental degradation, waste generation and financial losses for restaurants.

Our solution?

A Web application that helps restaurants reduce food waste and generate additional revenue by:

- Selling surplus food through discounted listings.
- Providing "food waste" analytics to optimize food preparation.
- Predicting demand through machine learning for accurate inventory management.

## Unique selling points

- Real-time surplus listings: Restaurants can list food close to closing, minimizing waste.
- Restaurants do not have to manually remove or close the listing as once the maximum number of orders for a particular item has hit, we would close the listing for them
- Machine learning for demand forecasting: Reduces overproduction and food waste.
- Menu optimization: Helps restaurants adjust menus based on waste patterns.

## Impact

- Reduces food waste in restaurants by reducing the amount produced and re-distributing food that is still good to eat
- Increases restaurant profits through additional sales and reduced waste.
- Provides valuable customer insights for better menu planning.
- Produces clear KPIs for restaurants to track their sustainable habits

## Future additions

- Personalized meal recommendations for customers based on their preferences and past orders.
- A "punishment system" to discourage order cancellations/no-shows.
- Collaborate with delivery services and multi-outlet chains

## Tech stack

Using [nx](https://nx.dev/) mono repo and [npm](https://www.npmjs.com/) as the package manager.<br/>
FE uses [Nextjs](https://nextjs.org/), with [Tailwind](https://tailwindcss.com/) as the core styling option. [shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/) are used for more commonly used/advanced components.<br/>
BE uses [Nestjs](https://docs.nestjs.com/), running [TypeORM](https://typeorm.io/) as the orm.<br/>
Database is using [postgresql](https://www.postgresql.org/)

Deployed on [fly.io](https://fly.io/), utilising a database from [supabase](https://supabase.com/)

Visit production at: https://ellipsis-aegis.fly.dev/

## Documentation

Most documentation can be found under the `/docs` folder in the repository

**Additional documents:**

Database diagram: https://dbdiagram.io/d/Ellipsis-hackathon-66cef820cf8e2d1d1c1a5079<br/>
Figma: https://www.figma.com/design/KJpklTRpbk0JANqWo65qqG/Ellipsis-hackathon<br/>
Commit style: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716<br/>

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

👉Refer to [google oauth setup](docs/google-oauth-setup.md) to setup stripe (for authentication)<br/>
👉Refer to [stripe setup](docs/stripe-setup.md) to setup stripe (for payment)

## Initalizing the data

The database provided is initally empty (i.e no tables). As such, we will have to initalize it.

```node
npm run db:run-migrations
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
