import type { Metadata } from "next";
import "./styles/globals.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/Auth.Context";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revelix",
  description: "Watch the best streaming movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
