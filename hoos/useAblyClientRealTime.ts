import { useSession } from "next-auth/react" // Assuming you are using next-auth for session
import * as Ably from "ably"

export const useAblyClient = () => {
  const { data: session } = useSession()

  // Ensure clientId is a string or null
  //const clientId = typeof session?.user?.id === 'string' ? session.user.id : '2';
  const clientId = session?.user.id || "4"

  const ablyClient = new Ably.Realtime({
    authUrl: "/api/ably/token",
    authMethod: "POST",
    clientId: clientId,
  })
  return ablyClient
}
