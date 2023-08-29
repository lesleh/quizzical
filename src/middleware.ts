import { initAuth0 } from "@auth0/nextjs-auth0/edge";

const auth0 = initAuth0();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/api/chat",
  ],
};

export default auth0.withMiddlewareAuthRequired({});
