'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProviders';

export default function Navbar() {
  const { self, signOut } = useAuth();
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <p>navbar</p>
      {self ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={() => router.push('/auth/login')}>Sign In</button>
      )}
    </nav>
  );
}
