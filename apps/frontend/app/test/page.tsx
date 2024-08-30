'use client';

import axios from 'axios';

import { Button } from '@components/button';

async function createCheckoutSesssion() {
  const res = await axios.post('/api/payment/checkout-session');
  const checkoutUrl = res.data.url;
  window.location = checkoutUrl;
}

export default function TestPage() {
  return (
    <main className="h-screen">
      <Button
        onClick={() => {
          createCheckoutSesssion();
        }}
      >
        Checkout
      </Button>
    </main>
  );
}
