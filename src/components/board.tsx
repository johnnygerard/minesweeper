"use client";
import { Cell } from "@/components/cell";
import { BoardState } from "@/types/board-state";
import { boardReducer } from "@/utils/board-reducer";
import { JSX } from "react";
import { useImmerReducer } from "use-immer";

interface BoardProps {
  mines: number;
  rows: number;
  columns: number;
}

export const Board = ({ mines, rows, columns }: BoardProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer(
    boardReducer,
    new BoardState(mines, rows, columns),
  );

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {state.cells.map((cellProps, index) => (
        <Cell key={index} {...cellProps} dispatch={dispatch} />
      ))}
    </div>
  );
};
