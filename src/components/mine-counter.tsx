import { JSX, memo } from "react";

interface Props {
  remaining: number;
}

const MineCounter = ({ remaining }: Props): JSX.Element => {
  return <p>{remaining} 💣</p>;
};

export default memo(MineCounter);
