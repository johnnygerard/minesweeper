import type { Metadata } from "next";
import type { FC } from "react";
import { GamePage } from "~/components/game-page";
import { GAME_MODES } from "~/constants/game-modes";

export const metadata: Metadata = {
  title: "Expert",
  description: "Expert mode",
};

const Page: FC = () => <GamePage mode={GAME_MODES.EXPERT} />;
export default Page;
