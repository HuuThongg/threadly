import NextImage from 'next/image';
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ImageCarousel } from "@/components/create-post/imageCarousel"
import { ImageUp } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { SelectedFile } from '@/schema';
import { postFormSchema } from '../thread-content';


export function CommentSection({ setOpen }: { setOpen: (arg: boolean) => void }) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [content, setContent] = useState("")
  const { toast } = useToast()
  const session = useSession()

  function selectImage() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: ''
    }
  })
  const fileRef = form.register("images");


  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    console.log("image", values)
    const formData = new FormData();

    // Convert FileList to array and append files to FormData

    if (values.images && values.images.length > 0) {
      Array.from(values.images).forEach((file: File) => {
        formData.append('images', file);
      });
    }

    // Append content to FormData
    if (values.content) {
      formData.append('content', values.content);
    }


    try {
      const response = await fetch('/api/imageUpload', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error('Failed to upload post');
      }

      setSelectedFiles([]);
      setContent("");
      setOpen(false)

      toast({
        title: "Success",
        description: "Your post has been created!",
      });
    } catch (error) {
      if (error instanceof Error) {
        // Error is an instance of Error
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Error is of unknown type
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }

    }
  }

  const onFileChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const newFiles = Array.from(files)
      .filter((file) => !selectedFiles.some((f) => f.file.name === file.name))
      .map((file) => {
        const url = URL.createObjectURL(file);
        return { file, url, width: 0, height: 0 };
      });

    newFiles.forEach((fileObj) => {
      const img = new Image();
      img.src = fileObj.url;
      img.onload = () => {
        const { width, height } = img;
        setSelectedFiles((prevFiles) => [
          ...prevFiles,
          { ...fileObj, width, height }
        ]);
      };
    });
  }, [selectedFiles]);

  const handleDelete = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <DialogContent className="bg-primary-foreground sm:max-w-[668px]">
      <DialogHeader>
        <DialogTitle className="text-center text-[16px] text-primary">
          Reply
        </DialogTitle>
      </DialogHeader>
      <div className='flex  items-center gap-x-3'>
        <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
          <NextImage
            className="rounded-full"
            src={session?.data?.user?.image || "/defaultAvatar.jpg"}
            alt="logo"
            width={36}
            height={36}
          />
        </div>
        <div className="flex justify-between">
          <div className="font-medium tracking-tighter text-primary">huuthong</div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <div className="relative cursor-pointer text-primary outline-none">
            <div className="grid grid-cols-poster grid-rows-poster">
              <div className="relative col-start-1 row-span-2 row-start-1 pt-1">
                <div className="h-9 w-9 cursor-pointer select-none rounded-full bg-neutral-900">
                  <NextImage
                    className="rounded-full"
                    src={session?.data?.user?.image || "/defaultAvatar.jpg"}
                    alt="logo"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
              <div className="col-start-2 row-start-1 self-start">
                <div className="flex justify-between">
                  <div className="font-medium tracking-tighter">huuthong</div>
                </div>
              </div>
              <div className="col-start-2 row-span-full row-start-2">
                <FormField control={form.control} name='images' render={({ field }) => (
                  <FormItem>
                    <div className="pt-2 cursor-text">
                      <div className="overflow-x-visible pointer-events-auto max-w-[calc(100%-48px)]">
                        {selectedFiles.length > 0 &&

                          <ImageCarousel fileObj={selectedFiles} onDelete={handleDelete} />
                        }
                      </div>
                      <div className='pt-1'>
                        <div className="rounded-full p-3 bg-transparent hover:bg-transparent active:bg-transparent text-nonative group/add -ml-3 focus-visible:ring-0 focus-visible:ring-offset-0 flex cursor-pointer" onClick={selectImage}>
                          <input
                            placeholder="pick files"
                            className=" absolute z-[-1] h-[0.1px] w-[0.1px] cursor-default appearance-none overflow-hidden opacity-0"
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                            {...fileRef}
                            ref={fileInputRef}
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files) return;
                              onFileChange(e)
                              field.onChange(files);
                            }}
                          />
                          <ImageUp className="h-6 w-6 stroke-nonative group-active/add:stroke-nonative/50 stroke-2" />
                          <span className='ml-1 font-normal group-active/add:text-nonative/50'>Add</span>
                        </div>
                      </div>
                    </div>
                  </FormItem>)}
                />
                <FormField control={form.control} name='content' render={({ field }) => (
                  <FormItem>

                    <div className="pt-1 font-sans text-[15px] tracking-tight">
                      <Textarea
                        className="border-0 border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Replying to"
                        rows={4}
                        {...field}
                      />
                    </div>
                  </FormItem>
                )} />
              </div>
            </div>
          </div>
          <DialogFooter className="justify-between sm:justify-between">
            <span className="text-[14px] text-nonative">Any one can reply & quote</span>
            <Button
              variant="outline"
              type="submit"
              className="scale-100 rounded-xl border-2 border-border text-[15px] font-semibold active:scale-[0.96]"
            >
              Post
            </Button>

          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  )
}
