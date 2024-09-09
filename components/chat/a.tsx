import { useInfiniteQuery } from "@tanstack/react-query"

const fetchMessages = async (chat_group_id, pageParam = null) => {
  const response = await fetch(
    `/api/messages?chat_group_id=${chat_group_id}&cursor=${pageParam}&limit=4`,
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const ChatMessages = ({ chat_group_id }: { chat_group_id: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["group_chat_messages", chat_group_id],
      queryFn: async ({ pageParam }) => {
        const res = await fetchMessages(chat_group_id, pageParam)
        return res
      },
      select: (data) => {
        // Reverse the order of pages and their params
        const reversedPages = [...data.pages].reverse().map((page) => {
          // Reverse the messages within each page
          return {
            ...page,
            messages: [...page.messages].reverse(),
          }
        })

        const reversedPageParams = [...data.pageParams].reverse()

        return {
          ...data,
          pages: reversedPages,
          pageParams: reversedPageParams,
        }
      },
      initialPageParam: null,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      maxPages: 5,
    })
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data &&
            data.pages.map((page, i) => (
              <div key={i}>
                {page.messages.map((message) => (
                  <div key={message.id}>{message.message}</div>
                ))}
              </div>
            ))}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load Newer"
                  : "Nothing more to load"}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ChatMessages
