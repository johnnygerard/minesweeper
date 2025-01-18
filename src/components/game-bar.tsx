"use client";
import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { DispatchContext, GameStatusContext } from "@/contexts";
import { GameMode } from "@/types/game-mode";
import { memo, useContext } from "react";

type Props = Readonly<{
  mode: GameMode;
  remainingFlags: number;
}>;

const GameBar = ({ mode, remainingFlags }: Props) => {
  const gameStatus = useContext(GameStatusContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div className="relative flex w-full justify-between text-xl">
      <Stopwatch />
      <MineCounter remaining={remainingFlags} />
      {gameStatus !== "INITIAL" && (
        <button
          type="button"
          onClick={() => dispatch({ type: "RESTART", mode })}
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
