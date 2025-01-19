import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { GameState } from "@/types/game-state";
import { GAME_STATUS } from "@/types/game-status";
import { Draft } from "immer";

export const gameReducer = (
  game: Draft<GameState>,
  action: GameAction,
): void => {
  if (action.type === "RESTART") {
    game.status = GAME_STATUS.INITIAL;
    game.board = new BoardState(game.board.mode);
    return;
  }

  if (game.isOver) return;
  const cell = game.board.cells[action.index];

  switch (action.type) {
    case "REVEAL":
      if (cell.isDirty) return;

      if (game.status === GAME_STATUS.INITIAL) {
        game.board.computeOpening(cell);
        game.status = GAME_STATUS.PLAYING;
        return;
      }

      if (game.board.computeMine(cell)) {
        cell.isRevealed = true;
        game.status = GAME_STATUS.LOST;
        return;
      }

      game.board.revealSafeCell(cell);
      game.status = game.board.hasWon ? GAME_STATUS.WON : GAME_STATUS.PLAYING;
      return;
    case "AUTO_FLAG":
      game.board.autoFlag(cell);
      return;
    case "SWITCH_MARK":
      if (game.status === "INITIAL") return;
      game.board.switchMark(cell);
      return;
    case "AUTO_REVEAL": {
      const adjacentCells = game.board.getAdjacentCells(cell);
      const flaggedAdjacentCells = adjacentCells.filter(
        (cell) => cell.isFlagged,
      );

      if (flaggedAdjacentCells.length < cell.adjacentMines!) return;

      for (const adjacentCell of adjacentCells) {
        if (adjacentCell.isDirty) continue;
        if (adjacentCell.isMined) {
          adjacentCell.isRevealed = true;
          game.status = GAME_STATUS.LOST;
          return;
        }
        game.board.revealSafeCell(adjacentCell);
      }

      game.status = game.board.hasWon ? GAME_STATUS.WON : GAME_STATUS.PLAYING;
      return;
    }
  }
};
