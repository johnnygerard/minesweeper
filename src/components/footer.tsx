import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-sm text-zinc-600">
        <p>© 2025 Johnny Gérard</p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-accent"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://github.com/johnnygerard/minesweeper"
            className="transition-colors hover:text-accent"
            title="Source code GitHub repository"
            aria-label="Source code GitHub repository"
          >
            <GithubLogo size="1.5rem" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
