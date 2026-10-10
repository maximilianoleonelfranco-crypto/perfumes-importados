"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStore, Review } from "@/context/StoreContext";
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
  Eye,
  Maximize2,
  Phone,
} from "lucide-react";

export default function ReviewsTab() {
  const { reviews, addReview, updateReview, deleteReview } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Estados del Formulario
  const [name, setName] = useState("");
  const [city, setCity] = useState("Montevideo");
  const [rating, setRating] = useState(5);
  const [purchasedItem, setPurchasedItem] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("Hace unos días");
  const [imageUrl, setImageUrl] = useState("");
  const [isWhatsAppScreenshot, setIsWhatsAppScreenshot] = useState(true);

  // Modal para ver imagen en tamaño completo (Lightbox)
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bloquear scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen || previewImage) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isModalOpen, previewImage]);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setName("");
    setCity("Montevideo");
    setRating(5);
    setPurchasedItem("");
    setComment("");
    setDate("Hace 1 día");
    setImageUrl("");
    setIsWhatsAppScreenshot(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (review: Review) => {
    setEditingReview(review);
    setName(review.name);
    setCity(review.city);
    setRating(review.rating);
    setPurchasedItem(review.purchasedItem);
    setComment(review.comment);
    setDate(review.date);
    setImageUrl(review.imageUrl || "");
    setIsWhatsAppScreenshot(review.isWhatsAppScreenshot ?? false);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    if (editingReview) {
      updateReview(editingReview.id, {
        name,
        city,
        rating,
        purchasedItem,
        comment,
        date,
        imageUrl: imageUrl || undefined,
        isWhatsAppScreenshot,
      });
    } else {
      addReview({
        name,
        city,
        rating,
        purchasedItem: purchasedItem || "Perfume Importado",
        comment,
        date,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        imageUrl: imageUrl || undefined,
        isWhatsAppScreenshot,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Eliminar la reseña de "${name}"?`)) {
      deleteReview(id);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const screenshotCount = reviews.filter((r) => r.imageUrl || r.isWhatsAppScreenshot).length;

  return (
    <div className="space-y-6 animate-fade-in text-sand-100">
      {/* 1. Métricas & Encabezado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-noir-900 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
              Total de Reseñas
            </span>
            <h4 className="text-2xl font-bold font-cinzel text-sand-50 mt-1">
              {reviews.length}
            </h4>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-noir-900 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
              Calificación Promedio
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h4 className="text-2xl font-bold font-cinzel text-gold-400">
                {averageRating}
              </h4>
              <div className="flex items-center text-gold-400">
                <Star className="w-4 h-4 fill-gold-400" />
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-noir-900 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
              Capturas de WhatsApp
            </span>
            <h4 className="text-2xl font-bold font-cinzel text-emerald-400 mt-1">
              {screenshotCount}
            </h4>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Phone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Barra de Acciones */}
      <div className="bg-noir-900 border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-cinzel text-lg font-bold text-sand-50">
            Reseñas & Testimonios de Clientes
          </h3>
          <p className="text-xs text-sand-400">
            Agregue, modifique o suba capturas de pantalla de WhatsApp para mostrar en la tienda online.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow flex items-center gap-2 transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Reseña / Captura</span>
        </button>
      </div>

      {/* 3. Cuadrícula de Reseñas */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-noir-900 border border-white/10 rounded-2xl">
          <MessageSquare className="w-12 h-12 text-sand-600 mx-auto mb-3" />
          <h4 className="font-cinzel text-lg text-sand-300">No hay reseñas registradas</h4>
          <p className="text-xs text-sand-500 mt-1 mb-4">
            Haga clic en el botón superior para agregar la primera reseña o captura de WhatsApp.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-noir-950 bg-gold-500 rounded-xl hover:bg-gold-400"
          >
            Agregar Reseña
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-noir-900 border border-white/10 hover:border-gold-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-md group relative overflow-hidden"
            >
              {/* Encabezado de la Tarjeta */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? "fill-gold-400 text-gold-400" : "text-sand-700"
                        }`}
                      />
                    ))}
                  </div>

                  {review.isWhatsAppScreenshot ? (
                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Phone className="w-3 h-3" /> WhatsApp
                    </span>
                  ) : review.imageUrl ? (
                    <span className="px-2 py-0.5 bg-gold-500/20 border border-gold-500/40 text-gold-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Con Foto
                    </span>
                  ) : null}
                </div>

                <p className="text-xs sm:text-sm text-sand-200 italic line-clamp-3 mb-3 leading-relaxed">
                  "{review.comment}"
                </p>

                {/* Si tiene captura de WhatsApp o imagen, mostrar miniatura con botón de zoom */}
                {review.imageUrl && (
                  <div
                    onClick={() => setPreviewImage(review.imageUrl!)}
                    className="relative aspect-video w-full mb-3 rounded-xl bg-noir-950 border border-white/10 overflow-hidden cursor-pointer group/img"
                  >
                    <img
                      src={review.imageUrl}
                      alt={`Captura ${review.name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-noir-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-gold-300 font-semibold backdrop-blur-[2px]">
                      <Maximize2 className="w-4 h-4" />
                      <span>Ver Captura Completa</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pie de la Tarjeta con datos y acciones */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-sand-50">{review.name}</h5>
                  <span className="text-[10px] text-gold-400/90 block">
                    {review.city} • {review.purchasedItem}
                  </span>
                  <span className="text-[9px] text-sand-500 block">{review.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(review)}
                    className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-gold-500/50 text-sand-300 hover:text-gold-300 transition-colors"
                    title="Editar Reseña"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id, review.name)}
                    className="p-2 rounded-xl bg-noir-950 border border-white/10 hover:border-red-500/50 text-sand-400 hover:text-red-400 transition-colors"
                    title="Eliminar Reseña"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. MODAL CENTRADO PARA AGREGAR / EDITAR RESEÑA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-noir-950/85 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-noir-900 border border-gold-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 animate-fade-in text-sand-100">
            {/* Header del modal */}
            <div className="p-5 sm:p-6 bg-noir-950 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-noir-900 flex items-center justify-center text-gold-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-sand-50">
                    {editingReview ? "Editar Reseña" : "Nueva Reseña de Cliente"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-sand-400">
                    Ingrese el testimonio y suba una captura de WhatsApp o foto si corresponde.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sand-400 hover:text-gold-300 p-1.5 transition-colors rounded-full bg-noir-900 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario con scroll interno */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto scrollbar-thin">
              {/* Fila 1: Nombre y Ciudad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                    Nombre del Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Valentina R."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                    Ciudad / Departamento
                  </label>
                  <input
                    type="text"
                    placeholder="ej. Montevideo, Punta del Este, Salto..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Fila 2: Perfume Comprado y Calificación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                    Fragancia / Producto Comprado
                  </label>
                  <input
                    type="text"
                    placeholder="ej. Khamrah Qahwa • Lattafa"
                    value={purchasedItem}
                    onChange={(e) => setPurchasedItem(e.target.value)}
                    className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                    Calificación de Estrellas
                  </label>
                  <div className="flex items-center gap-2 pt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? "fill-gold-400 text-gold-400"
                              : "text-sand-600 hover:text-gold-400/50"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gold-400 ml-2">
                      {rating} / 5 Estrellas
                    </span>
                  </div>
                </div>
              </div>

              {/* Fila 3: Comentario */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                  Comentario / Opinión del Cliente *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Escriba el testimonio o mensaje recibido del cliente..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-noir-950 border border-white/15 rounded-xl p-3.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-sand-300 mb-1 font-medium">
                  Fecha o Tiempo Transcurrido
                </label>
                <input
                  type="text"
                  placeholder="ej. Hace 2 días, Ayer, Hace 1 semana..."
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-noir-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-sand-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Fila 4: SUBIDA DE CAPTURA DE WHATSAPP O FOTO DESDE EL DISPOSITIVO */}
              <div className="p-4 bg-noir-950 border border-gold-500/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-sand-100">
                      Captura de WhatsApp o Foto del Cliente
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isWhatsAppScreenshot}
                      onChange={(e) => setIsWhatsAppScreenshot(e.target.checked)}
                      className="rounded border-gold-500/40 text-emerald-500 focus:ring-0"
                    />
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      Es Captura de WhatsApp
                    </span>
                  </label>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  {/* Vista Previa de la Captura */}
                  <div className="relative w-28 h-28 rounded-xl bg-noir-900 border border-white/15 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Vista previa de captura"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <ImageIcon className="w-6 h-6 text-sand-600 mx-auto mb-1" />
                        <span className="text-[9px] text-sand-600 block">Sin imagen</span>
                      </div>
                    )}
                  </div>

                  {/* Botón de Selección de Archivos del Dispositivo */}
                  <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-gradient-to-r from-emerald-600/30 via-emerald-500/20 to-noir-900 hover:from-emerald-600/50 border border-emerald-500/50 rounded-xl text-xs font-bold text-emerald-300 flex items-center justify-center sm:justify-start gap-2 transition-all active:scale-95 w-full sm:w-auto shadow-sm"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>Subir Captura o Foto desde mi Dispositivo</span>
                    </button>
                    <p className="text-[10px] text-sand-400">
                      Seleccione una captura de pantalla de la conversación de WhatsApp o foto enviada por el cliente.
                    </p>

                    {/* Campo opcional de URL */}
                    <input
                      type="text"
                      placeholder="O pegue una URL directa de imagen..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-noir-900 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-sand-300 focus:outline-none focus:border-gold-500/60"
                    />
                  </div>
                </div>
              </div>

              {/* Botones de Guardar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-sand-400 hover:text-sand-100 border border-white/10 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-noir-950 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-gold-500 rounded-xl shadow-gold-glow flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingReview ? "Guardar Cambios" : "Publicar Reseña"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL LIGHTBOX PARA VER CAPTURAS EN TAMAÑO COMPLETO */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-noir-900 rounded-2xl overflow-hidden border border-gold-500/40 p-2 shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-noir-950/80 border border-white/20 text-sand-200 hover:text-gold-300"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Captura ampliada"
              className="max-h-[82vh] w-auto mx-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
