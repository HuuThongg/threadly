"use client"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { ThreadContent } from "./thread-content"
import { isThreadPostOpenedAtom } from "@/jotai"
import { useAtom } from "jotai"

export function FloatingButton() {
  const [open, setOpen] = useAtom(isThreadPostOpenedAtom)
  return (
    <div className="fixed bottom-6 right-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="scale-100 rounded-lg border-2 border-border p-7 text-[15px] font-semibold active:scale-[0.96]">
            <Plus className="stroke-[3px]" />
          </Button>
        </DialogTrigger>
        <ThreadContent />
      </Dialog>
    </div>
  )
}
