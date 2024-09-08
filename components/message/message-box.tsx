
'use client';
import React from 'react';
import Link from 'next/link';
import { Search, ZoomIn } from 'lucide-react';
import clsx from 'clsx'; import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Messages from './Message';

interface MessageBoxProps {
  messagePath?: boolean;
}
const MessageBox = ({ messagePath = false }: MessageBoxProps) => {

  return (
    <Popover>

      <div
        className={clsx(`flex flex-col  justify-between`, {
          'h-[calc(100vh-57px)]': !messagePath,
          'h-full': messagePath,
        })}
      >
        <div className="relative flex grow-0 flex-col justify-start overflow-hidden h-full">
          <div className="relative flex shrink grow flex-col overflow-hidden h-full">
            <div className='h-full'>
              <div className="text-primary-text size-full flex flex-col">
                <div className=" px-4 ">
                  <PopoverTrigger asChild >
                    <label
                      htmlFor=""
                      className="flex w-full min-w-[40px] rounded-2xl  bg-third-clr align-baseline text-sm font-semibold outline-none"
                    >
                      <span className="my-auto pl-[10px]">
                        <ZoomIn className="h-4 w-4 text-primary-text" />
                      </span>
                      {/* input */}
                      <input
                        className="h-[36px] min-h-0 w-full min-w-0 shrink grow basis-auto cursor-text rounded-full bg-transparent px-[6px] pb-[9px] pt-[7px] text-sm font-semibold text-primary-text outline-none  "
                        placeholder="Search Messenger" type='search'
                      />
                    </label>
                  </PopoverTrigger>
                  <PopoverContent className='bg-black w-[360px] h-[700px]' >
                    {/*<SearchBox /> */} Search Box
                  </PopoverContent>
                </div>
                <div className="mt-1 px-4 py-2">
                  <div className=" box-border flex h-[36px] ">
                    <div className="relative   h-full">
                      <div className="flex h-full w-full items-center justify-start">
                        <div className="flex h-full w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-primary-deemphasized-bt-bg px-3  font-semibold leading-5 hover:bg-primary-deemphasized-bt-hover">
                          <span className="text-[15px]relative overflow-hidden text-ellipsis break-words text-primary-deemphasized-bt-text ">
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
            {/*<Messages />*/}
          </div>
        </div>
        {messagePath === false ? (
          <div className="pointer-auto  w-full   shrink-0 border-t  border-slate-700 bg-transparent py-[16px]">
            <span className="mx-auto block w-full text-center text-xs">
              <Link
                href="/messages"
                className="inline   w-fit  cursor-pointer text-base font-semibold leading-6 text-blue-link hover:underline"
              >
                See all In Messenger
              </Link>
            </span>
          </div>
        ) : null}
      </div>
    </Popover>
  );
};

export default MessageBox;
