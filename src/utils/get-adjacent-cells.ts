/**
 * Compute all adjacent cells indexes for the given cell index.
 * @param index - The target cell index
 * @param rows - The number of rows in the grid
 * @param columns - The number of columns in the grid
 */
export const getAdjacentCells = (
  index: number,
  rows: number,
  columns: number,
): readonly number[] => {
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

  return relativeOffsets.map((offset) => index + offset);
};
