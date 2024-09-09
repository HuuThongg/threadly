"use client"
import Link from "next/link"
import Image from "next/image"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

import { useAtom } from "jotai"
import { expandChatAtom } from "@/jotai"
import { User } from "@/types"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDown,
  ChevronUp,
  DivideIcon,
  PhoneIcon,
  Search,
  VideoIcon,
} from "lucide-react"
interface ChatHeaderProps {
  receiver: User
}
export const ChatHeader = ({ receiver }: ChatHeaderProps) => {
  const [search, setSearch] = useState("")
  const [isExpandChat, setIsExpandChat] = useAtom(expandChatAtom)

  return (
    <div className="flex shrink-0 flex-col">
      <div className="relative z-[2] box-content flex h-8 shrink-0 select-none items-center justify-between overflow-hidden rounded-t-lg p-2 shadow-md">
        <div className="relative z-0 -ml-[6px] box-border flex shrink grow basis-0 flex-nowrap items-center">
          <div className="flex">
            <button className="group/head hover:bg-third-clr relative m-0 mr-2 inline-flex min-w-0 basis-auto rounded-md p-0 transition-colors delay-75">
              <div className="flex min-w-0 max-w-full shrink-0 flex-col rounded-md p-[6px]">
                <div className="-my-[6px] flex shrink-0 flex-nowrap items-center justify-between">
                  <div className="flex items-center py-[6px]">
                    <div className="item-center relative -m-[6px] flex shrink grow justify-between">
                      <Link
                        href={"#"}
                        tabIndex={-1}
                        className="hover:bg-fourth-clr m-0 flex rounded-md border-0 border-none p-0">
                        <div className="w- relative box-border flex min-w-0 shrink-0 items-center justify-center p-[6px]">
                          <div className="flex aspect-square h-8 overflow-hidden rounded-full">
                            <Image
                              className="h-full w-full object-cover"
                              src={receiver.image ?? "/defaultAvatar.jpg"}
                              alt="avatar"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="relative flex min-w-0 max-w-full shrink grow px-[2px] py-[6px]">
                        <div className="flex min-h-[26px] max-w-full grow flex-col items-start justify-center">
                          <h1 className="flex min-w-0 max-w-full outline-none">
                            <span className="text-primary-text min-w-0 max-w-full break-words text-center font-bold">
                              {/* {item.name} */}
                              {receiver.name}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>

                    <ChevronDown className="fill-disabled-icon h-[15px] w-[15px] pl-2" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <ul className="-mr-1 flex items-center bg-transparent">
          <li className="p-[1px]">
            <div className="hover:bg-third-clr pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-2">
              <PhoneIcon className="h-5 w-5 stroke-[3px] text-blue-500" />
            </div>
          </li>
          <li className="p-[1px]">
            <div className="hover:bg-third-clr pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-2">
              <VideoIcon className="h-5 w-5 stroke-[3px] text-blue-500" />
            </div>
          </li>
          {/* <li className="p-[1px]">
            <div
              className="pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px] hover:bg-third-clr  "
              onClick={() => handleMinimizeMessageBox(item.id)}
            >
              <MinusIcon className=" w- h-5 text-disabled-icon" />
            </div>
          </li> */}
          <li className="p-[1px]">
            <div
              className="hover:bg-third-clr pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px]"
              onClick={() => {
                setIsExpandChat(!isExpandChat)
              }}>
              {isExpandChat ? (
                <ArrowRightIcon className="h-5 w-5 stroke-[3px] text-blue-500" />
              ) : (
                <ArrowLeftIcon className="h-5 w-5 stroke-[3px] text-blue-500" />
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="relative z-[2] box-content flex h-8 min-w-0 shrink-0 select-none items-center justify-between overflow-hidden rounded-t-lg p-2 shadow-md">
        {/* search */}
        <div className="relative flex max-w-full shrink grow flex-col p-[6px]">
          <label
            htmlFor=""
            className={cn(
              "bg-third-clr hover:bg-fourth-clr relative flex min-h-[40px] w-full min-w-[40px] items-stretch rounded-[50px] align-middle text-xs font-semibold outline-none",
            )}
            aria-label="choose a search"
            aria-describedby="search input label">
            <span className="pointer-events-none flex items-center whitespace-nowrap pl-3 ease-linear">
              <Search className="text-primary-text h-4 w-4" />
            </span>
            <input
              type="text"
              className={cn(
                `text-primary-text placeholder:text-secondary-text h-[40px] w-full shrink grow basis-auto cursor-text rounded-[50px] bg-transparent px-2 pb-[9px] pt-[7px] text-left text-[15px] font-normal`,
              )}
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value)
              }}
            />
          </label>
        </div>
        {/* down up  */}
        <div className="flex flex-col items-center justify-center p-[6px]">
          <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
            <ChevronUp className="h-4 w-4 text-white" />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-[6px]">
          <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
            <ChevronDown className="h-4 w-4 text-white" />
          </span>
        </div>
        {/* close */}
        <div className="flex flex-col items-center justify-center p-[6px]">
          <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
            <DivideIcon className="h-4 w-4 text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}
