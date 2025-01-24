import { Cell } from "@/types/cell";
import { immerable } from "immer";

export class Grid {
  [immerable] = true;

  // Linear storage with row-major order
  readonly cells = Array.from(
    { length: this.columnCount * this.rowCount },
    (_, index) => new Cell(index),
  );

  constructor(
    readonly columnCount: number,
    readonly rowCount: number,
  ) {}

  getAdjacentCells({ index }: Cell): readonly Cell[] {
    const hasLeft = index % this.columnCount !== 0;
    const hasRight = index % this.columnCount !== this.columnCount - 1;
    const hasTop = index - this.columnCount >= 0;
    const hasBottom =
      index + this.columnCount < this.columnCount * this.rowCount;

    const horizontalOffsets = [];
    if (hasLeft) horizontalOffsets.push(-1);
    if (hasRight) horizontalOffsets.push(1);

    const verticalOffsets = [];
    if (hasTop) verticalOffsets.push(-this.columnCount);
    if (hasBottom) verticalOffsets.push(this.columnCount);

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
