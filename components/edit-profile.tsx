import { Button } from "./ui/button"
import { Lock, UserPlus, ToggleLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EditProfile() {
  return (
    <div className="pb-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <div className="text-primary">Edit profile</div>
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#101010] text-[15px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-left">Name</DialogTitle>
            <DialogDescription>
              <div className="text-primary flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <div className="flex items-center pr-2">
                    <Lock size={14} />
                  </div>
                  <span>(@nganle_)</span>
                </div>
                <div className="size-[52px] rounded-full bg-[#1E1E1E] py-0">
                  <div className="flex justify-center pt-[7px]">
                    <UserPlus size={35} />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Separator className="w-[calc(100%-48px)]" />
          <DialogHeader>
            <DialogTitle className="text-primary text-left">Bio</DialogTitle>
            <DialogDescription>
              <div className="text-primary text-left">
                <span>Wake up early to be successful</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <DialogHeader>
            <DialogTitle className="text-primary text-left">Link</DialogTitle>
            <DialogDescription>
              <Textarea
                className="text-primary line-clamp-3 rounded-none border-0 border-none bg-transparent p-0 text-left shadow-none focus-visible:border-0 focus-visible:border-none focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="+ Add link"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogTrigger asChild>
            <Button>
              <div>Done</div>
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  )
}
