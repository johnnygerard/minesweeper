import { AdjacentMines } from "@/types/adjacent-mines";
import { DispatchContext } from "@/utils/dispatch-context";
import { memo, useContext } from "react";

type Props = Readonly<{
  adjacentMines?: AdjacentMines;
  hasQuestionMark: boolean;
  index: number;
  isFlagged: boolean;
  isMined: boolean;
  isRevealed: boolean;
}>;

const Cell = ({
  adjacentMines,
  hasQuestionMark,
  index,
  isFlagged,
  isMined,
  isRevealed,
}: Props) => {
  const dispatch = useContext(DispatchContext);
  let display = "";
  let digitColorClass = hasQuestionMark ? "" : "text-zinc-200";

  if (isRevealed) {
    if (isMined) {
      display = "💣";
    } else if (adjacentMines === undefined) {
      throw new Error("Missing adjacent mines count");
    } else if (adjacentMines !== 0) {
      display = adjacentMines.toString();
      digitColorClass = {
        1: "text-blue-600",
        2: "text-emerald-600",
        3: "text-red-600",
        4: "text-indigo-700",
        5: "text-amber-700",
        6: "text-teal-600",
        7: "text-violet-700",
        8: "text-rose-700",
      }[adjacentMines];
    }
  } else if (isFlagged) {
    display = "🚩";
  } else if (hasQuestionMark) {
    display = "?";
  }

  return (
    <div
      className={`${
        isRevealed ? "bg-white" : "bg-zinc-200"
      } grid h-12 w-12 place-items-center border border-zinc-300 text-xl shadow-sm ${digitColorClass} transition-colors`}
      onClick={() => {
        dispatch({ type: isRevealed ? "AUTO_REVEAL" : "REVEAL", index });
      }}
      onContextMenu={() => {
        dispatch({ type: isRevealed ? "AUTO_FLAG" : "SWITCH_MARK", index });
      }}
    >
      {display}
    </div>
  );
};

export default memo(Cell);
