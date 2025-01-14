import Game from "@/components/game";
import { JSX, memo } from "react";

const Home = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-center">Minesweeper</h1>
      <Game />
    </div>
  );
};

export default memo(Home);
