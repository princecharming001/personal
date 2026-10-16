import type { Metadata } from "next";
import { Geist_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import AdminEditorDot from "./components/admin-editor-dot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anish Polakala",
  description:
    "Product lead and two-time acquired founder. CPO at Palo, cofounder of Lemonhat, UC Berkeley data science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AdminEditorDot />
      </body>
    </html>
  );
}
