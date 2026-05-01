import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import Scanlines from "@/components/effects/Scanlines";

export const metadata: Metadata = {
  title: { default: "PULSE // Analytics System", template: "%s // PULSE" },
  description:
    "Self-hosted cyberpunk analytics. Track events. Own your data. Zero compromise.",
  keywords: [
    "web analytics",
    "self-hosted",
    "privacy",
    "open source",
    "event tracking",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="">
        {/* <Scanlines /> */}
        <Providers>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "#0A0A0A",
                border: "1px solid #00FF41",
                color: "#00FF41",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
