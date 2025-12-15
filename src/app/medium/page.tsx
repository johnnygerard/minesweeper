import type { Metadata } from "next";
import type { FC } from "react";
import { GamePage } from "~/components/game-page";
import { GAME_MODES } from "~/constants/game-modes";

export const metadata: Metadata = {
  title: "Medium",
  description: "Medium mode",
};

const Page: FC = () => <GamePage mode={GAME_MODES.MEDIUM} />;
export default Page;
