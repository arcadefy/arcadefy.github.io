"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, House, Gamepad } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import config from "../../config"
import CategoryTabs from "./category-tabs"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <header className="sticky  top-0 z-50 w-full bg-purple-900 text-secondary shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left - Home Icon */}
                        <div className="flex items-center">

                            <Link href="/" className="flex gap-2 items-center font-bold text-lg">
                                <House size={24} />
                                <span className="hidden sm:inline">Home</span>
                            </Link>



                        </div>

                        {/* Center - Logo or Site Name */}
                        <div className="flex justify-center items-center flex-1">
                            {config.siteLogo ? (
                                <Link href="/" >
                                    <img
                                        src={config.siteLogo}
                                        alt={config.siteName}
                                        className="h-7 object-contain"
                                    />
                                </Link>
                            ) : (
                                <span className="text-lg font-semibold">{config.siteName}</span>
                            )}
                        </div>

                        {/* Right - Nav or Menu */}
                        <div className="flex items-center gap-3">
                            <nav className="hidden md:flex items-center space-x-4">
                                <Link href="/categories" className="font-bold text-lg flex items-center gap-2">
                                    <Gamepad size={28} /> Categories
                                </Link>
                            </nav>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button onClick={toggleMenu} aria-label="Toggle menu">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "fixed inset-0 z-50 bg-purple-900 md:hidden transition-transform duration-300 ease-in-out",
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex h-16 items-center justify-between px-4">
                        <div></div>
                        <button onClick={toggleMenu} aria-label="Close menu">
                            <X className="h-8 w-8" />
                        </button>
                    </div>
                    <div className="py-5 flex justify-center items-center">
                        <nav className="text-center grid justify-center gap-4">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                                Home
                            </Link>
                            <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                                Categories
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <CategoryTabs />
        </>
    )
}
