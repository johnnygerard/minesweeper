import { CellState } from "@/types/cell-state";
import { GameState } from "@/types/game-state";

export const revealCell = (game: GameState, cell: CellState): void => {
  if (cell.cannotReveal) return;
  const board = game.board;

  if (game.status.isNotStarted) {
    // Create opening
    const adjacentCells = board.getAdjacentCells(cell);

    for (const cell of adjacentCells) cell.isMined = false;
    cell.isMined = false;
    board.remainingCells -= adjacentCells.length + 1;
    board.revealSafeCell(cell);

    game.start();
    return;
  }

  const isMined = board.determineMine(cell);

  if (isMined) {
    cell.isRevealed = true;
    board.determineAllMines();
    game.setDefeat();
    return;
  }

  board.revealSafeCell(cell);
  if (board.hasWon) game.setVictory();
};
