'use client';

import { GetPaymentInfoDto } from '@shared-types/features/payment/get-payment-info.dto';
import _ from 'lodash';
import Link from 'next/link';
import useSWR from 'swr';

import FullScreenCenter from '@frontend/components/FullScreenCenter';
import { Button } from '@components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/card';

export default function CheckoutSuccessPage({
  params: { paymentId },
}: {
  params: { paymentId: string };
}) {
  //This can be ssr
  const { data, isLoading } = useSWR<GetPaymentInfoDto>(
    `/api/payment/${paymentId}`
  );

  if (isLoading || !data) {
    return <FullScreenCenter>Loading...</FullScreenCenter>;
  }

  if (data.orders.length <= 0) {
    return (
      <FullScreenCenter>
        Something went wrong
        <Button asChild>
          <Link href="/home">Home</Link>
        </Button>
      </FullScreenCenter>
    );
  }

  //You already know what it is!!!!
  const groupedOrders = _.groupBy(
    data.orders,
    data.orders[0].listing.product.productId
  );

  return (
    <FullScreenCenter>
      <Card className="max-w-[250px] m-auto">
        <CardHeader>
          <CardTitle>Order success!</CardTitle>
          <CardDescription>Order summary</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedOrders).map(([productId, orders]) => (
            <div key={productId}>
              <p>
                {orders[0].listing.product.productName}: {orders.length}x
              </p>
            </div>
          ))}
          <Button className="mt-4" asChild>
            <Link href="/home">Home</Link>
          </Button>
        </CardContent>
      </Card>
    </FullScreenCenter>
  );
}
