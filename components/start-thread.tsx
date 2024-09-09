import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { NewThread } from "./new-thread"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth"

export async function StartThread() {
  const session = await auth()
  return (
    <div className="w-full px-6">
      <div className="flex w-full items-center py-4 leading-5">
        <Link href={"/"} className="relative rounded-full" role="link" tabIndex={0}>
          <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
            <Image
              className="rounded-full"
              src={session?.user?.image || "/defaultAvatar.jpg"}
              alt="logo"
              width={36}
              height={36}
            />
          </div>
        </Link>
        <NewThread />
        <Button
          variant="outline"
          className="scale-100 rounded-xl border-2 border-border text-[15px] font-semibold active:scale-[0.96]">
          Post
        </Button>
      </div>
      <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
    </div>
  )
}
