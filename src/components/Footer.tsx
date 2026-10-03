"use client";

import React from "react";
import { contactInfo } from "@/data/products";
import { Phone, Mail, MapPin, ShieldCheck, Truck, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="w-full bg-noir-950 border-t border-gold-500/20 text-sand-300 font-montserrat">
      {/* Sección Superior: Compromiso de Excelencia para Uruguay */}
      <div className="border-b border-white/5 py-10 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
              <Truck className="w-6 h-6 stroke-[1.2]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-semibold text-sand-50 tracking-wider">
                Envíos a Todo el País
              </h4>
              <p className="text-xs text-sand-400 mt-0.5">
                De forma rápida y efectiva a los 19 departamentos de Uruguay.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[1.2]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-semibold text-sand-50 tracking-wider">
                100% Originales
              </h4>
              <p className="text-xs text-sand-400 mt-0.5">
                Importadores directos sin intermediarios. Lotes verificados de origen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
              <HeartHandshake className="w-6 h-6 stroke-[1.2]" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-semibold text-sand-50 tracking-wider">
                Atención Personalizada
              </h4>
              <p className="text-xs text-sand-400 mt-0.5">
                Asesoramiento sommelier por WhatsApp para elegir su fragancia ideal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal Simétrico (3 Columnas Limpias y Equilibradas - Newsletter Eliminado) */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Columna 1: Identidad & Filosofía */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-ultra text-gold-500 uppercase font-medium mb-1">
              Montevideo &bull; Uruguay
            </span>
            <h3 className="font-cinzel text-2xl font-bold tracking-widest text-sand-100 mb-2">
              PERFUMES IMPORTTADOS
            </h3>
            <p className="text-sm italic text-gold-400 font-playfair mb-4">
              &ldquo;Lujos y Exclusividad&rdquo;
            </p>
            <p className="text-xs leading-relaxed text-sand-400 font-light">
              Importadores directos en Uruguay de la más selecta perfumería árabe y de diseñador. 
              Catálogo en continua rotación con los lanzamientos más codiciados del mercado internacional, 
              garantizando siempre productos 100% auténticos y atención personalizada.
            </p>
          </div>

          {/* Columna 2: Concierge & Contacto */}
          <div className="flex flex-col">
            <h4 className="font-cinzel text-sm font-semibold text-sand-100 tracking-widest uppercase mb-6 pb-2 border-b border-white/10">
              Atención & Pedidos
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-500 mb-0.5">
                    WhatsApp & Asesoría Directa
                  </span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sand-200 hover:text-gold-300 transition-colors tracking-wide text-sm font-medium"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-500 mb-0.5">
                    Correo Electrónico
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sand-200 hover:text-gold-300 transition-colors tracking-wide break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-500 mb-0.5">
                    Ubicación & Cobertura
                  </span>
                  <p className="text-sand-300 leading-snug">
                    {contactInfo.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 3: Colecciones & Garantías */}
          <div className="flex flex-col">
            <h4 className="font-cinzel text-sm font-semibold text-sand-100 tracking-widest uppercase mb-6 pb-2 border-b border-white/10">
              Colecciones & Servicios
            </h4>
            <ul className="space-y-3 text-xs text-sand-400">
              <li>
                <a href="#catalogo-disenador" className="hover:text-gold-300 transition-colors inline-block py-0.5">
                  &bull; Perfumes de Diseñador Importados
                </a>
              </li>
              <li>
                <a href="#catalogo-arabes" className="hover:text-gold-300 transition-colors inline-block py-0.5">
                  &bull; Perfumería Árabe (Lattafa, Afnan, Al Haramain)
                </a>
              </li>
              <li>
                <a href="#pilares-olfativos" className="hover:text-gold-300 transition-colors inline-block py-0.5">
                  &bull; Guía de Familias Olfativas & Acordes
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-gold-300 transition-colors inline-block py-0.5">
                  &bull; Envíos Seguros a los 19 Departamentos
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-gold-300 transition-colors inline-block py-0.5">
                  &bull; Garantía 100% Autenticidad en Cada Frasco
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra Inferior de Copyright */}
      <div className="border-t border-white/5 py-6 px-6 md:px-8 bg-noir-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-sand-500">
          <div>
            &copy; {new Date().getFullYear()} PERFUMES IMPORTTADOS &bull; Lujos y Exclusividad. Todos los derechos reservados.
          </div>

          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider text-sand-400">
            <span>Envíos a todo Uruguay</span>
            <span>100% Originales</span>
            <span>Atención Personalizada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
