import { CellState } from "@/types/cell-state";
import { DispatchContext } from "@/utils/dispatch-context";
import { memo, useContext } from "react";

type Props = Readonly<{
  cell: CellState;
}>;

const Cell = (p: Props) => {
  const { cell } = p;
  const {
    hasQuestionMark,
    isRevealed,
    isMined,
    adjacentMines,
    isFlagged,
    index,
  } = cell;
  const dispatch = useContext(DispatchContext);

  const getDisplay = (): string => {
    if (isRevealed) {
      if (isMined) return "💣";
      if (adjacentMines === undefined)
        throw new Error("Missing adjacent mines count");
      return adjacentMines === 0 ? "" : adjacentMines.toString();
    }

    if (isFlagged) return "🚩";
    if (hasQuestionMark) return "?";
    return "";
  };

  return (
    <div
      className={`${
        isRevealed ? "bg-white" : "bg-zinc-200"
      } grid h-12 w-12 place-items-center border border-zinc-300 text-xl shadow-sm transition-colors`}
      onClick={() => {
        dispatch({ type: isRevealed ? "AUTO_REVEAL" : "REVEAL", index });
      }}
      onContextMenu={() => {
        dispatch({ type: isRevealed ? "AUTO_FLAG" : "SWITCH_MARK", index });
      }}
    >
      {getDisplay()}
    </div>
  );
};

export default memo(Cell);
