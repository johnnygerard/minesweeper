import { AdjacentMines } from "@/types/adjacent-mines";
import { CellState } from "@/types/cell-state";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  // Linear storage with row-major order
  cells: CellState[];
  remainingFlags = this.mines;

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

  get hasWon(): boolean {
    return this.cells.every((cell) => cell.isMined || cell.isRevealed);
  }

  /**
   * Flag the target cell if there is at least one remaining flag
   */
  flag(cell: CellState): void {
    if (this.remainingFlags === 0) return;
    cell.isFlagged = true;
    this.remainingFlags--;
  }

  /**
   * Unflag the target cell
   */
  unflag(cell: CellState): void {
    cell.isFlagged = false;
    this.remainingFlags++;
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
