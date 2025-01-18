import GamePage from "@/components/game-page";
import { GAME_MODES } from "@/constants/game-modes";
import { memo } from "react";

const Page = () => {
  return <GamePage mode={GAME_MODES.HARD} />;
};

export default memo(Page);
