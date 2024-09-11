import { auth } from "@/auth"
import { Chat } from "@/components/chat"
import { ChatSideBar } from "@/components/chat/chat-sidebar"
import { getReceiverByChatGroupId } from "@/db/query"
import { ScrollArea } from "@radix-ui/react-scroll-area"
export default async function MessagePage({
  params,
}: {
  params: { chat_group_id: string }
}) {
  //const supabase = createClient(
  const chat_group_id = params.chat_group_id

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return null
  const reciever = await getReceiverByChatGroupId(userId, chat_group_id)

  return (
    <div className="relative z-0 flex max-h-[calc(100vh-58px)] min-w-0 max-w-full shrink grow basis-0 flex-col">
      <div className="flex min-w-0 shrink grow basis-0 flex-nowrap items-stretch justify-between">
        <div className="flex min-w-0 max-w-full shrink grow basis-0 flex-col overflow-hidden">
          <ScrollArea className="h-[calc(100vh-58px)] w-full rounded-none border-l border-slate-600">
            <Chat chat_group_id={chat_group_id} receiver={reciever} sender_id={userId} />
          </ScrollArea>
        </div>
        <ChatSideBar receiver={reciever} chat_group_id={chat_group_id} />
      </div>
    </div>
  )
}
