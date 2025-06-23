import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import { CartProvider } from "@/lib/context";
import { Toaster } from "sonner";

const manRope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const manRopeBold = Manrope({
  weight: "700",
  variable: "--font-manrope-bold",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Azubi Store",
  description:
    "A fully functional, multi-page e-commerce website built with Next.js. The goal is to closely replicate the provided design guidelines and deliver a seamless shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manRope.variable} antialiased`}
      >
        <CartProvider>
          {children}
           <Toaster />
          </CartProvider>
      </body>
    </html>
  );
}
