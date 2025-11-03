import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { StoreProvider } from "../store/providers/StoreProvider";

// Load a Google font that includes Vietnamese glyphs and map it to the existing CSS variable
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binary Options - Trading Platform",
  description: "Professional binary options trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
