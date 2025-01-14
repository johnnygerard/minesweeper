import { DispatchContext } from "@/contexts/dispatch-context";
import { IsGameOverContext } from "@/contexts/is-game-over-context";
import { CellState } from "@/types/cell-state";
import { memo, useContext } from "react";

type Props = Readonly<CellState>;

const Cell = (p: Props) => {
  const isGameOver = useContext(IsGameOverContext);
  const dispatch = useContext(DispatchContext);
  let display: string;

  if (p.isRevealed) {
    if (p.isMined) display = "💣";
    else display = p.adjacentMines ? p.adjacentMines.toString() : "";
  } else {
    display = p.isFlagged ? "🚩" : "";
  }

  return (
    <div
      className={`${!p.isRevealed && "bg-gray-400"} grid h-12 w-12 place-items-center border border-black`}
      onClick={() => {
        if (isGameOver || p.isRevealed || p.isFlagged) return;
        dispatch({ type: "REVEAL", index: p.index });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        if (isGameOver || p.isRevealed) return;
        dispatch({ type: "TOGGLE_FLAG", index: p.index });
      }}
    >
      {display}
    </div>
  );
};

export default memo(Cell);
