"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import AdminHeader, { AdminTab } from "@/components/admin/AdminHeader";
import DashboardTab from "@/components/admin/DashboardTab";
import ProductsTab from "@/components/admin/ProductsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import CouponsTab from "@/components/admin/CouponsTab";
import PromotionsTab from "@/components/admin/PromotionsTab";
import ShippingTab from "@/components/admin/ShippingTab";
import { ShieldAlert, KeyRound, Lock, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { isAdminLoggedIn, loginAdmin } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [productsInitialFilter, setProductsInitialFilter] = useState<
    "all" | "in-stock" | "out-of-stock" | "critical" | "decants"
  >("all");

  // State para Login con PIN
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (!success) {
      setPinError(true);
      setPinInput("");
    } else {
      setPinError(false);
    }
  };

  const handleGoToProductsWithFilter = (
    filter: "out-of-stock" | "critical"
  ) => {
    setProductsInitialFilter(filter);
    setActiveTab("products");
  };

  // 1. Pantalla de Autenticación por PIN si no ha iniciado sesión
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-noir-950 text-sand-100 flex items-center justify-center p-4 relative">
        {/* Luces de Fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-noir-900 border border-gold-500/40 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in text-center">
          {/* Volver a la Tienda */}
          <div className="text-left mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-sand-400 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Perfumes Importados</span>
            </Link>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-amber-700 text-noir-950 flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="font-cinzel text-2xl font-bold text-sand-50 tracking-wide">
            PANEL ADMINISTRATIVO
          </h2>
          <p className="text-xs text-gold-400/90 mt-1 mb-6">
            Perfumes Importados • Acceso Restringido
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-2 font-medium">
                Ingrese el PIN de Seguridad
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full bg-noir-950 border border-gold-500/40 rounded-2xl pl-11 pr-4 py-3 text-center tracking-widest text-lg font-bold text-gold-300 focus:outline-none focus:border-gold-400 shadow-inner"
                />
              </div>
            </div>

            {pinError && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold flex items-center justify-center gap-2 animate-fade-in">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>PIN Incorrecto. Intente con '1234' o 'admin'</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-gold-glow transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Acceder al Control Total</span>
            </button>
          </form>

          <p className="text-[11px] text-sand-500 mt-6 pt-4 border-t border-white/5">
            💡 Clave de acceso predeterminada: <strong className="text-sand-300">1234</strong> o <strong className="text-sand-300">admin</strong>
          </p>
        </div>
      </div>
    );
  }

  // 2. Panel Administrativo una vez autenticado
  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-noir-950 text-sand-100 flex flex-col selection:bg-gold-500 selection:text-noir-950">
      {/* Cabecera del Admin */}
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Cuerpo Principal del Admin */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === "dashboard" && (
          <DashboardTab onGoToProductsWithFilter={handleGoToProductsWithFilter} />
        )}
        {activeTab === "products" && (
          <ProductsTab initialFilter={productsInitialFilter} />
        )}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "coupons" && <CouponsTab />}
        {activeTab === "promotions" && <PromotionsTab />}
        {activeTab === "shipping" && <ShippingTab />}
      </main>
    </div>
  );
}

