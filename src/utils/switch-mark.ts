import { CellState } from "@/types/cell-state";
import { GameState } from "@/types/game-state";

export const switchMark = (game: GameState, cell: CellState): void => {
  if (game.status.isNotStarted) return;
  const board = game.board;

  if (cell.hasQuestionMark) {
    cell.hasQuestionMark = false;
    return;
  }

  if (cell.isFlagged) {
    cell.isFlagged = false;
    board.remainingFlags++;
    cell.hasQuestionMark = true;
    return;
  }

  board.flag(cell);
};
