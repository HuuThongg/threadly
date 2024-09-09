"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BellIcon,
  CameraIcon,
  FileTextIcon,
  Link2Icon,
  LucideTextSearch,
  ZoomIn,
  VenetianMask,
  WheatIcon,
  ArrowDownUpIcon,
  User as UserIcon,
  ChevronUpIcon,
} from "lucide-react"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { expandChatAtom } from "@/jotai"
import { useAtom } from "jotai"

import { User } from "@/types"
interface ChatSideBarProps {
  group_chat_id: string
  receiver: User
}

export function ChatSideBar({ group_chat_id, receiver }: ChatSideBarProps) {
  const [isExpandChat, _] = useAtom(expandChatAtom)
  const [isOpen, setIsOpen] = useState(false)
  const [isMeidaFileOpen, setIsMeidaFileOpen] = useState(false)
  const imageUrl = "/images/contact/anhkhuong.jpg"
  return (
    <>
      {isExpandChat ? (
        <div className="border-l-media-outer-border bg-secondary-clr min-w-[250px] max-w-[380px] basis-[33.33%] border border-l-2 border-solid">
          <div className="relative flex grow flex-col">
            <div className="flex flex-col">
              {/* top */}
              <div className="flex flex-col">
                <div className="flex justify-center pb-3 pt-4">
                  <Avatar className="h-[80px] w-[80px]">
                    <AvatarImage src={imageUrl || ""} />
                    <AvatarFallback className="bg-sky-500">
                      <UserIcon className="h-7 w-7 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex justify-center px-3">
                  <span className="text-primary-text">User name</span>
                </div>
                <div className="m-0 flex justify-center gap-x-5 px-3 pt-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
                      <UserIcon className="h-6 w-6 text-white" />
                    </span>

                    <div>
                      <span className="text-primary-text font-sans text-[14px]">
                        Profile
                      </span>
                    </div>
                  </div>
                  {/* notification */}
                  <Dialog>
                    <div className="flex flex-col items-center justify-center">
                      <DialogTrigger asChild>
                        <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
                          <BellIcon className="h-6 w-6 text-white" />
                        </span>
                      </DialogTrigger>
                      <DialogContent className="bg-secondary-clr text-primary-text">
                        <DialogHeader>
                          <DialogTitle className="flex justify-center pb-2 text-2xl">
                            Mute conversation
                          </DialogTitle>
                          <RadioGroup
                            defaultValue="comfortable"
                            className="flex flex-col space-y-5">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="default" id="r1" />
                              <Label htmlFor="r1" className="text-base">
                                Mute message notifications
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label className="text-base" htmlFor="r2">
                                Mute call notifications
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label className="text-base" htmlFor="r3">
                                Mute message and call notifications
                              </Label>
                            </div>
                          </RadioGroup>
                          <DialogDescription className="text-secondary-text pt-2">
                            Chat windows will stayed closed, when you won&apos;t get push
                            notifications on your devices
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                      <div>
                        <span className="text-primary-text font-sans text-[14px]">
                          mute
                        </span>
                      </div>
                    </div>
                  </Dialog>
                  <div className="flex flex-col items-center justify-center">
                    <span className="bg-third-clr hover:bg-third-clr aspect-square cursor-pointer overflow-hidden rounded-full p-2">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </span>

                    <div>
                      <span className="text-primary-text font-sans text-[14px]">
                        Search
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* bottom */}
              <div className="text-primary-text flex flex-col space-y-2 px-2 pt-2 font-sans">
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full space-y-2">
                  <div className="flex items-center justify-between space-x-4">
                    <CollapsibleTrigger asChild>
                      <div className="hover:bg-hover-overlay flex grow cursor-pointer select-none justify-between rounded-sm px-2 py-2 font-sans">
                        <h4 className="text-base font-semibold">Customize chat</h4>
                        <Button variant="ghost" size="sm" className="m-0 p-0">
                          <ArrowDownUpIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <WheatIcon className="h-4 w-4" />
                        <span>Change chat name</span>
                      </div>
                    </div>
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <VenetianMask className="h-4 w-4" />
                        <span>Change photo</span>
                      </div>
                    </div>
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <LucideTextSearch className="h-4 w-4" />
                        <span>Edit nicknames</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible
                  open={isMeidaFileOpen}
                  onOpenChange={setIsMeidaFileOpen}
                  className="w-full space-y-2">
                  <div className="flex items-center justify-between space-x-4">
                    <CollapsibleTrigger asChild>
                      <div className="hover:bg-hover-overlay flex grow cursor-pointer select-none justify-between rounded-sm px-2 py-2 font-sans">
                        <h4 className="text-base font-semibold">
                          Media, files and links
                        </h4>
                        <Button variant="ghost" size="sm" className="m-0 p-0">
                          <ChevronUpIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <CameraIcon className="h-4 w-4" />
                        <span>Media</span>
                      </div>
                    </div>
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <FileTextIcon className="h-4 w-4" />
                        <span>Files</span>
                      </div>
                    </div>
                    <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Link2Icon className="h-4 w-4" />
                        <span>Links</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
