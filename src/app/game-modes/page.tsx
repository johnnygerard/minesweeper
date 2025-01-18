import { GAME_MODES } from "@/constants/game-modes";
import { GameMode } from "@/types/game-mode";
import Link from "next/link";
import { memo } from "react";

const Page = () => {
  const modes: (GameMode & {
    name: string;
    path: string;
    className: string;
  })[] = [
    {
      ...GAME_MODES.EASY,
      name: "Easy",
      path: "/",
      className: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
    },
    {
      ...GAME_MODES.MEDIUM,
      name: "Medium",
      path: "/medium",
      className: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    },
    {
      ...GAME_MODES.HARD,
      name: "Expert",
      path: "/expert",
      className: "bg-rose-50 hover:bg-rose-100 border-rose-200",
    },
  ];

  return (
    <div className="px-4 py-8">
      <h1 className="mb-12 text-4xl uppercase tracking-widest">Game Modes</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {modes.map(({ name, rows, columns, mines, path, className }) => (
          <Link
            key={name}
            href={path}
            className={`group rounded-lg border p-6 shadow-sm transition-colors ${className}`}
          >
            <h2 className="text-2xl font-medium">{name}</h2>
            <p className="mt-1 text-zinc-600">
              {`${columns}×${rows} grid with ${mines} mines`}
            </p>
            <div className="mt-4 text-zinc-400 transition-transform group-hover:translate-x-1">
              ⟶
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Page);
