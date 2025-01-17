import { DispatchContext } from "@/contexts/dispatch-context";
import { AdjacentMines } from "@/types/adjacent-mines";
import {
  Bomb,
  FlagPennant,
  NumberEight,
  NumberFive,
  NumberFour,
  NumberOne,
  NumberSeven,
  NumberSix,
  NumberThree,
  NumberTwo,
  QuestionMark,
} from "@phosphor-icons/react/dist/ssr";
import { JSX, memo, useContext } from "react";

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
  const ICON_SIZE = "50%";
  const isNotPlayable = isRevealed && (adjacentMines === 0 || isMined);
  let content: JSX.Element | null = null;

  if (isRevealed) {
    if (isMined) {
      content = (
        <Bomb weight="fill" className="animate-icon" size={ICON_SIZE} />
      );
    } else {
      switch (adjacentMines) {
        case 1:
          content = (
            <NumberOne
              className="animate-icon text-blue-600"
              size={ICON_SIZE}
            />
          );
          break;
        case 2:
          content = (
            <NumberTwo
              className="animate-icon text-emerald-600"
              size={ICON_SIZE}
            />
          );
          break;
        case 3:
          content = (
            <NumberThree
              className="animate-icon text-red-600"
              size={ICON_SIZE}
            />
          );
          break;
        case 4:
          content = (
            <NumberFour
              className="animate-icon text-indigo-700"
              size={ICON_SIZE}
            />
          );
          break;
        case 5:
          content = (
            <NumberFive
              className="animate-icon text-amber-700"
              size={ICON_SIZE}
            />
          );
          break;
        case 6:
          content = (
            <NumberSix
              className="animate-icon text-teal-600"
              size={ICON_SIZE}
            />
          );
          break;
        case 7:
          content = (
            <NumberSeven
              className="animate-icon text-violet-700"
              size={ICON_SIZE}
            />
          );
          break;
        case 8:
          content = (
            <NumberEight
              className="animate-icon text-rose-700"
              size={ICON_SIZE}
            />
          );
          break;
        default:
          if (adjacentMines === undefined)
            throw new Error("Missing adjacent mines count");
      }
    }
  } else if (isFlagged) {
    content = (
      <FlagPennant className="animate-icon text-red-600" size={ICON_SIZE} />
    );
  } else if (hasQuestionMark) {
    content = <QuestionMark size={ICON_SIZE} />;
  }

  return (
    <div
      className={`${
        isRevealed ? "bg-white" : "bg-zinc-200"
      } ${isNotPlayable ? "" : "cursor-pointer hover:bg-zinc-100 active:bg-zinc-50"} grid h-12 w-12 place-items-center border border-zinc-300 text-xl shadow-sm transition-colors`}
      onClick={() => {
        dispatch({ type: isRevealed ? "AUTO_REVEAL" : "REVEAL", index });
      }}
      onContextMenu={() => {
        dispatch({ type: isRevealed ? "AUTO_FLAG" : "SWITCH_MARK", index });
      }}
    >
      {content}
    </div>
  );
};

export default memo(Cell);
