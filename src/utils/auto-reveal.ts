import { AdjacentMines } from "@/types/adjacent-mines";
import { BoardState } from "@/types/board-state";
import { CellState } from "@/types/cell-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { Draft } from "immer";

/**
 * Starting from the given cell, recursively reveal adjacent cells of cells
 * with no adjacent mines.
 * @param cell - The initial cell to reveal
 * @param draft - The board state to update
 */
export const autoReveal = (cell: CellState, draft: Draft<BoardState>): void => {
  if (cell.isRevealed || cell.isFlagged) return;

  const adjacentCells = getAdjacentCells(cell, draft);
  const adjacentMines = adjacentCells.reduce(
    (acc, cell) => acc + (cell.isMined ? 1 : 0),
    0,
  );

  cell.isRevealed = true;
  cell.adjacentMines = adjacentMines as AdjacentMines;
  if (adjacentMines === 0)
    adjacentCells.forEach((cell) => autoReveal(cell, draft));
};
