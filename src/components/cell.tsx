import { AdjacentMines } from "@/types/adjacent-mines";
import { JSX, MouseEvent } from "react";

export interface CellProps {
  adjacentMines?: AdjacentMines;
  isMined: boolean;
  isRevealed?: boolean;
  isFlagged?: boolean;
  index: number;
}

export const Cell = ({
  adjacentMines,
  isMined,
  isRevealed = false,
  isFlagged = false,
  index,
  revealCell,
  toggleFlag,
}: CellProps & {
  revealCell: (index: number) => void;
  toggleFlag: (index: number) => void;
}): JSX.Element => {
  let display: string;

  if (isRevealed) {
    if (isMined) display = "💣";
    else display = adjacentMines ? adjacentMines.toString() : "";
  } else {
    display = isFlagged ? "🚩" : "";
  }

  const handleClick = (): void => {
    if (isFlagged || isRevealed) return;
    revealCell(index);
  };

  const handleContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
    if (isRevealed) return;
    toggleFlag(index);
  };

  return (
    <div
      className={`${!isRevealed && "bg-gray-400"} grid h-12 w-12 place-items-center border border-black`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {display}
    </div>
  );
};
