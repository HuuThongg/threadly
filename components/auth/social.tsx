"use client"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Chrome, Github } from "lucide-react"
import { signIn } from "next-auth/react"

export function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  console.log("callbackUrl", callbackUrl)
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || "/",
    })
  }
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-y-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}>
        <Chrome className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}>
        <Github className="h-5 w-5" />
      </Button>
    </div>
  )
}
