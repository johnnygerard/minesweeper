import { useContextGameStatus } from "@/hooks/use-context-game-status";
import { formatTime } from "@/utils/format-time";
import { memo, useEffect, useState } from "react";

const Stopwatch = () => {
  const status = useContextGameStatus();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (status.isNotStarted) {
      setElapsedSeconds(0);
    } else if (status.isInProgress) {
      const id = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        window.clearInterval(id);
      };
    }
  }, [status]);

  return <p className="tracking-wider">{formatTime(elapsedSeconds)}</p>;
};

export default memo(Stopwatch);
