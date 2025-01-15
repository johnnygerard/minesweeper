import { memo } from "react";

type Props = Readonly<{
  remaining: number;
}>;

const MineCounter = (p: Props) => {
  return <p>{p.remaining} 💣</p>;
};

export default memo(MineCounter);
