import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token to check user role
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If user is POS and trying to access admin routes, redirect to POS dashboard
  if (token && token.user_type === 7 && pathname.startsWith('/admin')) { // 7 is POS role
    return NextResponse.redirect(new URL('/pos-booking', request.url))
  }

  // If non-POS user trying to access POS route, redirect to admin
  if (token && token.user_type !== 7 && pathname.startsWith('/pos-booking')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/pos-booking/:path*'
  ]
}