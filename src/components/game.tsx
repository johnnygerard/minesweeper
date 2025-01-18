"use client";
import Board from "@/components/board";
import GameBar from "@/components/game-bar";
import { DispatchContext, GameStatusContext } from "@/contexts";
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
    <GameStatusContext.Provider value={game.status}>
      <DispatchContext.Provider value={dispatch}>
        <div className="flex flex-col items-center gap-8">
          <GameBar remainingFlags={game.board.remainingFlags} />
          <Board cells={game.board.cells} columns={game.board.columns} />
        </div>
      </DispatchContext.Provider>
    </GameStatusContext.Provider>
  );
};

export default memo(Game);
