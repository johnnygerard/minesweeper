"use client";
import { Board } from "@/components/board";
import { MineCounter } from "@/components/mine-counter";
import { BoardState } from "@/types/board-state";
import { GameState } from "@/types/game-state";
import { gameReducer } from "@/utils/game-reducer";
import { JSX } from "react";
import { useImmerReducer } from "use-immer";

export const Game = (): JSX.Element => {
  const [state, dispatch] = useImmerReducer(
    gameReducer,
    new GameState(new BoardState()),
  );

  return (
    <main className="flex flex-col items-center gap-8">
      <MineCounter remaining={state.board.mines - state.board.flags} />
      <Board board={state.board} dispatch={dispatch} />
      <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
        Start New Game
      </button>
    </main>
  );
};
