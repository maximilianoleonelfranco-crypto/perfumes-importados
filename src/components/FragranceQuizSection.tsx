"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, CheckCircle2, ArrowRight, RefreshCw, Eye } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function FragranceQuizSection() {
  const { products } = useStore();
  const { setQuickViewProduct, formatPrice } = useCart();

  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);

  const occasions = [
    { id: "noche", label: "🌙 Eventos de Noche & Gala", pillar: "Oud & Amaderados" },
    { id: "cita", label: "🔥 Citas Románticas", pillar: "Gourmand & Especiados" },
    { id: "diario", label: "☀️ Uso Diario & Elegancia", pillar: "Ámbar & Orientales" },
    { id: "distincion", label: "✨ Distinción Exclusiva", pillar: "Florales Exóticos" },
  ];

  const intentions = [
    { id: "alta", label: "Duración Extrema & Estela Intensa" },
    { id: "dulce", label: "Notas Dulces, Vainilla & Canela" },
    { id: "maderosa", label: "Notas Amaderadas & Oud Auténtico" },
  ];

  // Calcular recomendación
  const getRecommendation = () => {
    if (!selectedOccasion) return null;
    const occObj = occasions.find((o) => o.id === selectedOccasion);
    if (!occObj) return products[0];

    const matched = products.find((p) => p.pillarCategory === occObj.pillar);
    return matched || products[0];
  };

  const recommendedProduct = getRecommendation();

  return (
    <section id="sugerencias" className="py-20 bg-noir-950 border-t border-gold-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-noir-900 via-noir-950 to-noir-900 border border-gold-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Adorno de fondo */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asesor Olfativo Personalizado</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-sand-50 tracking-wider">
              ¿No sabes cuál elegir? Te sugerimos tu fragancia ideal
            </h2>
            <p className="text-xs sm:text-sm text-sand-400 mt-2 font-light">
              Responde 2 breves preguntas y nuestro recomendador te indicará la fragancia insignia perfecta para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Paso 1 y Paso 2 */}
            <div className="space-y-6">
              {/* Paso 1 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-500 text-noir-950 flex items-center justify-center text-[10px]">1</span>
                  ¿Para qué ocasión buscas el perfume?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                        selectedOccasion === occ.id
                          ? "bg-gold-500/20 border-gold-500 text-gold-300 font-bold shadow-gold-glow"
                          : "bg-noir-950 border-white/10 text-sand-300 hover:border-gold-500/30"
                      }`}
                    >
                      <span>{occ.label}</span>
                      {selectedOccasion === occ.id && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-500 text-noir-950 flex items-center justify-center text-[10px]">2</span>
                  ¿Qué preferencia de notas buscas?
                </label>
                <div className="space-y-2">
                  {intentions.map((intent) => (
                    <button
                      key={intent.id}
                      onClick={() => setSelectedIntention(intent.id)}
                      className={`w-full p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                        selectedIntention === intent.id
                          ? "bg-gold-500/20 border-gold-500 text-gold-300 font-bold shadow-gold-glow"
                          : "bg-noir-950 border-white/10 text-sand-300 hover:border-gold-500/30"
                      }`}
                    >
                      <span>{intent.label}</span>
                      {selectedIntention === intent.id && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado de la Sugerencia */}
            <div className="bg-noir-950 border border-gold-500/40 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-4 shadow-xl min-h-[300px]">
              {recommendedProduct ? (
                <>
                  <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    Sugerencia Recomendada
                  </span>

                  <div className="relative w-28 h-32 my-2">
                    <Image
                      src={recommendedProduct.imageUrl}
                      alt={recommendedProduct.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-gold-500 font-semibold block">
                      {recommendedProduct.brand}
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-sand-50">
                      {recommendedProduct.title}
                    </h3>
                    <p className="text-xs text-sand-400 mt-1 line-clamp-2">
                      {recommendedProduct.description}
                    </p>
                    <span className="text-sm font-bold text-gold-400 block mt-2">
                      {formatPrice(recommendedProduct.price)} UYU
                    </span>
                  </div>

                  <button
                    onClick={() => setQuickViewProduct(recommendedProduct)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Fragancia Recomendada</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 py-8">
                  <HelpCircle className="w-10 h-10 text-gold-500/40 mx-auto" />
                  <p className="text-xs text-sand-400">
                    Selecciona una ocasión para ver la sugerencia ideal.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
