import { Game } from "@/types/game";
import { GAME_ACTION, GameAction } from "@/types/game-action";
import { GameStatus } from "@/types/game-status";
import { Draft } from "immer";

export const gameReducer = (
  draft: Draft<{ game: Game; status: GameStatus }>,
  action: GameAction,
): void => {
  const { game, status } = draft;

  const checkEndGame = (): void => {
    if (game.isLost) {
      status.isLost = true;
      game.deployRemainingMines();
      return;
    }

    if (game.isWon) status.isWon = true;
  };

  if (action.type === GAME_ACTION.RESTART) {
    draft.game = new Game(game.mode);
    draft.status = new GameStatus();
    return;
  }

  if (status.isOver) return;
  const cell = game.grid.cells[action.index];

  if (status.isNotStarted) {
    if (action.type !== GAME_ACTION.REVEAL) return;
    game.createOpening(cell);
    status.isInProgress = true;
    checkEndGame();
    return;
  }

  switch (action.type) {
    case GAME_ACTION.REVEAL:
      game.reveal(cell);
      checkEndGame();
      break;
    case GAME_ACTION.AUTO_REVEAL:
      game.autoReveal(cell);
      checkEndGame();
      break;
    case GAME_ACTION.AUTO_FLAG:
      game.autoFlag(cell);
      break;
    case GAME_ACTION.TOGGLE_FLAG:
      game.toggleFlag(cell);
      break;
    case GAME_ACTION.TOGGLE_QUESTION_MARK:
      game.toggleQuestionMark(cell);
      break;
    default:
      ((_: never) => _)(action); // Exhaustiveness check
  }
};
