"use client";
import Board from "@/components/board";
import GameBar from "@/components/game-bar";
import { GameDispatchContext, GameStateContext } from "@/contexts";
import { BoardState } from "@/types/board-state";
import { GameMode } from "@/types/game-mode";
import { GameState } from "@/types/game-state";
import { gameReducer } from "@/utils/game-reducer";
import { memo } from "react";
import { useImmerReducer } from "use-immer";

type Props = Readonly<{
  mode: GameMode;
}>;

const Game = ({ mode }: Props) => {
  const [game, dispatch] = useImmerReducer(
    gameReducer,
    new GameState(new BoardState(mode)),
  );

  return (
    <GameStateContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        <div className="flex flex-col items-center gap-8">
          <GameBar />
          <Board board={game.board} />
        </div>
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export default memo(Game);
