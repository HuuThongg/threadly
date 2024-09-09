import { auth } from "@/auth"
import { EditProfile } from "@/components/edit-profile"
import { ProfileTabs } from "@/components/profile-tabs"
import { getFollowers, getUserByHandle } from "@/db/query"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { notFound } from "next/navigation"

interface UserProfileProps {
  params: {
    handle: string
  }
}
const avatars = [
  { id: 1, src: "/avatar.jpg", alt: "Follower 1" },
  { id: 2, src: "/ngan.jpg", alt: "Follower 2" },
  { id: 3, src: "/avatar.jpg", alt: "Follower 3" },
]

export default async function UserProfile({ params }: UserProfileProps) {
  const user = await getUserByHandle(params.handle)
  const session = await auth()
  if (!session?.user?.id) return null
  const followings = await getFollowers(session?.user?.id)
  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <p className="p-4">Profile</p>
          </div>

          <div>
            <main className="flex flex-col rounded-3xl border border-border bg-primary-foreground p-6">
              <div className="flex w-full flex-row justify-between text-primary">
                <div>
                  <span className="text-2xl font-bold">{user.name}</span>
                  <p className="pt-1">{user.handle}</p>
                </div>

                <div className="mt-1 size-[85px] cursor-pointer select-none overflow-hidden rounded-full">
                  <Image
                    className="aspect-square w-full rounded-full object-cover"
                    src={user.image || "/defaultAvatar.jpg"}
                    alt="logo"
                    width={90}
                    height={90}
                  />
                </div>
              </div>
              <div className="flex flex-col text-primary">
                <p>{user.bio}</p>
              </div>

              <div className="mb-7 mt-6 flex flex-row items-center">
                <div className="mr-3 flex cursor-pointer select-none flex-row items-center">
                  {avatars.map((avatar, index) => (
                    <div
                      key={avatar.id}
                      className="relative ml-[-6px] rounded-full border-[2px] border-primary-foreground first:ml-0 first:border-l-0 first:border-r-[2px]">
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        width={16}
                        height={16}
                        className="size-[16px] rounded-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-non-active">12 followers</span>
              </div>

              <EditProfile />
              <ProfileTabs />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
