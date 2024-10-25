import MessageBox from "@/components/message/message-box"

export default function MessageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full shrink-0 grow flex-nowrap justify-start pl-[74px]">
      <div className="relative z-[1] flex w-[360px] min-w-0 max-w-full flex-col">
        <div className="bg-secondary-clr relative h-full w-full overflow-hidden">
          {/* border border-r-[1px] border-b-green-600 border-solid  */}
          <MessageBox messagePath={true} />
        </div>
      </div>
      {children}
    </div>
  )
}
