import { useEffect, useState, type FC } from "react";
import { useContextGameStatus } from "~/hooks/use-context-game-status";
import { formatTime } from "~/utils/format-time";

export const Stopwatch: FC = () => {
  const status = useContextGameStatus();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const displaySeconds = status.isNotStarted ? 0 : elapsedSeconds;

  useEffect(() => {
    if (status.isNotStarted) {
      const id = window.setTimeout(() => {
        setElapsedSeconds(0);
      }, 0);

      return () => {
        window.clearTimeout(id);
      };
    } else if (status.isInProgress) {
      const id = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        window.clearInterval(id);
      };
    }
  }, [status]);

  return <p className="tracking-wider">{formatTime(displaySeconds)}</p>;
};
