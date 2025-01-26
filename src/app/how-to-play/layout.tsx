import { memo, ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default memo(Layout);
