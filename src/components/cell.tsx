import { DispatchContext, IsGameOverContext } from "@/contexts";
import { CellState } from "@/types/cell-state";
import { memo, useContext } from "react";

type Props = Readonly<{
  cell: CellState;
}>;

const Cell = (p: Props) => {
  const { cell } = p;
  const { isRevealed, isMined, adjacentMines, isFlagged, index } = cell;
  const isGameOver = useContext(IsGameOverContext);
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
        if (isGameOver || cell.cannotReveal) return;
        dispatch({ type: "REVEAL", index });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        if (isGameOver || isRevealed) return;
        dispatch({ type: "TOGGLE_FLAG", index });
      }}
    >
      {display}
    </div>
  );
};

export default memo(Cell);
