import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BodyDouble | Virtual Coworking",
  description: "Synchronized pomodoro rooms for remote workers with AI accountability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}