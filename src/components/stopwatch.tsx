import { GameStatusContext } from "@/contexts";
import { GAME_STATUS } from "@/types/game-status";
import { formatTime } from "@/utils/format-time";
import { memo, useContext, useEffect, useState } from "react";

const Stopwatch = () => {
  const gameStatus = useContext(GameStatusContext);
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
