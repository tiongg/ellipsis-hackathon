'use client';

import { OpenShopDto } from '@shared-types/features/listing/open-shop.dto';
import { GetProductsDto } from '@shared-types/features/products/get-products.dto';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useImmer } from 'use-immer';

import { Button } from '@components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@components/dialog';
import { Input } from '@components/input';
import { Label } from '@components/label';

type OpenShopProps = {
  storeId: string;
};

async function openShop(data: OpenShopDto) {
  const res = await axios.post(`/api/listing/open`, data);
  mutate(`/api/listings`);
  return res.data;
}

/**
 * Opens shop. Has a dialog to input product quantity
 */
export default function OpenShop({ storeId }: OpenShopProps) {
  const { data: products, isLoading } = useSWR<GetProductsDto>(
    `/api/products/${storeId}`
  );

  //TODO: State doesnt reset when clicking off the dialog xd
  const [openShopData, updateOpenShopData] = useImmer<Record<string, number>>(
    {}
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      {isLoading || !products ? (
        <DialogContent>
          <p>Loading...</p>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Open shop</DialogTitle>
          {/* TODO: use a form instead */}
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex gap-2 flex-col w-[100px]"
            >
              <p>{product.productName}</p>
              <img
                src={product.productImageUrl}
                alt={product.productName}
                width={100}
                height={100}
              />
              <Label htmlFor={`product-quantity-${product.productId}`}>
                Quantity
              </Label>
              <Input
                type="number"
                placeholder="Quantity"
                defaultValue={0}
                onChange={(e) => {
                  updateOpenShopData((draft) => {
                    draft[product.productId] = parseInt(e.target.value);
                  });
                }}
              />
            </div>
          ))}
          <DialogClose asChild>
            <Button
              variant="default"
              onClick={() => {
                // We dont actually want to suppress default here
                // Button should submit form, and close dialog
                openShop(
                  Object.entries(openShopData).map(([productId, quantity]) => ({
                    productId,
                    quantity,
                  }))
                );
                updateOpenShopData(() => ({}));
              }}
            >
              Open shop
            </Button>
          </DialogClose>
        </DialogContent>
      )}
    </Dialog>
  );
}
