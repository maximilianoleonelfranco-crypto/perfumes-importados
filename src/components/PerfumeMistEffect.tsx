"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface PerfumeMistEffectProps {
  isHovered: boolean;
  onManualSpray?: () => void;
}

export default function PerfumeMistEffect({
  isHovered,
  onManualSpray,
}: PerfumeMistEffectProps) {
  const [sprayActive, setSprayActive] = useState(false);
  const [sprayKey, setSprayKey] = useState(0);

  // Al pasar el mouse en desktop
  useEffect(() => {
    if (isHovered) {
      setSprayActive(true);
      setSprayKey((prev) => prev + 1);
      const timer = setTimeout(() => {
        setSprayActive(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const triggerMobileSpray = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSprayActive(true);
    setSprayKey((prev) => prev + 1);
    if (onManualSpray) onManualSpray();
    setTimeout(() => {
      setSprayActive(false);
    }, 1500);
  };

  // 26 gotas y salpicaduras líquidas disparadas de IZQUIERDA A DERECHA
  const droplets = [
    // Flujo central denso y rápido
    { tx: "170px", ty: "-12px", delay: "0.01s", size: "4.5px", glow: true },
    { tx: "195px", ty: "4px", delay: "0.03s", size: "5px", glow: true },
    { tx: "220px", ty: "-6px", delay: "0.02s", size: "4px", glow: true },
    { tx: "150px", ty: "14px", delay: "0.05s", size: "5.5px", glow: true },
    { tx: "185px", ty: "-24px", delay: "0.04s", size: "4px", glow: true },
    // Salpicaduras medianas en abanico hacia la derecha
    { tx: "135px", ty: "-35px", delay: "0.06s", size: "3.5px", glow: false },
    { tx: "160px", ty: "28px", delay: "0.07s", size: "4.5px", glow: true },
    { tx: "120px", ty: "42px", delay: "0.09s", size: "3.5px", glow: false },
    { tx: "140px", ty: "-18px", delay: "0.02s", size: "3px", glow: false },
    { tx: "210px", ty: "18px", delay: "0.05s", size: "3.5px", glow: true },
    { tx: "175px", ty: "-42px", delay: "0.08s", size: "3px", glow: false },
    { tx: "190px", ty: "36px", delay: "0.10s", size: "3px", glow: false },
    // Microgotas vaporizadas suspendidas
    { tx: "95px", ty: "-22px", delay: "0.02s", size: "2.5px", glow: false },
    { tx: "110px", ty: "8px", delay: "0.04s", size: "3px", glow: false },
    { tx: "80px", ty: "26px", delay: "0.05s", size: "2px", glow: false },
    { tx: "130px", ty: "-8px", delay: "0.03s", size: "3.5px", glow: true },
    { tx: "155px", ty: "2px", delay: "0.01s", size: "4px", glow: true },
    { tx: "235px", ty: "-16px", delay: "0.06s", size: "3px", glow: true },
    { tx: "165px", ty: "-30px", delay: "0.07s", size: "2.5px", glow: false },
    { tx: "105px", ty: "38px", delay: "0.08s", size: "2.5px", glow: false },
    { tx: "145px", ty: "22px", delay: "0.03s", size: "3px", glow: false },
    { tx: "205px", ty: "-2px", delay: "0.04s", size: "4px", glow: true },
    { tx: "180px", ty: "10px", delay: "0.05s", size: "3px", glow: false },
    { tx: "125px", ty: "-28px", delay: "0.06s", size: "2px", glow: false },
    { tx: "215px", ty: "-28px", delay: "0.08s", size: "3px", glow: false },
    { tx: "240px", ty: "8px", delay: "0.09s", size: "2.5px", glow: true },
  ];

  return (
    <>
      {/* Botón sutil en móvil para activar la atomización al tacto */}
      <button
        onClick={triggerMobileSpray}
        className="md:hidden absolute top-3 right-3 z-30 px-2.5 py-1 bg-noir-950/85 border border-gold-500/50 rounded-full text-[10px] text-gold-300 font-semibold flex items-center gap-1.5 backdrop-blur-md active:scale-90 transition-transform shadow-gold-glow"
        aria-label="Atomizar perfume"
      >
        <Sparkles className="w-3 h-3 text-gold-400" />
        <span>Vaporizar</span>
      </button>

      {/* Capa de Vaporización y Gran Nube de Perfume de Izquierda a Derecha */}
      {sprayActive && (
        <div
          key={sprayKey}
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        >
          {/* Boquilla de Salida / Dispersor en la Izquierda */}
          <div className="absolute top-[26%] left-[12%]">
            {/* 1. CHORRO CENTRAL DE ALTA PRESIÓN (Velo Líquido Cónico hacia la Derecha) */}
            <div
              className="absolute -top-6 left-0 w-44 h-16 pointer-events-none animate-liquid-jet"
              style={
                {
                  "--angle": "4deg",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(245,225,160,0.85) 25%, rgba(212,175,55,0.6) 60%, transparent 100%)",
                  clipPath: "polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)",
                  filter: "blur(1.5px)",
                } as React.CSSProperties
              }
            />

            {/* 2. GRAN NUBE DE PERFUME VOLUPTUOSA (Capa Principal - Bruma Blanca y Áurea) */}
            <div
              className="absolute -top-16 -left-4 w-60 h-44 rounded-full animate-dense-mist pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 25% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(250, 230, 160, 0.65) 30%, rgba(212, 175, 55, 0.4) 55%, transparent 78%)",
                filter: "blur(3px)",
              }}
            />

            {/* 3. SEGUNDA NUBE DE MIST DENSO (Mayor Volumen hacia la Derecha) */}
            <div
              className="absolute -top-20 left-6 w-64 h-52 rounded-full animate-dense-mist pointer-events-none"
              style={{
                animationDelay: "0.08s",
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(255, 245, 210, 0.7) 0%, rgba(220, 185, 90, 0.45) 40%, transparent 75%)",
                filter: "blur(5px)",
              }}
            />

            {/* 4. TERCERA CAPA DE VAPOR ETÉREO (Estela de Expansión) */}
            <div
              className="absolute -top-12 left-16 w-52 h-36 rounded-full animate-dense-mist pointer-events-none"
              style={{
                animationDelay: "0.14s",
                background:
                  "radial-gradient(ellipse at 40% 50%, rgba(255, 255, 255, 0.5) 0%, rgba(212, 175, 55, 0.25) 50%, transparent 80%)",
                filter: "blur(7px)",
              }}
            />

            {/* 5. AURA CÓNICA OLFATIVA EN EXPANSIÓN */}
            <div className="absolute -top-10 -left-6 w-32 h-32 rounded-full border-2 border-gold-300/40 animate-scent-cone" />
            <div
              className="absolute -top-10 -left-6 w-32 h-32 rounded-full border border-white/50 animate-scent-cone"
              style={{ animationDelay: "0.1s" }}
            />

            {/* 6. SALPICADA LÍQUIDA Y GOTAS BRILLANTES DISPARADAS HACIA LA DERECHA */}
            {droplets.map((d, i) => (
              <span
                key={i}
                className="absolute top-0 left-0 rounded-full"
                style={
                  {
                    width: d.size,
                    height: d.size,
                    background: d.glow
                      ? "radial-gradient(circle at 30% 30%, #ffffff 0%, #fcedbd 45%, #d4af37 100%)"
                      : "radial-gradient(circle at 30% 30%, #ffffff 0%, #eed592 100%)",
                    boxShadow: d.glow
                      ? "0 0 5px rgba(255,255,255,0.9), 0 0 10px rgba(212,175,55,0.7)"
                      : "0 0 3px rgba(255,255,255,0.6)",
                    animation: `liquidSplashDrop 1.25s cubic-bezier(0.12, 0.85, 0.25, 1) forwards`,
                    animationDelay: d.delay,
                    "--tx": d.tx,
                    "--ty": d.ty,
                  } as React.CSSProperties
                }
              />
            ))}

            {/* 7. DESTELLO DE PRESIÓN EN LA BOQUILLA (Flash inicial) */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-white shadow-gold-glow animate-ping opacity-90" />
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-r from-white to-gold-300 blur-[1px]" />
          </div>

          {/* Feedback momentáneo en móvil */}
          <div className="md:hidden absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-noir-950/95 border border-gold-500/60 rounded-full text-[10px] text-gold-300 font-semibold tracking-wider animate-fade-in shadow-gold-glow">
            💨 Salpicada de Fragancia
          </div>
        </div>
      )}
    </>
  );
}
