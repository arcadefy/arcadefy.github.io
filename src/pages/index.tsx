import { useState } from 'react';
import games from '@/data/games.json';
import Gameitem from '@/components/Gameitem';
import { NextSeo } from 'next-seo';
import config from '../../config.json'
import { useRouter } from "next/router";

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

const PAGE_SIZE = 30;

const HomePage = () => {
    
    // Initial games to display (for example, first PAGE_SIZE games)
    const [displayedGames, setDisplayedGames] = useState<Game[]>(games.slice(0, PAGE_SIZE));
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(games.length > PAGE_SIZE);
    const router = useRouter();
    const pathname = router.pathname
    const url = config.SITE_URL; // Replace with your actual site URL from config
  
    const loadMoreGames = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * PAGE_SIZE;
        const newDisplayedGames = games.slice(0, start);

        setDisplayedGames(newDisplayedGames);
        setCurrentPage(nextPage);

        if (newDisplayedGames.length >= games.length) {
            setHasMore(false);
        }
    };

    return (
        <>
        <NextSeo  
        title={config.SITE_SEO_TITLE}
        description={config.SITE_SEO_DESCRIPTION}
        canonical={url} 
        />
        <div>
           


                    <Gameitem data={displayedGames}/>
              
               
               
            
            {hasMore && (
                <div className='flex justify-center p-10'>
                    <button className='btn btn-wide btn-neutral' onClick={loadMoreGames}>Load More</button>
                    </div>
                
            )}
        </div>
        </>
    );
};

export default HomePage;
