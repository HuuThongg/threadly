import { Link, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60xp] w-full items-center justify-center">
            <p className="m-4">Search</p>
          </div>

          <div>
            <main className="bg-primary-foreground border-border flex flex-col rounded-3xl border p-6">
              <div className="border-border bg-background mb-4 flex flex-row items-center space-x-1 rounded-2xl border-[1px] pl-4">
                <Search size={22} />
                <Input
                  type=""
                  placeholder="Search"
                  className="text-primary rounded-none border-0 border-none bg-transparent shadow-none focus-visible:border-0 focus-visible:border-none focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="text-nonative py-3">
                <p>Follows suggestions</p>
              </div>

              {[...Array(15)].map((_, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="flex w-full flex-row py-3">
                    <div className="border-border mt-1 size-9 scale-100 cursor-pointer select-none overflow-hidden rounded-full">
                      <Image
                        className="aspect-square w-full rounded-full object-cover"
                        src="/ngan.jpg"
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
