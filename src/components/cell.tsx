import { CellState } from "@/types/cell-state";
import { GameAction } from "@/types/game-action";
import { Dispatch, JSX } from "react";

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

  if (isRevealed) {
    if (isMined) display = "💣";
    else display = adjacentMines ? adjacentMines.toString() : "";
  } else {
    display = isFlagged ? "🚩" : "";
  }

  return (
    <div
      className={`${!isRevealed && "bg-gray-400"} grid h-12 w-12 place-items-center border border-black`}
      onClick={() => {
        dispatch({ type: "REVEAL", index });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        dispatch({ type: "TOGGLE_FLAG", index });
      }}
    >
      {display}
    </div>
  );
};
