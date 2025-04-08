import React from 'react';
import Link from 'next/link';
import slugify from 'slugify';

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

export default function Gameitem({ data }: { data: Game[] }) {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5 p-4">
            {data.map((game: Game) => {
                const aspectRatio = game.width && game.height
                    ? `aspect-[${game.width}/${game.height}]`
                    : 'aspect-video';

                return (
                    <li key={game.id} className="group bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <Link href={`/play/${slugifyText(game.title)}`}>
                            <div className="cursor-pointer overflow-hidden rounded-2xl">
                                <div className={`w-full ${aspectRatio} bg-gray-200`}>
                                    <img
                                        loading="eager"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        src={game.thumb}
                                        alt={game.title}
                                    />
                                </div>
                                <div className="p-3">
                                    <h2 className="text-sm sm:text-base font-medium text-center truncate">{game.title}</h2>
                                </div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
