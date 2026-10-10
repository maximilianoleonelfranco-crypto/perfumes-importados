"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { Eye, Check, ShoppingBag, Sparkles } from "lucide-react";
import PerfumeMistEffect from "./PerfumeMistEffect";
import NoteBadge from "./NoteBadge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, formatPrice, setQuickViewProduct } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileNotes, setShowMobileNotes] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleCardClick = () => {
    // En desktop abre quickview, en móvil permite ver notas o quickview
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="group relative flex flex-col bg-noir-900 rounded-2xl transition-all duration-500 ease-out border border-white/5 hover:border-gold-500/40 hover:shadow-gold-glow cursor-pointer overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Insignia / Badges de Stock, Descuento, Decant y Ofertas */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
        {product.stock === 0 ? (
          <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 rounded-md border border-red-400 shadow-md">
            AGOTADO
          </span>
        ) : product.stock <= 3 ? (
          <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-noir-950 bg-amber-400 rounded-md shadow-md">
            ¡Últimas {product.stock} un.!
          </span>
        ) : null}

        {product.availableForDecant && product.stock > 0 && (
          <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 bg-noir-950/95 border border-cyan-500/40 rounded-md flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Decant 10ml
          </span>
        )}

        {product.badge && (
          <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-gold-400 rounded-md shadow-sm">
            {product.badge}
          </span>
        )}

        {product.discount && (
          <span className="inline-block px-2 py-0.5 text-[11px] font-bold text-emerald-400 bg-noir-950/95 border border-emerald-500/40 rounded-md shadow-sm">
            {product.discount}
          </span>
        )}
      </div>

      {/* Contenedor de Imagen de Frasco */}
      <div className="relative w-full aspect-[4/5] bg-noir-950/70 overflow-hidden flex items-center justify-center p-4">
        {/* EFECTO DE ATOMIZACIÓN / VAPORIZACIÓN DE PERFUME AL PASAR EL MOUSE O TOCAR EN MÓVIL */}
        <PerfumeMistEffect isHovered={isHovered} />

        {/* Imagen del perfume */}
        <div className="relative w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradiente sutil inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* PANEL REVELABLE AL HOVER (Desktop) y accesible en móvil: Notas con Emojis */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-noir-950 via-noir-950/95 to-noir-950/90 border-t border-gold-500/20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 flex flex-col justify-end">
          <div className="text-[10px] uppercase tracking-widest text-gold-400 font-medium mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Notas Olfativas</span>
            </div>
            <span className="text-[9px] text-sand-400 font-light">Pase el mouse para ver acordes</span>
          </div>

          {/* Pastillas de notas con emojis interactivos */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.notes.slice(0, 4).map((note, index) => (
              <NoteBadge key={index} note={note} size="sm" />
            ))}
            {product.notes.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 text-gold-400 self-center font-medium">
                +{product.notes.length - 4} más
              </span>
            )}
          </div>

          <button
            onClick={handleQuickView}
            className="w-full py-1.5 text-[11px] uppercase tracking-wider text-sand-300 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 bg-noir-900/90 rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Ficha Completa</span>
          </button>
        </div>
      </div>

      {/* Información del Producto con Jerarquía Visual Clara */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-black">
        <div>
          {/* Marca */}
          <div className="text-[10px] tracking-widest uppercase text-gold-500/80 mb-1 font-semibold">
            {product.brand || (product.category === "perfumes-arabes" ? "Maison Árabe" : "Diseñador")}
          </div>

          {/* Título */}
          <h3 className="font-montserrat font-bold text-sm text-sand-50 group-hover:text-gold-300 transition-colors duration-300 leading-snug line-clamp-1 mb-2">
            {product.title}
          </h3>

          {/* Notas visibles en vista móvil directamente para enriquecer la experiencia táctil */}
          <div className="md:hidden flex flex-wrap gap-1 mb-3">
            {product.notes.slice(0, 3).map((note, idx) => (
              <NoteBadge key={idx} note={note} size="sm" />
            ))}
          </div>

          {/* Fila de Precios y Descuentos */}
          <div className="flex items-center gap-2 mb-4">
            {product.originalPrice && (
              <span className="text-xs text-sand-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-montserrat font-bold text-base text-gold-400">
              {formatPrice(product.price)}
            </span>
            {product.discount && (
              <span className="text-xs font-semibold text-emerald-400">
                {product.discount}
              </span>
            )}
          </div>
        </div>

        {/* Botón "Agregar al carrito" en estilo píldora dorada */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
            product.stock === 0
              ? "bg-noir-950 border border-red-500/40 text-red-400 cursor-not-allowed opacity-80"
              : isAdded
              ? "bg-emerald-600 text-white"
              : "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] hover:from-[#DEBA5C] hover:to-[#D4AF37] text-noir-950 font-bold hover:shadow-gold-glow"
          }`}
          aria-label={`Agregar ${product.title} al carrito`}
        >
          {product.stock === 0 ? (
            <span>Sin Stock Disponible</span>
          ) : isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Añadido</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Agregar al carrito</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
