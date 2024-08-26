"use server"

import { auth } from "@/auth";

interface AuthResult {
  userId?: string;
  error?: string;
  message?: string;
}

export async function getAuthenticatedUser(): Promise<AuthResult> {
  const session = await auth();
  if (!session || !session.user?.id) {
    return {
      error: "session",
      message: "User is not authenticated",
    };
  }

  return { userId: session.user.id };
}
