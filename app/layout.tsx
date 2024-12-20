import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const interSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bordje Dibsen",
    description: "Poepfeut en automatisch inschrijven uitstaan? Bordje dibsen!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl">
            <body
                className={`${interSans.variable} antialiased bg-green-950 text-white`}
            >
                {children}
            </body>
        </html>
    );
}
