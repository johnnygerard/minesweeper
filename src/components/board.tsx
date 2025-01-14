import Cell from "@/components/cell";
import { CellState } from "@/types/cell-state";
import { JSX, memo } from "react";

const Board = (p: { cells: CellState[]; columns: number }): JSX.Element => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${p.columns}, 1fr)` }}
    >
      {p.cells.map((cell, index) => (
        <Cell key={index} {...cell} />
      ))}
    </div>
  );
};

export default memo(Board);
