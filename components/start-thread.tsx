
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
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className="text-nonative cursor-pointer flex-1 mx-3 pl-1 border-0 border-none focus-visible:outline-0 justify-start ">
          Start a thread ...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[668px] bg-primary-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary text-center text-[16px]">New Thread</DialogTitle>
        </DialogHeader>
        <div className="relative outline-none cursor-pointer text-primary" >
          <div className="grid grid-cols-poster grid-rows-poster ">
            <div className="row-start-1 row-span-2 col-start-1 relative pt-1">
              <div className="w-9 h-9 rounded-full select-none cursor-pointer bg-neutral-900 ">
                <Image className="rounded-full" src="/avatar.jpg" alt="logo" width={36} height={36} />
              </div>

            </div>
            <div className="col-start-2 row-start-1 self-start">
              <div className="flex justify-between ">
                <div className="font-medium tracking-tighter">
                  huuthong
                </div>

              </div>
            </div>
            <div className="row-start-2 col-start-2 row-span-full">
              <div className="pt-1 tracking-tight text-[15px] font-sans ">
                <Textarea className="bg-transparent focus-visible:outline-none border-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0  " placeholder="Start a thread..." rows={4} />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className=" justify-between sm:justify-between ">
          <span className="text-nonative text-[14px]">Any one can reply & quote</span>
          <Button variant="outline" type="submit" className="rounded-xl border-2 border-border scale-100 active:scale-[0.96] font-semibold text-[15px]"  >Post</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
