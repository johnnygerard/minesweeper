import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { formatTime } from "@/utils/format-time";
import { memo, useEffect, useState } from "react";

type Props = Readonly<{
  gameStatus: GameStatus;
}>;

const Stopwatch = (p: Props) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (p.gameStatus === GAME_STATUS.INITIAL) {
      setElapsedSeconds(0);
    } else if (p.gameStatus === GAME_STATUS.PLAYING) {
      const id = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        window.clearInterval(id);
      };
    }
  }, [p.gameStatus]);

  return <p>{formatTime(elapsedSeconds)}</p>;
};

export default memo(Stopwatch);
