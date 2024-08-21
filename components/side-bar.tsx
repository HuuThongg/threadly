import Link from "next/link"
import React from "react"
import { FaHome, FaSearch, FaHeart, FaUser, FaThumbtack } from "react-icons/fa" // Importing FontAwesome icons

const Sidebar = () => {
  return (
    <div className="bg-background flex h-screen w-16 flex-col justify-between text-white">
      <div className="flex flex-col items-center py-4">
        <div className="mb-8">
          <img
            src="/path/to/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-8 w-8"
          />
        </div>
      </div>

      {/* Menu Icons */}
      <div className="flex flex-col items-center space-y-8">
        <Link
          href={"/#"}
          className="cursor-pointer rounded-xl bg-red-200 p-4 hover:bg-slate-500">
          <FaHome size={24} />
        </Link>

        <FaSearch size={24} className="bg-primary" />
        <FaHeart size={24} />
        <FaUser size={24} />
      </div>

      {/* Footer Menu Icons (if any) */}
      <div className="flex flex-col items-center pb-4">
        {/* Add footer icons if needed */}
        <FaThumbtack size={24} />
      </div>
    </div>
  )
}

export default Sidebar
