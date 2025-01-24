import { Cell } from "@/types/cell";
import { immerable } from "immer";

export class Minelayer {
  [immerable] = true;

  /** Number of mines not yet deployed */
  private _mineCount: number;

  /** Number of undecided cells */
  private _cellCount: number;

  constructor(mineCount: number, cellCount: number) {
    this._mineCount = mineCount;
    this._cellCount = cellCount;
  }

  get mineProbability(): number {
    return this._mineCount / this._cellCount;
  }

  /**
   * Decide whether the target cell should be mined or not.
   * @param cell - The target cell
   */
  decide(cell: Cell): void {
    if (Math.random() < this.mineProbability) {
      this.deploy(cell);
      return;
    }

    this.safeguard(cell);
  }

  deploy(cell: Cell): void {
    cell.isMined = true;
    this._mineCount--;
    this._cellCount--;
  }

  safeguard(cell: Cell): void {
    cell.isMined = false;
    this._cellCount--;
  }
}
