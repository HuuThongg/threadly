import MessageBox from "@/components/message/message-box";

export default function MessageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full pl-[74px] flex flex-nowrap grow shrink-0 justify-start">
      <div className="relative  z-[1] flex w-[360px] min-w-0 max-w-full flex-col ">
        <div className="relative h-full w-full  overflow-hidden bg-secondary-clr ">
          {/* border border-r-[1px] border-b-green-600 border-solid  */}
          <MessageBox messagePath={true} />
        </div>
      </div>
      {children}
    </div>
  )
}
