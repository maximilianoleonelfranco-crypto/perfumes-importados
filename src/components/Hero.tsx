"use client";

import React from "react";
import { ArrowRight, Truck, ShieldCheck, HeartHandshake, Sparkles, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-noir-950 border-b border-gold-500/20">
      {/* Fondo Atmosférico con Luces y Resplandores Dorados (Sin imágenes gigantes rotas) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/5 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      {/* Contenido Principal del Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
        {/* Badge: Importadores Directos en Uruguay */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-noir-900/80 backdrop-blur-md mb-8 shadow-gold-glow animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-extrawide uppercase text-gold-300 font-montserrat">
            IMPORTADORES DIRECTOS EN URUGUAY &bull; CERTIFICACIÓN DE ORIGEN
          </span>
        </div>

        {/* Título de Autoridad con la Marca y Esencia */}
        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-sand-50 mb-6 leading-[1.15]">
          Perfumes Importtados <br />
          <span className="gold-gradient-text italic font-normal">Lujos y Exclusividad</span>
        </h1>

        {/* Texto Institucional */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-sand-100 font-cinzel text-lg sm:text-xl font-medium tracking-wide">
            El Mundo de la Alta Perfumería, en Constante Evolución.
          </h2>
          <p className="text-sand-300 text-xs sm:text-sm md:text-base font-light leading-relaxed tracking-wide font-montserrat max-w-2xl mx-auto">
            Acceda a las marcas más exclusivas de la perfumería árabe e importada, femenina y masculina. Importamos directamente y actualizamos nuestro catálogo de manera continua con los últimos ingresos del mercado global. Encuentre su fragancia insignia hoy, antes de la próxima rotación.
          </p>
        </div>

        {/* Botón CTA Explorar */}
        <div className="flex items-center justify-center gap-5 w-full sm:w-auto mb-16">
          <a
            href="#catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-widest text-noir-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 rounded-full shadow-gold-glow group"
          >
            <span>Explorar Colección</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Trilogía de Garantías: Envíos rápidos, 100% Originales, Atención personalizada */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 text-left border-t border-gold-500/20 pt-10">
          {/* 1. Envíos a todo el país */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-noir-900/80 border border-white/10 hover:border-gold-500/40 transition-colors group">
            <div className="p-3 rounded-xl bg-noir-950 border border-gold-500/30 text-gold-400 shrink-0 group-hover:bg-gold-500 group-hover:text-noir-950 transition-colors">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-bold text-sand-50 tracking-wider">
                Envíos a todo el país
              </h4>
              <p className="text-xs text-sand-400 mt-1 leading-relaxed">
                De forma rápida y efectiva a cualquier departamento de Uruguay con seguimiento prioritario.
              </p>
            </div>
          </div>

          {/* 2. 100% Originales */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-noir-900/80 border border-white/10 hover:border-gold-500/40 transition-colors group">
            <div className="p-3 rounded-xl bg-noir-950 border border-gold-500/30 text-gold-400 shrink-0 group-hover:bg-gold-500 group-hover:text-noir-950 transition-colors">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-bold text-sand-50 tracking-wider">
                100% Originales
              </h4>
              <p className="text-xs text-sand-400 mt-1 leading-relaxed">
                Garantía incondicional de autenticidad en cada fragancia importada directamente de fábrica.
              </p>
            </div>
          </div>

          {/* 3. Atención personalizada */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-noir-900/80 border border-white/10 hover:border-gold-500/40 transition-colors group">
            <div className="p-3 rounded-xl bg-noir-950 border border-gold-500/30 text-gold-400 shrink-0 group-hover:bg-gold-500 group-hover:text-noir-950 transition-colors">
              <HeartHandshake className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-bold text-sand-50 tracking-wider">
                Atención Personalizada
              </h4>
              <p className="text-xs text-sand-400 mt-1 leading-relaxed">
                Asesoramiento experto uno a uno para ayudarle a elegir la fragancia que mejor se adapte a su estilo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
