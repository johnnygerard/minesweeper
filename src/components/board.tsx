import Cell from "@/components/cell";
import { BoardState } from "@/types/board-state";
import { memo } from "react";

type Props = Readonly<{
  board: BoardState;
}>;

const Board = ({ board }: Props) => {
  const { cells, columns } = board;
  const BORDER_COLOR = "border-zinc-300";

  return (
    <div
      className={`grid border-l border-t ${BORDER_COLOR}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {cells.map((cell, index) => (
        <Cell key={index} {...cell} borderColor={BORDER_COLOR} />
      ))}
    </div>
  );
};

export default memo(Board);
