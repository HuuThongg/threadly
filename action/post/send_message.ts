"use server"
import { auth } from "@/auth"
import { pool } from "@/db"
import { revalidatePath } from "next/cache"
import * as z from "zod"

// Define the schema for validating the input
const sendMessageSchema = z.object({
  chat_group_id: z.string().uuid(),
  receiver_id: z.string().uuid(),
  message: z.string().min(5, "Message must be at least 5 characters long."),
})

// Define the TypeScript type for the validated data
type SendMessageProps = z.infer<typeof sendMessageSchema>

// Define the SendMessage function
export default async function SendMessage({
  chat_group_id,
  receiver_id,
  message,
}: SendMessageProps) {
  const client = await pool.connect()
  console.log("sending .................. ")

  try {
    const parsed = sendMessageSchema.safeParse({
      chat_group_id,
      receiver_id,
      message,
    })
    console.log("parsing...................")
    console.log("chat_group_id", chat_group_id)
    console.log("receiver_id", receiver_id)
    console.log("message", message)
    if (!parsed.success) {
      return {
        message: parsed.error.flatten().fieldErrors,
      }
    }
    console.log("parsed success")
    const session = await auth()
    const userId = session?.user?.id
    if (!session || !userId) {
      return {
        message: "user is not authenticated",
      }
    }

    const {
      chat_group_id: validGroupChatId,
      receiver_id: validReceiverId,
      message: validMessage,
    } = parsed.data

    const query = `
INSERT INTO chats (sender_id,receiver_id,group_id, "message")
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
