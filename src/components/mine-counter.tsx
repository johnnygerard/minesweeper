import { JSX, memo } from "react";

const MineCounter = (props: { remaining: number }): JSX.Element => {
  const { remaining } = props;
  return <p>{remaining} 💣</p>;
};

export default memo(MineCounter);
