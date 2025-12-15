import { GamePage } from "~/components/game-page";
import { GAME_MODES } from "~/constants/game-modes";

const Page = () => <GamePage mode={GAME_MODES.EASY} />;
export default Page;
