"use client"

import { useSearchParams } from "next/navigation"
import Gameitem from "@/components/GameItem"
import gamesData from '@/data/games.json';

interface Game {
    id: string
    title: string
    category: string
    [key: string]: any
}

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const filteredGames = gamesData.filter(
        (game: Game) =>
            game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.category.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Search Results</h1>

                {filteredGames.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-2">No results found</h2>
                        <p className="text-gray-600">
                            We couldn't find any games matching "{query}". Try a different search term.
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="mb-6">Found {filteredGames.length} results for "{query}"</p>
                        <Gameitem data={filteredGames} />

                    </>
                )}
            </div>
        </div>
    )
}
