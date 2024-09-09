import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { FollowStatusButton } from "./followStatusButton"

export function UserSearchList({ usersList, debouncedSearchTerm }) {
  return (
    <div>
      {usersList && usersList.length > 0 ? (
        usersList.map((userWithFollowStatus) => (
          <Link
            href={`/${userWithFollowStatus.handle}`}
            className="flex flex-col"
            key={userWithFollowStatus.user_id}>
            <div className="flex w-full flex-row py-3">
              <div className="mt-1 size-9 scale-100 cursor-pointer select-none overflow-hidden rounded-full border-border">
                <Image
                  className="aspect-square w-full rounded-full object-cover"
                  src={userWithFollowStatus.image || "defaultAvatar.png"}
                  alt="User avatar"
                  width={36}
                  height={36}
                />
              </div>

              <div className="ml-3 flex flex-1 flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-primary">{userWithFollowStatus.name}</h1>
                  <p className="text-nonative">
                    {userWithFollowStatus.handle || "userhandle"}
                  </p>
                  <p className="pt-1 text-primary">418K followers</p>
                  <p>ID: {userWithFollowStatus.user_id}</p>
                </div>
                <div className="flex items-center">
                  <FollowStatusButton
                    debouncedSearchTerm={debouncedSearchTerm}
                    usersWithFollowStatus={userWithFollowStatus}
                  />
                </div>
              </div>
            </div>
            <Separator className="mx-[48px] w-[calc(100%-24px)]" />
          </Link>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  )
}
