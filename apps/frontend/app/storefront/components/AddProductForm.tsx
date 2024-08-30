'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { CreateProductDto } from '@shared-types/features/products/create-product.dto';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Button } from '@components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/dialog';
import { Input } from '@components/input';
import { Label } from '@components/label';

type FormInputs = CreateProductDto;

type AddProductFormProps = {
  storeId: string;
};

async function addProduct(storeId: string, data: FormInputs) {
  const res = await axios.post(`/api/products/${storeId}`, data);
  mutate(`/api/products/${storeId}`);
  return res.data;
}

/**
 * Component to add new product
 *
 * Handles form submission and API call
 */
export default function AddProductForm({ storeId }: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <form>
            <DialogDescription>
              <div className="flex gap-2 flex-col">
                <Label htmlFor="product-name">Product Name</Label>
                <Input {...register('productName')} />
                <Label htmlFor="product-description">Product Description</Label>
                <Input {...register('productDescription')} />
                <Label htmlFor="product-image-url">Product Image URL</Label>
                <Input {...register('productImageUrl')} />
                <Label htmlFor="product-price">Product Price</Label>
                <Input {...register('productPrice')} />
                <Label htmlFor="product-weight">Product Weight</Label>
                <Input {...register('productWeight')} />
              </div>
            </DialogDescription>
          </form>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              onClick={() => {
                // We dont actually want to suppress default here
                // Button should submit form, and close dialog
                handleSubmit(async (data) => {
                  await addProduct(storeId, data);
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
