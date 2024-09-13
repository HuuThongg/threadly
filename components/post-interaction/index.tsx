"use client"
import { likePostFn } from "@/action/post"
import { Button } from "@/components/ui/button"
import { InteractionCount, UserPostView } from "@/types"
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react"
import { startTransition, useState } from "react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { CommentSection } from "./commentSection"

//type PostInteractionProps = InteractionCount & { postId: string }
export function PostInteraction({ postInfo }: { postInfo: UserPostView }) {
  const [open, setOpen] = useState(false)
  const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()
    startTransition(() => {
      likePostFn(postInfo.post_id)
    })
  }

  return (
    <div className="">
      <div className="mb-[4px] ml-[-12px]">
        <div className="relative flex">
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none bg-transparent px-3 text-ring transition duration-200 hover:bg-neutral-900 active:scale-[0.87]"
              onClick={handleLikeClick}>
              <Heart className="text-ring" size={20} strokeWidth={1} />
              {postInfo.like_count === 0 ? null : (
                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                  {postInfo.like_count}
                </span>
              )}
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    setOpen(true)
                  }}
                  className="scale-100 rounded-2xl border-0 border-none bg-transparent px-3 text-ring transition duration-200 hover:bg-neutral-900 active:scale-[0.87]">
                  <MessageCircle className="text-ring" size={20} strokeWidth={1} />
                  {postInfo.comment_count === 0 ? null : (
                    <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                      {postInfo.comment_count}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <CommentSection setOpen={setOpen} postInfo={postInfo} />
            </Dialog>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none bg-transparent px-3 text-ring transition duration-200 hover:bg-neutral-900 active:scale-[0.87]">
              <Repeat2 className="text-ring" size={20} strokeWidth={1} />
              {postInfo.repost_count === 0 ? null : (
                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                  {postInfo.repost_count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
