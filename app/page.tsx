import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Heart } from "lucide-react";
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
                <div className="flex-1 mx-2 pl-1">
                  <span className="text-nonative cursor-text">Start a thread... </span>
                </div>
                <Button variant="outline" className="rounded-xl border-2 border-border scale-100 active:scale-[1.15]"  >Post</Button>
              </div>
              <Separator className="mx-[-24px]" />
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
                      <div className="flex justify-between items-center">
                        <div>
                          dsad
                        </div>
                        <div>....</div>
                      </div>
                    </div>
                    <div className="row-start-2 col-start-2 row-span-2 ">
                      Mothers, have you "dared" to starve your children before, if your children are lazy to eat, try this way. But first, the moms have to keep the "spirit of steel".
                      During the main meal, if the child refuses to eat, the moms implement the rule of 3 chances (ask your child 1st time: “Are you seriously sitting down to eat? I sit and eat well" (Or say whatever sentence it is up to you but it should not be forced or obliged)                    </div>
                    {/* interactino*/}
                    <div className="col-start-2 row-start-4">
                      <div className="mt-[6px] ml-[-8px] mb-[-4px]">
                        <div className="flex relative">
                          {[...Array(3)].map((_, index) => (
                            <div className="flex items-center justify-center" key={index}>
                              <Button variant="outline" size="lg" className="bg-blue-500"  >
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
