import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-current-path", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }
        return token?.role === "ADMIN";
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
