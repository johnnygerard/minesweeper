import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <div className="prose lg:prose-xl">{children}</div>
);

export default Layout;
