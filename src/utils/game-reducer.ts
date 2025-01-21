import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { autoFlag } from "@/utils/auto-flag";
import { autoReveal } from "@/utils/auto-reveal";
import { revealCell } from "@/utils/reveal-cell";
import { switchMark } from "@/utils/switch-mark";
import { Draft } from "immer";

export const gameReducer = (
  game: Draft<GameState>,
  action: GameAction,
): void => {
  if (action.type === "RESTART") {
    game.reset();
    return;
  }

  if (game.status.isOver) return;
  const cell = game.board.cells[action.index];

  switch (action.type) {
    case "REVEAL":
      revealCell(game, cell);
      return;
    case "AUTO_FLAG":
      autoFlag(game, cell);
      return;
    case "SWITCH_MARK":
      switchMark(game, cell);
      return;
    case "AUTO_REVEAL": {
      autoReveal(game, cell);
      return;
    }
  }
};
