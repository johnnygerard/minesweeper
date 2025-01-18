export type GameMode = Readonly<{
  name: string;
  urlPath: string;
  columns: number;
  rows: number;
  mines: number;
}>;
