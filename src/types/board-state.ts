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
   * Flag the target cell if possible.
   * @param cell - The target cell
   */
  flag(cell: CellState): void {
    if (cell.isDirty || this.remainingFlags === 0) return;
    cell.isFlagged = true;
    this.remainingFlags--;
  }

  toggleFlag(cell: CellState): void {
    if (cell.hasQuestionMark) {
      cell.hasQuestionMark = false;
      return;
    }

    if (cell.isFlagged) {
      cell.isFlagged = false;
      this.remainingFlags++;
      cell.hasQuestionMark = true;
      return;
    }

    this.flag(cell);
  }

  autoFlag(cell: CellState): void {
    const hiddenAdjacentCells = getAdjacentCells(cell, this).filter(
      (cell) => !cell.isRevealed,
    );

    if (hiddenAdjacentCells.length === cell.adjacentMines)
      for (const cell of hiddenAdjacentCells) this.flag(cell);
  }

  revealSafeCell(initial: CellState): void {
    const stack = [initial];
    let cell: CellState | undefined;

    while ((cell = stack.pop())) {
      if (cell.isDirty) continue;
      const adjacentCells = getAdjacentCells(cell, this);
      const adjacentMines = adjacentCells.reduce(
        (acc, cell) => acc + (cell.isMined ? 1 : 0),
        0,
      );

      cell.adjacentMines = adjacentMines as AdjacentMines;
      cell.isRevealed = true;
      if (adjacentMines === 0) stack.push(...adjacentCells);
    }
  }
}
