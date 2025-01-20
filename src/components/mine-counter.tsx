import { useGameContext } from "@/hooks/use-game-context";
import { Bomb } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

const MineCounter = () => {
  const { game } = useGameContext();
  const count = game.isWon
    ? 0
    : game.isLost
      ? game.board.unflaggedMines
      : game.board.remainingFlags;

  return (
    <p className="flex gap-2 tracking-wider">
      {count}
      <Bomb weight="fill" />
    </p>
  );
};

export default memo(MineCounter);
