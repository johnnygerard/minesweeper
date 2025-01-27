import { useContextGame } from "@/hooks/use-context-game";
import { useContextGameStatus } from "@/hooks/use-context-game-status";
import { Bomb } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

const MineCounter = () => {
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
      <Bomb weight="fill" />
    </p>
  );
};

export default memo(MineCounter);
