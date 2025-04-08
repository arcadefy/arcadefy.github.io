import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify";
import games from "@/data/games.json";
import { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import config from '../../../config';
import Gameitem from "@/components/GameItem";
import CategoryTabs from "@/components/category-tabs";



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

const slugifyText = (text: string) =>
    slugify(text, {
        lower: true,
        strict: true,
    });

const PAGE_SIZE = 18;

const BrowsePage = ({ category, initialGames }: { category: string; initialGames: Game[] }) => {
    const [displayedGames, setDisplayedGames] = useState<Game[]>(initialGames.slice(0, PAGE_SIZE));
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(initialGames.length > PAGE_SIZE);

    const loadMoreGames = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * PAGE_SIZE;
        const newDisplayedGames = initialGames.slice(0, start);

        setDisplayedGames(newDisplayedGames);
        setCurrentPage(nextPage);

        if (newDisplayedGames.length >= initialGames.length) {
            setHasMore(false);
        }
    };
    const router = useRouter();
    const pathname = router.pathname
    const url = config.siteURL; // Replace with your actual site URL from config
    return (
        <>
            <NextSeo
                title={`Play ${category} Game Online on - ${config.siteName}`}
                description={`Best ${category} games play online for free`}
                canonical={url + '/browse/' + slugifyText(category)}
            />

            <div>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl capitalize text-center font-bold mb-8">{category} Games</h1>
                    <CategoryTabs />
                </div>
                <div className="py-5">
                    <Gameitem data={displayedGames} />
                </div>




                {hasMore && (
                    <div className='flex justify-center p-10'>
                        <button className='btn btn-wide btn-neutral' onClick={loadMoreGames}>Load More</button>
                    </div>

                )}
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || typeof params.category !== 'string') {
        return {
            notFound: true,
        };
    }

    const sluggedCategory = params.category as string;
    const category = slugifyText(sluggedCategory);
    const filteredGames = games.filter((game: Game) => slugifyText(game.category) === category);

    // Ensure filteredGames is not undefined and has games
    if (!filteredGames || filteredGames.length === 0) {
        return {
            notFound: true,
        };
    }

    // Send all filtered games to the page, we handle pagination on the client side
    return {
        props: {
            category: sluggedCategory,
            initialGames: filteredGames,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = Array.from(new Set(games.map((game: Game) => slugifyText(game.category))));

    const paths = categories.map((category) => ({
        params: {
            category,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default BrowsePage;