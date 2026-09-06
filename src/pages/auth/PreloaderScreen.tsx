import React, { useState, useEffect } from "react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";

export function PreloaderScreen({ onDone }: { onDone?: () => void } = {}) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const steps = [
      [200,  15], [500,  35], [900,  60], [1300, 80], [1700, 95], [2000, 100],
    ] as [number, number][];
    const timers = steps.map(([ms, val]) =>
      setTimeout(() => setProgress(val), ms)
    );
    const done = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (onDone) {
          onDone();
        } else if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
      }, 500);
    }, 2300);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ background: C.sidebar, opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(${C.sidebarLabel} 1px, transparent 1px), linear-gradient(90deg, ${C.sidebarLabel} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-3">
          <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-16 h-16 object-contain drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 24px #DB8C0066)" }} />
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight" style={{ color: "#fff", fontFamily: "'Inter', sans-serif" }}>{t("Ze")}<span style={{ color: C.gold }}>{t("Time")}</span>
            </div>
            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: C.sidebarText, letterSpacing: "0.2em" }}>{t("Admin Console")}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-56">
          <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "#ffffff18" }}>
            <div className="h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%`, background: C.gold }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: C.sidebarText }}>
              {progress < 40 ? t("Initializing platform…") : progress < 80 ? t("Loading modules…") : t("Almost ready…")}
            </span>
            <span className="text-xs font-mono" style={{ color: C.gold }}>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-6 text-xs" style={{ color: "#ffffff30" }}>
        ZeTime Platform v4.1.0 · Build 20250709
      </div>
    </div>
  );
}

