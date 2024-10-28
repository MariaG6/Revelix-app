import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getJwtToken } from './route';

export function middleware(request: NextRequest) {
  const token = getJwtToken();

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
