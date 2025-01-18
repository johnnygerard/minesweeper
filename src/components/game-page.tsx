import Game from "@/components/game";
import { GameMode } from "@/types/game-mode";
import { CompassRose } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { memo } from "react";

type Props = Readonly<{
  mode: GameMode;
}>;

const GamePage = ({ mode }: Props) => {
  return (
    <div className="px-4 py-8">
      <div className="mb-12 flex justify-between text-4xl">
        <h1 className="uppercase tracking-widest">Minesweeper</h1>
        <Link
          className="transition-transform hover:scale-110 hover:text-blue-500"
          href="/game-modes"
          title="Game Modes"
          aria-label="Game Modes"
        >
          <CompassRose />
        </Link>
      </div>
      <Game mode={mode} />
    </div>
  );
};

export default memo(GamePage);
