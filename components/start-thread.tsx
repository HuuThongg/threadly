import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Textarea } from "./ui/textarea"

export function StartThread() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mx-3 flex-1 cursor-pointer justify-start border-0 border-none pl-1 text-nonative focus-visible:outline-0">
          Start a thread ...
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground sm:max-w-[668px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[16px] text-primary">
            New Thread
          </DialogTitle>
        </DialogHeader>
        <div className="relative cursor-pointer text-primary outline-none">
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
                <div className="font-medium tracking-tighter">huuthong</div>
              </div>
            </div>
            <div className="col-start-2 row-span-full row-start-2">
              <div className="pt-1 font-sans text-[15px] tracking-tight">
                <Textarea
                  className="border-0 border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Start a thread..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="justify-between sm:justify-between">
          <span className="text-[14px] text-nonative">Any one can reply & quote</span>
          <Button
            variant="outline"
            type="submit"
            className="scale-100 rounded-xl border-2 border-border text-[15px] font-semibold active:scale-[0.96]">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
