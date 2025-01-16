import Cell from "@/components/cell";
import { CellState } from "@/types/cell-state";
import { memo } from "react";

type Props = Readonly<{
  cells: CellState[];
  columns: number;
}>;

const Board = ({ cells, columns }: Props) => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {cells.map((cell, index) => (
        <Cell key={index} {...cell} />
      ))}
    </div>
  );
};

export default memo(Board);
