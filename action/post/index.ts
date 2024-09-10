"use server"
import { auth } from "@/auth"
import { pool } from "@/db"
import { getAuthenticatedUser } from "@/lib/db-util"
import { revalidateTag } from "next/cache"
import * as z from "zod"
const formSchema = z.object({
  postId: z.string(),
})

export async function likePostFn(postId: string) {
  const dataParsed = formSchema.safeParse({
    postId,
  })
  if (!dataParsed.success) {
    return {
      error: dataParsed.error.flatten().fieldErrors,
      message: undefined,
    }
  }

  const session = await auth()
  const userId = session?.user?.id
  if (!session || !userId) {
    return {
      message: "user is not authenticated",
    }
  }
  const client = await pool.connect()
  try {
    const { userId, error, message } = await getAuthenticatedUser()
    if (error) {
      return { error, message }
    }

    const checkLikeQuery = `
      SELECT 1 FROM likes
      WHERE post_id= $1 AND user_id= $2
    `
    const checkLikeResult = await client.query(checkLikeQuery, [postId, userId])
    if (checkLikeResult.rowCount! > 0) {
      const deleteLikeQuery = `
        DELETE FROM likes
        WHERE post_id= $1 AND user_id= $2
    `
      await client.query(deleteLikeQuery, [postId, userId])
    } else {
      const insertLikeQuery = `
        INSERT INTO likes (post_id,user_id, "liked_at")
        VALUES ($1, $2, NOW())
      `
      await client.query(insertLikeQuery, [postId, userId])
    }
    revalidateTag("posts")
    return {
      error: undefined,
      message: "Like status updated successfully",
    }
  } catch (error) {
    console.error("Error updating like status", error)
    return {
      error: "internal",
      message: "Failed to update like status",
    }
  } finally {
    client.release()
  }
}
