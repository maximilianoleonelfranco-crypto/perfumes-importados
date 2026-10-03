"use client";

import React, { useState } from "react";
import { Coupon, useStore } from "@/context/StoreContext";
import { Ticket, Plus, Trash2, Power, Check, X, Tag, DollarSign, Percent } from "lucide-react";

export default function CouponsTab() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useStore();

  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState<number | "">(15);
  const [minPurchase, setMinPurchase] = useState<number | "">(3000);
  const [maxUses, setMaxUses] = useState<number | "">(100);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !value) return;

    addCoupon({
      code: code.toUpperCase().trim(),
      type,
      value: Number(value),
      minPurchase: minPurchase ? Number(minPurchase) : 0,
      maxUses: maxUses ? Number(maxUses) : undefined,
      isActive: true,
    });

    setIsCreating(false);
    setCode("");
    setValue(15);
    setMinPurchase(3000);
    setMaxUses(100);
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`¿Desea eliminar el cupón "${code}"?`)) {
      deleteCoupon(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-sand-100">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-noir-900 border border-white/10 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg font-bold text-sand-50">
              Generador de Cupones de Descuento
            </h2>
            <p className="text-xs text-sand-400">
              Cree códigos promocionales en Porcentaje (%) o en Monto Fijo ($ UYU).
            </p>
          </div>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generar Nuevo Cupón</span>
          </button>
        )}
      </div>

      {/* Formulario Crear Cupón */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="p-6 bg-noir-900 border border-gold-500/40 rounded-2xl space-y-5 animate-fade-in shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-cinzel text-base font-bold text-gold-300">
              Crear Nuevo Código de Descuento
            </h3>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-sand-400 hover:text-sand-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-bold">
                Código Promocional *
              </label>
              <input
                type="text"
                required
                placeholder="ej. BIENVENIDA15, OUD500"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full bg-noir-950 border border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-gold-300 font-mono font-bold focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-semibold">
                Tipo de Descuento
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "percentage" | "fixed")}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="percentage">Porcentaje (% OFF)</option>
                <option value="fixed">Monto Fijo ($ UYU OFF)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-bold">
                Valor del Descuento *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  placeholder={type === "percentage" ? "15 (15%)" : "500 ($500 UYU)"}
                  value={value}
                  onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-noir-950 border border-white/15 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-sand-100 font-bold focus:outline-none focus:border-gold-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-400">
                  {type === "percentage" ? "%" : "$ UYU"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-400 mb-1 font-medium">
                Mínimo de Compra Requerido ($ UYU)
              </label>
              <input
                type="number"
                min="0"
                placeholder="ej. 2500"
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-400 mb-1 font-medium">
                Límite Máximo de Usos
              </label>
              <input
                type="number"
                min="1"
                placeholder="ej. 100"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value === "" ? "" : Number(e.target.value))}
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
              <span>Activar Cupón</span>
            </button>
          </div>
        </form>
      )}

      {/* Lista de Cupones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-2xl border transition-all ${
              coupon.isActive
                ? "bg-noir-900 border-gold-500/30 hover:border-gold-500/60"
                : "bg-noir-950/60 border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-gold-500/10 border border-gold-500/40 text-gold-300 font-mono font-bold text-sm tracking-wider rounded-lg">
                  {coupon.code}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleCoupon(coupon.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    coupon.isActive
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-noir-950 border-white/10 text-sand-500"
                  }`}
                  title={coupon.isActive ? "Desactivar Cupón" : "Activar Cupón"}
                >
                  <Power className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(coupon.id, coupon.code)}
                  className="p-1.5 rounded-lg bg-noir-950 border border-white/10 hover:border-red-500 text-sand-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-cinzel text-sand-50">
                {coupon.type === "percentage" ? `${coupon.value}% OFF` : `$${coupon.value} UYU OFF`}
              </div>

              <p className="text-xs text-sand-400">
                Mínimo compra: ${coupon.minPurchase ? coupon.minPurchase.toLocaleString() : "Sin mínimo"} UYU
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-sand-500">
                <span>Usos: {coupon.usedCount} / {coupon.maxUses || "Sin límite"}</span>
                <span className={coupon.isActive ? "text-emerald-400 font-semibold" : "text-sand-500"}>
                  {coupon.isActive ? "Activo en checkout" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
