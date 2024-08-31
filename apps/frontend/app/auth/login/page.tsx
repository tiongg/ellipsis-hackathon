import Link from 'next/link';

import { Button } from '@components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/card';
import FullScreenCenter from '../../../components/FullScreenCenter';

/**
 * Login page. Lists all login providers
 */
export default function LoginPage() {
  return (
    <FullScreenCenter>
      <Card className="m-auto w-[350px] mt-8 bg-slate-50">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose a login provider</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth/google/login">Login with Google</Link>
          </Button>
        </CardContent>
      </Card>
      {/* <h1>Login</h1>
      <Link href="/api/auth/google/login">Google</Link> */}
    </FullScreenCenter>
  );
}
