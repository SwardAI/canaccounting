import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const customSans = localFont({
  src: "../../public/fonts/sans.ttf",
  variable: "--font-inter",
  display: "swap",
});

const customSerif = localFont({
  src: "../../public/fonts/serif.ttf",
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CanTax — LLC Tax Returns for $300",
    template: "%s | CanTax",
  },
  description:
    "LLC tax returns done right — by professionals since 2018. Fast, accurate, and stress-free. Filed in 48 hours.",
  openGraph: {
    title: "CanTax — LLC Tax Returns for $300",
    description:
      "LLC tax returns done right — by professionals since 2018. Fast, accurate, and stress-free. Filed in 48 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customSans.variable} ${customSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
