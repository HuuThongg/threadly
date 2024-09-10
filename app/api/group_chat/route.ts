import { auth } from "@/auth"
import { pool } from "@/db"
import { MessageInfo, PartialUser } from "@/types"
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
  const cursorNumber = cursor ? parseInt(cursor) : 0

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const conversationsQuery = `
      SELECT group_id
      FROM group_members
      WHERE user_id= $1
      LIMIT 10 OFFSET $2
    `
    const conversationsResult = await client.query(conversationsQuery, [
      userId,
      cursorNumber,
    ])
    const groupChatIds = conversationsResult.rows.map((row) => row.groupId)

    if (groupChatIds.length === 0) {
      return NextResponse.json({ data: [], nextId: null, previousId: null })
    }

    // Fetch the latest messages for each group chat

    const messagesQuery = `
  WITH LatestMessages AS (
    SELECT group_id, MAX(sent_at) AS latest_sent_at
    FROM chats
    WHERE group_id= ANY($1::uuid[])
    GROUP BY group_id
  )
  SELECT c.group_id, c.sender_id, c.receiver_id, c.message, c.sent_at
  FROM chats c
  JOIN LatestMessages lm
  ON c.group_id= lm.group_id AND c.sent_at = lm.latest_sent_at
`
    const messagesResult = await client.query(messagesQuery, [groupChatIds])
    const messagesData = messagesResult.rows as MessageInfo[]

    // Fetch user details for each sender and receiver
    const userIds = Array.from(
      new Set([
        ...messagesData.map((msg) => msg.sender_id),
        ...messagesData.map((msg) => msg.receiver_id),
      ]),
    )

    const usersQuery = `
      SELECT id, name, image,handle
      FROM users
      WHERE id = ANY($1::uuid[])
    `
    const usersResult = await client.query(usersQuery, [userIds])
    const usersData = usersResult.rows as PartialUser[]

    // Map users to their IDs
    const usersMap = new Map(usersData.map((user) => [user.id, user]))

    // Combine messages with user details and determine if the message was sent by the current user
    const conversationsWithDetails = messagesData.map((message) => {
      // Determine the chat partner's ID
      const chatPartnerId =
        message.sender_id === userId ? message.receiver_id : message.sender_id

      return {
        chat_group_id: message.group_id,
        lastMessage: message.message,
        lastMessageTimestamp: message.sent_at,
        chatPartner: usersMap.get(chatPartnerId)!,
        isSentByCurrentUser: message.sender_id === userId,
      }
    })

    console.log("conversationsWithDetails", conversationsWithDetails)

    // Determine next and previous cursor
    const nextCursor = conversationsWithDetails.length > 0 ? cursorNumber + 10 : null
    const previousCursor = cursorNumber > 0 ? cursorNumber - 10 : null
    await client.query("COMMIT")
    return NextResponse.json({
      data: conversationsWithDetails,
      nextId: nextCursor,
      previousId: previousCursor,
    })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Error fetching messages" }, { status: 500 })
  } finally {
    client.release()
  }
}
