"use client"
import { Carousel } from "@/components/carousel"
import { StartThread } from "@/components/start-thread"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Ellipsis, Heart, MessageCircle, Repeat2, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
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
                <StartThread />
                <Button
                  variant="outline"
                  className="scale-100 rounded-xl border-2 border-border text-[15px] font-semibold active:scale-[0.96]">
                  Post
                </Button>
              </div>
              <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
            </div>
            {/*Post*/}
            <div className="relative flex flex-grow flex-col">
              {[...Array(5)].map((_, index) => (
                <div
                  className="relative cursor-pointer px-6 py-3 text-primary outline-none"
                  key={index}>
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
                        Mothers, have you "dared" to starve your children before, if your
                        children are lazy to eat, try this way. But first, the moms have
                        to keep the "spirit of steel". During the main meal, if the child
                        refuses to eat, the moms implement the rule of 3 chances (ask your
                        child 1st time: “Are you seriously sitting down to eat? I sit and
                        eat well" (Or say whatever sentence it is up to you but it should
                        not be forced or obliged)
                      </div>
                      {/* image caoursel*/}
                      <div className="w-full pt-2">
                        <div className="relative ml-[-72px] w-[calc(100%+96px)]">
                          <Carousel />
                        </div>
                      </div>
                      {/* interactino*/}
                      <div className="">
                        <div className="mb-[4px] ml-[-12px] mt-[6px]">
                          <div className="relative flex">
                            <div className="flex items-center justify-center" key={index}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
                                <Heart className="text-ring" size={20} strokeWidth={1} />
                                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                                  617
                                </span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
                                <MessageCircle
                                  className="text-ring"
                                  size={20}
                                  strokeWidth={1}
                                />
                                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                                  617
                                </span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
                                <Repeat2
                                  className="text-ring"
                                  size={20}
                                  strokeWidth={1}
                                />
                                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                                  617
                                </span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
                                <Send className="text-ring" size={20} strokeWidth={1} />
                                <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                                  617
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
