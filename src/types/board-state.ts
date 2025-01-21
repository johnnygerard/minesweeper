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
    const revealedSafeCells = this.cells.reduce(
      (acc, cell) => acc + (cell.isRevealed && cell.isMined === false ? 1 : 0),
      0,
    );

    return revealedSafeCells === this.cells.length - this.mines;
  }

  /**
   * Decide whether the target cell is mined or not.
   * @param cell - The target cell
   * @returns The mine status of the target cell
   */
  determineMine(cell: CellState): boolean {
    if (typeof cell.isMined === "boolean") return cell.isMined;

    const mineProbability = this.remainingMines / this.remainingCells;
    const isMined = Math.random() < mineProbability;

    this.remainingCells--;
    if (isMined) this.remainingMines--;
    return (cell.isMined = isMined);
  }

  determineAllMines(): void {
    for (const cell of this.cells) this.determineMine(cell);
  }

  /**
   * Flag the target cell if possible.
   * @param cell - The target cell
   */
  flag(cell: CellState): void {
    if (cell.cannotFlag || this.remainingFlags === 0) return;
    cell.isFlagged = true;
    cell.hasQuestionMark = false;
    this.remainingFlags--;
  }

  revealSafeCell(target: CellState): void {
    const stack: CellState[] = [];
    let cell: CellState | undefined = target;

    do {
      if (cell.cannotReveal) continue;
      const adjacentCells = this.getAdjacentCells(cell);
      const adjacentMines = adjacentCells.reduce(
        (acc, cell) => acc + (this.determineMine(cell) ? 1 : 0),
        0,
      );

      cell.adjacentMines = adjacentMines as AdjacentMines;
      cell.isRevealed = true;
      if (adjacentMines === 0) stack.push(...adjacentCells);
    } while ((cell = stack.pop()));
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
