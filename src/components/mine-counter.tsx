import { useContextGameState } from "@/hooks/use-context-game-state";
import { Bomb } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

const MineCounter = () => {
  const game = useContextGameState();
  let count: number;

  if (game.status.isWon) {
    count = 0;
  } else if (game.status.isLost) {
    count = game.board.unflaggedMines;
  } else {
    count = game.board.remainingFlags;
  }

  return (
    <p className="flex gap-2 tracking-wider">
      {count}
      <Bomb weight="fill" />
    </p>
  );
};

export default memo(MineCounter);
