import Game from "@/components/game";
import { memo } from "react";

const Home = () => {
  return (
    <div>
      <h1 className="text-center">Minesweeper</h1>
      <Game />
    </div>
  );
};

export default memo(Home);
