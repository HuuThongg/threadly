"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThreadContent } from "./thread-content"
import { useState } from "react"
import { useAtom } from "jotai"
import { isThreadPostOpenedAtom } from "@/jotai"

export function NewThread() {
  const [open, setOpen] = useAtom(isThreadPostOpenedAtom)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mx-3 flex-1 cursor-pointer justify-start border-0 border-none pl-1 text-nonative focus-visible:outline-0">
          Start a thread ...
        </Button>
      </DialogTrigger>
      <ThreadContent />
    </Dialog>
  )
}
