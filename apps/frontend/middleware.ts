import { NextRequest } from 'next/server';

export const config = {
  matcher: '/app/:path*',
};

export function middleware(request: NextRequest) {}
