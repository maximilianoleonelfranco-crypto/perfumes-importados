"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  Eye,
  Search,
  TrendingUp,
  PackageCheck,
  AlertTriangle,
  Droplets,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

interface DashboardTabProps {
  onGoToProductsWithFilter?: (filter: "out-of-stock" | "critical") => void;
}

export default function DashboardTab({ onGoToProductsWithFilter }: DashboardTabProps) {
  const { analytics, products } = useStore();

  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.stock > 0).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const decantAvailableCount = products.filter((p) => p.availableForDecant).length;

  // Ordenar productos por vistas
  const sortedByViews = [...products].sort(
    (a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)
  ).slice(0, 6);

  return (
    <div className="space-y-8 animate-fade-in text-sand-100">
      {/* Tarjetas Resumen de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-noir-900 border border-gold-500/30 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
                Visitas Totales
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-gold-300 mt-1">
                {analytics.totalVisits.toLocaleString()}
              </h3>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" />
                +{analytics.todayVisits} visitas hoy
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Eye className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-5 bg-noir-900 border border-gold-500/30 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
                Catálogo en Stock
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-sand-50 mt-1">
                {inStockProducts} <span className="text-sm font-normal text-sand-400">/ {totalProducts}</span>
              </h3>
              <p className="text-[11px] text-sand-400 mt-1 font-medium">
                {outOfStockProducts.length} productos sin stock
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-5 bg-noir-900 border border-gold-500/30 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
                Agotados / Alerta
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-400 mt-1">
                {outOfStockProducts.length}
              </h3>
              <p className="text-[11px] text-amber-400/90 mt-1 font-semibold">
                {outOfStockProducts.length > 0 ? "Requieren reposición" : "Stock optimizado"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-5 bg-noir-900 border border-gold-500/30 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
                Habilitados para Decant
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-cyan-300 mt-1">
                {decantAvailableCount}
              </h3>
              <p className="text-[11px] text-cyan-400 mt-1 font-medium">
                Muestras fraccionadas (10ml)
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Stock Crítico */}
      {outOfStockProducts.length > 0 && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Alerta de Inventario: {outOfStockProducts.length} Perfumes Agotados
              </h4>
              <p className="text-xs text-sand-300 mt-0.5">
                Los clientes no podrán comprar {outOfStockProducts.map(p => p.title).slice(0, 3).join(", ")}
                {outOfStockProducts.length > 3 ? " y otros..." : "."}
              </p>
            </div>
          </div>
          {onGoToProductsWithFilter && (
            <button
              onClick={() => onGoToProductsWithFilter("out-of-stock")}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-noir-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Reponer Stock</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Sección Doble: Más Vistos vs Términos Más Buscados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artículos Más Vistos */}
        <div className="bg-noir-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <h3 className="font-cinzel text-lg font-bold text-sand-50">
                Perfumes Más Vistos
              </h3>
            </div>
            <span className="text-xs text-sand-400 uppercase tracking-wider">
              Popularidad
            </span>
          </div>

          <div className="space-y-4">
            {sortedByViews.map((product, idx) => (
              <div
                key={product.id}
                className="p-3 bg-noir-950/70 border border-white/5 hover:border-gold-500/30 rounded-xl flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-bold font-cinzel text-gold-400">
                    #{idx + 1}
                  </span>
                  <div className="relative w-12 h-12 rounded-lg bg-noir-900 border border-white/10 overflow-hidden shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-sand-100 group-hover:text-gold-300 transition-colors line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-sand-400">
                      {product.brand} • ${product.price.toLocaleString()} UYU
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold rounded-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {product.viewsCount || 0} vistas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Términos Más Buscados en la Tienda */}
        <div className="bg-noir-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gold-400" />
              <h3 className="font-cinzel text-lg font-bold text-sand-50">
                Términos Más Buscados
              </h3>
            </div>
            <span className="text-xs text-sand-400 uppercase tracking-wider">
              Consultas Clientes
            </span>
          </div>

          <div className="space-y-3">
            {analytics.searchQueries.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-noir-950/70 border border-white/5 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-bold text-sand-500">
                    {idx + 1}.
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-sand-100 uppercase tracking-wider">
                      "{item.term}"
                    </span>
                    <span className="text-[10px] text-sand-400 block">
                      Última consulta: {item.lastSearched}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-24 bg-noir-900 rounded-full h-2 overflow-hidden border border-white/10">
                    <div
                      className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (item.count / (analytics.searchQueries[0]?.count || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gold-300 w-12 text-right">
                    {item.count} búsquedas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
