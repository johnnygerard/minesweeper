import { CellState } from "@/types/cell-state";
import { GameAction } from "@/types/game-action";
import { Dispatch, JSX, MouseEvent } from "react";

interface CellProps {
  state: CellState;
  dispatch: Dispatch<GameAction>;
}

export const Cell = ({ state, dispatch }: CellProps): JSX.Element => {
  const {
    isFlagged = false,
    isMined,
    isRevealed = false,
    adjacentMines,
    index,
  } = state;
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
