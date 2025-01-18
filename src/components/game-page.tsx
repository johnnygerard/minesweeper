import Game from "@/components/game";
import { GameMode } from "@/types/game-mode";
import { memo } from "react";

type Props = Readonly<{
  mode: GameMode;
}>;

const GamePage = ({ mode }: Props) => {
  return (
    <div className="px-4 py-8">
      <h1 className="mb-12 text-4xl uppercase tracking-widest">Minesweeper</h1>
      <Game mode={mode} />
    </div>
  );
};

export default memo(GamePage);
