import FullScreenCenter from 'apps/frontend/components/FullScreenCenter';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <FullScreenCenter>
      <h1>Login</h1>
      <Link href="/api/auth/google/login">Google</Link>
    </FullScreenCenter>
  );
}
