import GamePage from "@/components/game-page";
import { GAME_MODES } from "@/constants/game-modes";
import { memo } from "react";

const Home = () => {
  return <GamePage mode={GAME_MODES.EASY} />;
};

export default memo(Home);
