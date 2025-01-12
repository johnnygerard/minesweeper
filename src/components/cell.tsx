import { AdjacentMines } from "@/types/adjacent-mines";
import { BoardAction } from "@/types/board-action";
import { Dispatch, JSX, MouseEvent } from "react";

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
  dispatch,
}: CellProps & {
  dispatch: Dispatch<BoardAction>;
}): JSX.Element => {
  let display: string;

  const handleClick = (): void => {
    if (isFlagged || isRevealed) return;
    dispatch({ type: "REVEAL", index });
  };

  const handleContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    if (isRevealed) return;
    dispatch({ type: "TOGGLE_FLAG", index });
  };

  if (isRevealed) {
    if (isMined) display = "💣";
    else display = adjacentMines ? adjacentMines.toString() : "";
  } else {
    display = isFlagged ? "🚩" : "";
  }

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
