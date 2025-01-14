import { JSX, memo } from "react";

interface Props {
  remaining: number;
}

export default memo(function MineCounter({ remaining }: Props): JSX.Element {
  return <p>{remaining} 💣</p>;
});
