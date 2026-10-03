"use client";

import React, { useState } from "react";
import { Product, useStore } from "@/context/StoreContext";
import {
  Plus,
  Search,
  Package,
  Edit2,
  Trash2,
  Droplets,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Filter,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import Image from "next/image";
import AddProductModal from "./AddProductModal";

interface ProductsTabProps {
  initialFilter?: "all" | "in-stock" | "out-of-stock" | "critical" | "decants";
}

export default function ProductsTab({ initialFilter = "all" }: ProductsTabProps) {
  const {
    products,
    updateStock,
    toggleDecant,
    deleteProduct,
    stockFilter,
    setStockFilter,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sincronizar filtro inicial si proviene del dashboard
  React.useEffect(() => {
    if (initialFilter) {
      setStockFilter(initialFilter);
    }
  }, [initialFilter, setStockFilter]);

  // Filtrado de productos por término de búsqueda y por filtro de stock
  const filteredProducts = products.filter((p) => {
    // Filtro por término
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filtro por estado de stock
    if (stockFilter === "in-stock") return p.stock > 0;
    if (stockFilter === "out-of-stock") return p.stock === 0;
    if (stockFilter === "critical") return p.stock > 0 && p.stock <= 3;
    if (stockFilter === "decants") return p.availableForDecant;

    return true;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Está seguro de eliminar "${title}" del catálogo?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-sand-100">
      {/* Barra de Herramientas: Búsqueda, Filtros de Stock y Botón Agregar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-noir-900 border border-white/10 p-4 rounded-2xl">
        {/* Buscador */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, marca o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-noir-950 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* Filtros de Stock Solicitados */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin">
          <button
            onClick={() => setStockFilter("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              stockFilter === "all"
                ? "bg-gold-500 text-noir-950 font-bold"
                : "bg-noir-950 border border-white/10 text-sand-300 hover:text-sand-50"
            }`}
          >
            <span>Todos ({products.length})</span>
          </button>

          <button
            onClick={() => setStockFilter("in-stock")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              stockFilter === "in-stock"
                ? "bg-emerald-500 text-noir-950 font-bold"
                : "bg-noir-950 border border-white/10 text-sand-300 hover:text-sand-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>En Stock ({products.filter((p) => p.stock > 0).length})</span>
          </button>

          <button
            onClick={() => setStockFilter("critical")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              stockFilter === "critical"
                ? "bg-amber-500 text-noir-950 font-bold"
                : "bg-noir-950 border border-white/10 text-sand-300 hover:text-sand-50"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Crítico ≤ 3 ({products.filter((p) => p.stock > 0 && p.stock <= 3).length})</span>
          </button>

          <button
            onClick={() => setStockFilter("out-of-stock")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              stockFilter === "out-of-stock"
                ? "bg-red-500 text-white font-bold"
                : "bg-noir-950 border border-white/10 text-sand-300 hover:text-sand-50"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Sin Stock ({products.filter((p) => p.stock === 0).length})</span>
          </button>

          <button
            onClick={() => setStockFilter("decants")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              stockFilter === "decants"
                ? "bg-cyan-500 text-noir-950 font-bold"
                : "bg-noir-950 border border-white/10 text-sand-300 hover:text-sand-50"
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Decants ({products.filter((p) => p.availableForDecant).length})</span>
          </button>
        </div>

        {/* Botón Agregar Producto */}
        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Producto</span>
        </button>
      </div>

      {/* Tabla Principal de Productos */}
      <div className="bg-noir-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-noir-950 border-b border-white/10 text-[11px] font-bold text-sand-400 uppercase tracking-wider">
                <th className="py-4 px-4">Producto</th>
                <th className="py-4 px-4">Categoría / Marca</th>
                <th className="py-4 px-4">Precio Frasco ($)</th>
                <th className="py-4 px-4">Control de Stock</th>
                <th className="py-4 px-4">Decant (Muestra 10ml)</th>
                <th className="py-4 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sand-400">
                    <Package className="w-8 h-8 text-sand-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No se encontraron perfumes</p>
                    <p className="text-xs text-sand-500 mt-1">
                      Intente cambiar el filtro de stock o la búsqueda.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isOutOfStock = product.stock === 0;
                  const isCriticalStock = product.stock > 0 && product.stock <= 3;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-noir-950/60 transition-colors group"
                    >
                      {/* Producto & Imagen */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-noir-950 border border-white/10 overflow-hidden shrink-0">
                            <Image
                              src={product.imageUrl}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                            {isOutOfStock && (
                              <div className="absolute inset-0 bg-noir-950/80 flex items-center justify-center">
                                <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">
                                  Agotado
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-sand-50 group-hover:text-gold-300 transition-colors">
                              {product.title}
                            </h4>
                            <span className="text-[11px] text-sand-400 block">
                              {product.volume || "100ml"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Categoría & Marca */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-sand-200 block">
                          {product.brand}
                        </span>
                        <span className="text-[10px] uppercase text-sand-400 tracking-wider">
                          {product.category.replace(/-/g, " ")}
                        </span>
                      </td>

                      {/* Precio Frasco */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gold-300 text-sm">
                          ${product.price.toLocaleString()} UYU
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-sand-500 line-through block">
                            ${product.originalPrice.toLocaleString()} UYU
                          </span>
                        )}
                      </td>

                      {/* CONTROL DE STOCK (REQUERIMIENTO CLAVE) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStock(product.id, product.stock - 1)}
                            className="p-1 rounded-lg bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-red-400 transition-colors"
                            title="Quitar 1 de stock"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </button>

                          <input
                            type="number"
                            min="0"
                            value={product.stock}
                            onChange={(e) =>
                              updateStock(product.id, parseInt(e.target.value) || 0)
                            }
                            className={`w-14 text-center font-bold text-xs py-1 rounded-lg bg-noir-950 border ${
                              isOutOfStock
                                ? "border-red-500/60 text-red-400 bg-red-950/20"
                                : isCriticalStock
                                ? "border-amber-500/60 text-amber-300 bg-amber-950/20"
                                : "border-gold-500/40 text-sand-50"
                            } focus:outline-none focus:border-gold-400`}
                          />

                          <button
                            onClick={() => updateStock(product.id, product.stock + 1)}
                            className="p-1 rounded-lg bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-emerald-400 transition-colors"
                            title="Agregar 1 de stock"
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] text-sand-400 block mt-1">
                          {isOutOfStock ? (
                            <span className="text-red-400 font-semibold">❌ Sin stock</span>
                          ) : isCriticalStock ? (
                            <span className="text-amber-400 font-semibold">⚠️ Stock crítico</span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">✓ Disponible</span>
                          )}
                        </span>
                      </td>

                      {/* DISPONIBILIDAD PARA DECANT (REQUERIMIENTO CLAVE) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={product.availableForDecant}
                              onChange={(e) =>
                                toggleDecant(product.id, e.target.checked)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-noir-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold-500" />
                          </label>

                          {product.availableForDecant ? (
                            <div>
                              <span className="text-[11px] font-bold text-cyan-300 block flex items-center gap-1">
                                <Droplets className="w-3 h-3 text-cyan-400" />
                                Habilitado
                              </span>
                              <span className="text-[10px] text-sand-400">
                                ${product.decantPrice?.toLocaleString() || Math.round(product.price * 0.22)} UYU
                              </span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-sand-500 italic">
                              No disponible
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Acciones Editar y Eliminar */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors"
                            title="Editar Perfume"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-red-500/50 text-sand-400 hover:text-red-400 transition-colors"
                            title="Eliminar Perfume"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar / Editar Producto */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
      />
    </div>
  );
}
