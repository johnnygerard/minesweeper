import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { FC, ReactNode } from "react";
import "~/app/globals.css";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const APP_NAME = "Minesweeper";
const TITLE = APP_NAME;
const DESCRIPTION =
  "A modern recreation of the classic Minesweeper game from Microsoft Windows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://minesweeper.jgerard.dev"),
  title: {
    template: `%s | ${APP_NAME}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: APP_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html
      className={spaceGrotesk.variable}
      data-scroll-behavior="smooth"
      lang="en-US"
    >
      <body className="flex min-h-screen min-w-min flex-col bg-zinc-50 font-sans">
        <Navbar />
        <main className="grid flex-1 place-items-center px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
