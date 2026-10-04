"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromotionsCarousel from "@/components/PromotionsCarousel";
import OlfactoryPillars from "@/components/OlfactoryPillars";
import FragranceQuizSection from "@/components/FragranceQuizSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchFocus = () => {
    const catalogElement = document.getElementById("catalogo");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full min-h-screen min-h-[100dvh] bg-noir-950 text-sand-100 flex flex-col selection:bg-gold-500 selection:text-noir-950 relative">
      {/* Barra de Navegación de Alta Gama con Botones Atrás, Inicio y Buscador */}
      <Navbar onSearchClick={handleSearchFocus} />

      {/* 1. Hero Section con Importadores directos en Uruguay, 100% Originales y Envíos a todo el país */}
      <Hero />

      {/* 2. Carrusel de Nuevos Ingresos & Ofertas Promocionales */}
      <PromotionsCarousel />

      {/* 3. Catálogo Oficial con Productos, Buscador e Emojis de Notas Olfativas */}
      <ProductGrid
        products={products}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 4. Los 4 Pilares Olfativos y Filtros por Familia Olfativa */}
      <OlfactoryPillars />

      {/* 5. Sección de Sugerencias & Recomendación Personalizada */}
      <FragranceQuizSection />

      {/* 6. Carrusel de Reseñas de Clientes Verificados en Uruguay */}
      <ReviewsCarousel />

      {/* 7. Footer Simétrico con Información Completa de Contacto */}
      <Footer />

      {/* Reproductor de Música de Ambiente de Lujo */}
      <AudioPlayer />

      {/* Cajón de Carrito de Compras en $ UYU con Mercado Pago +10% Recargo, Zonas de Envío y WhatsApp */}
      <CartDrawer />

      {/* Modal de Vista Rápida con Selector de Frasco vs Decant (10ml) */}
      <QuickViewModal />
    </main>
  );
}



