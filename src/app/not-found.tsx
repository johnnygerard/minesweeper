import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "404 Not Found",
};

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div>
        <h1 className="mb-4 text-4xl font-medium tracking-widest uppercase">
          404 Not Found
        </h1>
        <p className="text-lg text-zinc-600">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
