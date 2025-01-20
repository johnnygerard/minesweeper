import { GAME_MODES } from "@/constants/game-modes";
import { AdjacentMines } from "@/types/adjacent-mines";
import { CellState } from "@/types/cell-state";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  readonly rows = this.mode.rows;
  readonly columns = this.mode.columns;
  readonly mines = this.mode.mines;
  // Linear storage with row-major order
  cells = Array.from(
    { length: this.rows * this.columns },
    (_, index) => new CellState(index),
  );
  // Number of flags that can be placed by the player
  remainingFlags = this.mines;
  // Number of cells without a determined mine status
  remainingCells = this.cells.length;
  // Number of mines not yet assigned to a cell
  remainingMines = this.mines;

  constructor(readonly mode = GAME_MODES.EASY) {}

  /**
   * Return the number of unflagged mines.
   */
  get unflaggedMines(): number {
    return this.cells.reduce(
      (acc, cell) => acc + (cell.isMined && !cell.isFlagged ? 1 : 0),
      0,
    );
  }

  get hasWon(): boolean {
    return this.cells.every((cell) => cell.isMined || cell.isRevealed);
  }

  /**
   * Determine if the target cell is mined.
   * @param cell - The target cell
   * @returns True if the cell is mined, false otherwise.
   */
  computeMine(cell: CellState): boolean {
    if (cell.isMined !== undefined) return cell.isMined;

    const mineProbability = this.remainingMines / this.remainingCells;
    const isMined = Math.random() < mineProbability;

    this.remainingCells--;
    if (isMined) this.remainingMines--;
    return (cell.isMined = isMined);
  }

  computeAllMines(): void {
    for (const cell of this.cells) this.computeMine(cell);
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

  switchMark(cell: CellState): void {
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
    const hiddenAdjacentCells = this.getAdjacentCells(cell).filter(
      (cell) => !cell.isRevealed,
    );

    if (hiddenAdjacentCells.length === cell.adjacentMines)
      for (const cell of hiddenAdjacentCells) this.flag(cell);
  }

  computeOpening(cell: CellState): void {
    const adjacentCells = this.getAdjacentCells(cell);
    for (const cell of adjacentCells) cell.isMined = false;
    this.remainingCells -= adjacentCells.length;
    cell.isMined = false;
    this.remainingCells--;
    this.revealSafeCell(cell);
  }

  revealSafeCell(initial: CellState): void {
    const stack = [initial];
    let cell: CellState | undefined;

    while ((cell = stack.pop())) {
      if (cell.isDirty) continue;

      const adjacentCells = this.getAdjacentCells(cell);
      const adjacentMines = adjacentCells.reduce(
        (acc, cell) => acc + (this.computeMine(cell) ? 1 : 0),
        0,
      );

      cell.adjacentMines = adjacentMines as AdjacentMines;
      cell.isRevealed = true;
      if (cell.adjacentMines === 0) stack.push(...adjacentCells);
    }
  }

  /**
   * Return the adjacent cells of a target cell
   * @param cell - The target cell
   */
  getAdjacentCells(cell: CellState): readonly CellState[] {
    const { index } = cell;
    const hasLeft = index % this.columns !== 0;
    const hasRight = index % this.columns !== this.columns - 1;
    const hasTop = index - this.columns >= 0;
    const hasBottom = index + this.columns < this.columns * this.rows;

    const horizontalOffsets = [];
    if (hasLeft) horizontalOffsets.push(-1);
    if (hasRight) horizontalOffsets.push(1);

    const verticalOffsets = [];
    if (hasTop) verticalOffsets.push(-this.columns);
    if (hasBottom) verticalOffsets.push(this.columns);

    const diagonalOffsets = [];
    for (const horizontalOffset of horizontalOffsets)
      for (const verticalOffset of verticalOffsets)
        diagonalOffsets.push(horizontalOffset + verticalOffset);

    const relativeOffsets = [
      ...horizontalOffsets,
      ...verticalOffsets,
      ...diagonalOffsets,
    ];

    return relativeOffsets.map((offset) => this.cells[index + offset]);
  }
}
