import Cell from "@/components/cell";
import { useContextGameState } from "@/hooks/use-context-game-state";
import { BoardState } from "@/types/board-state";
import clsx from "clsx";
import { memo } from "react";

type Props = Readonly<{
  board: BoardState;
}>;

const Board = ({ board }: Props) => {
  const game = useContextGameState();
  const { cells, columns, mode } = board;
  const BORDER_COLOR = "border-zinc-300";
  const cellSize = mode.name === "Easy" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div
      className={clsx("grid border-l border-t", BORDER_COLOR)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {cells.map((cell, index) => (
        <Cell
          key={index}
          gameStatus={game.status}
          {...cell}
          borderColor={BORDER_COLOR}
          size={cellSize}
        />
      ))}
    </div>
  );
};

export default memo(Board);
