"use client";

import React, { useState } from "react";
import { olfactoryPillars } from "@/data/products";
import { Sparkles, ArrowUpRight, Flame, Heart, Compass, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import NoteBadge from "./NoteBadge";

const pillarIcons = [Flame, Compass, Heart, Zap];

export default function OlfactoryPillars() {
  const { setSelectedPillar, selectedPillar } = useCart();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handlePillarClick = (title: string, index: number) => {
    setActiveTab(index);
    if (selectedPillar === title) {
      setSelectedPillar(null);
    } else {
      setSelectedPillar(title);
      const catalog = document.getElementById("catalogo");
      if (catalog) {
        catalog.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="pilares-olfativos" className="w-full py-24 bg-noir-900 border-t border-b border-gold-500/15 relative overflow-hidden">
      {/* Resplandor ambiental de lujo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] font-medium tracking-ultra uppercase text-gold-400 font-montserrat">
              Arquitectura Olfativa &bull; Guía Maestra
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-sand-50 tracking-wide mb-4">
            Familias & Pilares Olfativos
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-5" />
          <p className="text-sm md:text-base text-sand-300 font-light leading-relaxed font-montserrat">
            Comprenda los cuatro grandes universos que definen la perfumería árabe y de autor. 
            Pase el cursor por las notas para descubrir su acorde y haga clic en cualquier pilar para filtrar el catálogo.
          </p>
        </div>

        {/* Cuadrícula de los 4 Pilares Requeridos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {olfactoryPillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            const isSelected = selectedPillar === pillar.title;

            return (
              <div
                key={idx}
                className={`relative p-8 bg-noir-950/80 border transition-all duration-500 group flex flex-col justify-between cursor-pointer rounded-2xl ${
                  isSelected
                    ? "border-gold-500 shadow-gold-glow bg-noir-950"
                    : "border-gold-500/20 hover:border-gold-500/50 hover:bg-noir-950/95"
                }`}
                onClick={() => handlePillarClick(pillar.title, idx)}
              >
                {/* Línea superior dorada */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Cabecera del Pilar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-gold-500/30 bg-noir-900 flex items-center justify-center text-gold-400">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-500 font-medium">
                          Pilar {pillar.number}
                        </span>
                        <h3 className="font-cinzel text-xl font-bold text-sand-50 group-hover:text-gold-200 transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-noir-900 border border-gold-500/20 text-gold-300 font-medium rounded-full">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Subtítulo */}
                  <div className="font-playfair italic text-gold-300/90 text-sm mb-4">
                    &ldquo;{pillar.subtitle}&rdquo;
                  </div>

                  {/* Perfil Olfativo */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-sand-400 font-medium block mb-1">
                      Perfil Olfativo:
                    </span>
                    <p className="text-xs sm:text-sm text-sand-200 font-light leading-relaxed font-montserrat">
                      {pillar.profile}
                    </p>
                  </div>

                  {/* Notas Principales en Píldoras con Emojis */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-sand-400 font-medium block mb-2">
                      Notas Principales (Pase el cursor para ver acordes):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.notes.map((note, nIdx) => (
                        <NoteBadge key={nIdx} note={note} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Implementación UI/UX & Estrategia */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-sand-400 font-light leading-snug">
                    <strong className="text-gold-400 font-medium">Estrategia UI/UX: </strong>
                    {pillar.uiStrategy}
                  </div>

                  <button
                    className="shrink-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 group-hover:text-gold-300 font-medium transition-colors"
                  >
                    <span>{isSelected ? "Filtrando" : "Filtrar"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
