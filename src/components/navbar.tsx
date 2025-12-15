import {
  BookBookmarkIcon,
  CompassRoseIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { FC } from "react";

export const Navbar: FC = () => (
  <nav className="border-b border-zinc-200 bg-white">
    <div className="mx-auto flex max-w-7xl justify-between p-4">
      <Link
        className="text-2xl tracking-widest uppercase transition-colors hover:text-accent"
        href="/"
        title="Home"
        aria-label="Home"
      >
        Minesweeper
      </Link>
      <div className="flex gap-4">
        <Link
          className="transition-[color,scale] hover:scale-110 hover:text-accent"
          href="/game-modes"
          title="Game Modes"
          aria-label="Game Modes"
        >
          <CompassRoseIcon size="2rem" />
        </Link>
        <Link
          className="transition-[color,scale] hover:scale-110 hover:text-accent"
          href="/how-to-play"
          title="How to Play"
          aria-label="How to Play"
        >
          <BookBookmarkIcon size="2rem" />
        </Link>
      </div>
    </div>
  </nav>
);
