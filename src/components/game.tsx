"use client";
import Board from "@/components/board";
import GameBar from "@/components/game-bar";
import { GameContext } from "@/contexts";
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
    <GameContext.Provider value={{ game, dispatch }}>
      <div className="flex flex-col items-center gap-8">
        <GameBar
          remainingFlags={game.board.remainingFlags}
          mode={game.board.mode}
        />
        <Board board={game.board} />
      </div>
    </GameContext.Provider>
  );
};

export default memo(Game);
