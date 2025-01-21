import ButtonReplay from "@/components/button-replay";
import MineCounter from "@/components/mine-counter";
import Stopwatch from "@/components/stopwatch";
import { memo } from "react";

const GameBar = () => {
  return (
    <div className="relative flex w-full justify-between text-xl">
      <Stopwatch />
      <MineCounter />
      <ButtonReplay />
    </div>
  );
};

export default memo(GameBar);
