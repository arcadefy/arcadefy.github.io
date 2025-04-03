import React, { useState, useEffect } from 'react';
import gamesData from '@/data/games.json';
import Gameitem from './Gameitem';

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

const PAGE_SIZE = 12;

interface RelatedGamesProps {
    category: string;
}

const RelatedGames: React.FC<RelatedGamesProps> = ({ category }) => {
    const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true); // Initially true to allow loading more games

    // Filter games based on the provided category
    const filteredGames = gamesData.filter((game: Game) => game.category === category);

    // Function to load more games
    const loadMoreGames = () => {
        const nextPage = currentPage + 1;
        const startIndex = (nextPage - 1) * PAGE_SIZE;
        const newDisplayedGames = filteredGames.slice(startIndex, startIndex + PAGE_SIZE);

        setDisplayedGames([...displayedGames, ...newDisplayedGames]);
        setCurrentPage(nextPage);

        // Check if there are more games to load
        if (startIndex + PAGE_SIZE >= filteredGames.length) {
            setHasMore(false);
        }
    };

    // Initial load of games when component mounts or category changes
    useEffect(() => {
        const initialGames = filteredGames.slice(0, PAGE_SIZE);
        setDisplayedGames(initialGames);

        // Check if there are more games initially
        if (initialGames.length === filteredGames.length) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
        setCurrentPage(1); // Reset current page on category change
    }, [category]); // useEffect will run whenever category changes

    return (
        <>
<Gameitem data={displayedGames}/>

         {hasMore && (
            <div className='flex justify-center p-10'>
                <button className='btn btn-wide btn-neutral' onClick={loadMoreGames}>Load More</button>
            </div>
        )}
        </>
    );
};

export default RelatedGames;
