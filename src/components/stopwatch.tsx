import { useGameContext } from "@/hooks/use-game-context";
import { GAME_STATUS } from "@/types/game-status";
import { formatTime } from "@/utils/format-time";
import { memo, useEffect, useState } from "react";

const Stopwatch = () => {
  const { game } = useGameContext();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    switch (game.status) {
      case GAME_STATUS.INITIAL:
        setElapsedSeconds(0);
        break;
      case GAME_STATUS.PLAYING:
        const id = window.setInterval(() => {
          setElapsedSeconds((prev) => prev + 1);
        }, 1000);
        return () => {
          window.clearInterval(id);
        };
      default:
        break;
    }
  }, [game.status]);

  return <p className="tracking-wider">{formatTime(elapsedSeconds)}</p>;
};

export default memo(Stopwatch);
