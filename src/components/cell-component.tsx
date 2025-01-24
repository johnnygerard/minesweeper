import NumberIcon from "@/components/number-icon";
import { useContextGameDispatch } from "@/hooks/use-context-game-dispatch";
import { useContextGameStatus } from "@/hooks/use-context-game-status";
import { Cell } from "@/types/cell";
import { GAME_ACTION } from "@/types/game-action";
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
  cell: Cell;
  borderColor: string;
  size: string;
}>;

const CellComponent = ({ cell, borderColor, size }: Props) => {
  const status = useContextGameStatus();
  const dispatch = useContextGameDispatch();
  const { isLost, isWon } = status;
  const {
    adjacentMineCount,
    hasQuestionMark,
    index,
    isFlagged,
    isMined,
    isRevealed,
  } = cell;
  const ICON_SIZE = "50%";
  let content: JSX.Element | null;
  const isNotPlayable =
    (isRevealed && adjacentMineCount === 0) || status.isOver;

  if (isWon && !isRevealed) {
    content = (
      <Trophy
        weight="fill"
        className="animate-trophy text-amber-500"
        size={ICON_SIZE}
      />
    );
  } else if (isFlagged) {
    if (isLost) {
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
  } else if (isLost && isMined) {
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
    content = isLost ? null : <QuestionMark size={ICON_SIZE} />;
  } else if (isRevealed && adjacentMineCount) {
    content = (
      <NumberIcon
        className="animate-icon"
        size={ICON_SIZE}
        value={adjacentMineCount}
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
        isWon && isMined && "bg-amber-50",
        isLost && isRevealed && isMined && "bg-rose-50",
      )}
      onClick={() => {
        dispatch({
          type: isRevealed ? GAME_ACTION.AUTO_REVEAL : GAME_ACTION.REVEAL,
          index,
        });
      }}
      onContextMenu={() => {
        dispatch({
          type: isRevealed ? GAME_ACTION.AUTO_FLAG : GAME_ACTION.TOGGLE_FLAG,
          index,
        });
      }}
      onMouseUp={(event) => {
        if (event.button === 1) {
          dispatch({
            type: GAME_ACTION.TOGGLE_QUESTION_MARK,
            index,
          });
        }
      }}
    >
      {content}
    </div>
  );
};

export default memo(CellComponent);
