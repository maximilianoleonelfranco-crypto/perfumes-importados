"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, Sparkles, Menu, X, ShieldCheck, Truck, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Barra superior: Importadores directos en Uruguay y 100% Autenticidad (Sin selector de moneda) */}
      <div className="bg-noir-950 border-b border-gold-500/15 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] tracking-widest uppercase text-sand-300">
          <div className="hidden sm:flex items-center gap-2 text-gold-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>100% Autenticidad Certificada</span>
          </div>

          {/* Frase requerida: Importadores directos en Uruguay */}
          <div className="mx-auto flex items-center gap-2 text-sand-100 font-medium">
            <Sparkles className="w-3 h-3 text-gold-400 animate-subtle-pulse" />
            <span>Importadores directos en Uruguay</span>
            <Sparkles className="w-3 h-3 text-gold-400 animate-subtle-pulse" />
          </div>

          <div className="hidden md:flex items-center gap-2 text-sand-400">
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            <span>Envíos a todo el país</span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="luxury-glass px-4 md:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Controles de Navegación Rápida: Volver atrás e Ir a Inicio */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="p-2 rounded-xl bg-noir-900 border border-white/10 hover:border-gold-500/40 text-sand-300 hover:text-gold-300 transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title="Volver atrás"
            >
              <ArrowLeft className="w-4 h-4 text-gold-400" />
              <span className="hidden lg:inline">Atrás</span>
            </button>

            <Link
              href="/"
              className="p-2 rounded-xl bg-noir-900 border border-white/10 hover:border-gold-500/40 text-sand-300 hover:text-gold-300 transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title="Ir al inicio"
            >
              <Home className="w-4 h-4 text-gold-400" />
              <span className="hidden lg:inline">Inicio</span>
            </Link>
          </div>
          {/* Botón de Menú Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-sand-300 hover:text-gold-400 transition-colors p-1"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Enlaces de Navegación Izquierda (Desktop) - Sin 'Pirámide Olfativa' */}
          <div className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-widest text-sand-300">
            <a
              href="#catalogo"
              className="hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Catálogo
            </a>
            <a
              href="#catalogo-disenador"
              className="hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Diseñador
            </a>
            <a
              href="#catalogo-arabes"
              className="hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Árabes
            </a>
            <a
              href="#pilares-olfativos"
              className="hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Familias Olfativas
            </a>
          </div>

          {/* Logotipo Central Sofisticado: Perfumes Importtados - Lujos y Exclusividad */}
          <div className="text-center group cursor-pointer">
            <a href="#" className="inline-block">
              <span className="block text-[9px] tracking-[0.35em] text-gold-500 uppercase font-montserrat font-medium mb-0.5">
                Montevideo &bull; Uruguay
              </span>
              <span className="font-cinzel text-xl md:text-2xl lg:text-3xl font-bold tracking-widest text-sand-50 group-hover:text-gold-300 transition-colors">
                PERFUMES IMPORTTADOS
              </span>
              <span className="block text-[10px] tracking-widest text-sand-400 uppercase font-light mt-0.5 font-montserrat italic">
                Lujos y Exclusividad
              </span>
            </a>
          </div>

          {/* Controles de la Derecha */}
          <div className="flex items-center space-x-5">
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-wider text-gold-400/90 hover:text-gold-300 transition-colors flex items-center gap-1 bg-noir-900 border border-gold-500/30 px-2.5 py-1 rounded-lg"
              title="Panel Administrativo"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden sm:inline">Panel Admin</span>
            </Link>

            <a
              href="#contacto"
              className="hidden lg:inline-block text-xs uppercase tracking-widest text-sand-300 hover:text-gold-300 transition-colors"
            >
              Contacto
            </a>

            {/* Búsqueda rápida */}
            <button
              onClick={onSearchClick}
              className="text-sand-300 hover:text-gold-400 transition-colors p-1.5"
              aria-label="Buscar fragancias"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Bolsa de compras */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-sand-300 hover:text-gold-400 transition-colors p-1.5 flex items-center gap-2 group"
              aria-label="Ver carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-noir-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-gold-glow animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menú Móvil desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gold-500/20 flex flex-col space-y-4 text-center text-xs tracking-widest uppercase py-4 bg-noir-900/95 animate-fade-in">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sand-200 hover:text-gold-400 transition-colors"
            >
              Catálogo Completo
            </a>
            <a
              href="#catalogo-disenador"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sand-200 hover:text-gold-400 transition-colors"
            >
              Perfumes de Diseñador
            </a>
            <a
              href="#catalogo-arabes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sand-200 hover:text-gold-400 transition-colors"
            >
              Perfumes Árabes
            </a>
            <a
              href="#pilares-olfativos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sand-200 hover:text-gold-400 transition-colors"
            >
              Familias Olfativas
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sand-200 hover:text-gold-400 transition-colors"
            >
              Contacto & Envíos
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
