import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axious from "@/app/lib/axious";



export default NextAuth({
    pages: {
        signIn: '/signIn',
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {
                    email: credentials?.username,
                    password: credentials?.password,
                };

                const response = await axious.post('/Auth/login', {
                    email: payload.email,
                    password: payload.password
                })
                const user = response.data

                if (user.userViewLogin.userRole.roleName === 'Admin') {
                    return user
                }
                else {
                    return null
                }

            }
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async signIn({ user }) {
            return true
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, user, token }) {
            session.user = token as any
            return session
        },

    }
})