"use client";
import { useState, useRef } from "react";
import { NextSeo } from "next-seo";
import slugify from "slugify";
import config from "../../config";
import { Button } from "./ui/button";
import { Play, Share2, ThumbsUp, RotateCcw, Maximize, X } from "lucide-react";
import { getRelatedGames } from "@/lib/games";
import RelatedCard from "./RelatedCard";
import Gameitem from "./GameItem";

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
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const relatedGames = getRelatedGames(game.id, 12);
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

            <div className="min-h-screen ">
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
                                                className=" object-contain w-full h-full"
                                            />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Button
                                                size="lg"
                                                className="rounded-full bg-purple-600 hover:bg-purple-700"
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

                                    </>
                                )}


                            </div>
                            {isPlaying && (
                                <div className=" bg-white mt-4 rounded-lg flex justify-center gap-4 p-4 shadow-md">
                                    <Button variant="secondary" onClick={enterFullscreen}>
                                        <Maximize className="w-4 h-4 mr-2" />
                                        Fullscreen
                                    </Button>
                                    <Button variant="secondary" onClick={reloadGame}>
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Reload
                                    </Button>
                                    <Button variant="destructive" onClick={stopGame}>
                                        <X className="w-4 h-4 mr-2" />
                                        Exit
                                    </Button>
                                </div>
                            )}
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
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-cyan-800">
                                        {game.category}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                        {game.plays || "3.5M"} plays
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

                            <div className="mt-6 prose min-w-full rounded-lg bg-white p-6 shadow-md">
                                <h3 id="about-game-name-">About {game.title}</h3>
                                <p>Step into the exciting world of <strong>{game.title}</strong>, a thrilling experience in the <strong>{game.category}</strong> game category that’s designed to entertain players of all ages. Whether you&#39;re looking for an intense, fast-paced challenge or a fun and casual way to pass the time, <strong>{game.title}</strong> delivers a unique blend of gameplay, graphics, and excitement.</p>
                                <p>As a <strong>{game.category}</strong> game, <strong>{game.title}</strong> brings all the elements players love—immersive storylines, smooth controls, strategic decisions, and moments that keep you on the edge of your seat. From the very first click or tap, you&#39;ll be drawn into a captivating world where your skills, reflexes, and strategy will be put to the test.</p>
                                <p>In <strong>{game.title}</strong>, every level introduces new surprises, obstacles, and achievements to unlock. The intuitive gameplay makes it easy for beginners to jump right in, while seasoned players will find plenty of depth and complexity to keep them engaged. Whether you&#39;re battling enemies, solving puzzles, racing against the clock, or building your dream world, <strong>{game.title}</strong> has something for everyone.</p>
                                <h3 id="features">Features</h3>
                                <ul>
                                    <li>Engaging and addictive <strong>{game.category}</strong> gameplay</li>
                                    <li>Smooth animations and eye-catching visuals</li>
                                    <li>Multiple levels with increasing difficulty</li>
                                    <li>Intuitive controls suitable for all devices</li>
                                    <li>Leaderboards and achievements to challenge your friends</li>
                                </ul>
                                <p><strong>{game.title}</strong> is more than just a game—it&#39;s a full-fledged experience. With regular updates and new content added frequently, there&#39;s always something new to discover and explore.</p>

                                <h3 id="how-to-play-game-name-">How to Play {game.title}</h3>
                                <p>Playing <strong>{game.title}</strong> is simple to learn, but mastering it takes skill and practice. Here&#39;s a step-by-step guide to help you get started:</p>
                                <ol>
                                    <li><p><strong>Launch the Game</strong><br></br>Click or tap on <strong>{game.title}</strong> to load the game. Wait for the loading screen to complete and press the &quot;Play&quot; button to begin.</p>
                                    </li>
                                    <li><p><strong>Choose Your Mode (if available)</strong><br></br>Depending on the game, you may be able to choose from different modes like Story Mode, Challenge Mode, or Multiplayer. Select the mode that best suits your playstyle.</p>
                                    </li>
                                    <li><p><strong>Understand the Objective</strong><br></br>Each level or round in <strong>{game.title}</strong> has a goal. This might be defeating enemies, reaching a finish line, solving a puzzle, or collecting points. Read the on-screen instructions or hints carefully.</p>
                                    </li>
                                    <li><p><strong>Use the Controls</strong>  </p>
                                        <ul>
                                            <li>On mobile: Use on-screen buttons, taps, or swipes to move and interact.</li>
                                            <li>On desktop: Use your keyboard (arrow keys/WASD) and mouse to play.</li>
                                        </ul>
                                    </li>
                                    <li><p><strong>Power-ups and Bonuses</strong><br></br>Look out for power-ups that can boost your performance. These may include speed boosts, extra lives, or special weapons, depending on the <strong>{game.category}</strong> game mechanics.</p>
                                    </li>
                                    <li><p><strong>Watch Out for Obstacles</strong><br></br>Avoid hazards like traps, enemies, or timers that could end your run early. Strategy and timing are key to survival.</p>
                                    </li>
                                    <li><p><strong>Complete Levels &amp; Unlock Rewards</strong><br></br>Progress through levels to unlock new content, features, and rewards. Keep playing to improve your high score or ranking.</p>
                                    </li>
                                </ol>

                                <p>Start your adventure now with <strong>{game.title}</strong> and experience why it’s one of the top-rated games in the <strong>{game.category}</strong> category. Whether you play for a few minutes or a few hours, you&#39;re in for a fun, challenging, and rewarding gaming session every time.</p>

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
