import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { useGameContext } from "@/hooks/use-game-context";
import { memo } from "react";

const GameBar = () => {
  const { game, dispatch } = useGameContext();

  return (
    <div className="relative flex w-full justify-between text-xl">
      <Stopwatch />
      <MineCounter />
      {game.status !== "INITIAL" && (
        <button
          type="button"
          onClick={() => dispatch({ type: "RESTART" })}
          className="absolute left-1/2 -translate-x-1/2 uppercase tracking-wide"
        >
          {
            {
              PLAYING: "Restart",
              WON: "Play again",
              LOST: "Try again",
            }[game.status]
          }
        </button>
      )}
    </div>
  );
};

export default memo(GameBar);
