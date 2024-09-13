import { auth } from "@/auth"
import Posts from "@/components/post"
import { getPostByUserId } from "@/db/query"

export async function UserThread() {
  const sesssion = await auth()
  if (!sesssion?.user.id) {
    return null;
  }
  const threadList = await getPostByUserId(sesssion.user.id)
  return <Posts postsList={threadList} />
}
