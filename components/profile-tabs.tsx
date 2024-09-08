import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-primary-foreground p-0">
        <div className="relative flex flex-col items-center">
          <TabsTrigger value="threads" className="relative z-10">
            Threads
          </TabsTrigger>
          <div className="absolute bottom-0 h-[2px] w-full bg-transparent data-[state=active]:bg-red-500"></div>
        </div>

        <TabsTrigger value="replies">Replies</TabsTrigger>
        <TabsTrigger value="reposts">Reports</TabsTrigger>
      </TabsList>
      <Separator className="mx-[-24px] w-[calc(100%+48px)]" />
      <TabsContent value="threads">
        <div>This is threads</div>
      </TabsContent>

      <TabsContent value="replies">
        <div></div>
      </TabsContent>
      <TabsContent value="reposts">
        <div>No reposts yet.</div>
      </TabsContent>
    </Tabs>
  )
}
