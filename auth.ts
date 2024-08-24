import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import Credentials from "next-auth/providers/credentials"
import { pool } from "@/db"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        console.log("username: ", username, "\npassword: ", password)
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user)
      console.log("account", account)
      if (account?.provider !== "credentials") return true
      return false
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
})

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}
