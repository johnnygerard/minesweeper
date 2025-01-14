import { CellState } from "@/types/cell-state";
import { DispatchContext } from "@/utils/dispatch-context";
import { JSX, useContext } from "react";

interface Props {
  state: CellState;
}

export const Cell = ({ state }: Props): JSX.Element => {
  const dispatch = useContext(DispatchContext);
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
