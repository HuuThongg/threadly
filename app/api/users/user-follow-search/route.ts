import { auth } from "@/auth"
import { getUsersWithFollowStatus } from "@/db/query"

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

  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  if (!query || typeof query !== "string") {
    return NextResponse.json({ ok: false }, { status: 201 })
  }
  const users = await getUsersWithFollowStatus(userId, query)

  return NextResponse.json(users)
}
