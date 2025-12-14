export const formatTime = (elapsedSeconds: number): string => {
  const minutes = Math.floor(elapsedSeconds / 60) % 60;
  const seconds = elapsedSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
