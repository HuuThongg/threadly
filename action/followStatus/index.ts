"use server"

import { pool } from "@/db"
import { getAuthenticatedUser } from "@/lib/db-util"
import * as z from "zod"

const followSchema = z.object({
  userId: z.string(),
})

export async function followUser(userId: string) {
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
      INSERT INTO follows (follower_id, following_id)
      VALUES ($1, $2)
      ON CONFLICT (follower_id,following_id) DO NOTHING
    `
    await client.query(followQuery, [currentUserId, userId])
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
      WHERE follower_id= $1 AND following_id= $2
    `
    await client.query(unfollowQuery, [currentUserId, userId])
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
