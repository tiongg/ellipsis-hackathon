import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import Link from 'next/link';

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
