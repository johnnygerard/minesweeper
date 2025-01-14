"use client";
import Board from "@/components/board";
import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { BoardState } from "@/types/board-state";
import { GameState } from "@/types/game-state";
import { DispatchContext } from "@/utils/dispatch-context";
import { gameReducer } from "@/utils/game-reducer";
import { JSX } from "react";
import { useImmerReducer } from "use-immer";

export default function Game(): JSX.Element {
  const [state, dispatch] = useImmerReducer(
    gameReducer,
    new GameState(new BoardState()),
  );

  return (
    <main className="flex flex-col items-center gap-8">
      <div className="flex w-full justify-between">
        <Stopwatch gameStatus={state.status} />
        <MineCounter remaining={state.board.mines - state.board.flags} />
      </div>
      <DispatchContext.Provider value={dispatch}>
        <Board board={state.board} />
      </DispatchContext.Provider>
      {state.status !== "INITIAL" && (
        <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
          {
            {
              PLAYING: "Restart",
              WON: "Play again",
              LOST: "Try again",
            }[state.status]
          }
        </button>
      )}
    </main>
  );
}
