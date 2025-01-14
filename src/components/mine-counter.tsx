import { JSX, memo } from "react";

type Props = Readonly<{
  remaining: number;
}>;

const MineCounter = ({ remaining }: Props): JSX.Element => {
  return <p>{remaining} 💣</p>;
};

export default memo(MineCounter);
