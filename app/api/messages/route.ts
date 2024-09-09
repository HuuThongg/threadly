import { auth } from "@/auth"
import { pool } from "@/db"
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
  const limit = searchParams.get("limit") || "4"

  let query = `
    SELECT * FROM chats
    WHERE "groupId" = $1
`
  let values: any = []
  values = [groupChatId]
  // Add cursor-based filtering only if cursor is provided
  //
  console.log("cursor", cursor)
  // Add cursor-based filtering only if cursor is provided and not 'null'
  if (cursor && cursor !== "null") {
    const parsedCursor = new Date(parseInt(cursor, 10)) // Convert to Date from timestamp
    if (!isNaN(parsedCursor.getTime())) {
      // Ensure valid date
      // Format cursor to ISO 8601 for compatibility with PostgreSQL
      const formattedCursor = parsedCursor.toISOString()
      query += ` AND sent_at < $2`
      values.push(formattedCursor)
    } else {
      console.log("Invalid cursor value detected")
      return NextResponse.json({ error: "Invalid cursor value" }, { status: 400 })
    }
  }
  query += ` ORDER BY sent_at DESC LIMIT $${values.length + 1};`
  values.push(parseInt(limit))
  const client = await pool.connect()

  console.log("values :", values)
  console.log("query :", query)
  try {
    const { rows } = await client.query(query, values)
    console.log("rowwwwwwwwwwwwwws", rows)

    // If there are rows, get the cursor for the next page
    const nextCursor = rows.length > 0 ? rows[rows.length - 1].sent_at.getTime() : null
    const prevCursor = rows.length > 0 ? rows[0].sent_at.getTime() : null // For previous page

    return NextResponse.json({
      messages: rows,
      nextCursor,
      prevCursor,
    })
  } catch (error) {
    console.error("Error fetching messages", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 501 })
  }
}
