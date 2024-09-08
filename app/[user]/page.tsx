import { EditProfile } from "@/components/edit-profile"
import { ProfileTabs } from "@/components/profile-tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface UserProfileProps {
  params: {
    user: string
  }
}
const avatars = [
  { id: 1, src: "/avatar.jpg", alt: "Follower 1" },
  { id: 2, src: "/ngan.jpg", alt: "Follower 2" },
  { id: 3, src: "/avatar.jpg", alt: "Follower 3" },
]

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <p className="p-4">Search</p>
          </div>

          <div>
            <main className="bg-primary-foreground border-border flex flex-col rounded-3xl border p-6">
              <div className="text-primary flex w-full flex-row justify-between">
                <div>
                  <span className="text-2xl font-bold">Ngan {params.user}</span>
                  <p className="pt-1">nganle_</p>
                </div>

                <div className="mt-1 size-[85px] cursor-pointer select-none overflow-hidden rounded-full">
                  <Image
                    className="aspect-square w-full rounded-full object-cover"
                    src="/ngan.jpg"
                    alt="logo"
                    width={90}
                    height={90}
                  />
                </div>
              </div>
              <div className="text-primary flex flex-col">
                <p>Wake up early to be successful</p>
              </div>

              <div className="mb-7 mt-6 flex flex-row items-center">
                <div className="mr-3 flex cursor-pointer select-none flex-row items-center">
                  {avatars.map((avatar, index) => (
                    <div
                      key={avatar.id}
                      className="border-primary-foreground relative ml-[-6px] rounded-full border-[2px] first:ml-0 first:border-l-0 first:border-r-[2px]">
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
