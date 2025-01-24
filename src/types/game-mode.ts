export type GameMode = Readonly<{
  name: string;
  urlPath: string;
  columnCount: number;
  rowCount: number;
  mineCount: number;
}>;
