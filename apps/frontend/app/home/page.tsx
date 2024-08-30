'use client';

import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import { useAuth } from 'apps/frontend/providers/AuthProviders';
import { useRouter } from 'next/navigation';

/**
 * Main landing page. Assumes user is logged in already.
 */
export default function HomePage() {
  const router = useRouter();
  const { self, isLoading } = useAuth();

  //TODO: make fancier
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // not authed
  if (!self) {
    router.push('/');
    return null;
  }

  return (
    <FullScreenCenter>
      <h1>Welcome to the app, {self.name}!</h1>
    </FullScreenCenter>
  );
}
