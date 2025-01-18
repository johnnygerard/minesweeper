import GamePage from "@/components/game-page";
import { GAME_MODES } from "@/constants/game-modes";
import { Metadata } from "next";
import { memo } from "react";

export const metadata: Metadata = {
  title: "Medium",
  description: "Medium mode",
};

const Page = () => {
  return <GamePage mode={GAME_MODES.MEDIUM} />;
};

export default memo(Page);
