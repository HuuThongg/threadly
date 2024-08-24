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
import { AlignLeft, Heart, House, LucideIcon, Search, User } from "lucide-react"

interface SidebarItem {
  nameIcon: LucideIcon
  link: string
}

const Sidebar = () => {
  const pathname = usePathname()
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
      nameIcon: Heart,
      link: "/activity",
    },
    {
      nameIcon: User,
      link: "/user",
    },
  ]
  return (
    <div className="flex h-screen w-[4.75rem] flex-col justify-between bg-background px-2 text-white">
      <div className="flex flex-col items-center py-4">
        <div className="mb-8">
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

      {/* Footer Menu Icons (if any) */}
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
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Sidebar
