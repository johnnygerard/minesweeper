import type { Metadata } from "next";
import { Aldrich } from "next/font/google";
import "./globals.css";
import { memo, ReactNode } from "react";

const aldrich = Aldrich({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-aldrich",
});

const TITLE = "Minesweeper";
const DESCRIPTION =
  "A modern recreation of the classic Minesweeper game from Microsoft Windows.";

export const metadata: Metadata = {
  title: TITLE,
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
    siteName: "Minesweeper",
    title: TITLE,
    description: DESCRIPTION,
  },
};

type Props = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: Props) => {
  return (
    <html className={`${aldrich.variable} font-sans antialiased`} lang="en-US">
      <body className="bg-zinc-50">
        <div className="grid min-h-screen place-items-center" role="main">
          {children}
        </div>
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
