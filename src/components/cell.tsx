import NumberIcon from "@/components/number-icon";
import { useGameContext } from "@/hooks/use-game-context";
import { AdjacentMines } from "@/types/adjacent-mines";
import {
  Bomb,
  FlagPennant,
  QuestionMark,
  Trophy,
  X,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { JSX, memo } from "react";

type Props = Readonly<{
  adjacentMines?: AdjacentMines;
  borderColor: string;
  hasQuestionMark: boolean;
  index: number;
  isFlagged: boolean;
  isMined?: boolean;
  isRevealed: boolean;
  size: string;
}>;

const Cell = ({
  adjacentMines,
  borderColor,
  hasQuestionMark,
  index,
  isFlagged,
  isMined,
  isRevealed,
  size,
}: Props) => {
  const { game, dispatch } = useGameContext();
  const ICON_SIZE = "50%";
  const isNotPlayable = (isRevealed && adjacentMines === 0) || game.isOver;
  let content: JSX.Element | null;

  if (game.isWon && !isRevealed) {
    content = (
      <Trophy
        weight="fill"
        className="animate-trophy text-amber-500"
        size={ICON_SIZE}
      />
    );
  } else if (isFlagged) {
    if (game.isLost) {
      if (isMined) {
        content = (
          <Trophy
            weight="regular"
            size={ICON_SIZE}
            className="animate-icon text-amber-500"
          />
        );
      } else {
        content = <X className="animate-icon text-rose-600" size={ICON_SIZE} />;
      }
    } else {
      content = (
        <FlagPennant className="animate-icon text-red-600" size={ICON_SIZE} />
      );
    }
  } else if (game.isLost && isMined) {
    content = (
      <Bomb
        weight="fill"
        size={ICON_SIZE}
        className={
          isRevealed
            ? "animate-explosion text-rose-600"
            : "animate-icon text-zinc-700"
        }
      />
    );
  } else if (hasQuestionMark) {
    content = game.isLost ? null : <QuestionMark size={ICON_SIZE} />;
  } else if (isRevealed && adjacentMines) {
    content = (
      <NumberIcon
        className="animate-icon"
        size={ICON_SIZE}
        value={adjacentMines}
      />
    );
  } else {
    content = null;
  }

  return (
    <div
      className={clsx(
        "grid place-items-center border-b border-r text-xl shadow-sm transition-colors",
        borderColor,
        size,
        isNotPlayable || "cursor-pointer hover:bg-zinc-100 active:bg-zinc-50",
        isRevealed ? "bg-white" : "bg-zinc-200",
        game.isWon && isMined && "bg-amber-50",
        game.isLost && isRevealed && isMined && "bg-rose-50",
      )}
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
