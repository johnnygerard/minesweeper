import { useGameContext } from "@/hooks/use-game-context";
import { formatTime } from "@/utils/format-time";
import { memo, useEffect, useState } from "react";

const Stopwatch = () => {
  const { game } = useGameContext();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (game.isNotStarted) {
      setElapsedSeconds(0);
    } else if (game.isInProgress) {
      const id = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        window.clearInterval(id);
      };
    }
  }, [game]);

  return <p className="tracking-wider">{formatTime(elapsedSeconds)}</p>;
};

export default memo(Stopwatch);
