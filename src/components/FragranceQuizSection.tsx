"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, HelpCircle, CheckCircle2, Eye, ShoppingBag, RotateCcw, Check, Droplets } from "lucide-react";
import { useStore, Product } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import NoteBadge from "./NoteBadge";

export default function FragranceQuizSection() {
  const { products } = useStore();
  const { setQuickViewProduct, addToCart, formatPrice } = useCart();

  const [selectedOccasion, setSelectedOccasion] = useState<string | null>("noche");
  const [selectedIntention, setSelectedIntention] = useState<string | null>("maderosa");
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const occasions = [
    { 
      id: "noche", 
      label: "🌙 Eventos de Noche & Gala", 
      pillars: ["Oud & Amaderados", "Ámbar & Orientales"],
    },
    { 
      id: "cita", 
      label: "🔥 Citas Románticas", 
      pillars: ["Gourmand & Especiados", "Ámbar & Orientales"],
    },
    { 
      id: "diario", 
      label: "☀️ Uso Diario & Elegancia", 
      pillars: ["Florales Exóticos", "Ámbar & Orientales", "Gourmand & Especiados"],
    },
    { 
      id: "distincion", 
      label: "✨ Distinción Exclusiva", 
      pillars: ["Oud & Amaderados", "Florales Exóticos", "Ámbar & Orientales"],
    },
  ];

  const intentions = [
    { 
      id: "maderosa", 
      label: "🌲 Notas Amaderadas & Oud Auténtico", 
      keywords: ["oud", "madera", "sándalo", "cedro", "pachulí", "vetiver", "cuero", "guayaco", "incienso", "agar"],
      pillar: "Oud & Amaderados"
    },
    { 
      id: "dulce", 
      label: "🍬 Notas Dulces, Vainilla & Canela", 
      keywords: ["vainilla", "canela", "haba tonka", "caramelo", "praliné", "chocolate", "café", "azúcar", "miel", "dátil", "dulce", "tonka"],
      pillar: "Gourmand & Especiados"
    },
    { 
      id: "alta", 
      label: "⚡ Duración Extrema & Estela Intensa", 
      keywords: ["oud", "ámbar", "almizcle", "incienso", "musk", "pachulí", "cuero", "resina", "azafrán", "extrema"],
      pillar: null
    },
    { 
      id: "fresca", 
      label: "🍋 Cítricas, Frescas & Frutales", 
      keywords: ["bergamota", "limón", "naranja", "mandarina", "fruta", "manzana", "menta", "pomelo", "pera", "fresco"],
      pillar: null
    },
    { 
      id: "floral", 
      label: "🌸 Florales Exóticos & Rosas", 
      keywords: ["rosa", "jazmín", "flor", "iris", "azahar", "ylang", "lavanda", "violeta", "floral"],
      pillar: "Florales Exóticos"
    },
  ];

  // Filtrado de TODAS las posibilidades reales
  const matchingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const occObj = occasions.find((o) => o.id === selectedOccasion);
    const intentObj = intentions.find((i) => i.id === selectedIntention);

    // Si ninguna opción está seleccionada, mostrar una muestra curada de lanzamientos
    if (!occObj && !intentObj) {
      return products.slice(0, 8);
    }

    // Filtrar según ambas opciones
    const results = products.filter((p) => {
      let matchOccasion = true;
      if (occObj) {
        matchOccasion = occObj.pillars.includes(p.pillarCategory || "");
      }

      let matchIntent = true;
      if (intentObj) {
        const text = `${p.notes?.join(" ") || ""} ${p.description || ""} ${p.pillarCategory || ""}`.toLowerCase();
        const matchesKeyword = intentObj.keywords.some((k) => text.includes(k.toLowerCase()));
        const matchesPillar = intentObj.pillar ? p.pillarCategory === intentObj.pillar : false;
        matchIntent = matchesKeyword || matchesPillar;
      }

      return matchOccasion && matchIntent;
    });

    if (results.length > 0) return results;

    // Respaldo inteligente si la intersección exacta no tiene productos
    if (intentObj) {
      const fallbackNotes = products.filter((p) => {
        const text = `${p.notes?.join(" ") || ""} ${p.description || ""} ${p.pillarCategory || ""}`.toLowerCase();
        return intentObj.keywords.some((k) => text.includes(k.toLowerCase())) || (intentObj.pillar && p.pillarCategory === intentObj.pillar);
      });
      if (fallbackNotes.length > 0) return fallbackNotes;
    }

    if (occObj) {
      return products.filter((p) => occObj.pillars.includes(p.pillarCategory || ""));
    }

    return products.slice(0, 6);
  }, [products, selectedOccasion, selectedIntention]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const activeOccasionLabel = occasions.find((o) => o.id === selectedOccasion)?.label;
  const activeIntentionLabel = intentions.find((i) => i.id === selectedIntention)?.label;

  return (
    <section id="sugerencias" className="py-20 bg-noir-950 border-t border-gold-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-noir-900 via-noir-950 to-noir-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Adorno de fondo resplandeciente */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Encabezado Principal */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asesor Olfativo Inteligente</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-sand-50 tracking-wider">
              ¿No sabes cuál elegir? Te mostramos todas tus posibilidades
            </h2>
            <p className="text-xs sm:text-sm text-sand-400 mt-2 font-light">
              Elige tu ocasión y tus notas preferidas para desplegar todas las fragancias coincidentes de nuestro catálogo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna Izquierda: Preguntas Interactivas (5 columnas) */}
            <div className="lg:col-span-5 space-y-6 bg-noir-950/70 border border-white/5 p-5 sm:p-6 rounded-2xl">
              {/* Pregunta 1 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-400 font-bold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold-500 text-noir-950 flex items-center justify-center text-[10px] font-bold">1</span>
                    ¿Para qué ocasión buscas el perfume?
                  </span>
                  {selectedOccasion && (
                    <button
                      onClick={() => setSelectedOccasion(null)}
                      className="text-[10px] text-sand-400 hover:text-gold-300 font-normal uppercase"
                    >
                      Limpiar
                    </button>
                  )}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {occasions.map((occ) => {
                    const isSelected = selectedOccasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        onClick={() => setSelectedOccasion(isSelected ? null : occ.id)}
                        className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-gold-500/20 border-gold-500 text-gold-300 font-bold shadow-gold-glow"
                            : "bg-noir-900 border-white/10 text-sand-300 hover:border-gold-500/40 hover:bg-noir-900/80"
                        }`}
                      >
                        <span className="font-medium">{occ.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pregunta 2 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-400 font-bold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold-500 text-noir-950 flex items-center justify-center text-[10px] font-bold">2</span>
                    ¿Qué preferencia de notas buscas?
                  </span>
                  {selectedIntention && (
                    <button
                      onClick={() => setSelectedIntention(null)}
                      className="text-[10px] text-sand-400 hover:text-gold-300 font-normal uppercase"
                    >
                      Limpiar
                    </button>
                  )}
                </label>
                <div className="space-y-2">
                  {intentions.map((intent) => {
                    const isSelected = selectedIntention === intent.id;
                    return (
                      <button
                        key={intent.id}
                        onClick={() => setSelectedIntention(isSelected ? null : intent.id)}
                        className={`w-full p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-gold-500/20 border-gold-500 text-gold-300 font-bold shadow-gold-glow"
                            : "bg-noir-900 border-white/10 text-sand-300 hover:border-gold-500/40 hover:bg-noir-900/80"
                        }`}
                      >
                        <span className="font-medium">{intent.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botón de Reinicio */}
              {(selectedOccasion || selectedIntention) && (
                <button
                  onClick={() => {
                    setSelectedOccasion(null);
                    setSelectedIntention(null);
                  }}
                  className="w-full py-2 px-3 text-xs text-sand-400 hover:text-gold-300 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ver catálogo completo sin filtros</span>
                </button>
              )}
            </div>

            {/* Columna Derecha: TODAS LAS POSIBILIDADES COINCIDENTES (7 columnas) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* Barra de Encabezado de Resultados */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-noir-950/80 border border-gold-500/30 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span className="font-cinzel text-base font-bold text-sand-100 tracking-wider">
                      Todas tus posibilidades ({matchingProducts.length})
                    </span>
                  </div>
                  <p className="text-[11px] text-sand-400 mt-0.5">
                    {activeOccasionLabel ? activeOccasionLabel.split(" ")[1] : "Cualquier ocasión"}
                    {activeIntentionLabel ? ` • ${activeIntentionLabel.split(" ")[1]}` : ""}
                  </p>
                </div>

                <span className="px-3 py-1 bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider rounded-full">
                  {matchingProducts.length} {matchingProducts.length === 1 ? "opción" : "opciones"}
                </span>
              </div>

              {/* Lista / Grid de Fragancias Encontradas */}
              {matchingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[580px] overflow-y-auto overscroll-y-contain -webkit-overflow-scrolling-touch pr-1.5 scrollbar-thin">
                  {matchingProducts.map((product) => {
                    const isAdded = !!addedIds[product.id];
                    return (
                      <div
                        key={product.id}
                        className="bg-noir-950 border border-white/10 hover:border-gold-500/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between group hover:shadow-gold-glow relative animate-fade-in"
                      >
                        {/* Badges superiores */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          {product.pillarCategory ? (
                            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-md truncate max-w-[150px]">
                              {product.pillarCategory}
                            </span>
                          ) : <div />}

                          {product.availableForDecant && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 bg-noir-900 border border-cyan-500/40 rounded flex items-center gap-1">
                              <Droplets className="w-2.5 h-2.5 text-cyan-400" />
                              Decant
                            </span>
                          )}
                        </div>

                        {/* Imagen del Producto */}
                        <div 
                          className="relative w-full aspect-square max-h-36 my-1 cursor-pointer flex items-center justify-center"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 250px"
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Información */}
                        <div className="mt-2 text-center">
                          <span className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold block">
                            {product.brand || "Perfumería de Lujo"}
                          </span>
                          <h4 
                            className="font-montserrat text-sm font-bold text-sand-50 group-hover:text-gold-300 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                            onClick={() => setQuickViewProduct(product)}
                          >
                            {product.title}
                          </h4>

                          {/* Notas principales visibles */}
                          <div className="flex flex-wrap justify-center gap-1 my-2">
                            {product.notes.slice(0, 3).map((note, idx) => (
                              <NoteBadge key={idx} note={note} size="sm" />
                            ))}
                          </div>

                          {/* Precios */}
                          <div className="flex items-center justify-center gap-2 mt-2">
                            {product.originalPrice && (
                              <span className="text-xs text-sand-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                            <span className="font-montserrat text-sm font-bold text-gold-400">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="py-2 px-2 rounded-xl text-[11px] font-semibold uppercase tracking-wider text-sand-300 hover:text-gold-300 bg-noir-900 border border-white/10 hover:border-gold-500/40 transition-colors flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Ficha</span>
                          </button>

                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            disabled={product.stock === 0}
                            className={`py-2 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                              product.stock === 0
                                ? "bg-noir-900 border border-red-500/30 text-red-400 cursor-not-allowed"
                                : isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-noir-950 shadow-gold-glow"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Añadido</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Comprar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 text-center bg-noir-950 border border-white/10 rounded-2xl flex flex-col items-center justify-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-gold-500/40" />
                  <p className="text-xs text-sand-300">
                    No encontramos fragancias con esa combinación exacta. Prueba cambiando la ocasión o las notas.
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
