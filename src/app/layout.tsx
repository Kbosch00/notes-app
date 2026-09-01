import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NotesProvider } from "../components/NotesProvider";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes",
  description: "Create notes to organize your ideas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-linear-to-b from-lime-600 via-lime-500/80 to-lime-600">
        <NotesProvider>
          {children}
          <ToastContainer autoClose={1500} position="top-center" />
        </NotesProvider>
      </body>
    </html>
  );
}
