"use client"
import clsx from "clsx"
import TextareaAutosize from "react-textarea-autosize"
import React, { useState } from "react"
import { User } from "@/types"
import { PhoneIcon, PlusCircleIcon, SendHorizonalIcon } from "lucide-react"
import SendMessage from "@/action/post/send_message"

interface ChatTypeBoxProps {
  chat_group_id: string
  receiver: User
}
const ChatTypeBox = ({ chat_group_id, receiver }: ChatTypeBoxProps) => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setIsTyping(inputValue.length > 0)
    setText(inputValue)
  }
  const sendMessageHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      await SendMessage({
        chat_group_id,
        receiverId: receiver.id,
        message: text,
      })
      console.log("Submit text:", text)
      setText("")
    }
  }
  return (
    <div className="flex items-end py-3 leading-4 text-[0.9375] shadow-md">
      {/* more */}
      <div className="hover:bg-third-clr m-1 min-w-0 shrink-0 grow-0 basis-auto overflow-hidden rounded-full p-1">
        <div className="pointer-events-auto box-border flex cursor-pointer items-center">
          <PlusCircleIcon className="text-disabled-icon h-5 w-5" />
        </div>
      </div>
      {/* input message */}

      <div className="relative -ml-1 min-w-0 grow basis-0 overflow-x-hidden">
        <div
          className={clsx(
            `absolute bottom-0 left-0 z-[1] mb-1 mr-1 flex items-center justify-center transition-transform delay-100`,
            {
              "scale-0": isTyping,
              "scale-100": !isTyping,
            },
          )}>
          <input type="file" multiple className="hidden" />
          <div className="hover:bg-third-clr min-w-0 shrink-0 grow-0 basis-auto overflow-hidden rounded-full p-1">
            <div className="pointer-events-auto box-border flex cursor-pointer items-center">
              <PhoneIcon className="text-disabled-icon h-5 w-5" />
            </div>
          </div>
        </div>
        <div
          className={clsx(`flex transition-[margin]`, {
            "ml-[36px]": !isTyping,
            "ml-0": isTyping,
          })}>
          <div className="bg-comment-bg box-border min-w-0 grow rounded-[20px]">
            <div className="flex w-full flex-col flex-wrap justify-start">
              <div className="relative m-2 mr-3 flex min-w-0">
                <TextareaAutosize
                  minRows={1}
                  maxRows={6}
                  placeholder="Aa"
                  value={text}
                  style={{ height: 17 }}
                  className="text-primary-text grow resize-none overflow-x-hidden bg-transparent"
                  onChange={onChangeInputText}
                  onKeyDown={(e) => sendMessageHandler(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* send message */}
      <div className="inline-flex grow-0">
        <button
          title="send message"
          className="hover:bg-third-clr mx-1 min-w-0 shrink-0 grow-0 basis-auto cursor-pointer overflow-hidden rounded-full p-2"
          type="submit"
          onClick={sendMessageHandler}>
          <SendHorizonalIcon className="fill-disabled-icon h-5 w-5 stroke-transparent" />
        </button>
      </div>
    </div>
  )
}

export default ChatTypeBox
