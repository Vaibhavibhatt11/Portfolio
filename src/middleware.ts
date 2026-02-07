import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin/login")) {
        return true;
      }
      return token?.role === "ADMIN";
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
