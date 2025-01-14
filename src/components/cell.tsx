import { CellState } from "@/types/cell-state";
import { DispatchContext } from "@/utils/dispatch-context";
import { JSX, memo, useContext } from "react";

const Cell = (props: CellState): JSX.Element => {
  const { isFlagged, isMined, isRevealed, adjacentMines, index } = props;
  const dispatch = useContext(DispatchContext);
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

export default memo(Cell);
