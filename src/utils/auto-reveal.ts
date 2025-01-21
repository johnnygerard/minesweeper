import { CellState } from "@/types/cell-state";
import { GameState } from "@/types/game-state";

export const autoReveal = (game: GameState, cell: CellState): void => {
  const adjacentCells = game.board.getAdjacentCells(cell);
  const flaggedAdjacentCellCount = adjacentCells.reduce(
    (acc, cell) => (cell.isFlagged ? acc + 1 : acc),
    0,
  );

  if (flaggedAdjacentCellCount < cell.adjacentMines!) return;

  let hasRevealedMine = false;

  for (const adjacentCell of adjacentCells) {
    if (adjacentCell.cannotReveal) continue;

    if (adjacentCell.isMined) {
      adjacentCell.isRevealed = true;
      hasRevealedMine = true;
      continue;
    }

    game.board.revealSafeCell(adjacentCell);
  }

  if (hasRevealedMine) {
    game.setDefeat();
    return;
  }

  if (game.board.hasWon) game.setVictory();
};
