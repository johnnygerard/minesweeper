import { JSX } from "react";

interface Props {
  remaining: number;
}

export const MineCounter = ({ remaining }: Props): JSX.Element => {
  return <p>Mines: {remaining}</p>;
};
