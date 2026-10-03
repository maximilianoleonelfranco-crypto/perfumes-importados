"use client";

import React, { useState } from "react";
import { getNoteVisual } from "@/utils/notesEmoji";

interface NoteBadgeProps {
  note: string;
  size?: "sm" | "md" | "lg";
  alwaysShowEmoji?: boolean;
}

export default function NoteBadge({
  note,
  size = "sm",
  alwaysShowEmoji = false,
}: NoteBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const visual = getNoteVisual(note);

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-xs px-3 py-1.5",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsHovered(!isHovered);
      }}
    >
      {/* Botón / Pastilla de la Nota */}
      <span
        className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-noir-900/90 hover:bg-gold-500/20 text-sand-200 border border-gold-500/25 hover:border-gold-500/70 rounded-md transition-all duration-300 cursor-pointer select-none font-montserrat shadow-sm`}
      >
        {/* En móvil o si está activado, muestra el emoji siempre sutilmente */}
        <span className={`text-xs transition-transform duration-300 ${isHovered ? "scale-125" : ""}`}>
          {visual.emoji}
        </span>
        <span className="font-light">{note}</span>
      </span>

      {/* Tooltip flotante de lujo revelado al pasar el mouse (o tocar en móvil) */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none animate-fade-in">
          <div className="px-2.5 py-1.5 bg-noir-950/95 border border-gold-500/60 text-sand-50 rounded-lg shadow-gold-glow flex items-center gap-2 whitespace-nowrap backdrop-blur-md">
            <span className="text-base animate-subtle-pulse">{visual.emoji}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-semibold text-gold-300 leading-none">
                {note}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-sand-400 mt-0.5">
                Acorde {visual.category}
              </span>
            </div>
          </div>
          {/* Triángulo indicador del tooltip */}
          <div className="w-2 h-2 bg-noir-950 border-r border-b border-gold-500/60 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
}
