
import Image from "next/image"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"
import { Carousel } from "../carousel"
import { PostInteraction } from "../post-interaction"
import { Separator } from "@/components/ui/separator"

export function Post() {
  return (

    <div
      className="relative cursor-pointer px-6 py-3 text-primary outline-none"
    >
      <div className="grid grid-cols-poster grid-rows-poster">
        <div className="relative col-start-1 row-span-2 row-start-1 pt-1">
          <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
            <Image
              className="rounded-full"
              src="/avatar.jpg"
              alt="logo"
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
            Use this extension for declaration files that only contain type
            definitions. These files are meant to describe the shape of code
            written in JavaScript or TypeScript for use with TypeScript
            projects. They dont contain any executable code, just type
            declarations
          </div>
          {/* image caoursel*/}
          <div className="w-full pt-2">
            <div className="relative ml-[-72px] w-[calc(100%+96px)]">
              <Carousel />
            </div>
          </div>
          {/* interactino*/}
          <PostInteraction />
        </div>
      </div>

      <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
    </div>

  )
}
