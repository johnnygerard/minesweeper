import Game from "@/components/game";
import { memo } from "react";

export default memo(function Home() {
  return (
    <div>
      <h1 className="text-center">Minesweeper</h1>
      <Game />
    </div>
  );
});
