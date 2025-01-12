import { CellState } from "@/types/cell-state";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  // Linear storage with row-major order
  cells: CellState[];

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
}
