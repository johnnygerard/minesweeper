import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
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
      if (cell.cannotReveal) return;

      if (game.status.isNotStarted) {
        game.board.createOpening(cell);
        game.start();
        return;
      }

      if (game.board.determineMine(cell)) {
        cell.isRevealed = true;
        game.board.determineAllMines();
        game.setDefeat();
        return;
      }

      game.board.revealSafeCell(cell);
      if (game.board.hasWon) game.setVictory();
      return;
    case "AUTO_FLAG":
      game.board.autoFlag(cell);
      return;
    case "SWITCH_MARK":
      if (game.status.isNotStarted) return;
      game.board.switchMark(cell);
      return;
    case "AUTO_REVEAL": {
      const adjacentCells = game.board.getAdjacentCells(cell);
      const flaggedAdjacentCells = adjacentCells.filter(
        (cell) => cell.isFlagged,
      );

      if (flaggedAdjacentCells.length < cell.adjacentMines!) return;

      for (const adjacentCell of adjacentCells) {
        if (adjacentCell.cannotReveal) continue;
        if (adjacentCell.isMined) {
          adjacentCell.isRevealed = true;
          game.setDefeat();
          return;
        }
        game.board.revealSafeCell(adjacentCell);
      }

      if (game.board.hasWon) game.setVictory();
      return;
    }
  }
};
