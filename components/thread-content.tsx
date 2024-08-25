import NextImage from 'next/image';
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "./ui/textarea"
import { ImageCarousel } from "./create-post/imageCarousel"
import { ImagePlus, ImageUp } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import { useSetAtom } from 'jotai';
import { isThreadPostOpenedAtom } from '@/jotai';
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
export interface SelectedFile {
  file: File;
  url: string;
  width: number;
  height: number;
}




export function ThreadContent() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const { toast } = useToast()
  const session = useSession()
  const setOpen = useSetAtom(isThreadPostOpenedAtom)
  function selectImage() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    console.log("new FIle", newFiles)

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
          New Thread
        </DialogTitle>
      </DialogHeader>
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
            <div className="pt-2 cursor-text">
              <div className="overflow-x-visible pointer-events-auto max-w-[calc(100%-48px)]">
                {selectedFiles.length > 0 &&

                  <ImageCarousel fileObj={selectedFiles} onDelete={handleDelete} />
                }

              </div>
              <div className='pt-1'>
                <Button className="rounded-full p-3 bg-transparent hover:bg-transparent active:bg-transparent text-nonative group/add -ml-3" onClick={selectImage}>
                  <input
                    placeholder="pick files"
                    className=" absolute z-[-1] h-[0.1px] w-[0.1px] cursor-default appearance-none overflow-hidden opacity-0"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                    name="imageUrl"
                    ref={fileInputRef}
                    onChange={onFileChange}
                  />
                  <ImageUp className="h-6 w-6 stroke-nonative group-active/add:stroke-nonative/50 stroke-2" />
                  <span className='ml-1 font-normal group-active/add:text-nonative/50'>Add</span>
                </Button>
              </div>
            </div>
            <div className="pt-1 font-sans text-[15px] tracking-tight">
              <Textarea
                className="border-0 border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Start a thread..."
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="justify-between sm:justify-between">
        <span className="text-[14px] text-nonative">Any one can reply & quote</span>
        <Button
          variant="outline"
          type="submit"
          className="scale-100 rounded-xl border-2 border-border text-[15px] font-semibold active:scale-[0.96]"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default form submission

            wait().then(() => {
              setOpen(false);
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              });
            });
          }}
        >
          Post
        </Button>

      </DialogFooter>
    </DialogContent >
  )
}
