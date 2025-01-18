import GamePage from "@/components/game-page";
import { GAME_MODES } from "@/constants/game-modes";
import { memo } from "react";

const Medium = () => {
  return <GamePage mode={GAME_MODES.MEDIUM} />;
};

export default memo(Medium);
