import { Bomb } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

type Props = Readonly<{
  remaining: number;
}>;

const MineCounter = ({ remaining }: Props) => {
  return (
    <p className="flex gap-2 text-2xl tracking-wider">
      {remaining}
      <Bomb weight="fill" />
    </p>
  );
};

export default memo(MineCounter);
