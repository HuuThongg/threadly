"use server"
import { auth } from "@/auth"
import { createComment } from "@/db/query"
import { revalidatePath } from "next/cache"
import * as z from "zod"

const commentSchema = z.object({
  content: z.string().min(1),
  post_id: z.string(),
  parent_comment_id: z.string().optional().nullable(),
})

export default async function sendCommentFn(formData: FormData) {
  try {
    const parsed = commentSchema.safeParse({
      content: formData.get("content"),
      post_id: formData.get("post_id"),
      parent_comment_id: formData.get("parent_comment_id") || null,
    })

    if (!parsed.success) {
      return {
        message: parsed.error.flatten().fieldErrors,
      }
    }
    const session = await auth()
    const user_id = session?.user?.id
    if (!session || !user_id) {
      return {
        message: "user is not authenticated",
      }
    }
    const { content, post_id, parent_comment_id } = parsed.data

    const comment = await createComment({
      user_id,
      post_id,
      content,
      parent_comment_id,
      images: [],
      blur_hashes: [],
    })

    revalidatePath("/") // Revalidate the path if needed
    console.log("Database insertion comment successful")
  } catch (error) {
    console.error("Error inserting comment into the database:", error)
  }
}
