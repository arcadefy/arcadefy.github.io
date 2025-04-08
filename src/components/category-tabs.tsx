"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { getCategories } from "@/lib/categories"

interface Category {
    id: string
    name: string
}

export default function CategoryTabs() {
    const pathname = usePathname()
    const activeCategory = pathname?.split("/")[2] || "" // gets 'category-id' from /categories/[id]

    // Extract unique categories from games.json
    const categories = getCategories()


    return (
        <>
            <div className="">
                <div className="overflow-x-auto py-2  pl-2 container mx-auto ">
                    <div className="flex  space-x-2 justify-center whitespace-nowrap">
                        {categories.map((category) => (
                            <a
                                key={category.id}
                                href={`/categories/${category.id}`}
                                className={cn(
                                    "flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                    activeCategory === category.id
                                        ? "bg-cyan-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <span>{category.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}
