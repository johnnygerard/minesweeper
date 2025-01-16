import { memo } from "react";

type Props = Readonly<{
  remaining: number;
}>;

const MineCounter = (p: Props) => {
  return <p className="text-2xl tracking-wider">{p.remaining} 💣</p>;
};

export default memo(MineCounter);
