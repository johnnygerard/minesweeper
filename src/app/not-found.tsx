import type { Metadata } from "next";
import Link from "next/link";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound: FC = () => {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <hgroup>
          <p>404</p>
          <h1>Page Not Found</h1>
        </hgroup>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
