"use client";

import React, { useState, useEffect } from "react";
import { Product, useStore } from "@/context/StoreContext";
import { X, Plus, Sparkles, Check, Package, Droplets, Tag } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct?: Product | null;
}

export default function AddProductModal({
  isOpen,
  onClose,
  editingProduct,
}: AddProductModalProps) {
  const { addProduct, updateProduct, categories } = useStore();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">(3500);
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState<number | "">(10);
  const [category, setCategory] = useState<"perfumes-de-diseñador" | "perfumes-arabes">("perfumes-arabes");
  const [pillarCategory, setPillarCategory] = useState("Gourmand & Especiados");
  const [volume, setVolume] = useState("100ml");
  const [imageUrl, setImageUrl] = useState("/images/products/khamrah-lattafa.jpg");
  const [description, setDescription] = useState("");
  const [notesInput, setNotesInput] = useState("Vainilla, Canela, Ámbar, Oud");
  const [availableForDecant, setAvailableForDecant] = useState(true);
  const [decantPrice, setDecantPrice] = useState<number | "">(750);
  const [badge, setBadge] = useState("");

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setBrand(editingProduct.brand || "");
      setPrice(editingProduct.price);
      setOriginalPrice(editingProduct.originalPrice || "");
      setDiscount(editingProduct.discount || "");
      setStock(editingProduct.stock);
      setCategory(editingProduct.category);
      setPillarCategory(editingProduct.pillarCategory || "Gourmand & Especiados");
      setVolume(editingProduct.volume || "100ml");
      setImageUrl(editingProduct.imageUrl);
      setDescription(editingProduct.description || "");
      setNotesInput(editingProduct.notes.join(", "));
      setAvailableForDecant(editingProduct.availableForDecant);
      setDecantPrice(editingProduct.decantPrice || Math.round(editingProduct.price * 0.22));
      setBadge(editingProduct.badge || "");
    } else {
      // Formulario limpio
      setTitle("");
      setBrand("Lattafa");
      setPrice(2990);
      setOriginalPrice("");
      setDiscount("");
      setStock(12);
      setCategory("perfumes-arabes");
      setPillarCategory("Gourmand & Especiados");
      setVolume("100ml");
      setImageUrl("/images/products/khamrah-lattafa.jpg");
      setDescription("Extracto de autor de alta fijación y notas olfativas nobles.");
      setNotesInput("Vainilla, Canela, Ámbar, Oud");
      setAvailableForDecant(true);
      setDecantPrice(650);
      setBadge("");
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const notesArray = notesInput
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    const numericPrice = Number(price);
    const numericStock = Number(stock) || 0;
    const numericDecant = availableForDecant ? Number(decantPrice) || Math.round(numericPrice * 0.22) : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title,
        brand,
        price: numericPrice,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discount: discount || undefined,
        stock: numericStock,
        category,
        pillarCategory,
        volume,
        imageUrl: imageUrl || "/images/products/khamrah-lattafa.jpg",
        description,
        notes: notesArray,
        availableForDecant,
        decantPrice: numericDecant,
        badge: badge || undefined,
      });
    } else {
      addProduct({
        title,
        brand,
        price: numericPrice,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discount: discount || undefined,
        stock: numericStock,
        category,
        pillarCategory,
        volume,
        imageUrl: imageUrl || "/images/products/khamrah-lattafa.jpg",
        description,
        notes: notesArray,
        availableForDecant,
        decantPrice: numericDecant,
        badge: badge || undefined,
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-noir-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-noir-900 border border-gold-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 animate-fade-in text-sand-100">
        {/* Encabezado del Modal */}
        <div className="p-6 bg-noir-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-noir-900 flex items-center justify-center text-gold-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-sand-50">
                {editingProduct ? "Editar Perfume" : "Agregar Nuevo Perfume"}
              </h3>
              <p className="text-xs text-sand-400">
                Administre los datos del catálogo, stock y disponibilidad para decants.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-sand-400 hover:text-gold-300 p-1.5 transition-colors rounded-full bg-noir-900 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                ¡Perfume {editingProduct ? "actualizado" : "agregado"} con éxito!
              </span>
            </div>
          )}

          {/* Bloque 1: Información Básica */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Nombre del Perfume *
              </label>
              <input
                type="text"
                required
                placeholder="ej. Khamrah Imperial"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Marca / Casa *
              </label>
              <input
                type="text"
                required
                placeholder="ej. Lattafa, Montale, Afnan"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Bloque 2: Precios & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 font-bold">
                Precio ($ UYU) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="ej. 3500"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-noir-950 border border-gold-500/50 rounded-xl px-3.5 py-2.5 text-xs text-gold-300 font-bold focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-400 mb-1 font-medium">
                Precio Original ($)
              </label>
              <input
                type="number"
                min="0"
                placeholder="ej. 4200"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-400 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-400 mb-1 font-medium">
                Etiqueta Descuento
              </label>
              <input
                type="text"
                placeholder="ej. -15%"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-200 mb-1 font-bold">
                Stock (Unidades) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="ej. 10"
                value={stock}
                onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-noir-950 border border-gold-500/40 rounded-xl px-3.5 py-2.5 text-xs text-sand-50 font-bold focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          {/* Bloque 3: Categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Categoría Principal *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as "perfumes-de-diseñador" | "perfumes-arabes")}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Pilar Olfativo
              </label>
              <select
                value={pillarCategory}
                onChange={(e) => setPillarCategory(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="Oud & Amaderados">Oud & Amaderados</option>
                <option value="Ámbar & Orientales">Ámbar & Orientales</option>
                <option value="Florales Exóticos">Florales Exóticos</option>
                <option value="Gourmand & Especiados">Gourmand & Especiados</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                Volumen / Frasco
              </label>
              <input
                type="text"
                placeholder="ej. 100ml, 80ml (Tester)"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Bloque 4: DISPONIBILIDAD PARA DECANT (REQUERIMIENTO CLAVE) */}
          <div className="p-4 bg-noir-950 border border-gold-500/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-gold-400" />
                <div>
                  <span className="text-xs font-bold text-sand-50 block">
                    ¿Disponible para Decant / Muestra de 10ml?
                  </span>
                  <span className="text-[10px] text-sand-400">
                    Permite a los clientes comprar una muestra fraccionada antes del frasco completo.
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableForDecant}
                  onChange={(e) => setAvailableForDecant(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-noir-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500" />
              </label>
            </div>

            {availableForDecant && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                <label className="text-xs text-gold-300 font-semibold">
                  Precio de la Muestra Decant ($ UYU):
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="ej. 650"
                  value={decantPrice}
                  onChange={(e) => setDecantPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-36 bg-noir-900 border border-gold-500/50 rounded-lg px-3 py-1.5 text-xs text-gold-300 font-bold focus:outline-none focus:border-gold-400"
                />
              </div>
            )}
          </div>

          {/* Bloque 5: Notas Olfativas & Imagen */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
              Notas Olfativas (Separadas por comas)
            </label>
            <input
              type="text"
              placeholder="ej. Vainilla, Canela, Ámbar, Oud de Camboya"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
            />
            <span className="text-[10px] text-sand-400 block mt-1">
              Las notas contarán automáticamente con su emoji interactivo en la tienda.
            </span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
              Ruta o URL de Imagen
            </label>
            <input
              type="text"
              placeholder="ej. /images/products/khamrah-lattafa.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
              Descripción Corta
            </label>
            <textarea
              rows={3}
              placeholder="Descripción sensorial del perfume..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-noir-950 border border-white/15 rounded-xl p-3.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Acciones */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs uppercase tracking-wider text-sand-400 hover:text-sand-100 border border-white/10 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-noir-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 rounded-xl shadow-gold-glow flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingProduct ? "Guardar Cambios" : "Crear Perfume"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
