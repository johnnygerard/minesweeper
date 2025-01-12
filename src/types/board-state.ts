import { AdjacentMines } from "@/types/adjacent-mines";
import { CellState } from "@/types/cell-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  // Linear storage with row-major order
  cells: CellState[];
  flags = 0;

  constructor(
    readonly mines = 10,
    readonly rows = 8,
    readonly columns = 8,
  ) {
    const cells = new Array<CellState>(this.rows * this.columns);
    let remainingCells = cells.length;
    let remainingMines = mines;

    // Initialize the board with mines randomly positioned
    for (let i = 0; i < cells.length; i++) {
      const mineProbability = remainingMines / remainingCells;
      const isMined = Math.random() < mineProbability;

      cells[i] = new CellState(i, isMined);
      if (isMined) remainingMines--;
      remainingCells--;
    }

    this.cells = cells;
  }

  /**
   * Toggle a cell flag without exceeding the total number of mines
   * @param cell - The cell to toggle the flag
   */
  toggleFlag(cell: CellState): void {
    if (cell.isRevealed) return;

    if (cell.isFlagged) {
      cell.isFlagged = false;
      this.flags--;
    } else if (this.flags < this.mines) {
      cell.isFlagged = true;
      this.flags++;
    }
  }

  /**
   * Starting from the given cell, recursively reveal adjacent cells of cells
   * with no adjacent mines.
   * @param cell - The initial cell to reveal
   */
  autoReveal(cell: CellState): void {
    if (cell.isRevealed || cell.isFlagged) return;

    const adjacentCells = getAdjacentCells(cell, this);
    const adjacentMines = adjacentCells.reduce(
      (acc, cell) => acc + (cell.isMined ? 1 : 0),
      0,
    );

    cell.isRevealed = true;
    cell.adjacentMines = adjacentMines as AdjacentMines;
    if (adjacentMines === 0)
      adjacentCells.forEach((cell) => this.autoReveal(cell));
  }
}
