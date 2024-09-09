import { auth } from "@/auth"
import { pool } from "@/db"

import { NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const userId = session.user?.id
  if (!userId) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const { userId: otherUserId } = body
  if (!otherUserId) {
    return NextResponse.json({ error: "Other user ID is required" }, { status: 400 })
  }

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    // // Create the chat group entry
    const groupChat = await client.query(
      `INSERT INTO chat_groups (name) VALUES ($1)  RETURNING id`,
      [`Chat between ${userId} and ${otherUserId}`],
    )

    // Ensure that the result has at least one row
    if (groupChat.rows.length === 0) {
      throw new Error("Failed to create group chat; no ID returned")
    }

    // Extract the group chat ID from the query result
    const groupChatId = groupChat.rows[0].id

    await client.query(
      `INSERT INTO group_members ("groupId", "userId") VALUES ($1, $2)`,
      [groupChatId, userId],
    )

    await client.query(
      `INSERT INTO group_members ("groupId", "userId") VALUES ($1, $2)`,
      [groupChatId, otherUserId],
    )

    await client.query("COMMIT")
    // Return the chat group ID
    return NextResponse.json({ groupChatId })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error creating chat group:", error)
    return NextResponse.json({ error: "Failed to create chat group" }, { status: 500 })
  } finally {
    client.release()
  }
}
