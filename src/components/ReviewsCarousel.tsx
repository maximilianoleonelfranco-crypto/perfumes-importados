"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  purchasedItem: string;
  date: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Valentina R.",
    city: "Montevideo",
    rating: 5,
    comment: "Increíble fijación. Khamrah Qahwa de Lattafa es una obra de arte, dura más de 12 horas en piel. El envío llegó en menos de 24 hs por DAC. 100% recomendados.",
    purchasedItem: "Khamrah Qahwa • Lattafa",
    date: "Hace 2 días",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-2",
    name: "Gonzalo M.",
    city: "Punta del Este",
    rating: 5,
    comment: "Buscaba Asad de Lattafa en Uruguay y no lo conseguía en ningún lado. Excelente atención por WhatsApp y me aconsejaron genial sobre las notas de Oud.",
    purchasedItem: "Asad • Lattafa",
    date: "Hace 4 días",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-3",
    name: "Camila B.",
    city: "Canelones",
    rating: 5,
    comment: "Probé el formato Decant de 10ml de Amber Oud Gold y me fascinó. Es ideal para probar antes del frasco entero. ¡Atención impecable!",
    purchasedItem: "Amber Oud Gold (Decant 10ml)",
    date: "Hace 1 semana",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-4",
    name: "Federico T.",
    city: "Salto",
    rating: 5,
    comment: "Fragancias 100% originales con código de lote verificable en la caja. La facilidad para coordinar el pago por Mercado Pago y el envío fue impecable. Volveré a comprar.",
    purchasedItem: "9 PM • Afnan",
    date: "Hace 1 semana",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="py-20 bg-noir-950 border-t border-b border-gold-500/20 relative overflow-hidden">
      {/* Luz de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiencias Exclusivas</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-sand-50 tracking-wider">
            Reseñas de Nuestros Clientes
          </h2>
          <p className="text-xs sm:text-sm text-sand-400 mt-2 font-light">
            La satisfacción de quienes eligen la verdadera perfumería de autor en Uruguay.
          </p>
        </div>

        {/* Carrusel */}
        <div className="max-w-3xl mx-auto relative bg-noir-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <Quote className="w-12 h-12 text-gold-500/20 absolute top-6 right-6 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Foto y Datos del Cliente */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-20 h-20 rounded-full border-2 border-gold-500/60 overflow-hidden shadow-gold-glow mb-3">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-cinzel text-base font-bold text-sand-50 text-center">
                {current.name}
              </h4>
              <span className="text-[11px] text-gold-400 font-medium">{current.city}, Uruguay</span>
              <span className="mt-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Compra Verificada
              </span>
            </div>

            {/* Testimonio & Calificación */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              {/* Estrellas */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
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

              {/* Texto */}
              <p className="text-sm sm:text-base text-sand-200 font-light italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Detalle Producto Comprado */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-sand-400 border-t border-white/5">
                <span className="font-semibold text-gold-300">
                  Fragancia: {current.purchasedItem}
                </span>
                <span className="text-sand-500 text-[11px]">{current.date}</span>
              </div>
            </div>
          </div>

          {/* Botones Anterior / Siguiente */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-gold-400"
                      : "w-2 bg-sand-700 hover:bg-gold-500/50"
                  }`}
                  aria-label={`Ir a reseña ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors"
                aria-label="Reseña anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors"
                aria-label="Siguiente reseña"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
