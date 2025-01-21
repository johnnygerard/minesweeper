import { CellState } from "@/types/cell-state";
import { GameState } from "@/types/game-state";

export const autoFlag = (game: GameState, cell: CellState): void => {
  const board = game.board;
  const hiddenAdjacentCells = board
    .getAdjacentCells(cell)
    .filter((cell) => !cell.isRevealed);

  if (hiddenAdjacentCells.length === cell.adjacentMines)
    for (const cell of hiddenAdjacentCells) board.flag(cell);
};
