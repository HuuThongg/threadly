import { auth } from "@/auth"
import Posts from "@/components/post"
import { StartThread } from "@/components/start-thread"
import { getPosts } from "@/db/query"
import { ChevronDown } from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  const postsList = await getPosts()

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between px-5">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <div className="flex h-full items-center justify-center space-x-3">
              <p className="p-2 text-primary">For you</p>
              <div className="scale-100 cursor-pointer rounded-full border bg-primary-foreground p-1 text-primary hover:scale-110 hover:border-ring">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          <main className="flex flex-col rounded-3xl border border-border bg-primary-foreground text-primary">
            {/*Start a thread */}
            {session !== null && session?.user ? <StartThread /> : null}
            {/*Post*/}
            <Posts postsList={postsList} />
          </main>
        </div>
      </div>
    </div>
  )
}
