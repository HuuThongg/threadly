
import * as Ably from "ably"
import { NextRequest, NextResponse } from "next/server"

//export async function POST(request: NextRequest) {
//  const formData = await request.formData()
//  const followerIds = formData.get('followerIds')
//  const actor_id = formData.get('actorId')
//  const post_id = formData.get('postId')
//  const notifications = followerIds.map((followerId) => ({
//    recipient_id: followerId,
//    actor_id: actor_id,
//    post_id: post_id,
//    type: 'new_post',
//    message: `User ${actor_id} has posted a new post.`,
//  }));
//  await saveNotifications(notifications) // this should save notifications in batch
//
//  // publish to ably channel for each followerIds
//  const channel = ablyClient.channels.get('notifications')
//  followerIds.forEach((followerId) => {
//    channel.publish(`user:${followerId}`, {
//      type: 'new_post',
//      actor_id,
//      post_id,
//      message: `User ${actorId} has posted a new post.`,
//    })
//  });
//  return NextResponse.json({ message: 'Notification sent' }, { status: 200 })
//}
export async function GET(request: NextRequest) {
  try {
    const ablyClient = new Ably.Realtime({
      key: process.env.ABLY_KEY_API,
    })
    const channel = ablyClient.channels.get("notifications")
    //await channel.publish("new_post", { text: "helllo" })
    console.log("Notification sent")
    channel.subscribe("new_post", (message) => {
      console.log("Received message:", message.data)
    })

    return NextResponse.json({ message: "Notification sent" }, { status: 200 })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ message: "Error sending notification" }, { status: 500 })
  }
}
