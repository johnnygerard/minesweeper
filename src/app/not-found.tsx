import Link from "next/link";
import { JSX, memo } from "react";

const NotFound = (): JSX.Element => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default memo(NotFound);
