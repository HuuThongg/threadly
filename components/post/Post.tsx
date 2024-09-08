
import Image from "next/image"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"
import { Carousel } from "../carousel"
import { PostInteraction } from "../post-interaction"
import { Separator } from "@/components/ui/separator"
import { UserPostView } from "@/types"

export function Post({ postInfo }: { postInfo: UserPostView }) {
  return (

    <div
      className="relative cursor-pointer px-6 py-3 text-primary outline-none"
    >
      <div className="grid grid-cols-poster grid-rows-poster">
        <div className="relative col-start-1 row-span-2 row-start-1 pt-1">
          <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
            <Image
              className="rounded-full"
              src={`${postInfo.user_image ?? "/defaultAvatar.jgp"}`}
              alt={`Avatar of ${postInfo.user_name}`}
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="col-start-2 row-start-1 self-start">
          <div className="flex justify-between">
            <div className="font-medium">
              My name
              <span className="pl-1 text-[14px] font-normal text-nonative">
                23h
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="self-center rounded-full border-0 border-none text-nonative">
              <Ellipsis size={16} />
            </Button>
          </div>
        </div>
        <div className="col-start-2 row-span-full row-start-2 pt-2">
          <div className="font-sans text-[15px] tracking-tight">
            {postInfo.content ?? ""}          </div>
          {/* image caoursel*/}
          {postInfo.images.length > 1 &&
            (
              <div className="w-full pt-2">
                <div className="relative ml-[-72px] w-[calc(100%+96px)]">
                  <Carousel postImages={postInfo.images} />
                </div>
              </div>
            )
          }
          {/* interactino*/}
          <PostInteraction postInfo={postInfo} />
        </div>
      </div>

      <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
    </div>

  )
}
