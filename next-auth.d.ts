import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  bio: string | null;
  handle: string | null;
  gender: string | null;
  onboarding_complete: boolean
}
