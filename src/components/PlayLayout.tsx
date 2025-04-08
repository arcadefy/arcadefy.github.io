import { NextSeo } from "next-seo";
import slugify from "slugify";
import config from "../../config";



const slugifyText = (text: string) =>
    slugify(text, {
        lower: true,
        strict: true,
    });
export default function PlayLayout({ children, game }: any) {

    const url = config.siteURL; // Replace with your actual site URL from config
    return (
        <>
            <NextSeo
                title={`${game.title} Game Play Online Free on ${config.siteName}`}
                description={`Play ${game.title}, the ${game.category} game, online for free`}
                canonical={url + '/play/' + slugifyText(game.title)}
            />
           
            {game.title}

        </>
    )

}