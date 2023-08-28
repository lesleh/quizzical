import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quizzical",
  description: "GPT powered quizzes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="min-h-screen" lang="en-GB">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
