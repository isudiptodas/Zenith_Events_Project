import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/dev-login", request.url));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-admin", JSON.stringify(decoded));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/dev-login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};