import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
type EnvironmentsType = 'dev' | 'prod' | 'all';
/**
 * Decorator to set a route as public (No auth required)
 *
 * Route is only public when NODE_ENV === environments
 * @param environments - The environments in which this route is public. Defaults to all
 */
export function Public(environments: EnvironmentsType = 'all') {
  //Only allow routes to be public in the specified environments
  const allowPublic =
    environments === 'all' ||
    environments.includes(process.env.NODE_ENV ?? 'dev');

  return SetMetadata(IS_PUBLIC_KEY, allowPublic);
}
