'use client';

import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import { useAuth } from 'apps/frontend/providers/AuthProviders';
import useOneTimeEffectOnTruthy from 'apps/frontend/utils/hooks/useOneTimeEffectOnTruthy';
import { setToken } from 'apps/frontend/utils/token';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

async function redirectWithProvider(prefix: string, code: string) {
  return await axios.post<{ jwtToken: string }>(
    `/api/auth/${prefix}/redirect?code=${code}`
  );
}

/**
 * Page that handles the redirect from the auth provider.
 *
 * oauth2 will redirect to this page with a code, which we then use to get a jwt token.
 */
export default function AuthRedirectPage({
  params,
}: {
  params: {
    authProvider: string;
  };
}) {
  const router = useRouter();

  const queryParams = useSearchParams();
  const { authProvider } = params;
  const code = queryParams.get('code');
  const { fetchSelf } = useAuth();

  useOneTimeEffectOnTruthy(() => {
    if (
      typeof authProvider !== 'string' ||
      typeof code !== 'string' ||
      !fetchSelf
    )
      return;

    redirectWithProvider(authProvider, code)
      .then((res) => {
        setToken(res.data.jwtToken);
        return fetchSelf();
      })
      .then((self) => {
        if (!self) {
          // ?? BE died prolly
          router.push('/');
          return;
        }
        if (self.name) {
          router.push('/home');
        } else {
          router.push('/auth/onboarding');
        }
      })
      .catch(() => router.push('/auth/login'));
  }, [authProvider, code]);

  return (
    <FullScreenCenter>
      <p>Redirecting...</p>
    </FullScreenCenter>
  );
}
