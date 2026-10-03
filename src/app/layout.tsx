import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Perfumes Importtados | Lujos y Exclusividad",
  description: "Importadores directos en Uruguay de alta perfumería árabe e importada de diseñador. 100% Originales con envíos rápidos y efectivos a todo el país.",
  keywords: [
    "Perfumes Importtados",
    "Lujos y Exclusividad",
    "perfumes árabes uruguay",
    "perfumes importados uruguay",
    "lattafa uruguay",
    "afnan uruguay",
    "al haramain uruguay",
    "montale uruguay",
    "xerjoff uruguay"
  ],
  authors: [{ name: "Perfumes Importtados" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${montserrat.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-noir-950 text-sand-100 font-montserrat antialiased selection:bg-gold-500 selection:text-noir-950">
        <StoreProvider>
          <CartProvider>{children}</CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

