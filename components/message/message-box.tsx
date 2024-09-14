"use client"
import React from "react"
import Link from "next/link"
import { Search, ZoomIn } from "lucide-react"
import clsx from "clsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Messages from "./Message"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { FindUser } from "@/app/messages/_components/find-user"

interface MessageBoxProps {
  messagePath?: boolean
}
const MessageBox = ({ messagePath = false }: MessageBoxProps) => {
  return (
    <Dialog>
      <div
        className={clsx(`flex flex-col justify-between`, {
          "h-[calc(100vh-57px)]": !messagePath,
          "h-full": messagePath,
        })}>
        <div className="relative flex h-full grow-0 flex-col justify-start overflow-hidden">
          <div className="relative flex h-full shrink grow flex-col overflow-hidden">
            <div className="">
              <div className="text-primary-text flex size-full flex-col">
                <div className="px-4">
                  <DialogTrigger asChild>
                    <label
                      htmlFor=""
                      className="bg-third-clr flex w-full min-w-[40px] rounded-2xl align-baseline text-sm font-semibold outline-none">
                      <span className="my-auto pl-[10px]">
                        <ZoomIn className="text-primary-text h-4 w-4" />
                      </span>
                      {/* input */}
                      <input
                        className="text-primary-text h-[36px] min-h-0 w-full min-w-0 shrink grow basis-auto cursor-text rounded-full bg-transparent px-[6px] pb-[9px] pt-[7px] text-sm font-semibold outline-none"
                        placeholder="Search Messenger"
                        type="search"
                      />
                    </label>
                  </DialogTrigger>
                  <DialogContent className="h-full max-h-[calc(100%-40px)] w-full sm:max-h-[calc(100%-400px)]">
                    <DialogHeader className="text-primary sm:text-center">
                      New Message
                    </DialogHeader>
                    <FindUser />
                  </DialogContent>
                </div>
                <div className="mt-1 px-4 py-2">
                  <div className="box-border flex h-[36px]">
                    <div className="relative h-full">
                      <div className="flex h-full w-full items-center justify-start">
                        <div className="bg-primary-deemphasized-bt-bg hover:bg-primary-deemphasized-bt-hover flex h-full w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[18px] px-3 font-semibold leading-5">
                          <span className="text-[15px]relative text-primary-deemphasized-bt-text overflow-hidden text-ellipsis break-words">
                            Messages
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* each person  */}
            <Messages />
          </div>
        </div>
        {messagePath === false ? (
          <div className="pointer-auto w-full shrink-0 border-t border-slate-700 bg-transparent py-[16px]">
            <span className="mx-auto block w-full text-center text-xs">
              <Link
                href="/messages"
                className="text-blue-link inline w-fit cursor-pointer text-base font-semibold leading-6 hover:underline">
                See all In Messenger
              </Link>
            </span>
          </div>
        ) : null}
      </div>
    </Dialog>
  )
}

export default MessageBox
