import NextAuth, { type DefaultSession } from "next-auth"
export type ExtendedUser = DefaultSession["user"] & {
  id: string
  bio: string | null
  handle: string | null
  gender: string | null
  onboarding_complete: boolean
}
declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
