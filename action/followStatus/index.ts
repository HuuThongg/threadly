"use server"

import { pool } from "@/db"
import { getAuthenticatedUser } from "@/lib/db-util"
import { revalidateTag } from "next/cache"
import * as z from "zod"

const followSchema = z.object({
  userId: z.string(),
})

export async function followUser(userId: string) {
  console.log("=====================================,dds", userId)
  const dataParsed = followSchema.safeParse({ userId })
  if (!dataParsed.success) {
    return {
      error: dataParsed.error.flatten().fieldErrors,
      message: undefined,
    }
  }

  const client = await pool.connect()
  try {
    const { userId: currentUserId, error, message } = await getAuthenticatedUser()
    if (error) {
      return { error, message }
    }

    const followQuery = `
      INSERT INTO follows ("followerId", "followingId")
      VALUES ($1, $2)
      ON CONFLICT ("followerId", "followingId") DO NOTHING
    `
    await client.query(followQuery, [currentUserId, userId])
    revalidateTag("users")
    return {
      error: undefined,
      message: "User followed successfully",
    }
  } catch (error) {
    console.error("Error following user", error)
    return {
      error: "internal",
      message: "Failed to follow user",
    }
  } finally {
    client.release()
  }
}

export async function unfollowUser(userId: string) {
  const dataParsed = followSchema.safeParse({ userId })
  if (!dataParsed.success) {
    return {
      error: dataParsed.error.flatten().fieldErrors,
      message: undefined,
    }
  }

  const client = await pool.connect()
  try {
    const { userId: currentUserId, error, message } = await getAuthenticatedUser()
    if (error) {
      return { error, message }
    }

    const unfollowQuery = `
      DELETE FROM follows
      WHERE "followerId" = $1 AND "followingId" = $2
    `
    await client.query(unfollowQuery, [currentUserId, userId])
    revalidateTag("users")
    return {
      error: undefined,
      message: "User unfollowed successfully",
    }
  } catch (error) {
    console.error("Error unfollowing user", error)
    return {
      error: "internal",
      message: "Failed to unfollow user",
    }
  } finally {
    client.release()
  }
}
