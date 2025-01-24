import GamePage from "@/components/game-page";
import { GAME_MODES } from "@/constants/game-modes";
import { Metadata } from "next";
import { memo } from "react";

export const metadata: Metadata = {
  title: "Expert",
  description: "Expert mode",
};

const Page = () => {
  return <GamePage mode={GAME_MODES.EXPERT} />;
};

export default memo(Page);
