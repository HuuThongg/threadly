import { auth } from "@/auth"
import { Provider as JotaiProvider } from "jotai"
import { SessionProvider } from "next-auth/react"
export async function Provider({ children }: { children: React.ReactNode }) {
  const session = await auth()
  console.log("session", session)
  return (
    <SessionProvider session={session}>
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </SessionProvider>
  )
}
