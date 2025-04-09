import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify";
import games from "@/data/games.json";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import config from '../../../config';
import Gameitem from "@/components/GameItem";

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

const PAGE_SIZE = 25;

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

    useEffect(() => {
        const handleScroll = () => {
            if (!hasMore) return;

            const scrollPosition = window.innerHeight + window.scrollY;
            const bottomPosition = document.body.offsetHeight - 100;

            if (scrollPosition >= bottomPosition) {
                loadMoreGames();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, currentPage]);

    const router = useRouter();
    const url = config.siteURL;

    return (
        <>
            <NextSeo
                title={`Play ${category} Game Online on - ${config.siteName}`}
                description={`Best ${category} games play online for free`}
                canonical={url + '/browse/' + slugifyText(category)}
            />

            <div>
                <div className="container mx-auto px-4 py-10">
                    <h1 className="text-3xl capitalize text-center font-bold">{category} Games</h1>
                </div>
                <div className="">
                    <Gameitem data={displayedGames} />
                </div>
                {!hasMore && (
                    <div className='text-center py-10 text-gray-400'>No more games to load</div>
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

    if (!filteredGames || filteredGames.length === 0) {
        return {
            notFound: true,
        };
    }

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
