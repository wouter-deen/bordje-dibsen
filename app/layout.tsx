import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const playfairDisplay = Merriweather_Sans({
    variable: "--font-playfair-display",
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
                className={`${playfairDisplay.className} antialiased bg-green-950 text-white`}
            >
                {children}
            </body>
        </html>
    );
}
