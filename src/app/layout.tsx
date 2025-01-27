import "./globals.css";
import Navbar from "@/components/navbar";
import clsx from "clsx";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { memo, ReactNode } from "react";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const APP_NAME = "Minesweeper";
const DESCRIPTION =
  "A modern recreation of the classic Minesweeper game from Microsoft Windows.";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: DESCRIPTION,
  icons: [
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/images/favicon-32x32.png",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://minesweeper.jgerard.dev/",
    siteName: APP_NAME,
    title: APP_NAME,
    description: DESCRIPTION,
  },
};

type Props = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: Props) => {
  return (
    <html
      className={clsx("font-sans antialiased", spaceGrotesk.variable)}
      lang="en-US"
    >
      <body className="flex min-h-screen min-w-min flex-col bg-zinc-50">
        <Navbar />
        <main className="grid flex-1 place-items-center px-4 py-8">
          {children}
        </main>
        <noscript>
          <div
            style={{
              position: "fixed",
              zIndex: 1000,
              top: 0,
              left: 0,
              right: 0,
              padding: "1rem",
              backgroundColor: "#fff4f4",
              color: "#d32f2f",
              borderBottom: "2px solid currentColor",
              textAlign: "center",
            }}
            role="alert"
          >
            <p>
              JavaScript is required for this website to function properly.
              Please ensure that it is supported and enabled in your browser
              settings.
              <br />
              To learn more, check out{" "}
              <a
                style={{ textDecorationLine: "underline", color: "LinkText" }}
                href="https://enable-javascript.com/"
              >
                How to enable JavaScript in your browser
              </a>
              .
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
};

export default memo(RootLayout);
