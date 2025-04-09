import games from "@/data/games.json"
import slugify from "slugify";

const slugifyText = (text: string) =>
    slugify(text, { lower: true, strict: true });

export interface Game {
    id: string
    title: string
    thumb: string
    category: string
    description?: string
    slug?: string // Optional since it's computed

  }

  export const getGameById = (id: string): Game | undefined => {
    return games.find((game) => game.id === id);
};
  
const gamesData: Game[] = games.map((game) => ({
  ...game,
  slug: slugifyText(game.title),
}));

export function getGames(category?: string, limit?: number): Game[] {
  let filteredGames = [...gamesData]

  if (category && category !== "all") {
    filteredGames = filteredGames.filter(
      (game) => game.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (limit) {
    filteredGames = filteredGames.slice(0, limit)
  }

  return filteredGames
}

export function getFeaturedGames(limit = 3): Game[] {
  // You can customize logic here if you later add a "featured" flag
  return gamesData.slice(0, limit)
}



export function getRelatedGames(gameId: string, limit = 4): Game[] {
  const currentGame = getGameById(gameId)

  if (!currentGame) {
    return getGames("all", limit)
  }

  const relatedGames = gamesData.filter(
    (game) => game.id !== gameId && game.category === currentGame.category
  )

  return relatedGames.slice(0, limit)
}
