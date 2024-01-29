import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavigationHeader from "@/components/navigation/NavigationHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies Bucket - Browse, Share and Wish",
  description: "Browse movies, watch movie trailers and create a wishlist with the movies you wish to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="modalContainer"></div>
        <NavigationHeader />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
