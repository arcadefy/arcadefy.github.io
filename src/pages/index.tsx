// pages/index.tsx
import { GetStaticProps } from "next";
import { getGameById, Game } from "@/lib/games";
import PlayLayout from "@/components/PlayLayout";

const Homepage = ({ game }: { game: Game }) => {
  if (!game) {
    return <p>Game not found</p>;
  }

  return (
    <>
      <PlayLayout game={game} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const gameId = "31952"; // ✅ Change this to the actual ID of the game you want as homepage
  const game = getGameById(gameId);

  if (!game) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      game
    }
  };
};

export default Homepage;
