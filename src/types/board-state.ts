import { CellProps } from "@/components/cell";
import { immerable } from "immer";

export class BoardState {
  [immerable] = true;
  // Linear storage with row-major order
  cells: CellProps[];

  constructor(
    readonly mines: number,
    readonly rows: number,
    readonly columns: number,
  ) {
    const cells = new Array<CellProps>(this.rows * this.columns);
    let remainingCells = cells.length;
    let remainingMines = mines;

    // Initialize the board with mines randomly positioned
    for (let i = 0; i < cells.length; i++) {
      const mineProbability = remainingMines / remainingCells;
      const isMined = Math.random() < mineProbability;

      cells[i] = { isMined, index: i };
      if (isMined) remainingMines--;
      remainingCells--;
    }

    this.cells = cells;
  }
}
