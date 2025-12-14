import type { FC } from "react";
import { ButtonReplay } from "~/components/button-replay";
import { MineCounter } from "~/components/mine-counter";
import { Stopwatch } from "~/components/stopwatch";

export const GameBar: FC = () => (
  <div className="relative flex w-full justify-between text-xl">
    <Stopwatch />
    <MineCounter />
    <ButtonReplay />
  </div>
);
