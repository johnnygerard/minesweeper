import Cell from "@/components/cell";
import { BoardState } from "@/types/board-state";
import { JSX, memo } from "react";

interface Props {
  board: BoardState;
}

export default memo(function Board({ board }: Props): JSX.Element {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${board.columns}, 1fr)` }}
    >
      {board.cells.map((cell, index) => (
        <Cell key={index} {...cell} />
      ))}
    </div>
  );
});
