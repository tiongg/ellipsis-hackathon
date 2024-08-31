# Stripe setup (For handling payments)

1. Login to [stripe](https://dashboard.stripe.com)
2. Create an account (top left), and name it whatever
3. Search for 'API Key' (use the search bar at the top)
4. Set enviroment secrets to:

```
STRIPE_SECRET_KEY=<SECRET-KEY-HERE>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<PUBLISHABLE-KEY-HERE>
```

5. Install the [stripe cli](https://docs.stripe.com/stripe-cli)
6. Login the cli with `stripe login`
7. Start the cli with `npm run stripe:forward-webhook`
8. Set environment secrets:

```
STRIPE_SIGNING_SECRET=<SIGNING-SECRET-HERE>
```

> [!TIP]
> When checking out, use the stripe [test card numbers](https://docs.stripe.com/testing?testing-method=card-numbers#visa) <br /> > `4242424242424242`, with a cvc of any 3 digits and an expiry date in the future
