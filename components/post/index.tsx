import { getPosts } from "@/db/query"
import { Post } from "./Post"
import Link from "next/link"
import { UserPostView } from "@/types"

export default async function Posts({ postsList }: { postsList: UserPostView[] }) {
  return (
    <div className="relative flex flex-col">
      {postsList.map((postInfo) => (
        <Link
          key={postInfo.post_id}
          href={`/${postInfo.user_handle}/post/${postInfo.post_id}`}>
          <Post postInfo={postInfo} />
        </Link>
      ))}
    </div>
  )
}
