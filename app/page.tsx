import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <div className="flex h-full items-center justify-center space-x-3">
              <p className="text-primary p-2">For you</p>
              <div className="bg-primary-foreground hover:border-ring text-primary scale-100 cursor-pointer rounded-full border p-1 hover:scale-110">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          <main className="bg-primary-foreground text-primary border-border flex flex-col rounded-3xl border">
            {/*Start a thread */}
            <div className="w-full px-6">
              <div className="flex w-full items-center py-4 leading-5">
                <Link
                  href={"/"}
                  className="relative rounded-full"
                  role="link"
                  tabIndex={0}>
                  <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
                    <Image
                      className="rounded-full"
                      src="/avatar.jpg"
                      alt="logo"
                      width={36}
                      height={36}
                    />
                  </div>
                </Link>
                <div className="mx-2 flex-1 pl-1">
                  <span className="text-nonative cursor-text">Start a thread... </span>
                </div>
                <Button
                  variant="outline"
                  className="border-border scale-100 rounded-xl border-2 active:scale-[1.15]">
                  Post
                </Button>
              </div>
              <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
            </div>
            {/*Post*/}
            <div className="relative flex flex-grow flex-col">
              {[...Array(5)].map((_, index) => (
                <div
                  className="text-primary relative cursor-pointer px-6 py-3 outline-none"
                  key={index}>
                  <div className="grid-cols-poster grid-rows-poster grid">
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
                      <div className="flex items-center justify-between">
                        <div>dsad</div>
                        <div>....</div>
                      </div>
                    </div>
                    <div className="col-start-2 row-span-2 row-start-2">
                      Mothers, have you "dared" to starve your children before, if your
                      children are lazy to eat, try this way. But first, the moms have to
                      keep the "spirit of steel". During the main meal, if the child
                      refuses to eat, the moms implement the rule of 3 chances (ask your
                      child 1st time: “Are you seriously sitting down to eat? I sit and
                      eat well" (Or say whatever sentence it is up to you but it should
                      not be forced or obliged){" "}
                    </div>
                    {/* interactino*/}
                    <div className="col-start-2 row-start-4">
                      <div className="mb-[-4px] ml-[-8px] mt-[6px]">
                        <div className="relative flex">
                          {[...Array(3)].map((_, index) => (
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="lg" className="bg-blue-500">
                                <Heart />
                                <span>617</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
