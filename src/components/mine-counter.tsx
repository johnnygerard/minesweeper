import { BombIcon } from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";
import { useContextGame } from "~/hooks/use-context-game";
import { useContextGameStatus } from "~/hooks/use-context-game-status";

export const MineCounter: FC = () => {
  const game = useContextGame();
  const status = useContextGameStatus();
  let count: number;

  if (status.isWon) {
    count = 0;
  } else if (status.isLost) {
    count = game.unflaggedMineCount;
  } else {
    count = game.mineCount - game.flaggedCellCount;
  }

  return (
    <p className="flex items-center gap-2 tracking-wider">
      {count}
      <BombIcon weight="fill" />
    </p>
  );
};
