import Posts from "@/components/post"
import { getPosts } from "@/db/query"

export async function UserThread() {
  const threadList = await getPosts()
  return <Posts postsList={threadList} />
}
