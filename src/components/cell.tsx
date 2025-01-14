import { DispatchContext } from "@/contexts";
import { CellState } from "@/types/cell-state";
import { memo, useContext } from "react";

type Props = Readonly<{
  cell: CellState;
}>;

const Cell = (p: Props) => {
  const { cell } = p;
  const { isRevealed, isMined, adjacentMines, isFlagged, index } = cell;
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
      onContextMenu={() => {
        dispatch({ type: "TOGGLE_FLAG", index });
      }}
    >
      {display}
    </div>
  );
};

export default memo(Cell);
