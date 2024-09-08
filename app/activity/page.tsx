import { ChevronDown, Link, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <p className="m-4">Activity</p>
            <div className="bg-primary-foreground text-primary hover:border-ring scale-100 cursor-pointer rounded-full border p-1 hover:scale-110">
              <ChevronDown size={20} />
            </div>
          </div>

          <div>
            <main className="bg-primary-foreground border-border flex flex-col rounded-3xl border p-6">
              {[...Array(15)].map((_, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="flex w-full flex-row py-3">
                    <div className="border-border size-9 scale-100 cursor-pointer select-none rounded-full pt-1">
                      <Image
                        className="rounded-full"
                        src="/avatar.jpg"
                        alt="logo"
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="ml-3 flex flex-1 flex-row justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-primary">salimhwg</h1>
                        <p className="text-nonative">Salim</p>
                        <p className="text-primary pt-1">418K followers</p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          className="border-border scale-100 rounded-xl border-2 active:scale-[1.15]">
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="mx-[48px] w-[calc(100%-24px)]" />
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}