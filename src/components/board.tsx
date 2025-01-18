import Cell from "@/components/cell";
import { CellState } from "@/types/cell-state";
import { memo } from "react";

type Props = Readonly<{
  cells: CellState[];
  columns: number;
}>;

const Board = ({ cells, columns }: Props) => {
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
