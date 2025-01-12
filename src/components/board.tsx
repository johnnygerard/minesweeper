import { Cell } from "@/components/cell";
import { BoardState } from "@/types/board-state";
import { GameAction } from "@/types/game-action";
import { Dispatch, JSX } from "react";

interface BoardProps {
  board: BoardState;
  dispatch: Dispatch<GameAction>;
}

export const Board = ({ board, dispatch }: BoardProps): JSX.Element => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${board.columns}, 1fr)` }}
    >
      {board.cells.map((cell, index) => (
        <Cell key={index} state={cell} dispatch={dispatch} />
      ))}
    </div>
  );
};
