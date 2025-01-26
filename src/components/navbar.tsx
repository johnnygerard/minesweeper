import { BookBookmark, CompassRose } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { memo } from "react";

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl justify-between p-4">
        <Link
          className="text-2xl uppercase tracking-widest transition-colors hover:text-blue-500"
          href="/"
          title="Home"
          aria-label="Home"
        >
          Minesweeper
        </Link>
        <div className="flex gap-4">
          <Link
            className="transition-colors transition-transform hover:scale-110 hover:text-blue-500"
            href="/game-modes"
            title="Game Modes"
            aria-label="Game Modes"
          >
            <CompassRose size="2rem" />
          </Link>
          <Link
            className="transition-colors transition-transform hover:scale-110 hover:text-blue-500"
            href="/how-to-play"
            title="How to Play"
            aria-label="How to Play"
          >
            <BookBookmark size="2rem" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
