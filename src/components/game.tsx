import { Board } from "@/components/board";
import { JSX } from "react";

export const Game = (): JSX.Element => {
  return (
    <>
      <Board rows={8} columns={8} mines={10} />
    </>
  );
};
