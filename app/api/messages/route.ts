import { auth } from "@/auth"
import { pool } from "@/db"
import { MessageChat } from "@/types"
import { NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const userId = session.user?.id
  if (!userId) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const cursor = searchParams.get("cursor")
  const groupChatId = searchParams.get("chat_group_id")
  const limit = searchParams.get("limit") || "10"

  let query = `
    SELECT * FROM chats
    WHERE group_id= $1
`
  let values: any = []
  values = [groupChatId]
  // Add cursor-based filtering only if cursor is provided
  //
  console.log("cursor", cursor)
  // Add cursor-based filtering only if cursor is provided and not 'null'
  if (cursor && cursor !== "null") {
    query += ` AND sent_at < $2`
    values.push(cursor)
  }
  query += ` ORDER BY sent_at DESC LIMIT $${values.length + 1};`
  values.push(parseInt(limit))
  const client = await pool.connect()

  console.log("values :", values)
  console.log("query :", query)
  try {
    const res = await client.query(query, values)
    const rows = res.rows as MessageChat[]
    const messageChatWithSentByWho = rows.map((row) => {
      const isSentByCurrentUser = row.sender_id === userId
      return { ...row, isSentByCurrentUser }
    })
    console.log("MessageChatWithSentByWho0", messageChatWithSentByWho)

    // Determine if there are more messages to fetch
    const hasMoreMessages = rows.length === parseInt(limit)

    // Determine the prevCursor value
    const prevCursor = hasMoreMessages ? rows[rows.length - 1].sent_at : null
    return NextResponse.json({
      messages: messageChatWithSentByWho,
      prevCursor,
    })
  } catch (error) {
    console.error("Error fetching messages", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 501 })
  }
}
