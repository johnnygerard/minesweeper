import { GAME_STATUS, GameStatus } from "@/types/game-status";
import { formatTime } from "@/utils/format-time";
import { memo, useEffect, useState } from "react";

type Props = Readonly<{
  gameStatus: GameStatus;
}>;

const Stopwatch = ({ gameStatus }: Props) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.INITIAL) {
      setElapsedSeconds(0);
    } else if (gameStatus === GAME_STATUS.PLAYING) {
      const id = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        window.clearInterval(id);
      };
    }
  }, [gameStatus]);

  return <p className="tracking-wider">{formatTime(elapsedSeconds)}</p>;
};

export default memo(Stopwatch);
