"use client";

import React, { useState } from "react";
import { Sparkles, Flame, ArrowRight, Eye, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";

export default function PromotionsCarousel() {
  const { products, promotions } = useStore();
  const { addToCart, setQuickViewProduct, formatPrice } = useCart();

  // Filtrar productos marcados como nuevos ingresos u ofertas
  const featuredProducts = products.slice(0, 6);

  const [activeTab, setActiveTab] = useState<"new" | "offers">("new");

  const displayList =
    activeTab === "new"
      ? featuredProducts
      : products.filter((p) => p.discount || p.badge || p.originalPrice);

  return (
    <section className="py-16 bg-noir-900/80 border-b border-gold-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado con pestañas */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Novedades Exclusivas</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-sand-50 tracking-wider">
              Nuevos Ingresos & Ofertas
            </h2>
          </div>

          {/* Selector de Pestaña */}
          <div className="flex items-center bg-noir-950 p-1 rounded-2xl border border-gold-500/30">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "new"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-noir-950 shadow-gold-glow"
                  : "text-sand-400 hover:text-sand-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Últimos Ingresos</span>
            </button>

            <button
              onClick={() => setActiveTab("offers")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
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

        {/* Malla del Carrusel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-noir-950 border border-white/10 hover:border-gold-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-glow group relative"
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.discount && (
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {product.discount} OFF
                  </span>
                )}
                <span className="px-2.5 py-0.5 bg-gold-500/20 border border-gold-500/40 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {activeTab === "new" ? "NUEVO" : "OFERTA"}
                </span>
              </div>

              {/* Imagen */}
              <div className="relative aspect-square w-full mb-4 bg-noir-900 rounded-xl overflow-hidden p-4">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Información */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold block">
                  {product.brand}
                </span>
                <h3 className="font-montserrat font-bold text-sm text-sand-50 line-clamp-1 group-hover:text-gold-300 transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    {product.originalPrice && (
                      <span className="text-[11px] text-sand-500 line-through block">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className="font-bold text-gold-400 text-sm">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-2 rounded-xl bg-noir-900 border border-white/10 hover:border-gold-500/40 text-sand-300 hover:text-gold-300 transition-colors"
                      title="Vista Rápida"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-noir-950 font-bold transition-colors"
                      title="Agregar al Carrito"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
