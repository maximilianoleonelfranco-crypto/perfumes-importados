"use client";

import React, { useState } from "react";
import { Category, useStore } from "@/context/StoreContext";
import { FolderTree, Plus, Edit2, Trash2, Check, X, Tag } from "lucide-react";

export default function CategoriesTab() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleStartCreate = () => {
    setName("");
    setSlug("");
    setDescription("");
    setIsCreating(true);
    setEditingId(null);
  };

  const handleStartEdit = (cat: Category) => {
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setEditingId(cat.id);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isCreating) {
      addCategory({ name, slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), description });
      setIsCreating(false);
    } else if (editingId) {
      updateCategory(editingId, { name, slug, description });
      setEditingId(null);
    }

    setName("");
    setSlug("");
    setDescription("");
  };

  const handleDelete = (id: string, name: string) => {
    const associatedProducts = products.filter((p) => p.category === categories.find(c => c.id === id)?.slug);
    if (associatedProducts.length > 0) {
      if (!confirm(`La categoría "${name}" tiene ${associatedProducts.length} perfumes asociados. ¿Desea eliminarla de todos modos?`)) {
        return;
      }
    } else {
      if (!confirm(`¿Desea eliminar la categoría "${name}"?`)) return;
    }
    deleteCategory(id);
  };

  return (
    <div className="space-y-6 animate-fade-in text-sand-100">
      {/* Encabezado y Acción Crear */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-noir-900 border border-white/10 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg font-bold text-sand-50">
              Gestión de Categorías
            </h2>
            <p className="text-xs text-sand-400">
              Organice y clasifique las colecciones de la perfumería.
            </p>
          </div>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Categoría</span>
          </button>
        )}
      </div>

      {/* Formulario de Crear / Editar Categoría */}
      {(isCreating || editingId) && (
        <form
          onSubmit={handleSave}
          className="p-6 bg-noir-900 border border-gold-500/40 rounded-2xl space-y-4 animate-fade-in shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-cinzel text-base font-bold text-gold-300">
              {isCreating ? "Agregar Nueva Categoría" : "Editar Categoría"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="text-sand-400 hover:text-sand-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-semibold">
                Nombre de la Categoría *
              </label>
              <input
                type="text"
                required
                placeholder="ej. Perfumes de Nicho"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (isCreating) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-400 mb-1 font-medium">
                Slug URL (Identificador)
              </label>
              <input
                type="text"
                placeholder="ej. perfumes-de-nicho"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-400 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
              Descripción Sensorial
            </label>
            <input
              type="text"
              placeholder="Breve reseña sobre los perfumes de esta categoría..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="px-4 py-2 text-xs uppercase tracking-wider text-sand-400 border border-white/10 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Categoría</span>
            </button>
          </div>
        </form>
      )}

      {/* Lista de Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="p-5 bg-noir-900 border border-white/10 hover:border-gold-500/40 rounded-2xl flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {count} Perfumes
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 rounded-lg bg-noir-950 border border-white/10 hover:border-gold-500 text-sand-300 hover:text-gold-300 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 rounded-lg bg-noir-950 border border-white/10 hover:border-red-500 text-sand-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-cinzel text-base font-bold text-sand-50 group-hover:text-gold-300 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-mono text-sand-500 block mt-0.5">
                  /categoria/{cat.slug}
                </span>

                {cat.description && (
                  <p className="text-xs text-sand-400 mt-2 line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
