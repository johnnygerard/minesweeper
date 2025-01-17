import Game from "@/components/game";
import { memo } from "react";

const Home = () => {
  return (
    <div className="px-4 py-8">
      <h1 className="mb-12 text-4xl uppercase tracking-widest">Minesweeper</h1>
      <Game />
    </div>
  );
};

export default memo(Home);
