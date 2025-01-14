import { JSX } from "react";

interface Props {
  remaining: number;
}

export default function MineCounter({ remaining }: Props): JSX.Element {
  return <p>{remaining} 💣</p>;
}
