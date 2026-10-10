"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Phone,
  Maximize2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ReviewsCarousel() {
  const { reviews } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused || lightboxImage || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, lightboxImage, reviews.length]);

  // Bloquear scroll al abrir el lightbox
  useEffect(() => {
    if (lightboxImage) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [lightboxImage]);

  if (!reviews || reviews.length === 0) return null;

  const current = reviews[currentIndex] || reviews[0];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-noir-950 border-t border-b border-gold-500/20 relative overflow-hidden select-none">
      {/* Luz de fondo dorado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiencias Exclusivas</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-sand-50 tracking-wider">
            Reseñas & Experiencias Reales
          </h2>
          <p className="text-xs sm:text-sm text-sand-400 mt-2 font-light">
            Opiniones verificadas y capturas de conversaciones en WhatsApp de clientes en todo Uruguay.
          </p>
        </div>

        {/* Tarjeta del Carrusel de Reseñas */}
        <div
          className="max-w-4xl mx-auto relative bg-noir-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 hover:border-gold-500/50"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote className="w-12 h-12 text-gold-500/20 absolute top-6 right-6 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Foto y Datos del Cliente */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              {/* Si la reseña tiene captura de WhatsApp adjunta */}
              {current.imageUrl ? (
                <div
                  onClick={() => setLightboxImage(current.imageUrl!)}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-2 border-gold-500/50 overflow-hidden shadow-gold-glow mb-3 cursor-pointer group/img bg-noir-950"
                >
                  <img
                    src={current.imageUrl}
                    alt={`Reseña de ${current.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-noir-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[11px] text-gold-300 font-bold backdrop-blur-[2px]">
                    <Maximize2 className="w-5 h-5 text-gold-400" />
                    <span>Ver Captura</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-20 h-20 rounded-full border-2 border-gold-500/60 overflow-hidden shadow-gold-glow mb-3">
                  <img
                    src={
                      current.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    }
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h4 className="font-cinzel text-base font-bold text-sand-50">
                {current.name}
              </h4>
              <span className="text-[11px] text-gold-400 font-medium">
                {current.city}, Uruguay
              </span>

              {/* Distintivo de WhatsApp o Compra Verificada */}
              {current.isWhatsAppScreenshot ? (
                <span className="mt-2 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>Chat de WhatsApp</span>
                </span>
              ) : (
                <span className="mt-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Compra Verificada
                </span>
              )}
            </div>

            {/* Testimonio & Calificación */}
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              {/* Estrellas Doradas */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating
                        ? "fill-gold-400 text-gold-400"
                        : "text-sand-600"
                    }`}
                  />
                ))}
              </div>

              {/* Texto de la Reseña */}
              <p className="text-sm sm:text-base text-sand-100 font-light italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Botón para ver captura si tiene imagen */}
              {current.imageUrl && (
                <div className="pt-1">
                  <button
                    onClick={() => setLightboxImage(current.imageUrl!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-noir-950 border border-gold-500/40 rounded-xl text-xs font-semibold text-gold-300 hover:text-gold-200 hover:border-gold-400 transition-colors shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>Ampliar Captura de Conversación</span>
                  </button>
                </div>
              )}

              {/* Detalle Producto Comprado */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-sand-400 border-t border-white/10 gap-2">
                <span className="font-semibold text-gold-300">
                  Fragancia: {current.purchasedItem}
                </span>
                <span className="text-sand-500 text-[11px]">{current.date}</span>
              </div>
            </div>
          </div>

          {/* Navegación y Puntos del Carrusel */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-gold-400 shadow-gold-glow"
                      : "w-2 bg-sand-700 hover:bg-gold-500/50"
                  }`}
                  aria-label={`Ir a reseña ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors active:scale-95"
                aria-label="Reseña anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors active:scale-95"
                aria-label="Siguiente reseña"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox para Ampliar Captura de Pantalla en Grande */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] bg-noir-900 rounded-2xl overflow-hidden border border-gold-500/50 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-noir-950/90 border border-white/20 text-sand-200 hover:text-gold-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[85vh] overflow-auto flex items-center justify-center">
              <img
                src={lightboxImage}
                alt="Captura ampliada"
                className="max-h-[85vh] w-auto mx-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
