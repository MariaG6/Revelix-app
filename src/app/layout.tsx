import type { Metadata } from "next";
import "./styles/globals.css";
import { Roboto } from "next/font/google";
import React, { PropsWithChildren } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revelix",
  description: "Watch the best streaming movies",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}