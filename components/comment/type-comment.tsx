"use client"
import React, { useCallback, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { ImagesIcon, LaughIcon, SendHorizonalIcon, UserIcon } from "lucide-react"
import { SelectedFile } from "@/schema"
import { useToast } from "../ui/use-toast"
import { useSession } from "next-auth/react"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ImageCarousel } from "../create-post/imageCarousel"

interface TypeCommentProps {
  post_id: string
  parent_comment_id?: string | null
}

export const commentFormSchema = z.object({
  content: z.string().optional(),
  images: z
    .unknown()
    .transform((value) => {
      return value as FileList
    })
    .optional(),
  post_id: z.string(),
  parent_comment_id: z.string().optional().nullable(),
})

const TypeComment = ({ post_id, parent_comment_id = null }: TypeCommentProps) => {
  const [isWritingCommentOpen, setIsWritingCommentOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const { toast } = useToast()
  const session = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      post_id: post_id,
      parent_comment_id: parent_comment_id,
    },
  })

  const { control, handleSubmit, setValue, getValues } = form

  const onSubmit = async (values: z.infer<typeof commentFormSchema>) => {
    const formData = new FormData()

    if (values.images && values.images.length > 0) {
      Array.from(values.images).forEach((file: File) => {
        formData.append("images", file)
      })
    }

    if (values.content) {
      formData.append("content", values.content)
    }

    formData.append("post_id", post_id)
    if (parent_comment_id) {
      formData.append("parent_comment_id", parent_comment_id)
    }

    try {
      const response = await fetch("/api/post/comment", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to upload post")
      }

      setSelectedFiles([])
      setValue("content", "")
      toast({
        title: "Success",
        description: "Comment posted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      const newFiles = Array.from(files)
        .filter((file) => !selectedFiles.some((f) => f.file.name === file.name))
        .map((file) => {
          const url = URL.createObjectURL(file)
          return { file, url, width: 0, height: 0 }
        })

      newFiles.forEach((fileObj) => {
        const img = new Image()
        img.src = fileObj.url
        img.onload = () => {
          const { width, height } = img
          setSelectedFiles((prevFiles) => [...prevFiles, { ...fileObj, width, height }])
        }
      })

      // Update form values
      setValue("images", files)
    },
    [selectedFiles, setValue],
  )

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(onSubmit)()
  }

  const handleDelete = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }
  console.log("selectedFiles", selectedFiles)

  return (
    <div>
      <div className="my-1 px-4">
        <div className="relative flex items-start">
          {/* avatar */}
          <div className="mr-[6px] mt-[2px]">
            <button
              className="relative m-0 inline-flex min-h-0 min-w-0 rounded-full p-0"
              tabIndex={-1}
              aria-hidden="true">
              <div className="relative flex h-[32px] w-[32px] items-stretch">
                <Avatar className="size-full">
                  <AvatarImage src={session.data?.user.image || ""} />
                  <AvatarFallback className="bg-sky-400">
                    <UserIcon className="h-6 w-6 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <form
              onSubmit={handleSubmitForm}
              className="bg-third-clr relative m-0 flex grow flex-wrap justify-between rounded-2xl p-0 text-xs">
              <div className="pointer-events-auto w-full overflow-x-visible">
                {selectedFiles.length > 0 && (
                  <ImageCarousel fileObj={selectedFiles} onDelete={handleDelete} />
                )}
              </div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    minRows={1}
                    maxRows={6}
                    placeholder="Write a comment..."
                    style={{ height: 45 }}
                    className={`text-primary-text scrollbar-thumb-fifth-clr scrollbar-w-2 scrollbar-thumb-rounded-md grow resize-none bg-transparent px-3 py-2 scrollbar scrollbar-track-transparent hover:scrollbar-track-[#2c2d2f]`}
                    onFocus={() => setIsWritingCommentOpen(true)}
                    onKeyDown={handleKeyDown}
                  />
                )}
              />

              {/* Icons, images */}
              {isWritingCommentOpen && (
                <div className="flex w-full pb-[6px]">
                  <div className="flex w-full flex-wrap items-center justify-between px-2">
                    <ul className="-ml-1 flex h-[36px] items-center p-1 text-xs">
                      <li className="hover:bg-fourth-clr -mx-[3px] flex h-full w-[32px] items-center justify-center rounded-full">
                        <span>
                          <LaughIcon className="stroke-secondary-text h-4 w-4 stroke-2" />
                        </span>
                      </li>
                      <li className="hover:bg-fourth-clr -mx-[3px] flex h-full w-[32px] items-center justify-center rounded-full">
                        <div className="pt-1">
                          <div
                            className="group/add -ml-3 flex cursor-pointer rounded-full bg-transparent p-3 text-nonative hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 active:bg-transparent"
                            onClick={() => fileInputRef.current?.click()}>
                            <input
                              placeholder="pick files"
                              className="absolute z-[-1] h-[0.1px] w-[0.1px] cursor-default appearance-none overflow-hidden opacity-0"
                              type="file"
                              multiple
                              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                            />
                            <ImagesIcon className="h-6 w-6 stroke-nonative stroke-2 group-active/add:stroke-nonative/50" />
                          </div>
                        </div>
                      </li>
                    </ul>
                    <button
                      type="submit"
                      title="Post Comment"
                      className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-500">
                      <span>
                        <SendHorizonalIcon className="stroke-secondary-text h-4 w-4 stroke-2" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypeComment
