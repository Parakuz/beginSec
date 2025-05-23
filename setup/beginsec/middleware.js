import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies } = req;
  const token = cookies.get("sessionToken");

  const protectedRoutes = ["/learning-path", "/profile"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/learning-path/:path*"],
};
