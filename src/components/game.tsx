"use client";
import Board from "@/components/board";
import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { BoardState } from "@/types/board-state";
import { GameState } from "@/types/game-state";
import { DispatchContext } from "@/utils/dispatch-context";
import { gameReducer } from "@/utils/game-reducer";
import { IsGameOverContext } from "@/utils/is-game-over-context";
import { memo } from "react";
import { useImmerReducer } from "use-immer";

const Game = () => {
  const [game, dispatch] = useImmerReducer(
    gameReducer,
    new GameState(new BoardState()),
  );

  return (
    <main className="flex flex-col items-center gap-8">
      <div className="flex w-full justify-between">
        <Stopwatch gameStatus={game.status} />
        <MineCounter remaining={game.board.mines - game.board.flags} />
      </div>
      <IsGameOverContext value={game.isGameOver}>
        <DispatchContext.Provider value={dispatch}>
          <Board cells={game.board.cells} columns={game.board.columns} />
        </DispatchContext.Provider>
      </IsGameOverContext>
      {game.status !== "INITIAL" && (
        <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
          {
            {
              PLAYING: "Restart",
              WON: "Play again",
              LOST: "Try again",
            }[game.status]
          }
        </button>
      )}
    </main>
  );
};

export default memo(Game);
