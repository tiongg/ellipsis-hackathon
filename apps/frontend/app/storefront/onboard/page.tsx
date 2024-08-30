'use client';

import { CreateStorefrontDto } from '@shared-types/features/storefront/create-storefront.dto';
import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import { useAuth } from 'apps/frontend/providers/AuthProviders';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

type FormInputs = CreateStorefrontDto;

async function createStore(data: FormInputs) {
  const res = await axios.post('/api/storefront/', data);
  mutate('/api/storefront/');
  return res;
}

/**
 * Page for onboarding a new store
 */
export default function StorefrontOnboardPage() {
  const router = useRouter();
  const { self } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  if (!self || !self.name) {
    return (
      <FullScreenCenter>
        <Link href="/auth/login">Login/Signup first!</Link>
      </FullScreenCenter>
    );
  }

  //TODO: CHANGE FORM UI
  return (
    <FullScreenCenter>
      <h1>Onboard your store</h1>
      <p>Fill out the form below to get started!</p>
      <form
        className="bg-slate-50 gap-2 flex flex-col p-2"
        onSubmit={handleSubmit(async (data) => {
          await createStore(data);
          router.push('/storefront');
        })}
      >
        <label htmlFor="store-name">Store Name</label>
        <input {...register('storeName')} />
        <label htmlFor="store-description">Store Description</label>
        <input {...register('description')} />
        <label htmlFor="store-url">Store URL</label>
        <input {...register('storeUrl')} />
        <label htmlFor="store-bank">Receiving bank account</label>
        <input {...register('receivingBankAccount')} />
        <label htmlFor="store-postal">Postal code</label>
        <input {...register('postalCode')} />
        <button type="submit">Submit</button>
      </form>
    </FullScreenCenter>
  );
}
