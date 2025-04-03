import { useState } from "react";
import { useRouter } from "next/router";
import config from '../../config.json'
import { NextSeo } from "next-seo";
import slugify from "slugify";
import Image from 'next/image'
import { useFullscreen } from '@mantine/hooks';
import type { SVGProps } from 'react';
import RelatedGames from "./RelatedGames";
import AdComponent from "./AdComponent";

const slugifyText = (text: string) =>
  slugify(text, {
      lower: true,
      strict: true,
  });
  
export default function PlayLayout({ children, game }: any) {
  const [playing, setPlaying] = useState(true);
  const [truncate, setTruncate] = useState(true);
  const [exitbtn, setExitbtn] = useState(false);

  const toggleTruncate = () => {
    setTruncate(!truncate);
  };
  const { ref, toggle, fullscreen } = useFullscreen();

  const router = useRouter();
  const pathname = router.pathname
  const url = config.SITE_URL; // Replace with your actual site URL from config
  const handlePlayButton = () => {
    setPlaying(false);
    toggle();
    setExitbtn(true);
  
  };

  const Exitbtn = () => {
    setExitbtn(false);
    toggle();
    setPlaying(true);

  }
  return (
    <>
    <NextSeo  
        title={`Play ${game.title} Game Online on - ${config.SITE_NAME}`}
        description={`Play ${game.title}, the ${game.category} game, online for free`}
        canonical={url + '/play/' + slugifyText(game.title)} 
        />
        


      <div className="flex flex-cols py-2 gap-2">
        <div className=" lg:block hidden  w-[300px] rounded-lg border border-base-300 bg-base-100">
        <AdComponent width="160px" height="600px" auto={false} responsive={false} slot="2459292435"/> {/* Insert the ad component */}

        </div>

        
        {playing ? (
          <div ref={ref} className="hero rounded-lg border border-base-300 bg-base-100">

          
            <div className="hero-content text-center">
              <div className="w-full grid grid-cols-1 items-center gap-3">
                  <div className="flex  justify-center">
                  <div className="avatar">
  <div className="w-32 rounded-full">
    <img src={game.thumb} />
  </div>
</div>
                    
                    </div>
                <div className="grid grid-cols-1 gap-3">

                  <h1 className="text-2xl lg:text-3xl font-bold">{game.title}</h1>
                  <p className="lg:text-lg font-semibold">
                            Controls: {game.instructions}
                        </p>
                </div>
                <div className="flex  justify-center">
                <button className="btn btn-wide btn-accent" onClick={handlePlayButton}>
                  Play Game
                </button>
                </div>
              </div>
            </div>
            


          </div>
        ) : (
          <div  ref={ref} className="relative hero rounded-xl overflow-y-hidden	">

        <iframe scrolling="no" allowFullScreen={true} src={game.url} className="w-full h-screen">
        </iframe>
        

        {exitbtn ? (
        <button onClick={Exitbtn} className="top-5 left-5 absolute btn btn-ghost"><LineMdCloseCircleTwotone/></button>
        ):(null)}
          </div>
)}
        <div className=" lg:block hidden w-[300px] rounded-lg border border-base-300 bg-base-100">
        <AdComponent width="160px" height="600px" auto={false} responsive={false} slot="2459292435"/> {/* Insert the ad component */}

        </div>
        </div>
        <div className={`mx-auto w-full flex flex-col items-center justify-left gap-6 rounded-lg bg-base-100 p-6 transition-all duration-200 border border-base-300 ${game.reverse === true ? 'sm:flex-row-reverse' : ' sm:flex-row'}`}>
                

                    
                    <div className="space-y-2 text-left sm:text-left">
                        <h2 className="text-2xl font-semibold">{game.title}</h2>

                        <p className="lg:text-lg font-semibold">
                            Category: {game.category}
                        </p>
                        <p className="lg:text-lg font-semibold">
                            Tags: {game.tags}
                        </p>
                        <p className={`lg:text-lg text-muted-foreground ${truncate ? '' : ''}`}>
        {truncate ? `${game.description.slice(0, 250)}` : game.description}
        {game.description.length > 200 && (
        <>
        <button onClick={toggleTruncate} className="text-blue-500">
          {truncate ? ' ... Read more' : 'Show less'}
        </button>
        </>
      )}
      </p>

                        
                        
                        
                        
                    </div>
                </div>

<div className="py-10 flex justify-center">
<h2 className="text-3xl">More Games</h2>
</div>
      <RelatedGames category={game.category}/>
    </>
  );
}

export function LineMdCloseCircleTwotone(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" {...props}><g stroke="red" strokeLinecap="round" strokeWidth={2}><path fill="white" fillOpacity={0} strokeDasharray={60} strokeDashoffset={60} d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"></animate><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3"></animate></path><path fill="none" strokeDasharray={8} strokeDashoffset={8} d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"></animate></path></g></svg>);
}