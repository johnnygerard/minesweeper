import { CellState } from "@/types/cell-state";
import { GameState } from "@/types/game-state";

export const revealCell = (game: GameState, cell: CellState): void => {
  if (cell.cannotReveal) return;

  if (game.status.isNotStarted) {
    game.board.createOpening(cell);
    game.start();
    return;
  }

  const isMined = game.board.determineMine(cell);

  if (isMined) {
    cell.isRevealed = true;
    game.board.determineAllMines();
    game.setDefeat();
    return;
  }

  game.board.revealSafeCell(cell);
  if (game.board.hasWon) game.setVictory();
};
