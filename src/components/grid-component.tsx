import CellComponent from "@/components/cell-component";
import { GameMode } from "@/types/game-mode";
import { Grid } from "@/types/grid";
import clsx from "clsx";
import { memo } from "react";

type Props = Readonly<{
  grid: Grid;
  mode: GameMode;
}>;

const GridComponent = ({ grid, mode }: Props) => {
  const BORDER_COLOR = "border-zinc-300";

  return (
    <div
      className={clsx("grid border-l border-t", BORDER_COLOR)}
      style={{ gridTemplateColumns: `repeat(${grid.columnCount}, 1fr)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {grid.cells.map((cell, index) => (
        <CellComponent
          key={index}
          cell={cell}
          borderColor={BORDER_COLOR}
          size={mode.name === "Easy" ? "h-12 w-12" : "h-10 w-10"}
        />
      ))}
    </div>
  );
};

export default memo(GridComponent);
