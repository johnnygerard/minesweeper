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
import { JSX, memo, PointerEvent, useRef } from "react";

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

  const canHandlePointerUp = useRef(false);
  const longPressTimeoutId = useRef(0);
  const pointerDownTime = useRef(0);
  const SHORT_PRESS_THRESHOLD = 100;
  const LONG_PRESS_THRESHOLD = 500;

  const handlePointerDown = (event: PointerEvent): void => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      pointerDownTime.current = Date.now();
      window.clearTimeout(longPressTimeoutId.current);

      longPressTimeoutId.current = window.setTimeout(() => {
        dispatch({ type: GAME_ACTION.TOGGLE_QUESTION_MARK, index });
      }, LONG_PRESS_THRESHOLD);
    }

    canHandlePointerUp.current = true;
  };

  const handlePointerUp = (event: PointerEvent): void => {
    if (!canHandlePointerUp.current) return;
    canHandlePointerUp.current = false;

    if (event.pointerType === "touch" || event.pointerType === "pen") {
      const touchDuration = Date.now() - pointerDownTime.current;

      if (touchDuration >= LONG_PRESS_THRESHOLD) return;
      window.clearTimeout(longPressTimeoutId.current);

      if (touchDuration >= SHORT_PRESS_THRESHOLD) {
        dispatch({
          type: isRevealed ? GAME_ACTION.AUTO_FLAG : GAME_ACTION.TOGGLE_FLAG,
          index,
        });
      } else {
        // Single tap detected
        dispatch({
          type: isRevealed ? GAME_ACTION.AUTO_REVEAL : GAME_ACTION.REVEAL,
          index,
        });
      }

      return;
    }

    if (event.pointerType === "mouse") {
      switch (event.button) {
        case 0: // Main button (left click)
          dispatch({
            type: isRevealed ? GAME_ACTION.AUTO_REVEAL : GAME_ACTION.REVEAL,
            index,
          });
          break;
        case 1: // Auxiliary button (middle click)
          dispatch({
            type: GAME_ACTION.TOGGLE_QUESTION_MARK,
            index,
          });
          break;
        case 2: // Secondary button (right click)
          dispatch({
            type: isRevealed ? GAME_ACTION.AUTO_FLAG : GAME_ACTION.TOGGLE_FLAG,
            index,
          });
          break;
      }
    }
  };

  const handlePointerCancel = (): void => {
    window.clearTimeout(longPressTimeoutId.current);
  };

  const handlePointerLeave = (): void => {
    canHandlePointerUp.current = false;
  };

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
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </div>
  );
};

export default memo(CellComponent);
