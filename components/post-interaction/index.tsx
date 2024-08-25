
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react"
export function PostInteraction() {
  function handleLikePost() {
    console.log("handleLikePost")
  }

  function handleRepost() {
    console.log("handleRepost")
  }

  return (

    <div className="">
      <div className="mb-[4px] ml-[-12px] mt-[6px]">
        <div className="relative flex">
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <Heart className="text-ring" size={20} strokeWidth={1} />
              <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                617
              </span>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <MessageCircle
                className="text-ring"
                size={20}
                strokeWidth={1}
              />
              <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                617
              </span>
            </Button>
          </div>
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <Repeat2
                className="text-ring"
                size={20}
                strokeWidth={1}
              />
              <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                617
              </span>
            </Button>
          </div>
          <div className="flex items-center justify-center" >
            <Button
              variant="outline"
              size="sm"
              className="scale-100 rounded-2xl border-0 border-none px-3 text-ring transition duration-200 hover:bg-neutral-800 active:scale-[0.87]">
              <Send
                className="text-ring"
                size={20}
                strokeWidth={1}
              />
              <span className="ml-1 select-none text-[13px] font-normal leading-3 text-ring">
                617
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
