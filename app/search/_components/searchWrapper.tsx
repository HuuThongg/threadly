"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import { useQuery } from "@tanstack/react-query"
import { UserSearchList } from "./UsersSearchList"
import { UserWithFollowStatus } from "@/types"

const fetchUsers = async (query: string) => {
  const response = await fetch(`/api/users/user-follow-search?query=${query}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export function SearchWrapper() {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const {
    data: usersList,
    error,
    isFetching,
  } = useQuery<UserWithFollowStatus[]>({
    queryKey: ["user-follow-search", debouncedSearchTerm],
    queryFn: () => fetchUsers(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm, // Ensure this only runs when debouncedSearchTerm is truthy
    staleTime: 5000,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <main className="flex flex-col rounded-3xl border border-border bg-primary-foreground p-6">
      <div className="mb-4 flex flex-row items-center space-x-1 rounded-2xl border-[1px] border-border bg-background pl-4">
        <Search size={22} />
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="rounded-none border-0 border-none bg-transparent text-primary shadow-none focus-visible:border-0 focus-visible:border-none focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="py-3 text-nonative">
        <p>Follows suggestions</p>
      </div>
      {usersList && (
        <UserSearchList debouncedSearchTerm={debouncedSearchTerm} usersList={usersList} />
      )}
    </main>
  )
}
