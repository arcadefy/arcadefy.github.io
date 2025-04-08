"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

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
        
        <header className="sticky top-0 z-50 w-full bg-cyan-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-cyan-600">
                                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white">G</div>
                            </div>
                            <span className="hidden text-xl font-bold sm:inline-block">GameHub</span>
                        </Link>
                    </div>

                    <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm mx-4">
                        <Input
                            type="search"
                            placeholder="Search games..."
                            className="pr-10 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>

                    <nav className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-sm font-medium hover:text-cyan-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/categories" className="text-sm font-medium hover:text-cyan-600 transition-colors">
                            Categories
                        </Link>
                        
                    </nav>

                    <div className="flex md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleMenu}>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-cyan-600">
                            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white">G</div>
                        </div>
                        <span className="text-xl font-bold">GameHub</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </div>

                <div className="px-4 py-2">
                    <form onSubmit={handleSearch} className="relative mb-6">
                        <Input
                            type="search"
                            placeholder="Search games..."
                            className="pr-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>

                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/categories"
                            className="flex items-center space-x-2 text-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Categories
                        </Link>
                       
                    </nav>
                </div>
            </div>
        </header>
        </>
    )
}
