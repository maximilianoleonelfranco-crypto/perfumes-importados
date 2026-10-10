"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import {
  BarChart3,
  Package,
  FolderTree,
  Ticket,
  Flame,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Truck,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export type AdminTab = "dashboard" | "products" | "categories" | "coupons" | "promotions" | "shipping" | "reviews";

interface AdminHeaderProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export default function AdminHeader({ activeTab, setActiveTab }: AdminHeaderProps) {
  const { logoutAdmin, products, coupons, categories, shippingConfig, reviews } = useStore();

  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number | string }[] = [
    { id: "dashboard", label: "Estadísticas & Visitas", icon: BarChart3 },
    { id: "products", label: "Productos & Stock", icon: Package, badge: outOfStockCount > 0 ? `${outOfStockCount} Sin Stock` : undefined },
    { id: "reviews", label: "Reseñas & WhatsApp", icon: MessageSquare, badge: `${reviews.length} Reseñas` },
    { id: "categories", label: "Categorías", icon: FolderTree, badge: categories.length },
    { id: "coupons", label: "Cupones Descuento", icon: Ticket, badge: coupons.filter(c => c.isActive).length },
    { id: "promotions", label: "Ofertas & Promos", icon: Flame },
    { id: "shipping", label: "Envíos & Barrios", icon: Truck, badge: `${shippingConfig.neighborhoods.length} Barrios` },
  ];

  return (
    <header className="bg-noir-950 border-b border-gold-500/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Título & Badge de Seguridad */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-amber-700 text-noir-950 flex items-center justify-center font-cinzel font-bold text-xl shadow-gold-glow">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-xl font-bold text-sand-50 tracking-wider">
                  PANEL ADMINISTRATIVO
                </h1>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Sesión Activa
                </span>
              </div>
              <p className="text-xs text-gold-400/90">
                Perfumes Importados • Control Total de Tienda
              </p>
            </div>
          </div>

          {/* Acciones de la Cabecera */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-noir-900 border border-white/10 hover:border-gold-500/40 text-xs text-sand-300 hover:text-gold-300 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-gold-400" />
              <span>Ver Tienda</span>
            </Link>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-500/30 hover:bg-red-900/60 text-xs text-red-300 hover:text-red-100 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <nav className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-noir-950 font-bold shadow-gold-glow"
                    : "bg-noir-900 border border-white/10 text-sand-300 hover:text-sand-50 hover:border-gold-500/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-noir-950" : "text-gold-400"}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive
                        ? "bg-noir-950/30 text-noir-950"
                        : "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
