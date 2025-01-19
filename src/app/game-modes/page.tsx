import { GAME_MODES } from "@/constants/game-modes";
import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";

export const metadata: Metadata = {
  title: "Game Modes",
  description: "Select a game mode",
};

const Page = () => {
  const modes = [
    {
      className: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      mode: GAME_MODES.EASY,
    },
    {
      className: "bg-amber-50 hover:bg-amber-100 border-amber-200",
      mode: GAME_MODES.MEDIUM,
    },
    {
      className: "bg-rose-50 hover:bg-rose-100 border-rose-200",
      mode: GAME_MODES.HARD,
    },
  ];

  return (
    <div className="px-4 py-8">
      <h1 className="mb-12 text-4xl uppercase tracking-widest">Game Modes</h1>
      <div className="grid gap-4 lg:auto-cols-fr lg:grid-flow-col">
        {modes.map(({ className, mode }) => {
          const { name, urlPath, columns, rows, mines } = mode;

          return (
            <Link
              key={name}
              href={urlPath}
              className={clsx(
                "group rounded-lg border p-6 shadow-sm transition-colors",
                className,
              )}
            >
              <h2 className="text-2xl font-medium">{name}</h2>
              <p className="mt-1 text-zinc-600">
                {`${columns}×${rows} grid with ${mines} mines`}
              </p>
              <div className="mt-4 text-zinc-400 transition-transform group-hover:translate-x-1">
                ⟶
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Page);
