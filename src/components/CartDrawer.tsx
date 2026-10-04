"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Check,
  Truck,
  Droplets,
  CreditCard,
  Building2,
  MessageCircle,
  MapPin,
  Tag,
  User,
  Phone,
  AlertCircle,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    formatPrice,
    clearCart,
  } = useCart();

  const { appliedCoupon, applyCouponCode, removeAppliedCoupon } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Forma de Pago: "mercadopago" (+10% de recargo) o "transferencia" (sin recargo)
  const [paymentMethod, setPaymentMethod] = useState<"mercadopago" | "transferencia">("mercadopago");

  // Método de Entrega: "envio" o "retiro"
  const [deliveryType, setDeliveryType] = useState<"envio" | "retiro">("envio");
  const [shippingZone, setShippingZone] = useState<"mvd" | "canelones_mld" | "interior">("mvd");

  // Datos del Cliente para Checkout
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Costo de envío según zona
  const shippingCosts = {
    mvd: 180,
    canelones_mld: 220,
    interior: 250,
  };

  const currentShippingCost = deliveryType === "retiro" ? 0 : shippingCosts[shippingZone];

  // Recargo automático del 10% por Mercado Pago (no descuento)
  const mercadoPagoSurcharge = paymentMethod === "mercadopago" ? Math.round(subtotal * 0.1) : 0;

  // Total Final con recargo si aplica
  const grandTotal = Math.max(0, subtotal - discountAmount + mercadoPagoSurcharge + currentShippingCost);

  useEffect(() => {
    if (isCartOpen) {
      const origOverflow = document.body.style.overflow;
      const origOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      return () => {
        document.body.style.overflow = origOverflow;
        document.body.style.overscrollBehavior = origOverscroll;
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  // Generar mensaje detallado para enviar directamente por WhatsApp al 097837529
  const handleSendToWhatsApp = () => {
    // Validación de campos del cliente
    if (!customerName.trim()) {
      setValidationError("Por favor ingresa tu nombre y apellido para el pedido.");
      return;
    }
    if (!customerPhone.trim()) {
      setValidationError("Por favor ingresa tu número de WhatsApp / teléfono de contacto.");
      return;
    }
    if (deliveryType === "envio" && !customerAddress.trim()) {
      setValidationError("Por favor ingresa tu dirección de entrega completa.");
      return;
    }

    setValidationError(null);

    const zoneLabel =
      shippingZone === "mvd"
        ? "Montevideo ($180 UYU)"
        : shippingZone === "canelones_mld"
        ? "Canelones / Maldonado ($220 UYU)"
        : "Interior del País DAC / Mirtrans ($250 UYU)";

    let text = `*🛍️ NUEVO PEDIDO - PERFUMES IMPORTADOS*\n`;
    text += `*Lujos y Exclusividad • Montevideo, Uruguay*\n`;
    text += `------------------------------------\n`;
    text += `👤 *DATOS DEL CLIENTE:*\n`;
    text += `• *Nombre:* ${customerName.trim()}\n`;
    text += `• *Teléfono:* ${customerPhone.trim()}\n`;
    text += `• *Modalidad de Entrega:* ${deliveryType === "retiro" ? "🏪 Retiro en Showroom / Pickup ($0 UYU)" : "🚗 Envío a Domicilio"}\n`;

    if (deliveryType === "envio") {
      text += `• *Dirección:* ${customerAddress.trim()}\n`;
      text += `• *Zona de Envío:* ${zoneLabel}\n`;
    } else {
      text += `• *Punto de Retiro:* Showroom Central (Coordinar horario de entrega)\n`;
    }

    if (customerNotes.trim()) {
      text += `• *Notas / Aclaraciones:* ${customerNotes.trim()}\n`;
    }

    text += `------------------------------------\n`;
    text += `📋 *DETALLE DE LA COMPRA:*\n`;

    cart.forEach((item, idx) => {
      const typeLabel = item.isDecant ? " (✨ Muestra Decant 10ml)" : " (Frasco Completo)";
      text += `${idx + 1}. *${item.product.title}* x${item.quantity}${typeLabel} - $${(item.itemPrice * item.quantity).toLocaleString()} UYU\n`;
    });

    text += `------------------------------------\n`;
    text += `💰 *RESUMEN DE PAGO:*\n`;
    text += `• *Subtotal Fragancias:* $${subtotal.toLocaleString()} UYU\n`;

    if (discountAmount > 0 && appliedCoupon) {
      text += `• 🎟️ *Cupón Aplicado (${appliedCoupon.code}):* -$${discountAmount.toLocaleString()} UYU\n`;
    }

    if (paymentMethod === "mercadopago") {
      text += `• 💳 *Recargo Mercado Pago (+10%):* +$${mercadoPagoSurcharge.toLocaleString()} UYU\n`;
    }

    if (deliveryType === "envio") {
      text += `• 🚗 *Costo de Envío:* $${currentShippingCost.toLocaleString()} UYU (${zoneLabel})\n`;
    } else {
      text += `• 🏪 *Retiro en Showroom:* $0 UYU (Gratis)\n`;
    }

    text += `\n🏷️ *TOTAL A PAGAR:* *$${grandTotal.toLocaleString()} UYU*\n\n`;
    text += `💳 *Forma de Pago:* ${
      paymentMethod === "mercadopago"
        ? "Mercado Pago (+10% de recargo incluido)"
        : "Efectivo / Transferencia BROU (Sin recargo)"
    }\n`;
    text += `------------------------------------\n`;
    text += `¡Hola! Acabo de registrar este pedido desde la tienda online. Aguardo confirmación para coordinar el pago y la entrega. ¡Muchas gracias!`;

    const encodedText = encodeURIComponent(text);
    // Número oficial uruguayo configurado: 097 837 529 -> +598 97 837 529
    const whatsappUrl = `https://wa.me/59897837529?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden overscroll-contain">
      {/* Fondo oscuro con desenfoque */}
      <div
        className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-noir-900 border-l border-gold-500/25 flex flex-col shadow-2xl relative animate-fade-in text-sand-100 h-full max-h-[100dvh]">
          {/* Cabecera del Carrito */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold-400 stroke-[1.5]" />
              <h2 className="font-cinzel text-lg font-semibold tracking-wider text-sand-100">
                Carrito de Compras
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-sand-400 hover:text-gold-400 p-1 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner de Envíos en Uruguay */}
          <div className="bg-noir-950 px-5 py-2.5 border-b border-white/5 flex items-center gap-2 text-xs text-gold-400 font-medium">
            <Truck className="w-4 h-4 text-gold-500 shrink-0" />
            <span>Envíos a todo Uruguay &bull; 100% Auténticos</span>
          </div>

          {/* Lista de Productos en la Cesta */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-sand-600 mx-auto mb-4 stroke-1" />
                <p className="font-cinzel text-sand-300 text-sm">
                  Tu carrito está vacío
                </p>
                <p className="text-sand-500 text-xs mt-1">
                  Explora nuestras colecciones y añade tu fragancia exclusiva.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-noir-800 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gold-500 hover:text-noir-950 transition-colors"
                >
                  Continuar Explorando
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.isDecant ? "decant" : "full"}`}
                  className="flex gap-4 p-3 bg-noir-950 border border-white/5 rounded-xl hover:border-gold-500/20 transition-colors"
                >
                  <div className="relative w-16 h-20 bg-noir-950 border border-white/10 shrink-0 overflow-hidden rounded-lg p-1">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-montserrat text-xs font-semibold text-sand-100 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.isDecant)}
                          className="text-sand-500 hover:text-red-400 transition-colors p-0.5"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-gold-400">
                          {formatPrice(item.itemPrice)}
                        </span>
                        {item.isDecant && (
                          <span className="px-1.5 py-0.5 bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-[9px] font-bold uppercase rounded flex items-center gap-1">
                            <Droplets className="w-2.5 h-2.5 text-cyan-400" />
                            Decant 10ml
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-white/15 bg-noir-950 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.isDecant)}
                          className="px-2 py-0.5 text-sand-400 hover:text-gold-400 text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-sand-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.isDecant)}
                          className="px-2 py-0.5 text-sand-400 hover:text-gold-400 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-sand-200">
                        Total: {formatPrice(item.itemPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pie de Checkout Avanzado: Datos de Cliente + Pago + Envío + WhatsApp */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-noir-950 space-y-4 max-h-[60dvh] overflow-y-auto overscroll-y-contain -webkit-overflow-scrolling-touch">
              {/* ALERTA DE VALIDACIÓN SI FALTA INFORMACIÓN */}
              {validationError && (
                <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* 1. DATOS DEL CLIENTE PARA EL PEDIDO */}
              <div className="space-y-2.5 p-3.5 bg-noir-900 border border-gold-500/25 rounded-2xl">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>Datos de Contacto & Entrega</span>
                </label>

                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre y Apellido *"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setValidationError(null);
                      }}
                      className="w-full bg-noir-950 border border-white/15 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-sand-100 placeholder-sand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono o WhatsApp de contacto *"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        setValidationError(null);
                      }}
                      className="w-full bg-noir-950 border border-white/15 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-sand-100 placeholder-sand-500 focus:outline-none"
                    />
                  </div>

                  {deliveryType === "envio" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Dirección completa (Calle, Nº de puerta, esq./apto) *"
                        value={customerAddress}
                        onChange={(e) => {
                          setCustomerAddress(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full bg-noir-950 border border-white/15 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-sand-100 placeholder-sand-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Notas adicionales (opcional)"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full bg-noir-950 border border-white/10 focus:border-gold-500/40 rounded-xl px-3 py-1.5 text-xs text-sand-300 placeholder-sand-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. SELECCIÓN DE FORMA DE PAGO (MERCADO PAGO CON 10% DE RECARGO) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center justify-between">
                  <span>Forma de Pago</span>
                  <span className="text-[10px] text-amber-400 font-semibold">⚡ Mercado Pago: +10% Recargo</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mercadopago")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      paymentMethod === "mercadopago"
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm"
                        : "bg-noir-900 border-white/10 text-sand-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mercado Pago</span>
                    </div>
                    <span className="text-[10px] text-amber-400 block font-semibold mt-0.5">
                      +10% Recargo
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transferencia")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      paymentMethod === "transferencia"
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-sm"
                        : "bg-noir-900 border-white/10 text-sand-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Efectivo / BROU</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">
                      Sin recargo
                    </span>
                  </button>
                </div>
              </div>

              {/* 3. SELECCIÓN DE ENVÍO O RETIRO */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-sand-300 block">
                  Método de Entrega / Envío
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("envio")}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      deliveryType === "envio"
                        ? "bg-gold-500/20 border-gold-500 text-gold-300"
                        : "bg-noir-900 border-white/10 text-sand-400"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Envío a Domicilio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("retiro")}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      deliveryType === "retiro"
                        ? "bg-gold-500/20 border-gold-500 text-gold-300"
                        : "bg-noir-900 border-white/10 text-sand-400"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Retiro en Showroom</span>
                  </button>
                </div>

                {deliveryType === "envio" && (
                  <select
                    value={shippingZone}
                    onChange={(e) =>
                      setShippingZone(e.target.value as "mvd" | "canelones_mld" | "interior")
                    }
                    className="w-full bg-noir-900 border border-white/15 rounded-xl p-2 text-xs text-sand-100 focus:outline-none focus:border-gold-500 cursor-pointer mt-1"
                  >
                    <option value="mvd">Montevideo ($180 UYU)</option>
                    <option value="canelones_mld">Canelones / Maldonado ($220 UYU)</option>
                    <option value="interior">Interior del País - DAC / Mirtrans ($250 UYU)</option>
                  </select>
                )}
              </div>

              {/* 4. ENTRADA DE CUPÓN DE DESCUENTO */}
              <div className="space-y-1.5 pt-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="CÓDIGO DE CUPÓN"
                    value={couponCodeInput}
                    onChange={(e) => {
                      setCouponCodeInput(e.target.value.toUpperCase());
                      setCouponFeedback(null);
                    }}
                    className="flex-1 bg-noir-900 border border-gold-500/30 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-gold-300 placeholder-sand-500 uppercase focus:outline-none focus:border-gold-400"
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={removeAppliedCoupon}
                      className="px-3 py-1.5 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold rounded-xl"
                    >
                      Quitar
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!couponCodeInput.trim()) return;
                        const res = applyCouponCode(couponCodeInput);
                        setCouponFeedback(res);
                      }}
                      className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-noir-950 font-bold text-xs uppercase rounded-xl"
                    >
                      Aplicar
                    </button>
                  )}
                </div>

                {couponFeedback && (
                  <p
                    className={`text-[11px] font-semibold ${
                      couponFeedback.success ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* DESGLOSE FINAL DE TOTALES EN $ UYU */}
              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-sand-400">
                  <span>Subtotal Fragancias:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Descuento Cupón:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                {paymentMethod === "mercadopago" && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Recargo Mercado Pago (+10%):</span>
                    <span>+{formatPrice(mercadoPagoSurcharge)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sand-400">
                  <span>Costo de Envío / Entrega:</span>
                  <span>{currentShippingCost === 0 ? "Gratis" : formatPrice(currentShippingCost)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-sand-100">
                    Total Final ($ UYU)
                  </span>
                  <span className="font-montserrat text-2xl font-bold text-gold-400">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* BOTÓN ENVIAR PEDIDO POR WHATSAPP AL 097 837 529 */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-noir-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:from-emerald-300 hover:to-emerald-500 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-noir-950 text-emerald-500" />
                <span>Enviar Pedido a WhatsApp ({formatPrice(grandTotal)})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-sand-400 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                <span>100% Originales &bull; Envíos a todo Uruguay</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
