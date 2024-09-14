"use client"

import { followUser, unfollowUser } from "@/action/followStatus"
import { Button } from "@/components/ui/button"
import { UserWithFollowStatus } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

type FollowStatusButtonProps = {
  usersWithFollowStatus: UserWithFollowStatus
  debouncedSearchTerm: string
}
export function FollowStatusButton({
  usersWithFollowStatus,
  debouncedSearchTerm,
}: FollowStatusButtonProps) {
  const queryClient = useQueryClient()
  // Mutation for following a user
  const followMutation = useMutation({
    mutationFn: async (user_id: string) => {
      // Your follow function here
      await followUser(user_id)
    },
    onMutate: async (user_id: string) => {
      //await queryClient.cancelQueries(['searchUsers', debouncedSearchTerm]);
      await queryClient.cancelQueries({
        queryKey: ["user-follow-search", debouncedSearchTerm],
      })

      // Snapshot the previous users list
      const previousUsersList = queryClient.getQueryData([
        "user-follow-search",
        debouncedSearchTerm,
      ])

      // Optimistically update the users list
      queryClient.setQueryData(
        ["user-follow-search", debouncedSearchTerm],
        (oldData: UserWithFollowStatus[]) => {
          return oldData.map((user: UserWithFollowStatus) =>
            user.id === user_id ? { ...user, following: true } : user,
          )
        },
      )

      return { previousUsersList }
    },
    onError: (err, user_id, context) => {
      queryClient.setQueryData(
        ["user-follow-search", debouncedSearchTerm],
        context?.previousUsersList,
      )
    },
    onSettled: () => {
      //queryClient.invalidateQueries(['searchUsers', debouncedSearchTerm]);
      queryClient.invalidateQueries({ queryKey: ["searchUsers", debouncedSearchTerm] })
    },
  })
  // Mutation for unfollowing a user
  const unfollowMutation = useMutation({
    mutationFn: async (user_id: string) => {
      // Your unfollow function here
      await unfollowUser(user_id)
    },
    onMutate: async (user_id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["user-follow-search", debouncedSearchTerm],
      })
      const previousUsersList = queryClient.getQueryData([
        "user-follow-search",
        debouncedSearchTerm,
      ])

      queryClient.setQueryData(
        ["user-follow-search", debouncedSearchTerm],
        (oldData: UserWithFollowStatus[]) => {
          return oldData.map((user: UserWithFollowStatus) =>
            user.id === user_id ? { ...user, following: false } : user,
          )
        },
      )

      return { previousUsersList }
    },
    onError: (err, user_id, context) => {
      queryClient.setQueryData(
        ["user-follow-search", debouncedSearchTerm],
        context?.previousUsersList,
      )
    },
    onSettled: () => {
      //queryClient.invalidateQueries(['searchUsers', debouncedSearchTerm]);
      queryClient.invalidateQueries({ queryKey: ["searchUsers", debouncedSearchTerm] })
    },
  })

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    followMutation.mutate(usersWithFollowStatus.id)
  }

  const handleUnfollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    unfollowMutation.mutate(usersWithFollowStatus.id)
  }

  return (
    <Button
      variant="outline"
      className="scale-100 rounded-xl border-2 border-border active:scale-[1.15]"
      onClick={(e) => {
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
