"use client"
import React from "react"
import ChatMessages from "./chat-message"
import ChatTypeBox from "./chat-typebox"
import { User } from "@/types"
import { ChatHeader } from "./chat-header"

export interface Message {
  id: number
  name: string
  url: string
  seen: boolean
  lastMessage: string
}
export interface MessageBox extends Message {
  isOpen: boolean
}

interface ChatProps {
  chat_group_id: string
  receiver: User
}

export const Chat = ({ chat_group_id, receiver }: ChatProps) => {
  return (
    <div className="h-full w-full">
      <div className="relative h-full">
        <div className="h-full" tabIndex={-1}>
          <div className="bg-messenger-card-bg flex h-full w-full flex-col rounded-t-lg text-[0.9375rem] leading-[1.3333] shadow-lg">
            {/* info recieved person */}
            <ChatHeader receiver={receiver} />

            {/* chat container  */}
            <div className="relative flex min-h-0 max-w-full grow flex-col">
              {/* messages */}
              <ChatMessages chat_group_id={chat_group_id} receiver={receiver} />
              {/* type message */}
              <ChatTypeBox chat_group_id={chat_group_id} receiver={receiver} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
