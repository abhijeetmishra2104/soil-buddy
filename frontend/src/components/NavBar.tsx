'use client'
import { Leaf } from "lucide-react"
import Link from "next/link"
import React from "react"
import { ChatButton } from "./ChatButton"
export const NavBar = () => {
    return(
        <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">SoilCare</span>
            </div>
            <div className="hidden md:flex space-x-6">
                <div className="flex flex-col justify-center items-center">
                    <Link href="/" className="text-green-700 hover:text-green-900 font-medium">
                        Home
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Link href="/learn" className="text-green-700 hover:text-green-900 font-medium">
                        Learn
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Link href="/about" className="text-green-700 hover:text-green-900 font-medium">
                        About
                    </Link>
                </div>
              <ChatButton/>
            </div>
          </div>
        </div>
      </nav>
    )
}
