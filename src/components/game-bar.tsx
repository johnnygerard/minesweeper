"use client";
import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { DispatchContext } from "@/contexts";
import { GameStatus } from "@/types/game-status";
import { memo, useContext } from "react";

type Props = Readonly<{
  gameStatus: GameStatus;
  remainingFlags: number;
}>;

const GameBar = ({ gameStatus, remainingFlags }: Props) => {
  const dispatch = useContext(DispatchContext);

  return (
    <div className="relative flex w-full justify-between text-xl">
      <Stopwatch gameStatus={gameStatus} />
      <MineCounter remaining={remainingFlags} />
      {gameStatus !== "INITIAL" && (
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
            }[gameStatus]
          }
        </button>
      )}
    </div>
  );
};

export default memo(GameBar);
