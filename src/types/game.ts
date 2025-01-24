import { GAME_MODES } from "@/constants/game-modes";
import { AdjacentMineCount } from "@/types/adjacent-mine-count";
import { Cell } from "@/types/cell";
import { Grid } from "@/types/grid";
import { Minelayer } from "@/types/minelayer";
import { immerable } from "immer";

export class Game {
  [immerable] = true;
  readonly grid: Grid;
  readonly cellCount: number;
  readonly mineCount: number;
  readonly minelayer: Minelayer;
  flaggedCellCount = 0;
  revealedMineCount = 0;
  revealedSafeCellCount = 0;

  constructor(readonly mode = GAME_MODES.EASY) {
    const { columnCount, rowCount, mineCount } = mode;

    this.grid = new Grid(columnCount, rowCount);
    this.cellCount = this.grid.cells.length;
    this.mineCount = mineCount;
    this.minelayer = new Minelayer(mineCount, this.cellCount);
  }

  get isLost(): boolean {
    return this.revealedMineCount > 0;
  }

  get isWon(): boolean {
    return this.revealedSafeCellCount + this.mineCount === this.cellCount;
  }

  get unflaggedMineCount(): number {
    return this.grid.cells.reduce(
      (acc, cell) => (cell.isMined && !cell.isFlagged ? acc + 1 : acc),
      0,
    );
  }

  /**
   * If the target cell's adjacent mine count matches the number of hidden
   * adjacent cells, then flag them all.
   * @param target - The target cell
   */
  autoFlag(target: Cell): void {
    if (!target.isRevealed) return;

    const hiddenAdjacentCells = this.grid
      .getAdjacentCells(target)
      .filter((cell) => !cell.isRevealed);

    if (hiddenAdjacentCells.length === target.adjacentMineCount)
      for (const cell of hiddenAdjacentCells) this._flag(cell);
  }

  /**
   * If the number of adjacent mines is less or equal to the number of flagged
   * adjacent cells, then reveal all adjacent cells that can be revealed.
   * @param target
   */
  autoReveal(target: Cell): void {
    if (!target.isRevealed) return;

    const adjacentCells = this.grid.getAdjacentCells(target);
    const flaggedAdjacentCellCount = adjacentCells.reduce(
      (acc, cell) => (cell.isFlagged ? acc + 1 : acc),
      0,
    );

    if (flaggedAdjacentCellCount < target.adjacentMineCount!) return;

    for (const adjacentCell of adjacentCells)
      if (adjacentCell.isInitial) this.reveal(adjacentCell);
  }

  createOpening(target: Cell): void {
    const adjacentCells = this.grid.getAdjacentCells(target);

    // Ensure the target and its neighbors are not mined
    this.minelayer.safeguard(target);
    for (const adjacentCell of adjacentCells)
      this.minelayer.safeguard(adjacentCell);

    this.reveal(target);
  }

  deployRemainingMines(): void {
    for (const cell of this.grid.cells)
      if (cell.isMined === undefined) this.minelayer.decide(cell);
  }

  reveal(target: Cell): void {
    if (!target.isInitial) return;
    this._revealOne(target);

    if (target.adjacentMineCount === 0) {
      const adjacentCells = this.grid.getAdjacentCells(target);
      this._revealSafeCells(...adjacentCells);
    }
  }

  toggleFlag(cell: Cell): void {
    if (cell.isFlagged) {
      cell.isInitial = true;
      this.flaggedCellCount--;
      return;
    }

    this._flag(cell);
  }

  toggleQuestionMark(cell: Cell): void {
    if (cell.isRevealed) return;

    if (cell.hasQuestionMark) {
      cell.isInitial = true;
      return;
    }

    cell.hasQuestionMark = true;
  }

  private _flag(cell: Cell): void {
    if (
      !cell.isRevealed &&
      !cell.isFlagged &&
      this.flaggedCellCount < this.mineCount
    ) {
      cell.isFlagged = true;
      this.flaggedCellCount++;
    }
  }

  private _getAdjacentMineCount(cell: Cell): AdjacentMineCount {
    const adjacentMineCount = this.grid
      .getAdjacentCells(cell)
      .reduce((acc, cell) => (this._isMined(cell) ? acc + 1 : acc), 0);

    return adjacentMineCount as AdjacentMineCount;
  }

  private _isMined(cell: Cell): boolean {
    if (cell.isMined === undefined) this.minelayer.decide(cell);
    return cell.isMined as boolean;
  }

  private _revealOne(cell: Cell): void {
    cell.isRevealed = true;

    if (this._isMined(cell)) {
      this.revealedMineCount++;
      return;
    }

    this.revealedSafeCellCount++;
    cell.adjacentMineCount = this._getAdjacentMineCount(cell);
  }

  /**
   * Repeatedly reveal safe cells with zero adjacent mines.
   * @param cells - The safe adjacent cells to reveal
   */
  private _revealSafeCells(...cells: Cell[]): void {
    let cell: Cell | undefined;

    while ((cell = cells.pop())) {
      if (!cell.isInitial) continue;
      this._revealOne(cell);

      if (cell.adjacentMineCount === 0) {
        const adjacentCells = this.grid.getAdjacentCells(cell);
        cells.push(...adjacentCells);
      }
    }
  }
}
