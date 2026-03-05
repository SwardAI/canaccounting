import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "US LLC Tax Filing Services | Professional Tax Returns for Non-Residents",
  description:
    "Expert tax return and accounting services for non-US residents who own US LLCs. Hassle-free filing, IRS-compliant, trusted by international entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
