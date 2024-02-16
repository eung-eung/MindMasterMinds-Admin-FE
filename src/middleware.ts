import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const secret = process.env.JWT_SECRET
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret })
    const path = request.nextUrl.pathname;


    if (!token) {
        return NextResponse.redirect(new URL('/signIn', request.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher: [
        '/',
        '/tutor',
        '/student',
        '/dashboard',
        '/post'
    ],
};