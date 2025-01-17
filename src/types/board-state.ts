import { AdjacentMines } from "@/types/adjacent-mines";
import { CellState } from "@/types/cell-state";
import { GAME_DIFFICULTY, GameDifficulty } from "@/types/game-difficulty";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  cells: CellState[]; // Linear storage with row-major order
  readonly mines: number;
  remainingFlags: number;
  readonly rows: number;
  readonly columns: number;

  constructor(difficulty: GameDifficulty = GAME_DIFFICULTY.EASY) {
    switch (difficulty) {
      case "EASY":
        this.mines = 10;
        this.rows = 9;
        this.columns = 9;
        break;
      case "MEDIUM":
        this.mines = 40;
        this.rows = 16;
        this.columns = 16;
        break;
      case "HARD":
        this.mines = 99;
        this.rows = 16;
        this.columns = 30;
        break;
      default:
        throw new Error("Invalid game difficulty");
    }

    const cells = new Array<CellState>(this.rows * this.columns);
    let remainingCells = cells.length;
    let remainingMines = this.mines;
    this.remainingFlags = this.mines;

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

  revealSafeCell(initial: CellState): void {
    const stack = [initial];
    let cell: CellState | undefined;

    while ((cell = stack.pop())) {
      if (cell.isDirty) continue;
      const adjacentCells = this.getAdjacentCells(cell);
      const adjacentMines = adjacentCells.reduce(
        (acc, cell) => acc + (cell.isMined ? 1 : 0),
        0,
      );

      cell.adjacentMines = adjacentMines as AdjacentMines;
      cell.isRevealed = true;
      if (adjacentMines === 0) stack.push(...adjacentCells);
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
