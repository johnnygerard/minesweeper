import Cell from "@/components/cell";
import { CellState } from "@/types/cell-state";
import { memo } from "react";

type Props = Readonly<{
  cells: CellState[];
  columns: number;
}>;

const Board = (p: Props) => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${p.columns}, 1fr)` }}
    >
      {p.cells.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </div>
  );
};

export default memo(Board);
