import clsx from "clsx";
import type { FC } from "react";
import { CellComponent } from "~/components/cell-component";
import type { GameMode } from "~/types/game-mode";
import type { Grid } from "~/types/grid";

type Props = {
  grid: Grid;
  mode: GameMode;
};

export const GridComponent: FC<Props> = ({ grid, mode }) => {
  const BORDER_COLOR = "border-zinc-300";

  return (
    <div
      className={clsx("grid border-t border-l", BORDER_COLOR)}
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
