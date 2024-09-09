"use server"
import { auth } from "@/auth"
import { pool } from "@/db"
import { revalidatePath } from "next/cache"
import * as z from "zod"

// Define the schema for validating the input
const sendMessageSchema = z.object({
  chat_group_id: z.string().uuid(),
  receiverId: z.string().uuid(),
  message: z.string().min(5, "Message must be at least 5 characters long."),
})

// Define the TypeScript type for the validated data
type SendMessageProps = z.infer<typeof sendMessageSchema>

// Define the SendMessage function
export default async function SendMessage({
  chat_group_id,
  receiverId,
  message,
}: SendMessageProps) {
  const client = await pool.connect()
  try {
    const parsed = sendMessageSchema.safeParse({
      chat_group_id,
      receiverId,
      message,
    })

    if (!parsed.success) {
      return {
        message: parsed.error.flatten().fieldErrors,
      }
    }

    const session = await auth()
    const userId = session?.user?.id
    if (!session || !userId) {
      return {
        message: "user is not authenticated",
      }
    }

    const {
      chat_group_id: validGroupChatId,
      receiverId: validReceiverId,
      message: validMessage,
    } = parsed.data

    const query = `
INSERT INTO chats ("senderId","receiverId", "groupId", "message")
 VALUES ($1, $2, $3, $4)
      RETURNING id

`
    const values = [userId, validReceiverId, validGroupChatId, validMessage]
    const result = await client.query(query, values)
    if (result.rows.length === 0) {
      return {
        message: "Failed to send message",
      }
    }

    console.log("Message sent successfully.")

    revalidatePath("/")
    return {
      message: "Message sent successfully.",
    }
  } catch (error) {
    console.error("Error occurred:", error)
    client.release()
    return {
      message: "Failed to send message",
    }
  }
}
