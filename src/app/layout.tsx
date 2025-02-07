import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ProductProvider } from "@/context/ProductContext";
import { ClerkProvider} from '@clerk/nextjs'



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Morrent Rental E-commerce",
  description: "Rental E-commerce website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductProvider>
        <FavoritesProvider>
        <CartProvider>
        <Header />   
        {children} 
        <Footer /> 
        </CartProvider>
        </FavoritesProvider>
        </ProductProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
