"use client";
import type { FC } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: FC<Props> = ({ reset }) => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
