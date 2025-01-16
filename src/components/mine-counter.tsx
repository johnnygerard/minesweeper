import { memo } from "react";

type Props = Readonly<{
  remaining: number;
}>;

const MineCounter = ({ remaining }: Props) => {
  return <p className="text-2xl tracking-wider">{remaining} 💣</p>;
};

export default memo(MineCounter);
