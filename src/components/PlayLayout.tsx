"use client";
import { useState, useRef } from "react";
import { NextSeo } from "next-seo";
import slugify from "slugify";
import config from "../../config";
import { Button } from "./ui/button";
import { Play, Share2, ThumbsUp, RotateCcw, Maximize, X } from "lucide-react";
import { getRelatedGames } from "@/lib/games";
import RelatedCard from "./RelatedCard";

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
    plays?: number;
}

const slugifyText = (text: string) =>
    slugify(text, { lower: true, strict: true });

export default function PlayLayout({ children, game }: any) {
    const [isPlaying, setIsPlaying] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const relatedGames = getRelatedGames(game.id, 6);
    const url = config.siteURL;

    const enterFullscreen = () => {
        const iframe = iframeRef.current;
        if (iframe?.requestFullscreen) {
            iframe.requestFullscreen();
        }
    };

    const reloadGame = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    const stopGame = () => {
        setIsPlaying(false);
    };

    return (
        <>
            <NextSeo
                title={`${game.title} Game Play Online Free on ${config.siteName}`}
                description={`Play ${game.title}, the ${game.category} game, online for free`}
                canonical={url + "/play/" + slugifyText(game.title)}
            />

            <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-cyan-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="overflow-hidden rounded-lg bg-black relative aspect-square md:aspect-video">
                                {!isPlaying && (
                                    <>
                                        <div className="relative w-full h-full opacity-40">
                                            <img
                                                src={game.thumb || "/placeholder.svg"}
                                                alt={game.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Button
                                                size="lg"
                                                className="rounded-full bg-cyan-600 hover:bg-cyan-700"
                                                onClick={() => setIsPlaying(true)}
                                            >
                                                <Play className="mr-2 h-5 w-5" />
                                                Play Now
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {isPlaying && (
                                    <>
                                        <iframe
                                            ref={iframeRef}
                                            src={game.url}
                                            width="100%"
                                            height="100%"
                                            className="absolute inset-0 w-full h-full border-0 rounded-lg"
                                            allowFullScreen
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2 z-10">
                                            <Button size="icon" variant="secondary" onClick={enterFullscreen}>
                                                <Maximize className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="secondary" onClick={reloadGame}>
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="destructive" onClick={stopGame}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-bold">{game.title}</h1>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="icon">
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800">
                                        {game.category}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                        {game.plays || 0} plays
                                    </span>
                                </div>

                                <p className="mt-6 text-gray-700">
                                    {game.description ||
                                        "Join millions of players in this exciting game. Challenge yourself and compete with friends in this addictive gameplay experience."}
                                </p>

                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold">How to Play</h2>
                                    <p className="mt-2 text-gray-700">
                                        Use your keyboard arrows or WASD to move. Space to jump. Click or tap to interact with objects.
                                        Collect power-ups and avoid obstacles to reach the highest score!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h2 className="mb-4 text-xl font-bold">Related Games</h2>
                                <RelatedCard data={relatedGames as Game[]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
