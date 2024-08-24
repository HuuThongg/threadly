import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "@/db"
import authConfig from "@/auth.config"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
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
  session: { strategy: "database" },
  ...authConfig,
})

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}
