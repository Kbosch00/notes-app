import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;
  const isAuthPage = path.startsWith("/login");
  const isProtected = path.startsWith("/notes");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/notes", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/notes/:path*", "/login"],
};
