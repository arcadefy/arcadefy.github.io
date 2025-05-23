import Link from "next/link"
import { getCategories } from "@/lib/categories"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
    const categories = getCategories()

    return (
        <div className="">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center capitalize mb-8">All Games Categories</h1>

                <div className="flex flex-grow gap-3 flex-wrap justify-center">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/categories/${category.slug}`} className="block w-sm">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gradient-to-r from-purple-900 to-purple-800 h-24 flex flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                                    <span className="text-sm text-purple-200 mt-1">
                                        {category.gamesCount} game{category.gamesCount !== 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Browse games</span>
                                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                                        View All
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
