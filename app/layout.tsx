import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURORA | Modern Desk Aesthetics & Premium Accessories",
  description: "Discover curated premium electronics, high-fidelity audio equipment, minimalist wearables, and elegant desk layout accessories designed for the modern workplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased transition-colors duration-300`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-sans antialiased">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <CartSidebar />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
