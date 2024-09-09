import { auth } from "@/auth"
import Posts from "@/components/post"
import { Post } from "@/components/post/Post"
import { StartThread } from "@/components/start-thread"
import { getCommentsByPostId, getPostById } from "@/db/query"
import { ChevronDown } from "lucide-react"
import Comment from "./Comment"
import { TypeComment } from "./typeComment"
type CommentNode = {
  comment_id: string
  post_id: string
  user_id: string
  user_handle: string
  content: string
  parent_comment_id?: string
  created_at: string
  images: { image_url: string; blurHash: string }[]
  replies: CommentNode[] // For nested replies
}
export default async function HomePage({
  params,
}: {
  params: { handle: string; postId: string }
}) {
  const postInfo = await getPostById(params.postId)
  const comments = await fetchComments(params.postId)
  console.log("handler", params.handle)
  console.log("postId", params.postId)

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between px-5">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <div className="flex h-full items-center justify-center space-x-3">
              <p className="p-2 text-primary">For you</p>
              <div className="scale-100 cursor-pointer rounded-full border bg-primary-foreground p-1 text-primary hover:scale-110 hover:border-ring">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          <main>
            <Post postInfo={postInfo} />
          </main>
          <div>
            {comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
          </div>
          <TypeComment />
        </div>
      </div>
    </div>
  )
}

async function fetchComments(postId: string): Promise<CommentNode[]> {
  const comments = await getCommentsByPostId(postId)
  // Function to build nested comments
  const buildTree = (comments: CommentNode[]): CommentNode[] => {
    const map = new Map<string, CommentNode>()

    comments.forEach((comment) => {
      comment.replies = [] // Initialize replies array
      map.set(comment.comment_id, comment)
    })

    const result: CommentNode[] = []

    comments.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parent = map.get(comment.parent_comment_id)
        if (parent) {
          parent.replies.push(comment)
        }
      } else {
        result.push(comment)
      }
    })
    console.log("result", result)

    return result
  }

  return buildTree(comments)
}
