import type { FC } from "react";
import { GameComponent } from "~/components/game-component";
import type { GameMode } from "~/types/game-mode";

type Props = {
  mode: GameMode;
};

export const GamePage: FC<Props> = ({ mode }) => <GameComponent mode={mode} />;
