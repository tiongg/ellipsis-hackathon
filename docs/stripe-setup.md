1. Login to stripe
2. Create an account (top left)
3. Search for 'key'
4. Set enviroment secrets

```
STRIPE_SECRET_KEY=<SECRET-KEY-HERE>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<PUBLISHABLE-KEY-HERE>
```

5. Get the stripe cli
6. Login the cli with `stripe login`
7. Start the cli with `npm run stripe:forward-webhook`
8. Set environment secrets

```
STRIPE_SIGNING_SECRET=<SIGNING-SECRET-HERE>
```
