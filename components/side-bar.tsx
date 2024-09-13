"use client"
import Link from "next/link"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  AlignLeft,
  Heart,
  House,
  LucideIcon,
  MessageSquare,
  Search,
  User,
} from "lucide-react"
import { useSession, signOut, signIn } from "next-auth/react"

interface SidebarItem {
  nameIcon: LucideIcon
  link: string
}

const Sidebar = () => {
  const pathname = usePathname()

  const session = useSession()
  const sidebarConstanst: SidebarItem[] = [
    {
      nameIcon: House,
      link: "/",
    },
    {
      nameIcon: Search,
      link: "/search",
    },
    {
      nameIcon: MessageSquare,
      link: "/messages/direct",
    },
    {
      nameIcon: Heart,
      link: "/activity",
    },
    {
      nameIcon: User,
      link: `/${session.data?.user?.handle}`,
    },
  ]
  return (
    <div className="fixed top-0 flex h-screen w-[4.75rem] flex-col justify-between bg-background px-2 text-white">
      <div className="flex flex-col items-center py-4">
        <div className="mb-8 cursor-pointer rounded-md p-2">
          <p className="font-serif font-extrabold italic">R&R</p>
        </div>
      </div>

      {/* Menu Icons */}
      <div className="flex flex-col items-center space-y-4">
        {sidebarConstanst.map(({ nameIcon: IconComponent, link }) => {
          const isActive =
            pathname === link || (link !== "/" && pathname.startsWith(link))
          return (
            <Link
              href={link}
              key={link}
              className={cn(
                "cursor-pointer rounded-xl p-4 text-nonative hover:bg-primary-foreground hover:text-foreground",
                {
                  "bg-primary-foreground text-foreground": isActive,
                  "bg-transparent": !isActive,
                },
              )}>
              <IconComponent size={24} />
            </Link>
          )
        })}
      </div>
      {session.status === "authenticated" ? (
        <div className="flex flex-col items-center pb-4">
          {/* Add footer icons if needed */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-xl p-4 text-nonative hover:text-foreground focus-visible:outline-0">
              <AlignLeft size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mb-[-16px] ml-6 w-56 rounded-[16px] bg-primary-foreground p-2 text-primary">
              <DropdownMenuItem className="rounded-xl px-2 py-4 text-[15px] font-semibold text-primary hover:bg-secondary">
                Apperance
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl px-2 py-4 text-[15px] font-semibold text-primary hover:bg-secondary">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl px-2 py-4 text-[15px] font-semibold text-primary hover:bg-secondary">
                <button onClick={() => signOut()}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="mb-4 size-14 bg-transparent"></div>
      )}
      {/* Footer Menu Icons (if any) */}
    </div>
  )
}

export default Sidebar
