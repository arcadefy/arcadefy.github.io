import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import AdComponent from './AdComponent';

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

// Helper function to get a random boolean
const getRandomBoolean = (probability: number = 0.1) => Math.random() < probability;

const GameitemNew = ({ data }: { data: Game[] }) => {
    const [items, setItems] = useState<{ game: Game; isLargerItem: boolean; isAd: boolean }[]>([]);

    useEffect(() => {
        // Randomize items client-side
        const randomizedItems = data.map((game, index) => {
            const isLargerItem = getRandomBoolean(0.02); // 10% chance to be a large item
            const isAd = getRandomBoolean(0.03); // 5% chance to be an ad
            return { game, isLargerItem, isAd };
        });
        setItems(randomizedItems);
    }, [data]);

    return (
        <div className="grid gap-5 auto-rows-dense justify-center grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] grid-rows-[minmax(100px,_100px)]">
            {items.map(({ game, isLargerItem, isAd }, index) => {
                // Render ad placeholder
                if (isAd) {
                    return (
                        <div key={`ad-${index}`} className="col-span-full lg:col-span-2 row-span-2 h-[220px] flex items-center justify-center rounded-xl bg-gray-200">
                            <AdComponent auto={true} responsive={true} slot="7220363200"/>
                        </div>
                    );
                }

                // Render game thumbnail
                return (
                    <div key={game.id} className={isLargerItem ? "lg:col-span-2 col-span-full lg:row-span-2" : ""}>
                        <Link href={`/play/${slugifyText(game.title)}`}>
                            <div className={`relative cursor-pointer transition-transform duration-300 transform hover:scale-125 ${isLargerItem ? "h-[220px]" : "h-[100px]"}`}>
                                <div className="shadow-lg w-full h-full rounded-xl overflow-hidden">
                                    <img
                                        loading='eager'
                                        className={`object-cover w-full h-full rounded-xl ${isLargerItem ? "lg:h-[220px]" : "h-[100px]"} hover:grayscale`}
                                        src={game.thumb}
                                        alt={game.title}
                                    />
                                    <div className="absolute bottom-0 w-full text-center text-white font-bold text-[15px] py-[13px] px-[6px] opacity-0 transition-opacity duration-400 hover:opacity-100">
                                        <p>{game.title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default GameitemNew;
