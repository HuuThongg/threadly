import { getPosts } from "@/db/query";
import { Post } from "./Post";

export default async function Posts() {
  const postsList = await getPosts()
  console.log("postsList", postsList)
  return (
    <div className="relative flex flex-col">
      {postsList.map((postInfo) => (
        <Post key={postInfo.post_id} postInfo={postInfo} />
      ))}
    </div>
  )
}
