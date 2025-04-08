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
        <>
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6'>
                {data.map((game: Game, index: number) => (
                    <React.Fragment key={game.id}>
                        <li>
                            <Link href={`/play/${slugifyText(game.title)}`}>
                                <div className="animate-fade-up animate-once animate-duration-300 animate-ease-out cursor-pointer transition-transform duration-300 transform hover:scale-125">
                                    <div className="card shadow-lg ">
                                        <img loading='eager' width={250} height={250} className="rounded-xl hover:grayscale" src={game.thumb} alt={game.title} />
                                    </div>
                                    <div className="p-2">
                                        <h2 className="text-lg font-semibold truncate">{game.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </li>

                    </React.Fragment>
                ))}
            </ul>
        </>
    );
}