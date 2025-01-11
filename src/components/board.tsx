"use client";
import { Cell } from "@/components/cell";
import { AdjacentMines } from "@/types/adjacent-mines";
import { generateBoard } from "@/utils/generate-board";
import { getAdjacentCells } from "@/utils/get-adjacent-cells";
import { JSX, useState } from "react";

export interface BoardProps {
  rows: number;
  columns: number;
  mines: number;
}

export const Board = ({ rows, columns, mines }: BoardProps): JSX.Element => {
  const [board, setBoard] = useState(generateBoard(rows * columns, mines));

  const revealCell = (index: number): void => {
    setBoard((board) => {
      const cell = board[index];
      const newCell = { ...cell, isRevealed: true };

      if (!cell.isMined) {
        newCell.adjacentMines = getAdjacentCells(index, rows, columns).reduce(
          (count, index) => count + (board[index].isMined ? 1 : 0),
          0,
        ) as AdjacentMines;
      }

      return [...board.slice(0, index), newCell, ...board.slice(index + 1)];
    });
  };

  const toggleFlag = (index: number): void => {
    setBoard((board) => {
      const cell = board[index];

      return [
        ...board.slice(0, index),
        { ...cell, isFlagged: !cell.isFlagged },
        ...board.slice(index + 1),
      ];
    });
  };

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {board.map((cellProps, index) => (
        <Cell
          key={index}
          {...cellProps}
          revealCell={revealCell}
          toggleFlag={toggleFlag}
        />
      ))}
    </div>
  );
};
