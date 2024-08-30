'use client';

import { useState } from 'react';
import { CompleteProfileDto } from '@shared-types/features/onboarding/complete-profile.dto';
import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import { useAuth } from 'apps/frontend/providers/AuthProviders';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';

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
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          await updateName({ name });
          router.push('/home');
        }}
      >
        Submit
      </button>
    </FullScreenCenter>
  );
}
