"use client"

import { followUser, unfollowUser } from "@/action/followStatus"
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export function FollowStatusButton({ usersWithFollowStatus, debouncedSearchTerm }) {
  const queryClient = useQueryClient()

  const session = useSession()
  const handleFollow = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    queryClient.invalidateQueries({ queryKey: ["searchUsers", debouncedSearchTerm] })
    // Optimistically update the cache
    queryClient.setQueryData(["searchUsers", debouncedSearchTerm], (oldData: any) => {
      console.log("pppppppppppppppppppppppppppp")
      if (!oldData) return oldData
      console.log("oldData", oldData)
      if (session?.status === "loading" || session?.status === "unauthenticated")
        return oldData
      console.log("hellllo", oldData)

      // Find the user and update their followed status
      const updatedUsers = oldData.map((user: any) =>
        user.id === session.data?.user?.id
          ? { ...user, following: !user.following }
          : user,
      )

      return updatedUsers
    })
    await followUser(usersWithFollowStatus.user_id)
    console.log("alo")
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await unfollowUser(usersWithFollowStatus.user_id)
  }

  return (
    <Button
      variant="outline"
      className="scale-100 rounded-xl border-2 border-border active:scale-[1.15]"
      //onClick={usersWithFollowStatus.following ? handleUnfollow : handleFollow}
      onClick={(e) => {
        console.log("////////////////////////")
        if (usersWithFollowStatus.following) handleUnfollow(e)
        else handleFollow(e)
      }}>
      {usersWithFollowStatus.following
        ? usersWithFollowStatus.followed
          ? "follow back"
          : "following"
        : "follow"}
    </Button>
  )
}
