import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify"; // Import slugify library
import games from "@/data/games.json";
import PlayLayout from "@/components/PlayLayout";

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

const PlayPage = ({ game }: { game: Game }) => {

    if (!game) {
        return <p>Game not found</p>;
    }

    return (
        <>

            <PlayLayout game={game} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || typeof params.title !== 'string') {
        return {
            notFound: true,
        };
    }

    const sluggedTitle = params.title as string;
    const game = games.find((p: Game) => slugifyText(p.title) === sluggedTitle);

    if (!game) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            game: {
                id: game.id,
                title: game.title,
                description: game.description,
                instructions: game.instructions,
                url: game.url,
                category: game.category,
                tags: game.tags,
                thumb: game.thumb,
                width: game.width,
                height: game.height,
            }
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = games.map((game: Game) => ({
        params: {
            title: slugifyText(game.title),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default PlayPage;