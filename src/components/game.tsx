"use client";
import Board from "@/components/board";
import GameBar from "@/components/game-bar";
import { DispatchContext } from "@/contexts";
import { BoardState } from "@/types/board-state";
import { GameState } from "@/types/game-state";
import { gameReducer } from "@/utils/game-reducer";
import { memo } from "react";
import { useImmerReducer } from "use-immer";

const Game = () => {
  const [game, dispatch] = useImmerReducer(
    gameReducer,
    new GameState(new BoardState()),
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <main className="flex flex-col items-center gap-8">
        <GameBar
          gameStatus={game.status}
          remainingFlags={game.board.remainingFlags}
        />
        <Board cells={game.board.cells} columns={game.board.columns} />
      </main>
    </DispatchContext.Provider>
  );
};

export default memo(Game);
