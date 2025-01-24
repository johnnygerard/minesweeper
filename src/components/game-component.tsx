"use client";
import GameBar from "@/components/game-bar";
import GridComponent from "@/components/grid-component";
import { GameContext } from "@/contexts/game-context";
import { GameDispatchContext } from "@/contexts/game-dispatch-context";
import { GameStatusContext } from "@/contexts/game-status-context";
import { gameReducer } from "@/game-reducer";
import { Game } from "@/types/game";
import { GameMode } from "@/types/game-mode";
import { GameStatus } from "@/types/game-status";
import { memo } from "react";
import { useImmerReducer } from "use-immer";

type Props = Readonly<{
  mode: GameMode;
}>;

const GameComponent = ({ mode }: Props) => {
  const [{ game, status }, dispatch] = useImmerReducer(gameReducer, {
    game: new Game(mode),
    status: new GameStatus(),
  });

  return (
    <GameContext.Provider value={game}>
      <GameStatusContext.Provider value={status}>
        <GameDispatchContext.Provider value={dispatch}>
          <div className="flex flex-col items-center gap-8">
            <GameBar />
            <GridComponent grid={game.grid} mode={mode} />
          </div>
        </GameDispatchContext.Provider>
      </GameStatusContext.Provider>
    </GameContext.Provider>
  );
};

export default memo(GameComponent);
