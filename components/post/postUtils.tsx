"use client"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export function PostUtils() {
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                variant="outline"
                size="icon"
                className="self-center rounded-full border-0 border-none text-nonative hover:bg-border">
                <Ellipsis size={16} />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>

          <TooltipContent className="bg-primary-foreground">
            <p className="text-primary">more</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent>hello</PopoverContent>
    </Popover>
  )
}
