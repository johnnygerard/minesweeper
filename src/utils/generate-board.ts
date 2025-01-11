import { CellProps } from "@/components/cell";

export const generateBoard = (cells: number, mines: number): CellProps[] => {
  // Linear storage with row-major order.
  const board = new Array<CellProps>(cells);

  // Initialize the board with mines randomly positioned.
  for (let i = 0; i < board.length; i++) {
    const mineProbability = mines / cells;
    const isMined = Math.random() < mineProbability;

    board[i] = { isMined, index: i };
    if (isMined) mines--;
    cells--;
  }

  return board;
};
