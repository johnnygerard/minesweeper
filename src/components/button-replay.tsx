import { useGameContext } from "@/hooks/use-game-context";
import { GAME_STATUS } from "@/types/game-status";
import { memo } from "react";

const ButtonReplay = () => {
  const { game, dispatch } = useGameContext();
  let text: string | null;

  switch (game.status) {
    case GAME_STATUS.IN_PROGRESS:
      text = "Restart";
      break;
    case GAME_STATUS.WON:
      text = "Play again";
      break;
    case GAME_STATUS.LOST:
      text = "Try again";
      break;
    default:
      text = null;
  }

  return (
    <>
      {text && (
        <button
          type="button"
          onClick={() => dispatch({ type: "RESTART" })}
          className="absolute left-1/2 -translate-x-1/2 uppercase tracking-wide"
        >
          {text}
        </button>
      )}
    </>
  );
};

export default memo(ButtonReplay);
