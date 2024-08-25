import { auth } from "@/auth"
import Posts from "@/components/post"
import { StartThread } from "@/components/start-thread"
import { ChevronDown } from "lucide-react"

export default async function Home() {
  const session = await auth();
  console.log("sesson from home page", session)
  return (
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
          {session !== null && session?.user ? (

            <StartThread />
          ) : null}
          {/*Post*/}
          <Posts />
        </main>
      </div>
    </div>
  )
}
