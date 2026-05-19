import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vierkanthof-glaubendorf.at'),
  title: "Vierkanthof Glaubendorf | Renovierter historischer Vierkanthof im Weinviertel",
  description: "Einmalige Gelegenheit: Renovierter historischer Vierkanthof mit Pool, 240 m² Wohnfläche und 4.375 m² Grundstück in Glaubendorf, nur 40 Minuten von Wien. € 1.290.000.",
  keywords: ["Vierkanthof", "Glaubendorf", "Weinviertel", "Immobilie", "Luxusimmobilie", "Pool", "Historisches Gebäude", "Österreich", "Wien Umland", "Lukas Heim"],
  authors: [{ name: "Lukas Heim" }],
  openGraph: {
    title: "Vierkanthof Glaubendorf | Einmalige Gelegenheit im Weinviertel",
    description: "Renovierter historischer Vierkanthof mit 240 m², Pool und großer Scheune. Nur 40 Minuten von Wien. € 1.290.000.",
    images: [{ url: "https://images.unsplash.com/photo-1600585154340-be6161a56b0a?w=1200&q=80" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F5F0] text-[#2C2522]">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
