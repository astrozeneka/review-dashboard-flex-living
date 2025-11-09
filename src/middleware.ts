import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // If user is NOT authenticated
  if (!token) {
    // Redirect unauthenticated users from protected routes to /login
    if (
      pathname === '/' ||
      pathname === '/dashboard' ||
      pathname.startsWith('/property')
    ) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Allow access to /login and /register without auth
    return NextResponse.next();
  }

  // If user IS authenticated
  if (token) {
    // Redirect authenticated users away from /login
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to all other routes
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/property/:path*'],
};
