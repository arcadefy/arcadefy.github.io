import { FC } from 'react';
import Link from 'next/link';
import games from '@/data/games.json';
import slugify from 'slugify';


interface MenuProps {
    count: number;
    // other props if there are any
  }
interface Game {
    id: string;
    title: string;
    description: string;
    instructions: string;
    url: string;
    category: string;
    tags: string;
    thumb: string;
    width: string;
    height: string;
}

// Function to get unique categories
const getUniqueCategories = (games: Game[]) => {
    const categories = games.map(game => game.category);
    return Array.from(new Set(categories));
};

const Menu: React.FC<MenuProps> = ({ count }) => {
    const categories = getUniqueCategories(games).slice(0, count); // Limit to six categories

    return (
        <>
            {categories.map(category => (
                <li key={category}>
                    <Link href={`/browse/${slugify(category, { lower: true, strict: true })}`}>
                        {category}
                    </Link>
                </li>
            ))}
        </>
    );
};

export default Menu;
