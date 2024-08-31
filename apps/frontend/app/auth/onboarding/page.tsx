'use client';

import { useState } from 'react';
import { CompleteProfileDto } from '@shared-types/features/onboarding/complete-profile.dto';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';

import FullScreenCenter from '@frontend/components/FullScreenCenter';
import { useAuth } from '@frontend/providers/AuthProviders';
import { Button } from '@components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/card';
import { Input } from '@components/input';

async function updateName(dto: CompleteProfileDto) {
  const res = await axios.patch('/api/member/complete-profile', dto);
  mutate('/api/auth/self');
  return res;
}

/**
 * Page for users to input name, and complete profile onboarding.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { self } = useAuth();
  const [name, setName] = useState('');

  // not authed
  if (!self) {
    router.push('/');
    return null;
  }

  if (self.name) {
    router.push('/home');
    return null;
  }

  return (
    <FullScreenCenter>
      <Card className="m-auto mt-8 bg-slate-50 w-[350px]">
        <CardHeader>
          <CardTitle>Complete Profile</CardTitle>
          <CardDescription>
            Enter your name to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={async () => {
              await updateName({ name });
              router.push('/home');
            }}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </FullScreenCenter>
  );
}
