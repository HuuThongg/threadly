"use client"
import { Carousel } from "@/components/carousel";
import { StartThread } from "@/components/start-thread";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Ellipsis, Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="h-[60xp] w-full flex items-center justify-center">
            <div className="flex space-x-3 justify-center items-center h-full">
              <p className="text-primary p-2">For you</p>
              <div className="bg-primary-foreground rounded-full border hover:border-ring p-1 text-primary cursor-pointer scale-100 hover:scale-110">
                < ChevronDown size={20} />
              </div>
            </div>
          </div>
          <main className="flex flex-col rounded-3xl bg-primary-foreground text-primary border border-border">
            {/*Start a thread */}
            <div className="px-6 w-full">
              <div className="w-full py-4 flex leading-5 items-center">
                <Link href={"/"} className="rounded-full relative" role="link" tabIndex={0}>
                  <div className="w-9 h-9 rounded-full select-none cursor-pointer bg-neutral-900 ">
                    <Image className="rounded-full" src="/avatar.jpg" alt="logo" width={36} height={36} />
                  </div>
                </Link>
                <StartThread />
                <Button variant="outline" className="rounded-xl border-2 border-border scale-100 active:scale-[0.96] font-semibold text-[15px]"  >Post</Button>
              </div>
              <Separator className=" mx-[-24px] w-[calc(100%+48px)]" />
            </div>
            {/*Post*/}
            <div className="flex flex-col relative flex-grow">
              {[...Array(5)].map((_, index) => (
                <div className="relative outline-none px-6 py-3 cursor-pointer text-primary" key={index}>
                  <div className="grid grid-cols-poster grid-rows-poster ">
                    <div className="row-start-1 row-span-2 col-start-1 relative pt-1">
                      <div className="w-9 h-9 rounded-full select-none cursor-pointer bg-neutral-900 ">
                        <Image className="rounded-full" src="/avatar.jpg" alt="logo" width={36} height={36} />
                      </div>

                    </div>
                    <div className="col-start-2 row-start-1 self-start">
                      <div className="flex justify-between ">
                        <div className="font-medium">
                          My name
                          <span className="font-normal pl-1 text-nonative text-[14px]">23h</span>
                        </div>
                        <Button variant="outline" size="icon" className="text-nonative rounded-full self-center border-0 border-none" >
                          <Ellipsis size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="pt-2 row-start-2 col-start-2 row-span-full">
                      <div className=" tracking-tight text-[15px] font-sans ">
                        Mothers, have you "dared" to starve your children before, if your children are lazy to eat, try this way. But first, the moms have to keep the "spirit of steel".
                        During the main meal, if the child refuses to eat, the moms implement the rule of 3 chances (ask your child 1st time: “Are you seriously sitting down to eat? I sit and eat well" (Or say whatever sentence it is up to you but it should not be forced or obliged)
                      </div>
                      {/* image caoursel*/}
                      <div className="pt-2 w-full">
                        <div className="ml-[-72px] w-[calc(100%+96px)] relative">
                          <Carousel />
                        </div>

                      </div>
                      {/* interactino*/}
                      <div className="">
                        <div className="mt-[6px] ml-[-12px] mb-[4px]">
                          <div className="flex relative">
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="sm" className="px-3 text-ring border-0 border-none hover:bg-neutral-800 rounded-2xl transition duration-200 scale-100 active:scale-[0.87]"  >
                                <Heart className="text-ring" size={20} strokeWidth={1} />
                                <span className="text-ring ml-1 font-normal select-none text-[13px] leading-3">617</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="sm" className="px-3 text-ring border-0 border-none hover:bg-neutral-800 rounded-2xl transition duration-200 scale-100 active:scale-[0.87]"  >
                                <MessageCircle className="text-ring" size={20} strokeWidth={1} />
                                <span className="text-ring ml-1 select-none font-normal text-[13px] leading-3">617</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="sm" className="px-3 text-ring border-0 border-none hover:bg-neutral-800 rounded-2xl transition duration-200 scale-100 active:scale-[0.87]"  >
                                <Repeat2 className="text-ring" size={20} strokeWidth={1} />
                                <span className="select-none text-ring ml-1 font-normal text-[13px] leading-3">617</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="sm" className="px-3 text-ring border-0 border-none hover:bg-neutral-800 rounded-2xl transition duration-200 scale-100 active:scale-[0.87]"  >
                                <Send className="text-ring" size={20} strokeWidth={1} />
                                <span className="text-ring ml-1 font-normal text-[13px] leading-3 select-none">617</span>
                              </Button>
                            </div>

                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  <Separator className=" mx-[-24px] w-[calc(100%+48px)]" />

                </div>
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
