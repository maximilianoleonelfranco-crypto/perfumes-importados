"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Flame, Eye, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import NoteBadge from "./NoteBadge";

export default function PromotionsCarousel() {
  const { products } = useStore();
  const { addToCart, setQuickViewProduct, formatPrice } = useCart();

  const [activeTab, setActiveTab] = useState<"new" | "offers">("new");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const touchStartXRef = useRef<number | null>(null);

  // Lista de productos para la pestaña activa
  const featuredProducts = products.slice(0, 8);
  const offerProducts = products
    .filter((p) => p.discount || p.badge || p.originalPrice)
    .slice(0, 8);

  const displayList = activeTab === "new" ? featuredProducts : offerProducts;
  const currentProduct = displayList[currentIndex] || displayList[0];

  // Cambiar pestaña y reiniciar índice
  const handleTabChange = (tab: "new" | "offers") => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // Temporizador automático de 3 segundos exactos para rotación continua
  useEffect(() => {
    if (isPaused || displayList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, displayList.length, activeTab, currentIndex]);

  const handleNext = () => {
    if (displayList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const handlePrev = () => {
    if (displayList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof currentProduct) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  // Soporte para gestos táctiles en móvil (swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const diff = touchStartXRef.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  if (!currentProduct) return null;

  return (
    <section className="py-12 sm:py-16 bg-noir-900/90 border-b border-gold-500/20 relative overflow-hidden select-none">
      <style>{`
        @keyframes progressCountdown {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-3s {
          animation: progressCountdown 3s linear forwards;
        }
        @keyframes bottleReveal {
          0% { opacity: 0; transform: scale(0.95) translateY(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-bottle-reveal {
          animation: bottleReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Halo de luz de fondo dorado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado con pestañas de selección */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Novedades & Descuentos Especiales</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-sand-50 tracking-wider">
              Nuevos Ingresos & Ofertas
            </h2>
          </div>

          {/* Selector de Pestaña */}
          <div className="flex items-center bg-noir-950 p-1 rounded-2xl border border-gold-500/30 shadow-inner">
            <button
              onClick={() => handleTabChange("new")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "new"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-noir-950 shadow-gold-glow"
                  : "text-sand-400 hover:text-sand-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Últimos Ingresos</span>
            </button>

            <button
              onClick={() => handleTabChange("offers")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "offers"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-noir-950 shadow-gold-glow"
                  : "text-sand-400 hover:text-sand-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Ofertas Promocionales</span>
            </button>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL DEL CARRUSEL AUTOMÁTICO */}
        <div
          className="relative bg-noir-950 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-gold-500/60 hover:shadow-gold-glow-lg group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* BARRA DE PROGRESO DE 3 SEGUNDOS */}
          <div className="absolute top-0 inset-x-0 h-1 bg-noir-900 z-30 overflow-hidden">
            <div
              key={`${activeTab}-${currentIndex}-${isPaused}`}
              className={`h-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-300 ${
                isPaused ? "w-full opacity-60" : "animate-progress-3s"
              }`}
            />
          </div>

          {/* Tarjeta del Producto en Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-10 gap-6 sm:gap-10 min-h-[380px]">
            {/* 1. Imagen del Perfume con Efecto de Revelación y Halo Dorado */}
            <div className="md:col-span-5 relative flex items-center justify-center">
              {/* Resplandor radial detrás de la botella */}
              <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-tr from-gold-500/20 via-amber-600/10 to-transparent blur-2xl pointer-events-none" />

              <div
                key={currentProduct.id}
                className="relative w-56 sm:w-72 h-56 sm:h-72 aspect-square animate-bottle-reveal cursor-pointer"
                onClick={() => setQuickViewProduct(currentProduct)}
              >
                <Image
                  src={currentProduct.imageUrl}
                  alt={currentProduct.title}
                  fill
                  sizes="(max-width: 640px) 250px, 320px"
                  className="object-contain object-center drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
              </div>

              {/* Insignia / Badge sobre la imagen */}
              <div className="absolute top-0 left-0 z-20 flex flex-col gap-1.5">
                {currentProduct.discount && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {currentProduct.discount} OFF
                  </span>
                )}
                <span className="px-2.5 py-1 bg-gold-500/20 border border-gold-500/50 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                  {activeTab === "new" ? "NUEVO INGRESO" : "OFERTA DESTACADA"}
                </span>
              </div>
            </div>

            {/* 2. Información del Producto */}
            <div
              key={`info-${currentProduct.id}`}
              className="md:col-span-7 flex flex-col justify-center text-center md:text-left space-y-4 animate-fade-in"
            >
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-400 font-bold block mb-1">
                  {currentProduct.brand || "Maison de Autor"}
                </span>
                <h3
                  onClick={() => setQuickViewProduct(currentProduct)}
                  className="font-cinzel text-xl sm:text-3xl font-bold text-sand-50 hover:text-gold-300 transition-colors cursor-pointer leading-tight"
                >
                  {currentProduct.title}
                </h3>
                {currentProduct.volume && (
                  <span className="text-xs text-sand-400 mt-1 block">
                    Presentación: {currentProduct.volume}
                  </span>
                )}
              </div>

              {/* Acordes Olfativos */}
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                {currentProduct.notes.slice(0, 4).map((note, index) => (
                  <NoteBadge key={index} note={note} size="sm" />
                ))}
              </div>

              {/* Precios y Descuento */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                {currentProduct.originalPrice && (
                  <span className="text-sm sm:text-base text-sand-500 line-through">
                    {formatPrice(currentProduct.originalPrice)}
                  </span>
                )}
                <span className="font-montserrat font-bold text-2xl sm:text-3xl text-gold-400">
                  {formatPrice(currentProduct.price)}
                </span>
                {currentProduct.discount && (
                  <span className="px-2 py-0.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded">
                    Ahorro exclusivo
                  </span>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={(e) => handleAddToCart(e, currentProduct)}
                  disabled={currentProduct.stock === 0}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-gold-glow ${
                    currentProduct.stock === 0
                      ? "bg-noir-900 border border-red-500/40 text-red-400 cursor-not-allowed"
                      : addedId === currentProduct.id
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 text-noir-950 active:scale-95"
                  }`}
                >
                  {currentProduct.stock === 0 ? (
                    <span>Sin Stock</span>
                  ) : addedId === currentProduct.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Agregar al Carrito</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setQuickViewProduct(currentProduct)}
                  className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-200 hover:text-gold-300 bg-noir-900 border border-white/15 hover:border-gold-500/40 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-gold-400" />
                  <span>Ver Ficha Completa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Flechas de Navegación Anterior / Siguiente */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-noir-950/80 border border-gold-500/30 hover:border-gold-500 text-sand-300 hover:text-gold-300 transition-all shadow-lg active:scale-90"
            aria-label="Perfume anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-noir-950/80 border border-gold-500/30 hover:border-gold-500 text-sand-300 hover:text-gold-300 transition-all shadow-lg active:scale-90"
            aria-label="Siguiente perfume"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicadores / Puntos Inferiores */}
          <div className="flex items-center justify-center gap-1.5 pb-4">
            {displayList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-gold-400 shadow-gold-glow"
                    : "w-2 bg-noir-800 hover:bg-gold-500/40"
                }`}
                aria-label={`Ir a foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* TIRA DE MINIATURAS INTERACTIVAS */}
        <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {displayList.map((product, idx) => (
            <button
              key={product.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-noir-950 border transition-all p-1.5 shrink-0 overflow-hidden ${
                idx === currentIndex
                  ? "border-gold-400 shadow-gold-glow scale-105"
                  : "border-white/10 opacity-60 hover:opacity-100 hover:border-gold-500/40"
              }`}
              title={product.title}
            >
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
