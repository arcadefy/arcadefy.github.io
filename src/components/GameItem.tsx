import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import { cn } from '@/lib/utils';

const slugifyText = (text: string) =>
    slugify(text, {
        lower: true,
        strict: true,
    });

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

interface GameitemProps {
    data: Game[];
    featured?: boolean;
    className?: string;
}

export default function Gameitem({ data, featured = true, className = '' }: GameitemProps) {
    return (
        <ul className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5 p-4">
            {data.map((game) => (
                <li className="animate-fade animate-once border" key={game.id}>
                    <Link href={`/play/${slugifyText(game.title)}`} passHref>
                        <div
                            className={cn(
                                "group block rounded-2xl relative overflow-hidden bg-white dark:bg-neutral-900 shadow-md transition-all hover:shadow-lg",
                                featured ? "col-span-2 row-span-2" : "",
                                className
                            )}
                        >
                            <div className="aspect-square w-full overflow-hidden">
                                <Image
                                    src={game.thumb || "/placeholder.svg"}
                                    alt={game.title}
                                    width={featured ? 600 : 300}
                                    height={featured ? 600 : 300}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-3 py-2 bg-white dark:bg-neutral-800 rounded-b-2xl">
                                <h3 className="text-sm truncate font-semibold text-black dark:text-white">
                                    {game.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
