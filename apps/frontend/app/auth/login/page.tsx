import Link from 'next/link';

import FullScreenCenter from '../../../components/FullScreenCenter';

/**
 * Login page. Lists all login providers
 */
export default function LoginPage() {
  return (
    <FullScreenCenter>
      <h1>Login</h1>
      <Link href="/api/auth/google/login">Google</Link>
    </FullScreenCenter>
  );
}
