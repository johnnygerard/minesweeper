"use client";
import { Board } from "@/components/board";
import { BoardState } from "@/types/board-state";
import { gameReducer } from "@/utils/game-reducer";
import { JSX } from "react";
import { useImmerReducer } from "use-immer";

export const Game = (): JSX.Element => {
  const [state, dispatch] = useImmerReducer(gameReducer, {
    isGameOver: false,
    board: new BoardState(),
  });

  return (
    <main className="flex flex-col items-center gap-8">
      <Board board={state.board} dispatch={dispatch} />
      <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
        Start New Game
      </button>
    </main>
  );
};
