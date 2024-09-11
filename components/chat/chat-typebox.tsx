"use client"
import { v4 as uuidv4 } from "uuid"
import clsx from "clsx"
import TextareaAutosize from "react-textarea-autosize"
import React, { useState } from "react"
import { User } from "@/types"
import { PhoneIcon, PlusCircleIcon, SendHorizonalIcon } from "lucide-react"
import SendMessage from "@/action/post/send_message"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GroupChatMessageProps, MessageType } from "./chat-message"

interface ChatTypeBoxProps {
  chat_group_id: string
  receiver: User
  sender_id: string
}
export interface GroupChatMessageReactQuery {
  pages: Array<{
    messages: Array<MessageType>
    nextCursor?: number
    prevCursor?: number
  }>
  pageParams: Array<any> // or use a more specific type if applicable
}
const ChatTypeBox = ({ chat_group_id, receiver, sender_id }: ChatTypeBoxProps) => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const queryClient = useQueryClient()
  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setIsTyping(inputValue.length > 0)
    setText(inputValue)
  }
  const sendMessageHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      console.log("hellllllllllllllllllllo")
      sendMessageMutaion.mutate()
    }
  }

  const sendMessageMutaion = useMutation({
    mutationFn: async () => {
      await SendMessage({
        chat_group_id,
        receiver_id: receiver.id,
        message: text,
      })
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["group_chat_messages", chat_group_id],
      })
      const previousMessages = queryClient.getQueryData<GroupChatMessageReactQuery>([
        "group_chat_messages",
        chat_group_id,
      ]);

      try {
        // Ensure we have previous messages to work with
        if (!previousMessages) {
          throw new Error("No previous messages found in query cache.");
        }

        // Get the last page index
        const lastPageIndex = previousMessages.pages.length - 1;

        // Construct the new message
        const newMessage: MessageType = {
          group_id: chat_group_id,
          id: uuidv4().toString(),
          sender_id,
          receiver_id: receiver.id,
          message: text,
          isSentByCurrentUser: true,
          sent_at: new Date(),
        };

        // Append the new message to the last page's messages
        const updatedPages = previousMessages.pages.map((page, index) => {
          if (index === lastPageIndex) {
            // Update the last page by appending the new message
            return {
              ...page,
              messages: [...page.messages, newMessage],
            };
          }
          // Return other pages unchanged
          return page;
        });
        // Update pageParams by reversing them to match reversed pages
        const updatedPageParams = [...previousMessages.pageParams].reverse();
        // Set the updated data back into the query cache
        queryClient.setQueryData<GroupChatMessageReactQuery>(
          ["group_chat_messages", chat_group_id],
          {
            ...previousMessages,
            pages: updatedPages,
            pageParams: updatedPageParams,
          }
        );

        // Log the updated data for verification
        const updatedData = queryClient.getQueryData(["group_chat_messages", chat_group_id]);
        console.log("Done updating cache:", updatedData);
      } catch (error) {
        console.error("Error updating cache:", error);
      }
      return { previousMessages }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        ["group_chat_messages", chat_group_id],
        context?.previousMessages,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["group_chat_messages", chat_group_id] })
      setText("")
      setIsTyping(false)
    },
  })
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
