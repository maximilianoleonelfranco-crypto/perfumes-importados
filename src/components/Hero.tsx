"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[85vh] min-h-[70dvh] sm:min-h-[85dvh] flex items-center justify-center overflow-hidden bg-noir-950 border-b border-gold-500/20">
      {/* Fondo Atmosférico con Luces y Resplandores Dorados que complementan la imagen */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/5 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      {/* Contenido Principal del Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center flex flex-col items-center">
        {/* Badge Superior: Importadores Directos en Uruguay */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-noir-900/90 backdrop-blur-md mb-6 shadow-gold-glow animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-extrawide uppercase text-gold-300 font-montserrat">
            IMPORTADORES DIRECTOS EN URUGUAY &bull; CERTIFICACIÓN DE ORIGEN
          </span>
        </div>

        {/* Banner Principal con la Imagen Oficial Solicitada */}
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gold-500/40 shadow-[0_0_60px_rgba(212,175,55,0.22)] mb-8 group bg-noir-950">
          <Image
            src="/images/hero-banner.jpg"
            alt="Perfumes Importados - Fragancias originales de lujo"
            width={1024}
            height={558}
            priority
            className="w-full h-auto object-cover transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />
          {/* Sutil viñeta para integrar los bordes en el fondo oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-noir-950/20 pointer-events-none" />
          <div className="absolute inset-0 border border-gold-500/30 rounded-3xl pointer-events-none" />
        </div>

        {/* Tipografía Oficial en Sintonía con el Banner */}
        <div className="max-w-3xl mx-auto mb-8 text-center animate-fade-in">
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#E2BA55] to-[#B88728] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            PERFUMES IMPORTADOS
          </h1>
          <div className="w-36 sm:w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2BA55] to-transparent mx-auto my-3 sm:my-4" />
          <p className="font-playfair italic text-xl sm:text-2xl md:text-3xl text-gold-300 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-4">
            Fragancias originales de lujo
          </p>
          <p className="text-sand-300 text-xs sm:text-sm md:text-base font-light leading-relaxed tracking-wide font-montserrat max-w-2xl mx-auto">
            Acceda a las marcas más exclusivas de la perfumería árabe e importada de diseñador en Uruguay. Lotes 100% auténticos importados de origen y stock listo para entrega inmediata.
          </p>
        </div>

        {/* Botón CTA Explorar */}
        <div className="flex items-center justify-center gap-5 w-full sm:w-auto mb-14">
          <a
            href="#catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-widest text-noir-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 rounded-full shadow-gold-glow group active:scale-95"
          >
            <span>Explorar Colección de Lujo</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Compromisos de Excelencia: Envíos rápidos, 100% Originales, Atención personalizada */}
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
                De forma rápida y efectiva a los 19 departamentos de Uruguay con seguimiento prioritario.
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
                Lotes verificados de origen en cada fragancia importada directamente de fábrica sin intermediarios.
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
                Asesoramiento sommelier por WhatsApp para elegir la fragancia ideal según sus preferencias y estilo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
