import { useGameContext } from "@/hooks/use-game-context";
import { GAME_STATUS } from "@/types/game-status";
import { Bomb } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

const MineCounter = () => {
  const { game } = useGameContext();
  let count: number;

  switch (game.status) {
    case GAME_STATUS.WON:
      count = 0;
      break;
    case GAME_STATUS.LOST:
      count = game.board.unflaggedMines;
      break;
    default:
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
