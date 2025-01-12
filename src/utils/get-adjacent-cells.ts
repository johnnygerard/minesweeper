import { CellProps } from "@/components/cell";
import { BoardState } from "@/types/board-state";

/**
 * Return the adjacent cells of a target cell
 * @param cell - The target cell
 * @param board - The board state
 */
export const getAdjacentCells = (
  cell: CellProps,
  board: BoardState,
): readonly CellProps[] => {
  const { index } = cell;
  const { rows, columns } = board;
  const hasLeft = index % columns !== 0;
  const hasRight = index % columns !== columns - 1;
  const hasTop = index - columns >= 0;
  const hasBottom = index + columns < columns * rows;

  const horizontalOffsets = [];
  if (hasLeft) horizontalOffsets.push(-1);
  if (hasRight) horizontalOffsets.push(1);

  const verticalOffsets = [];
  if (hasTop) verticalOffsets.push(-columns);
  if (hasBottom) verticalOffsets.push(columns);

  const diagonalOffsets = [];
  for (const horizontalOffset of horizontalOffsets)
    for (const verticalOffset of verticalOffsets)
      diagonalOffsets.push(horizontalOffset + verticalOffset);

  const relativeOffsets = [
    ...horizontalOffsets,
    ...verticalOffsets,
    ...diagonalOffsets,
  ];

  return relativeOffsets.map((offset) => board.cells[index + offset]);
};
