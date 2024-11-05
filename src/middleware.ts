import { User } from "@prisma/client"
import { decodeJwt } from "jose"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { authRoutes, privateRoutes } from "./routes"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("jwt")?.value
    let user: User | null
    if (!token) {
        user = null
    } else {
        user = decodeJwt(token) as User
    }

    const isAuthRoute = authRoutes.includes(pathname)
    const isPrivateRoute = privateRoutes.includes(pathname)

    if (user) {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    } else {
        if (isPrivateRoute) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return null
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
