import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("userRole")?.value;
  const { pathname } = request.nextUrl;

  // Protect ONLY admin routes
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};