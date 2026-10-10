"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35); // Volumen tenue y elegante por defecto
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;

    // Ocultar el tooltip de invitación después de 7 segundos
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [volume]);

  // Manejar reproducción / pausa
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((err) => {
          console.warn("Autoplay bloqueado por el navegador hasta interacción del usuario:", err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  return (
    <>
      {/* Elemento de audio en segundo plano - preload='none' para no ralentizar la carga inicial */}
      <audio ref={audioRef} src="/audio/luxury-ambient.mp3" preload="none" />

      {/* Reproductor Flotante de Lujo */}
      <aside aria-label="Música de ambiente" className="fixed bottom-6 left-6 z-40 select-none">
        <div className="relative flex items-center">
          {/* Tooltip de Bienvenida / Invitación */}
          {showTooltip && !isPlaying && (
            <div className="absolute bottom-full left-0 mb-3 pointer-events-none animate-fade-in">
              <div className="px-3 py-1.5 bg-noir-950/95 border border-gold-500/50 rounded-full shadow-gold-glow flex items-center gap-2 whitespace-nowrap backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span className="text-[11px] text-sand-200 font-montserrat">
                  Toque para activar la música de ambiente
                </span>
              </div>
              <div className="w-2 h-2 bg-noir-950 border-r border-b border-gold-500/50 rotate-45 ml-5 -mt-1" />
            </div>
          )}

          {/* Widget Principal */}
          <div
            onClick={togglePlay}
            className={`group flex items-center gap-3 p-2 pr-4 rounded-full transition-all duration-500 cursor-pointer backdrop-blur-md border ${
              isPlaying
                ? "bg-noir-950/90 border-gold-500/60 shadow-gold-glow"
                : "bg-noir-950/80 border-white/10 hover:border-gold-500/40 hover:bg-noir-900/90"
            }`}
          >
            {/* Botón Circular de Play / Pause */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-noir-950 shadow-gold-glow"
                  : "bg-noir-900 border border-gold-500/30 text-gold-400 group-hover:scale-105"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </div>

            {/* Ecualizador Gráfico Animado & Título */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-cinzel font-semibold tracking-wider text-sand-100 group-hover:text-gold-300 transition-colors">
                  {isPlaying ? "Música de Ambiente" : "Activar Sonido"}
                </span>

                {/* Barras de ecualizador animadas cuando reproduce */}
                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] bg-gold-400 rounded-full animate-[subtlePulse_0.6s_ease-in-out_infinite] h-3" />
                    <span className="w-[2px] bg-gold-400 rounded-full animate-[subtlePulse_0.8s_ease-in-out_infinite_0.2s] h-2" />
                    <span className="w-[2px] bg-gold-400 rounded-full animate-[subtlePulse_0.5s_ease-in-out_infinite_0.4s] h-3.5" />
                    <span className="w-[2px] bg-gold-400 rounded-full animate-[subtlePulse_0.7s_ease-in-out_infinite_0.1s] h-2.5" />
                  </div>
                )}
              </div>

              <span className="text-[9px] uppercase tracking-widest text-sand-500">
                {isPlaying ? "Oasis Oriental • Relajante" : "Experiencia Sensorial"}
              </span>
            </div>

            {/* Control de Mute / Volumen en Desktop */}
            {isPlaying && (
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10">
                <button
                  onClick={toggleMute}
                  className="p-1 text-sand-400 hover:text-gold-300 transition-colors"
                  aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gold-400" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-14 h-1 bg-noir-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  aria-label="Control de volumen"
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
