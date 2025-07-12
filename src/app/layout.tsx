import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lamazon",
  description: "Shopping is lame with Lamazon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="mx-auto max-w-7xl p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
