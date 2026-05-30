import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PUBLIC_ROUTES = ["/api/auth"];
const GUEST_ROUTES = ["/login"];

export async function proxy(request: NextRequest) {
  if (PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (GUEST_ROUTES.includes(request.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (GUEST_ROUTES.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
