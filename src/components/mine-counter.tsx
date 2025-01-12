import { JSX } from "react";

interface MineCounterProps {
  remaining: number;
}

export const MineCounter = ({ remaining }: MineCounterProps): JSX.Element => {
  return <p>Mines: {remaining}</p>;
};
