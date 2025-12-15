import type { FC } from "react";
import { useContextGameDispatch } from "~/hooks/use-context-game-dispatch";
import { useContextGameStatus } from "~/hooks/use-context-game-status";
import { GAME_ACTION } from "~/types/game-action";

export const ButtonReplay: FC = () => {
  const status = useContextGameStatus();
  const dispatch = useContextGameDispatch();
  let text: string | null;

  if (status.isInProgress) {
    text = "Restart";
  } else if (status.isWon) {
    text = "Play again";
  } else if (status.isLost) {
    text = "Try again";
  } else {
    text = null;
  }

  return (
    <>
      {text && (
        <button
          type="button"
          onClick={() => dispatch({ type: GAME_ACTION.RESTART })}
          className="absolute left-1/2 -translate-x-1/2 tracking-wide uppercase"
        >
          {text}
        </button>
      )}
    </>
  );
};
