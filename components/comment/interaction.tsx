"use client"
import { cn, formatDate } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useState } from "react"
import TypeComment from "./type-comment"
interface LikeReplyProps {
  post_id: string
  isLiked: Boolean
  comment_id: string
  create_at: Date
}
export default function LikeReply({
  create_at,
  isLiked,
  comment_id,
  post_id,
}: LikeReplyProps) {
  const [isTypeCommentOpen, setTypeCommentOpen] = useState(false)
  async function onLikeButton() {
    // await likeCommentFn({
    //   postId,
    //   isLiked,
    //   commentId,
    // });
  }
  return (
    <ul className="text-secondary-text -mt-1 ml-1">
      <li className="mx-2 inline-block align-middle">
        <button
          className={cn(
            `inline-block cursor-pointer px-1 text-[12px] font-bold leading-3 hover:underline`,
            {
              "text-secondary-text": !isLiked,
              "text-blue-link": isLiked,
            },
          )}
          onClick={onLikeButton}>
          like
        </button>
      </li>
      <li className="mx-2 inline-block align-middle">
        <span
          className="inline-block cursor-pointer text-[12px] font-bold leading-3 hover:underline"
          onClick={() => setTypeCommentOpen(!isTypeCommentOpen)}>
          Reply
        </span>
      </li>
      <li className="mx-2 inline-block align-middle">
        <span className="inline-block text-[12px] font-bold leading-3">
          {formatDate(create_at)}
        </span>
      </li>
      {isTypeCommentOpen ? (
        <TypeComment post_id={post_id} parent_comment_id={comment_id} />
      ) : null}
    </ul>
  )
}
