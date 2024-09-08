import { getPosts } from "@/db/query";
import { Post } from "./Post";
import Link from "next/link";

export default async function Posts() {
  const postsList = await getPosts()
  return (
    <div className="relative flex flex-col">
      {postsList.map((postInfo) => (
        <Link key={postInfo.post_id} href={`/${postInfo.user_id}/post/${postInfo.post_id}`}>
          <Post postInfo={postInfo} />
        </Link>
      ))}
    </div>
  )
}
