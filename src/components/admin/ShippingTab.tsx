"use client";

import React, { useState, useMemo } from "react";
import { useStore, MontevideoNeighborhood } from "@/context/StoreContext";
import {
  Truck,
  MapPin,
  Search,
  Plus,
  Trash2,
  DollarSign,
  CheckCircle2,
  Filter,
  Sparkles,
  Info,
  RefreshCw,
  Building2,
  Layers,
} from "lucide-react";

export default function ShippingTab() {
  const {
    shippingConfig,
    updateNeighborhoodCost,
    updateZoneCost,
    addNeighborhood,
    deleteNeighborhood,
    updateDefaultMontevideoCost,
    updateCanelonesCost,
    detectMontevideoNeighborhood,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [testAddress, setTestAddress] = useState("");

  // Modal / Form para agregar barrio
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newZone, setNewZone] = useState("Costa / Sur");
  const [newCost, setNewCost] = useState(180);

  // Modal para actualización masiva por zona
  const [bulkZone, setBulkZone] = useState("Centro / Cordón");
  const [bulkPrice, setBulkPrice] = useState(160);
  const [isBulkSuccess, setIsBulkSuccess] = useState(false);

  // Lista única de zonas existentes
  const zones = useMemo(() => {
    const set = new Set<string>();
    shippingConfig.neighborhoods.forEach((n) => set.add(n.zone));
    return Array.from(set);
  }, [shippingConfig.neighborhoods]);

  // Barrios filtrados por búsqueda y zona
  const filteredNeighborhoods = useMemo(() => {
    return shippingConfig.neighborhoods.filter((n) => {
      const matchSearch =
        n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.zone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchZone = selectedZone === "all" || n.zone === selectedZone;
      return matchSearch && matchZone;
    });
  }, [shippingConfig.neighborhoods, searchTerm, selectedZone]);

  // Test de detección
  const detectedTest = useMemo(() => {
    if (!testAddress.trim()) return null;
    return detectMontevideoNeighborhood(testAddress);
  }, [testAddress, detectMontevideoNeighborhood]);

  const handleAddNeighborhood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addNeighborhood({
      name: newName.trim(),
      zone: newZone,
      cost: Number(newCost) || 0,
    });
    setNewName("");
    setIsAddModalOpen(false);
  };

  const handleApplyBulkZone = () => {
    updateZoneCost(bulkZone, Number(bulkPrice) || 0);
    setIsBulkSuccess(true);
    setTimeout(() => setIsBulkSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Cabecera y Resumen General de Tarifas */}
      <div className="bg-noir-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Gestión de Envíos en UYU
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                {shippingConfig.neighborhoods.length} Barrios Activos
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-sand-50 tracking-wide">
              Tarifas de Envío y Barrios de Montevideo
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Configura costos diferenciados por barrio o zona para Montevideo. El sistema
              detecta automáticamente el barrio cuando el cliente ingresa su dirección en el carrito.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-noir-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Barrio</span>
          </button>
        </div>

        {/* Tarjetas de Tarifas Globales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Tarifa Montevideo General */}
          <div className="p-4 rounded-2xl bg-noir-950 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-sand-400 mb-1">
                <span>Montevideo (Por Defecto)</span>
                <MapPin className="w-4 h-4 text-gold-400" />
              </div>
              <p className="text-[11px] text-sand-500 mb-3">
                Se aplica si la dirección no coincide con ningún barrio específico listado.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sand-300 text-xs font-medium">$ UYU</span>
              <input
                type="number"
                min="0"
                step="10"
                value={shippingConfig.defaultMontevideoCost}
                onChange={(e) => updateDefaultMontevideoCost(Number(e.target.value))}
                className="w-24 bg-noir-900 border border-gold-500/40 rounded-xl px-3 py-1.5 text-sand-50 text-base font-bold focus:outline-none focus:border-gold-400 text-right"
              />
              <span className="text-xs text-gold-400 font-semibold">Guardado</span>
            </div>
          </div>

          {/* Tarifa Interior por Agencias ($0 UYU) */}
          <div className="p-4 rounded-2xl bg-noir-950 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              $0 En Tienda
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1 font-semibold">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Interior por Agencia</span>
              </div>
              <p className="text-[11px] text-sand-400 mb-2">
                DAC, Mirtrans, Turil, De Punta y otras agencias hacia los 18 departamentos.
              </p>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-2.5 text-[11px] text-emerald-300 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>
                <strong>Sin costo web ($0 UYU):</strong> El flete lo cobra directamente la agencia
                al entregar o despachar en la terminal/sucursal de destino.
              </span>
            </div>
          </div>

          {/* Tarifa Canelones / Maldonado */}
          <div className="p-4 rounded-2xl bg-noir-950 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-sand-400 mb-1">
                <span>Canelones / Maldonado (Directo)</span>
                <Building2 className="w-4 h-4 text-gold-400" />
              </div>
              <p className="text-[11px] text-sand-500 mb-3">
                Cadetería directa en Ciudad de la Costa y Maldonado.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sand-300 text-xs font-medium">$ UYU</span>
              <input
                type="number"
                min="0"
                step="10"
                value={shippingConfig.canelonesMaldonadoCost}
                onChange={(e) => updateCanelonesCost(Number(e.target.value))}
                className="w-24 bg-noir-900 border border-gold-500/40 rounded-xl px-3 py-1.5 text-sand-50 text-base font-bold focus:outline-none focus:border-gold-400 text-right"
              />
              <span className="text-xs text-gold-400 font-semibold">Guardado</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Simulador de Detección Automática (Herramienta interactiva para el administrador) */}
      <div className="bg-noir-900/80 border border-gold-500/20 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Simulador del Detector Inteligente de Dirección</span>
        </div>
        <p className="text-xs text-sand-400 mb-4">
          Escribe una dirección de prueba tal como la pondría un cliente en el carrito para
          comprobar qué barrio detecta el algoritmo y qué costo asigna en tiempo real.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ej: Bvr España 2600 esq Pocitos, o Av Brasil 2800..."
              value={testAddress}
              onChange={(e) => setTestAddress(e.target.value)}
              className="w-full bg-noir-950 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-gold-400"
            />
          </div>
          {testAddress && (
            <button
              onClick={() => setTestAddress("")}
              className="px-4 py-2.5 rounded-2xl bg-noir-800 text-sand-400 hover:text-sand-200 text-xs font-medium"
            >
              Limpiar
            </button>
          )}
        </div>

        {testAddress.trim() && (
          <div className="mt-3 p-3.5 rounded-2xl bg-noir-950 border border-gold-500/30 flex items-center justify-between animate-fade-in">
            {detectedTest ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-sand-400">Barrio Detectado Automáticamente:</div>
                  <div className="text-sm font-bold text-sand-50">
                    {detectedTest.name}{" "}
                    <span className="text-xs font-normal text-gold-400">({detectedTest.zone})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-sand-400">Sin coincidencia específica:</div>
                  <div className="text-sm font-semibold text-sand-300">
                    Se aplicará la tarifa por defecto de Montevideo ($
                    {shippingConfig.defaultMontevideoCost} UYU)
                  </div>
                </div>
              </div>
            )}

            <div className="text-right">
              <span className="text-xs text-sand-400 block">Costo Calculado:</span>
              <span className="text-base font-bold text-gold-400">
                ${detectedTest ? detectedTest.cost : shippingConfig.defaultMontevideoCost} UYU
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Actualización Masiva por Zona */}
      <div className="bg-noir-900 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sand-300 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-gold-400" />
            <span>Actualización Rápida por Zona Completa</span>
          </div>
          <p className="text-xs text-sand-500">
            Cambia el precio de todos los barrios de una zona al mismo tiempo con un solo clic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={bulkZone}
            onChange={(e) => setBulkZone(e.target.value)}
            className="bg-noir-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-sand-200 focus:outline-none focus:border-gold-400"
          >
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 bg-noir-950 border border-white/10 rounded-xl px-2.5 py-1.5">
            <span className="text-xs text-sand-400">$ UYU</span>
            <input
              type="number"
              min="0"
              step="10"
              value={bulkPrice}
              onChange={(e) => setBulkPrice(Number(e.target.value))}
              className="w-16 bg-transparent text-right text-xs font-bold text-sand-100 focus:outline-none"
            />
          </div>

          <button
            onClick={handleApplyBulkZone}
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-noir-950 text-xs font-bold tracking-wider uppercase transition-colors"
          >
            Aplicar a Zona
          </button>

          {isBulkSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ¡Precios actualizados!
            </span>
          )}
        </div>
      </div>

      {/* 4. Filtros y Búsqueda de Barrios */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Barra de Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-sand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar barrio o zona..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-noir-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Filtro por Zona */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedZone("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedZone === "all"
                  ? "bg-gold-500 text-noir-950"
                  : "bg-noir-900 border border-white/10 text-sand-400 hover:text-sand-100"
              }`}
            >
              Todos ({shippingConfig.neighborhoods.length})
            </button>
            {zones.map((zone) => {
              const count = shippingConfig.neighborhoods.filter((n) => n.zone === zone).length;
              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedZone === zone
                      ? "bg-gold-500 text-noir-950"
                      : "bg-noir-900 border border-white/10 text-sand-400 hover:text-sand-100"
                  }`}
                >
                  {zone} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Tabla / Grilla de Barrios */}
        <div className="bg-noir-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 px-6 py-3.5 bg-noir-950 border-b border-white/10 text-xs font-bold text-sand-400 uppercase tracking-wider">
            <div className="col-span-5 sm:col-span-4">Barrio de Montevideo</div>
            <div className="col-span-4 sm:col-span-4">Zona / Clasificación</div>
            <div className="col-span-3 sm:col-span-4 text-right">Costo de Envío ($ UYU)</div>
          </div>

          {filteredNeighborhoods.length === 0 ? (
            <div className="p-12 text-center text-sand-500 text-xs">
              No se encontraron barrios con los filtros seleccionados.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredNeighborhoods.map((n) => (
                <div
                  key={n.id}
                  className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-white/[0.02] transition-colors"
                >
                  {/* Nombre */}
                  <div className="col-span-5 sm:col-span-4">
                    <span className="font-semibold text-sand-100 text-sm block">{n.name}</span>
                    <span className="text-[11px] text-sand-500 font-mono">id: {n.id}</span>
                  </div>

                  {/* Zona */}
                  <div className="col-span-4 sm:col-span-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-medium">
                      {n.zone}
                    </span>
                  </div>

                  {/* Precio editable y acciones */}
                  <div className="col-span-3 sm:col-span-4 flex items-center justify-end gap-2">
                    <div className="flex items-center gap-1.5 bg-noir-950 border border-white/10 rounded-xl px-2.5 py-1 focus-within:border-gold-400 transition-colors">
                      <span className="text-xs text-sand-500 font-medium">$</span>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={n.cost}
                        onChange={(e) => updateNeighborhoodCost(n.id, Number(e.target.value))}
                        className="w-16 bg-transparent text-right font-bold text-sand-50 text-sm focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => deleteNeighborhood(n.id)}
                      title="Eliminar barrio"
                      className="p-1.5 rounded-lg text-sand-500 hover:text-red-400 hover:bg-red-950/30 transition-colors ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: AGREGAR NUEVO BARRIO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-noir-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cinzel text-lg font-bold text-sand-50 tracking-wide flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span>Agregar Nuevo Barrio</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-sand-500 hover:text-sand-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNeighborhood} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1.5 font-medium">
                  Nombre del Barrio
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Punta Carretas, Carrasco..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-noir-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1.5 font-medium">
                  Zona / Clasificación
                </label>
                <input
                  type="text"
                  required
                  list="zones-datalist"
                  placeholder="Ej: Costa / Sur, Centro / Cordón..."
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  className="w-full bg-noir-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-400"
                />
                <datalist id="zones-datalist">
                  {zones.map((z) => (
                    <option key={z} value={z} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1.5 font-medium">
                  Costo de Envío ($ UYU)
                </label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  required
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full bg-noir-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-noir-950 border border-white/10 text-xs font-semibold text-sand-400 hover:text-sand-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-noir-950 text-xs font-bold uppercase tracking-wider shadow-gold-glow"
                >
                  Guardar Barrio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
