"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, ShieldCheck, Sparkles, Plus, Minus, Check, ShoppingBag, Truck, Droplets } from "lucide-react";
import NoteBadge from "./NoteBadge";
import PerfumeMistEffect from "./PerfumeMistEffect";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isDecantSelected, setIsDecantSelected] = useState(false);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, isDecantSelected);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-noir-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-noir-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 animate-fade-in my-8">
        {/* Botón de Cierre */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 text-sand-400 hover:text-gold-300 transition-colors bg-noir-950/70 rounded-full"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagen de Alta Resolución con Efecto de Atomización */}
          <div 
            className="relative aspect-[4/5] md:aspect-auto md:min-h-[460px] bg-noir-950 flex items-center justify-center p-8 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Efecto de vaporización / atomización */}
            <PerfumeMistEffect isHovered={isHovered} />

            <Image
              src={quickViewProduct.imageUrl}
              alt={quickViewProduct.title}
              fill
              className="object-contain p-6 transition-transform duration-700 ease-out hover:scale-105"
            />
            
            {quickViewProduct.discount && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-noir-950/90 border border-emerald-500/40 rounded-md">
                  {quickViewProduct.discount} OFF
                </span>
              </div>
            )}
          </div>

          {/* Ficha Técnica y Detalle Olfativo */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Marca */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gold-500 font-semibold mb-2">
                <span>{quickViewProduct.brand || "Perfumería de Lujo"}</span>
                {quickViewProduct.volume && (
                  <span className="text-sand-400 font-light">{quickViewProduct.volume}</span>
                )}
              </div>

              {/* Título */}
              <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-sand-50 mb-3 leading-tight">
                {quickViewProduct.title}
              </h3>

              {/* Precios */}
              <div className="flex items-center gap-3 mb-4">
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-sand-500 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                <span className="font-montserrat text-2xl font-bold text-gold-400">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.discount && (
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded">
                    {quickViewProduct.discount}
                  </span>
                )}
              </div>

              {/* Descripción */}
              <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed mb-6 font-montserrat">
                {quickViewProduct.description ||
                  "Fragancia original de importación directa. Alta fijación en piel y notas aromáticas excepcionales."}
              </p>

              {/* Notas Olfativas con Emojis Interactivos */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-widest text-gold-400 font-medium mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Notas Olfativas Principales</span>
                  </div>
                  <span className="text-[10px] text-sand-400 font-light">Pase el mouse para ver acorde</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.notes.map((note, idx) => (
                    <NoteBadge key={idx} note={note} size="md" />
                  ))}
                </div>
              </div>
            </div>

              {/* Selección de Formato: Frasco Completo vs Muestra Decant 10ml */}
              {quickViewProduct.availableForDecant && (
                <div className="mb-6 p-3 bg-noir-950 border border-gold-500/30 rounded-xl space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold block flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    Seleccionar Formato de Compra:
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDecantSelected(false)}
                      className={`p-2.5 rounded-lg text-left border transition-all ${
                        !isDecantSelected
                          ? "bg-gold-500/20 border-gold-500 text-gold-300 font-bold"
                          : "bg-noir-900 border-white/10 text-sand-400 hover:text-sand-100"
                      }`}
                    >
                      <span className="text-xs block font-semibold">Frasco Completo</span>
                      <span className="text-[10px] text-gold-400">
                        {quickViewProduct.volume || "100ml"} • {formatPrice(quickViewProduct.price)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDecantSelected(true)}
                      className={`p-2.5 rounded-lg text-left border transition-all ${
                        isDecantSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                          : "bg-noir-900 border-white/10 text-sand-400 hover:text-sand-100"
                      }`}
                    >
                      <span className="text-xs block font-semibold flex items-center gap-1">
                        ✨ Muestra Decant
                      </span>
                      <span className="text-[10px] text-cyan-300">
                        10ml Atomizador • {formatPrice(quickViewProduct.decantPrice || Math.round(quickViewProduct.price * 0.22))}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Controles de Compra */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  {/* Stepper de cantidad */}
                  <div className="flex items-center border border-white/20 bg-noir-950 rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-sand-400 hover:text-gold-400 transition-colors"
                      aria-label="Restar una unidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-bold text-sand-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-sand-400 hover:text-gold-400 transition-colors"
                      aria-label="Sumar una unidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Botón Añadir al carrito */}
                  <button
                    onClick={handleAdd}
                    disabled={quickViewProduct.stock === 0}
                    className={`flex-1 py-3 px-6 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-gold-glow ${
                      quickViewProduct.stock === 0
                        ? "bg-noir-950 border border-red-500/40 text-red-400 cursor-not-allowed"
                        : added
                        ? "bg-emerald-600 text-white"
                        : "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] hover:from-[#DEBA5C] hover:to-[#D4AF37] text-noir-950"
                    }`}
                  >
                    {quickViewProduct.stock === 0 ? (
                      <span>Sin Stock</span>
                    ) : added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Añadido al Carrito</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>
                          Agregar {isDecantSelected ? "Decant (10ml)" : "al carrito"} &bull;{" "}
                          {formatPrice(
                            (isDecantSelected
                              ? quickViewProduct.decantPrice || Math.round(quickViewProduct.price * 0.22)
                              : quickViewProduct.price) * quantity
                          )}
                        </span>
                      </>
                    )}
                  </button>
                </div>

              {/* Sellos de garantía */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-sand-400">
                <span className="flex items-center gap-1 text-gold-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Original
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-sand-300">
                  <Truck className="w-3.5 h-3.5" />
                  Envíos a todo Uruguay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
