import GameComponent from "@/components/game-component";
import { GameMode } from "@/types/game-mode";
import { memo } from "react";

type Props = Readonly<{
  mode: GameMode;
}>;

const GamePage = ({ mode }: Props) => {
  return <GameComponent mode={mode} />;
};

export default memo(GamePage);
