import { NextResponse } from "next/server";

export function middleware(request) {
  const loginToken = request.cookies.get("loginToken")?.value;

  // Allow access to login and signup pages
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return;
  }

  const loggedInUserNotAccessPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // Redirect logged-in users trying to access login or signup pages
  if (loggedInUserNotAccessPath) {
    if (loginToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    // Redirect users trying to access protected pages without logging in
    if (!loginToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return new NextResponse(
          { message: "Access Denied", success: false },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/addtask",
    "/signup",
    "/your-tasks",
    "/login",
    "/profile/:path*",
    "/api/:path*",
  ],
};
