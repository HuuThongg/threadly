"use client"
import Image from "next/image"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import React, { useRef } from "react"
import { MessageChat, User } from "@/types"
import { useWindowSize } from "@uidotdev/usehooks"
import { EllipsisVerticalIcon, Laugh, ReplyIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"

const fetchMessages = async (chat_group_id: string, pageParam = null) => {
  console.log("fetchMessages in chat-message.tsx", pageParam)
  const response = await fetch(
    `/api/messages?chat_group_id=${chat_group_id}&cursor=${pageParam}&limit=15`,
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

interface ChatProps {
  chat_group_id: string
  receiver: User
}

export type MessageType = MessageChat & { isSentByCurrentUser: boolean }

export interface GroupChatMessageProps {
  messages: Array<MessageType>
  prevCursor?: number
}
const ChatMessages = ({ chat_group_id, receiver }: ChatProps) => {
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const { data, error, fetchPreviousPage, isFetchingPreviousPage, isLoading, hasPreviousPage } =
    useInfiniteQuery<GroupChatMessageProps, Error>({
      queryKey: ["group_chat_messages", chat_group_id],
      queryFn: async ({ pageParam = null }) => {
        const res = await fetchMessages(chat_group_id, pageParam)
        return res
      },
      select: (data) => {
        // Reverse the order of pages and their params
        const reversedPages = [...data.pages].map((page) => {
          // Reverse the messages within each page
          return {
            ...page,
            messages: [...page.messages],
          }
        })

        const reversedPageParams = [...data.pageParams].reverse()
        console.log("reversedPageParams", reversedPageParams)

        return {
          ...data,
          pages: reversedPages,
          pageParams: reversedPageParams,
        }
      },
      initialPageParam: null,
      getPreviousPageParam: (firstPage, allPages) => {
        console.log("firstPage", firstPage)
        return firstPage.prevCursor ?? null
      },
      getNextPageParam: () => undefined,
      maxPages: 5,
      staleTime: Infinity,
    })
  React.useEffect(() => {
    if (messageBoxRef.current && data) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight - messageBoxRef.current.clientHeight;
    }
  }, [data]);

  // Handle scroll and fetch previous messages
  const handleScroll = () => {
    if (messageBoxRef.current) {
      const isAtTop = messageBoxRef.current.scrollTop === 0;

      if (isAtTop && hasPreviousPage && !isFetchingPreviousPage) {
        fetchPreviousPage();
      }
    }
  };

  React.useEffect(() => {
    const container = messageBoxRef.current;
    if (!container) return
    container.addEventListener('scroll', handleScroll);

    // Handle initial edge case if the container is already scrolled to the top
    if (container.scrollHeight <= container.clientHeight && !isFetchingPreviousPage) {
      if (hasPreviousPage) {
        fetchPreviousPage();
      }
    }
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage]);



  return (
    <div className="relative flex max-h-full flex-1 flex-col overflow-hidden">
      <div className="border-messenger-card-bg relative flex max-h-full flex-1 flex-col overflow-hidden border-l-2 border-r-2 ">
        <div
          className="scrollbar-thumb-fifth-clr scrollbar-thumb-rounded-md scrollbar-w-2 relative flex flex-1 flex-col  overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-transparent hover:scrollbar-track-[#2c2d2f]"
          ref={messageBoxRef}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              {hasPreviousPage && (
                <button
                  onClick={() => fetchPreviousPage()}
                  disabled={!hasPreviousPage || isFetchingPreviousPage}>
                  {isFetchingPreviousPage
                    ? "Loading more..."
                    : hasPreviousPage
                      ? "Load Newer"
                      : "Nothing more to load"}
                </button>
              )}

              {/* each message */}

              {data &&
                data.pages.map((page, i) => (
                  <div key={i} className="mt-auto">
                    {page.messages.map((message) => (
                      <div key={message.id} className="relative">
                        <div className="relative flex flex-col">
                          {/* for Assistive Techonology  clip-path:inset(50%) */}
                          <h3 className="outline-none">
                            <span
                              className="absolute h-[1px] w-[1px] overflow-hidden"
                              style={{ clipPath: "inset(50%)" }}>
                              sender
                            </span>
                          </h3>
                          {/* perhaps do a height:2px here */}
                          <div className="group/message flex">
                            {/* avatar */}
                            {!message.isSentByCurrentUser && (

                              <div className="flex grow-0 flex-col justify-end bg-transparent pl-[6px] pr-2">
                                <div className="flex aspect-square w-[28px] items-end">
                                  <div className="relative flex h-full w-full overflow-hidden rounded-full">
                                    <Avatar className="w-full h-full">
                                      <AvatarImage src={receiver.image!} width={28} height={28} />
                                      <AvatarFallback><img src="/defaultAvatar.jpg" /></AvatarFallback>
                                    </Avatar>
                                  </div>
                                </div>
                                {/* if the message has interaction icon */}
                                <div className=""></div>
                              </div>
                            )}
                            {/* message */}
                            <div className={cn(`flex min-w-0 shrink grow `, {
                              'flex-row-reverse': message.isSentByCurrentUser
                            })}>
                              <div className="flex flex-col justify-start bg-transparent">
                                <div className="flex w-full flex-col">
                                  {/* like padding */}
                                  <div className="bg-messenger-card-bg h-[2px] w-full"></div>
                                  <div className="relative flex max-w-full flex-col items-start">
                                    <div className={cn(`bg-wash relative z-[1] overflow-hidden rounded-2xl px-2 -ml-2 py-2 text-white`, { 'bg-blue-bg': message.isSentByCurrentUser })}>
                                      <div className="text-primary-text whitespace-pre-wrap text-left text-[0.9375rem] leading-[1.3333]">
                                        {message.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* if the message has interaction icon */}
                                <div className="w-full max-w-full grow-0 items-stretch justify-end bg-transparent"></div>
                              </div>
                              {/* drop icons, reply to specific message and edit */}
                              {/* if the message has interaction icon
                                  do: pb-[18px] */}
                              <div
                                className={cn(`delay-70 invisible relative flex shrink-0 grow justify-center pl-[5px] opacity-0 transition-all group-hover/message:visible group-hover/message:opacity-100`, { 'flex-row-reverse': message.isSentByCurrentUser })}
                                aria-hidden="true">
                                <div className="flex items-center justify-center">
                                  <div className="hover:bg-third-clr pointer-events-auto box-border flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full">
                                    <Laugh className="text-disabled-icon h-[20px] w-[20px]" />
                                  </div>
                                </div>

                                <div className="flex items-center justify-center">
                                  <div className="hover:bg-third-clr pointer-events-auto box-border flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full">
                                    <ReplyIcon className="fill-disabled-icon h-[20px] w-[20px]" />
                                  </div>
                                </div>

                                <div className="flex items-center justify-center">
                                  <div className="hover:bg-third-clr pointer-events-auto box-border flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full">
                                    <EllipsisVerticalIcon className="stroke-3 text-disabled-icon h-[20px] w-[20px]" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* sigal message seen */}
                            {/*
                            <div className="flex max-w-full grow-0 flex-col justify-end self-stretch bg-transparent">
                              <div className="flex w-5 items-end overflow-hidden">
                                <div className="flex aspect-square w-[14px] items-end">
                                  <div className="relative flex h-full w-full overflow-hidden rounded-full">
                                    <Image
                                      className="h-full w-full object-cover"
                                      src="/images/avatar.jpg"
                                      alt="avatar"
                                      width={14}
                                      height={14}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            */}
                          </div>
                          <div className="bg-messenger-card-bg h-[7px] w-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessages
