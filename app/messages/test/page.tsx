"use client"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDebounce } from "@uidotdev/usehooks"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation" // Import the router for navigation
import { User } from "@/types"

const fetchUsers = async (searchTerm: string) => {
  const response = await fetch(`/api/searchUsers?query=${searchTerm}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function NewMessagePage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null) // State to track the selected user
  const router = useRouter()

  const {
    data: users = [],
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["users", debouncedSearchTerm],
    queryFn: () => fetchUsers(debouncedSearchTerm),
    placeholderData: keepPreviousData,
    enabled: !!debouncedSearchTerm, // Only run the query if debouncedSearchTerm is not empty
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user) // Set the selected user when clicking on a user
    setSearchTerm("")
  }

  const handleChatClick = async () => {
    if (!selectedUser) return // Ensure a user is selected

    // Create chat group logic here, assuming a backend API endpoint for creating chat groups
    try {
      const response = await fetch("/api/createChatGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.user_id }),
      })

      if (!response.ok) {
        throw new Error("Failed to create chat group")
      }

      const data = await response.json()
      const chatGroupId = data.groupChatId

      // Redirect to the message route with the chat group ID
      router.push(`/messages/${chatGroupId}`)
    } catch (error) {
      console.error("Error creating chat group:", error)
    }
  }

  return (
    <div className="relative z-0 flex max-h-[calc(100vh-58px)] min-w-0 max-w-full shrink grow basis-0 flex-col">
      <div className="flex w-full space-x-3 p-3">
        <ScrollArea className="border-wash h-[400px] w-[350px] rounded-md border drop-shadow-2xl">
          <div>To:{selectedUser ? selectedUser.name : null}</div>
          <div>userid: {selectedUser?.user_id}</div>
          <input type="search" value={searchTerm} onChange={handleChange} />

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            users.ok !== false &&
            users.map((user: User) => (
              <div
                key={user.id}
                className={`text-primary-text flex cursor-pointer ${selectedUser?.id === user.id ? "bg-gray-200" : ""}`} // Highlight selected user
                onClick={() => handleUserClick(user)} // Set selected user on click
              >
                <div className="flex shrink-0 select-none flex-col p-[6px]">
                  <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={user.image || "/defaultAvatar.jpg"}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className="flex min-w-0 max-w-full shrink grow basis-0 flex-col p-[6px]">
                  <div className="my-[5px]">
                    <span>{user.name || user.email}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
        <button
          onClick={handleChatClick}
          className={`rounded bg-blue-500 px-4 py-2 text-white ${!selectedUser ? "cursor-not-allowed opacity-50" : ""}`} // Disable button if no user selected
          disabled={!selectedUser}>
          Chat
        </button>
      </div>
    </div>
  )
}
