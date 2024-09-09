"use client"
import Image from "next/image"
import clsx from "clsx"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { useInView } from "react-intersection-observer"
import React from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

const Messages = () => {
  const { ref, inView } = useInView()
  const router = useRouter()
  const pathname = usePathname()
  const isHasMessagePath = pathname.includes("/messages")

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/group_chat?cursor=${pageParam}`)
      if (!res.ok) {
        throw new Error("Network response was not ok")
      }
      return res.json()
    },
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    initialPageParam: 0,
    retry: 1,
  })
  console.log("group cha messagest", data)

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])

  return (
    <div className="scrollbar-thumb-fifth-clr scrollbar-thumb-rounded-md scrollbar-w-3 flex max-h-[calc(100vh-90px-152px)] flex-col overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-transparent hover:scrollbar-track-[#2c2d2f]">
      {status === "pending" ? (
        <SkeletonMessageChat length={4} />
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((group_chat, index) => (
                <div key={group_chat.groupChatId}>
                  <p>last messages : {group_chat.lastMessage}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage && hasNextPage ? (
              <SkeletonMessageChat length={2} />
            ) : null}
          </button>
        </>
      )}
    </div>
  )
}

export default Messages

export const SkeletonMessageChat = ({ length }: { length: number }) => {
  const getRandomWidth = () => {
    return Math.floor(Math.random() * (250 - 150 + 1) + 150)
  }
  return (
    <div className="relative space-y-2 p-3">
      {Array.from(Array(length).keys()).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton style={{ width: `${getRandomWidth()}px` }} className="h-4" />
            <Skeleton style={{ width: `${getRandomWidth()}px` }} className="h-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
