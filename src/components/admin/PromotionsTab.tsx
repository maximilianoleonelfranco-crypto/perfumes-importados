"use client";

import React, { useState } from "react";
import { Promotion, useStore } from "@/context/StoreContext";
import { Flame, Plus, Trash2, Power, Check, X, Sparkles, Tag } from "lucide-react";

export default function PromotionsTab() {
  const { promotions, addPromotion, togglePromotion, deletePromotion, categories, products } = useStore();

  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number | "">(15);
  const [targetCategory, setTargetCategory] = useState("perfumes-arabes");
  const [targetBrand, setTargetBrand] = useState("");
  const [badgeText, setBadgeText] = useState("OFERTA EXCLUSIVA");

  // Obtener lista única de marcas disponibles en los productos
  const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !discountPercentage) return;

    addPromotion({
      title,
      discountPercentage: Number(discountPercentage),
      targetCategory: targetCategory !== "all" ? targetCategory : undefined,
      targetBrand: targetBrand.trim() || undefined,
      badgeText: badgeText || "PROMO",
      isActive: true,
    });

    setIsCreating(false);
    setTitle("");
    setDiscountPercentage(15);
    setBadgeText("OFERTA EXCLUSIVA");
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Desea eliminar la promoción "${title}"?`)) {
      deletePromotion(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-sand-100">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-noir-900 border border-white/10 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg font-bold text-sand-50">
              Ofertas & Campañas Promocionales
            </h2>
            <p className="text-xs text-sand-400">
              Cree promociones globales o aplicables por marca o colección entera.
            </p>
          </div>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Promoción</span>
          </button>
        )}
      </div>

      {/* Formulario Crear Promoción */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="p-6 bg-noir-900 border border-gold-500/40 rounded-2xl space-y-5 animate-fade-in shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-cinzel text-base font-bold text-gold-300">
              Crear Nueva Oferta Promocional
            </h3>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-sand-400 hover:text-sand-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-semibold">
                Título de la Campaña *
              </label>
              <input
                type="text"
                required
                placeholder="ej. Especial Lattafa • 15% OFF"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-bold">
                Descuento Aplicado (% OFF) *
              </label>
              <input
                type="number"
                required
                min="1"
                max="90"
                placeholder="ej. 15"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-noir-950 border border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-gold-300 font-bold focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Categoría Objetivo
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="all">Todas las Categorías</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Marca Específica (Opcional)
              </label>
              <select
                value={targetBrand}
                onChange={(e) => setTargetBrand(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="">Todas las Marcas</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Texto de Insignia / Badge
              </label>
              <input
                type="text"
                placeholder="ej. PROMO LATTAFA"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-sand-400 border border-white/10 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Publicar Oferta</span>
            </button>
          </div>
        </form>
      )}

      {/* Lista de Ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`p-5 rounded-2xl border transition-all ${
              promo.isActive
                ? "bg-noir-900 border-gold-500/30 hover:border-gold-500/60"
                : "bg-noir-950/60 border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                {promo.badgeText}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => togglePromotion(promo.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    promo.isActive
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-noir-950 border-white/10 text-sand-500"
                  }`}
                  title={promo.isActive ? "Desactivar Promoción" : "Activar Promoción"}
                >
                  <Power className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(promo.id, promo.title)}
                  className="p-1.5 rounded-lg bg-noir-950 border border-white/10 hover:border-red-500 text-sand-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-cinzel text-lg font-bold text-sand-50">
              {promo.title}
            </h3>

            <div className="mt-2 text-xs text-sand-400 space-y-1">
              <p>
                Alcance:{" "}
                <span className="text-sand-100 font-semibold">
                  {promo.targetBrand ? `Marca ${promo.targetBrand}` : "Todas las marcas"}
                  {" • "}
                  {promo.targetCategory ? `Categoría ${promo.targetCategory}` : "Todas las categorías"}
                </span>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-lg font-bold text-gold-300 font-cinzel">
                {promo.discountPercentage}% Descuento Directo
              </span>
              <span className={promo.isActive ? "text-xs text-emerald-400 font-semibold" : "text-xs text-sand-500"}>
                {promo.isActive ? "● Activa en tienda" : "○ Pausada"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
