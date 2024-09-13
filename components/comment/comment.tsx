"use client"
import Image from "next/image"
import React, { useState } from "react"
import Link from "next/link"
import { CommentNode } from "@/types"
import { auth } from "@/auth"
import { useSession } from "next-auth/react"
import LikeReply from "./interaction"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UserIcon } from "lucide-react"
import { RenderImages } from "../RenderImages"
export interface CommentProps {
  comment: CommentNode
}

export default function Comment({ comment }: CommentProps) {
  const session = useSession()
  const [isOpen, setOpen] = useState(false)
  const user = session.data?.user

  const profile = false
  // if (!profile) {
  //   return redirectToSignIn();
  // }
  let isLiked = false
  if (profile) {
    // likeData operation
    isLiked = false
  }
  const allLikes = []
  const likesAmount = allLikes.length

  return (
    <div className="flex flex-col pl-4">
      <div className="flex flex-row">
        {/* avatar */}
        <div className="mr-[6px] mt-[2px]">
          <button
            className="relative m-0 inline-flex min-h-0 min-w-0 rounded-full p-0"
            tabIndex={-1}
            aria-hidden="true">
            <div className="relative flex h-[32px] w-[32px] items-stretch">
              <Avatar className="size-full">
                <AvatarImage src={session.data?.user.image || ""} />
                <AvatarFallback className="bg-sky-400">
                  <UserIcon className="h-6 w-6 text-white" />
                </AvatarFallback>
              </Avatar>
            </div>
          </button>
        </div>
        {/*right comment */}
        <div className="flex flex-1 flex-col overflow-hidden pr-4">
          {/* text */}
          <div className="flex grow flex-col">
            <div className="inline-block max-w-[calc(100%-26px)] break-words align-middle">
              <div className="relative inline-flex w-full align-middle">
                <div className="relative inline-flex w-full min-w-0 flex-auto">
                  <div className="bg-third-clr z-0 whitespace-normal break-words rounded-2xl px-3 py-2">
                    {/* name */}
                    <span className="block leading-3">
                      <Link href={"/"} className="relative m-0 p-0 leading-3">
                        <span className="text-ss inline-flex min-w-0 max-w-full break-words font-semibold leading-3">
                          {user?.name ?? "user name"}
                        </span>
                      </Link>
                    </span>
                    <RenderImages images={comment.images} />
                    <div className="mt-1 py-1">
                      <span className="block min-w-0 max-w-full break-words text-[15px] font-normal leading-4">
                        {/* refer to who  */}
                        {/* <Link href={"/"} className='mr-1'>
                          <span className='font-semibold'>
                            Huu Thong
                          </span>
                        </Link> */}
                        {comment.content}
                      </span>
                    </div>
                  </div>
                  {/* icon interaction */}
                  {likesAmount > 0 && (
                    <div className="visibility relative -ml-2 mb-1 shrink-0 self-end">
                      <span>
                        <div
                          aria-label="203 reactions see who reacted to this"
                          role="button"
                          tabIndex={0}>
                          <div className="bg-third-clr flex items-center justify-center rounded-[10px] p-[2px]">
                            <div className="inline-flex items-center pl-1">
                              <span className="rounded-[10px flex">
                                <Image
                                  src={"/images/like.svg"}
                                  width={18}
                                  height={18}
                                  alt="like button"
                                />
                              </span>
                              <span className="rounded-[10px flex">
                                <Image
                                  src={"/images/haha.svg"}
                                  width={18}
                                  height={18}
                                  alt="interaction button"
                                />
                              </span>
                            </div>
                            <span className="text-ss text-secondary-text px-[2px] font-normal leading-4">
                              {likesAmount}
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* edit */}
            <div></div>
          </div>
          {/* interaction metrics */}
          <LikeReply
            post_id={comment.post_id}
            comment_id={comment.comment_id}
            isLiked={isLiked}
            create_at={comment.created_at}
          />
        </div>
      </div>
      {comment.replies.length > 0 ? (
        <div className="ml-14 cursor-pointer text-sm" onClick={() => setOpen(!isOpen)}>
          view {comment.replies.length} reply
        </div>
      ) : null}

      {isOpen
        ? comment.replies.length > 0 && (
            <div>
              {comment.replies.map((reply) => (
                <Comment key={reply.comment_id} comment={reply} />
              ))}
            </div>
          )
        : null}
    </div>
  )
}
