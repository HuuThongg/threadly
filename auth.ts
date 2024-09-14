import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "@/db"
import authConfig from "@/auth.config"
import { getUserProfileById, updateHandle } from "./db/query"
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
  names,
} from "unique-names-generator"

const config: Config = {
  dictionaries: [adjectives, names],
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user)
      console.log("account", account)
      if (account?.provider !== "credentials") return true
      return false
    },
    async session({ user, session, token, trigger }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      const userId = session.user.id
      if (userId) {
        const userFromDb = await getUserProfileById(userId)
        session.user.handle = userFromDb.handle
        session.user.onboarding_complete = userFromDb.onboarding_complete
      }

      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      if (user.id) {
        const handle = uniqueNamesGenerator(config)
        updateHandle(user.id, handle)
      }
    },
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig,
})

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}

//async Session token {
//  name: 'Huu Thong Le',
//  email: 'lehuuthong0506@gmail.com',
//  picture: 'https://avatars.githubusercontent.com/u/103173514?v=4',
//  sub: '7f25d7e8-2ef3-4dc3-963e-8fd47caaba96',
//  iat: 1724529153,
//  exp: 1727121153,
//  jti: '33ecd350-c638-4f44-ba14-e81f4a23537d'
//}
