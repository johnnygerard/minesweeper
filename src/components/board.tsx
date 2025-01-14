import Cell from "@/components/cell";
import { BoardState } from "@/types/board-state";
import { JSX, memo } from "react";

const Board = (props: { board: BoardState }): JSX.Element => {
  const { board } = props;

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
};

export default memo(Board);
