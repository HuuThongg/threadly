"use client"
import { likePostFn } from "@/action/post"
import { Button } from "@/components/ui/button"
import { InteractionCount } from "@/types"
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react"
import { startTransition, useState } from "react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { CommentSection } from "./commentSection"

type PostInteractionProps = InteractionCount & { postId: string }
export function PostInteraction({ like_count, comment_count, repost_count, postId }: PostInteractionProps) {

  const [open, setOpen] = useState(false)

  return (

    <div className="">
      <div className="mb-[4px] ml-[-12px] ">
        <div className="relative flex">
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]"
              onClick={() => {
                startTransition(() => {
                  likePostFn(postId)
                })
              }}
            >
              <Heart className="text-ring" size={20} strokeWidth={1} />
              {like_count === 0 ? null : (

                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                  {like_count}
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
                  className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
                  <MessageCircle
                    className="text-ring"
                    size={20}
                    strokeWidth={1}
                  />
                  {comment_count === 0 ? null : (

                    <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                      {comment_count}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <CommentSection setOpen={setOpen} />
            </Dialog>
          </div>
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <Repeat2
                className="text-ring"
                size={20}
                strokeWidth={1}
              />
              {repost_count === 0 ? null : (

                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                  {repost_count}
                </span>
              )}

            </Button>
          </div>
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <Send
                className="text-ring"
                size={20}
                strokeWidth={1}
              />
              <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                617
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
