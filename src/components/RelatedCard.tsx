import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import { cn } from '@/lib/utils'; // adjust the import based on where your `cn` function lives
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

export default function RelatedCard({ data, featured = false, className = '' }: GameitemProps) {
    return (
        <ul className=" grid grid-cols-3 gap-3">
            {data.map((game) => (
                <li className='border rounded-2xl' key={game.id}>
                    <Link
                        href={`/play/${slugifyText(game.title)}`}
                        className={cn(
                            "group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 transition-all ",
                            featured ? "col-span-2 row-span-2" : "",
                            className,
                        )}
                    >
                        <div className="aspect-square w-full overflow-hidden rounded-2xl">
                            <Image
                                src={game.thumb || "/placeholder.svg"}
                                alt={game.title}
                                width={featured ? 600 : 300}
                                height={featured ? 600 : 300}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-lg font-bold text-white">{game.title}</h3>
                        </div>
                    </Link>
                </li>

            ))}
        </ul>
    );
}
