import games from "@/data/games.json"
import slugify from "slugify"

export interface Category {
  id: string
  name: string
  slug: string
  gamesCount: number
}

/**
 * Extracts unique categories from the games.json file and counts games in each
 */
export function getCategories(): Category[] {
  const categoryMap = new Map<string, Category>()

  for (const game of games) {
    const name = game.category
    const id = slugify(name, { lower: true })
    const slug = slugify(name, { lower: true })

    if (!categoryMap.has(id)) {
      categoryMap.set(id, { id, name, slug, gamesCount: 1 })
    } else {
      const category = categoryMap.get(id)!
      category.gamesCount += 1
    }
  }

  return Array.from(categoryMap.values())
}
