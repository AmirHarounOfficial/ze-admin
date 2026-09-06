import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Shield, AlertCircle, RefreshCw, CheckCircle2, ChevronLeft, Globe } from "lucide-react";
import { C, _lang, setLang, applyTheme } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";

export function TwoFactorPage({
  email: initialEmail,
  onSuccess,
  onBack,
}: {
  email?: string;
  onSuccess?: () => void;
  onBack?: () => void;
} = {}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLangState] = useState<"en" | "ar">(_lang);
  const email = initialEmail || searchParams.get("email") || "admin@zetime.io";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  function handleSwitchLang(newLang: "en" | "ar") {
    if (lang === newLang) return;
    setLang(newLang);
    applyTheme();
    setLangState(newLang);
  }
  // TOTP: 30-second window, show progress
  const [totp, setTotp] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return 30 - (now % 30);
  });
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  // Tick the TOTP countdown every second, reset digits when window rolls over
  useEffect(() => {
    const t = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = 30 - (now % 30);
      setTotp(remaining);
      if (remaining === 30) {
        setDigits(["", "", "", "", "", ""]);
        setError("");
        inputRefs.current[0]?.focus();
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  function handleDigit(i: number, val: string) {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError("");
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = ["", "", "", "", "", ""];
    pasted.forEach((ch, idx) => { next[idx] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function handleVerify() {
    const code = digits.join("");
    if (code.length < 6) { setError("Enter all 6 digits from your authenticator app."); return; }
    if (totp <= 2) { setError("Code is about to expire — wait for the next code."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem("zetime_auth", "true");
      } catch {}
      if (onSuccess) onSuccess();
      else navigate("/overview", { replace: true });
    }, 1100);
  }

  function handleRecoveryVerify() {
    if (recoveryCode.trim().length < 8) { setError("Enter a valid recovery code."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem("zetime_auth", "true");
      } catch {}
      if (onSuccess) onSuccess();
      else navigate("/overview", { replace: true });
    }, 1100);
  }

  const allFilled = digits.every(d => d !== "");
  const totpPct = (totp / 30) * 100;
  const totpUrgent = totp <= 7;
  // SVG ring
  const r = 16, circ = 2 * Math.PI * r;
  const dash = (totpPct / 100) * circ;

  return (
    <div
      key={lang}
      className="min-h-screen flex relative"
      style={{
        background: C.bg,
        direction: lang === "ar" ? "rtl" : "ltr",
        fontFamily: lang === "ar" ? "'Alexandria', 'Inter', sans-serif" : "'Satoshi', 'Inter', sans-serif",
      }}
    >
      {/* Top language switch */}
      <div className="absolute top-5 end-6 z-20 flex items-center gap-2">
        <div
          className="flex items-center p-1 rounded-xl border shadow-sm"
          style={{ borderColor: C.border, background: C.card }}
        >
          <button
            type="button"
            onClick={() => handleSwitchLang("en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: lang === "en" ? C.sidebar : "transparent",
              color: lang === "en" ? "#fff" : C.textSecondary,
            }}
          >
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchLang("ar")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: lang === "ar" ? C.gold : "transparent",
              color: lang === "ar" ? "#fff" : C.textSecondary,
            }}
          >
            <Globe size={13} />
            <span>العربية</span>
          </button>
        </div>
      </div>

      {/* Narrow brand strip — mirrors login */}
      <div className="hidden lg:flex flex-col w-[480px] shrink-0 relative overflow-hidden"
        style={{ background: C.sidebar }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(${C.sidebarLabel} 1px, transparent 1px), linear-gradient(90deg, ${C.sidebarLabel} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="relative z-10 flex flex-col h-full p-10">
          <div className="flex items-center gap-3">
            <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold" style={{ color: "#fff" }}>{t("Ze")}<span style={{ color: C.gold }}>{t("Time")}</span></span>
          </div>
          <div className="mt-auto mb-auto space-y-6">
            <div className="text-3xl font-bold leading-snug" style={{ color: "#fff" }}>{t("Secure by")}<br /><span style={{ color: C.gold }}>{t("design.")}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.sidebarText }}>{t("ZeTime Admin uses time-based one-time passwords (TOTP) via Google Authenticator to ensure only authorised operators access the platform.")}</p>
            {/* How it works steps */}
            <div className="space-y-3 mt-4">
              {[
                { n: "1", text: "Open Google Authenticator on your device." },
                { n: "2", text: "Find the ZeTime Admin entry." },
                { n: "3", text: "Enter the 6-digit code before it expires." },
              ].map(s => (
                <div key={s.n} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ background: C.gold, color: "#fff" }}>{s.n}</div>
                  <p className="text-sm leading-snug" style={{ color: C.sidebarText }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
            <Shield size={14} style={{ color: C.gold }} className="shrink-0" />
            <p className="text-xs" style={{ color: C.sidebarText }}>{t("Codes rotate every 30 seconds and are never reused.")}</p>
          </div>
        </div>
      </div>

      {/* Main 2FA panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={`w-full max-w-sm transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold" style={{ color: C.textPrimary }}>{t("Ze")}<span style={{ color: C.gold }}>{t("Time")}</span></span>
          </div>

          {!showRecovery ? (
            <>
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-4">
                  {/* Google Authenticator icon replica */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #4285F4 0%, #34A853 50%, #EA4335 100%)" }}>
                    <Shield size={20} color="#fff" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold leading-tight" style={{ color: C.textPrimary }}>{t("Authenticator Verification")}</h1>
                    <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>Google Authenticator · TOTP</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: C.textSecondary }}>{t("Open")}<span className="font-semibold" style={{ color: C.textPrimary }}>{t("Google Authenticator")}</span>{t("and enter the 6-digit code for")}<span className="font-semibold" style={{ color: C.textPrimary }}>{t("ZeTime Admin")}</span>.
                </p>
              </div>

              {/* TOTP countdown ring */}
              <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl"
                style={{ background: totpUrgent ? C.redLight : C.goldLight, border: `1px solid ${totpUrgent ? C.red + "30" : C.gold + "40"}` }}>
                <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0 -rotate-90">
                  <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3"
                    stroke={totpUrgent ? C.red + "28" : C.gold + "28"} />
                  <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3"
                    stroke={totpUrgent ? C.red : C.gold}
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.9s linear" }} />
                  <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
                    className="rotate-90" style={{ fontSize: 11, fontWeight: 700, fill: totpUrgent ? C.red : C.gold, transform: "rotate(90deg)", transformOrigin: "20px 20px" }}>
                    {totp}s
                  </text>
                </svg>
                <div>
                  <p className="text-xs font-semibold" style={{ color: totpUrgent ? C.red : C.orange }}>
                    {totpUrgent ? "Code expiring soon!" : "Code valid for"}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
                    {totpUrgent ? "Wait for the next 6-digit code." : `${totp} seconds — enter it now.`}
                  </p>
                </div>
              </div>

              {/* 6-digit boxes */}
              <div className="flex gap-2 justify-center mb-5">
                {digits.map((d, i) => (
                  <input key={i}
                    ref={el => { inputRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1}
                    value={d}
                    onChange={e => handleDigit(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className="text-center text-xl font-bold rounded-xl border outline-none transition-all"
                    style={{
                      width: 46, height: 54,
                      borderColor: error ? C.red : d ? C.gold : C.border,
                      background: error ? C.redLight : d ? C.goldLight : C.card,
                      color: C.textPrimary,
                      boxShadow: d && !error ? `0 0 0 3px ${C.gold}18` : "none",
                    }}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg mb-4"
                  style={{ background: C.redLight, color: C.red }}>
                  <AlertCircle size={13} className="shrink-0" /> {error}
                </div>
              )}

              <button onClick={handleVerify} disabled={loading || !allFilled || totpUrgent}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mb-4"
                style={{
                  background: allFilled && !loading && !totpUrgent ? C.gold : C.border,
                  color: allFilled && !loading && !totpUrgent ? "#fff" : C.textMuted,
                  boxShadow: allFilled && !loading && !totpUrgent ? `0 4px 14px ${C.gold}44` : "none",
                  cursor: allFilled && !loading && !totpUrgent ? "pointer" : "not-allowed",
                }}>
                {loading
                  ? <><RefreshCw size={14} className="animate-spin" /> Verifying…</>
                  : <><CheckCircle2 size={14} /> Verify & Sign In</>}
              </button>

              {/* Recovery code link */}
              <div className="text-center mb-6">
                <button onClick={() => { setShowRecovery(true); setError(""); }}
                  className="text-xs" style={{ color: C.textMuted }}>
                  Lost access to your authenticator?{" "}
                  <span className="font-semibold" style={{ color: C.gold }}>{t("Use a recovery code")}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Recovery code flow */}
              <div className="mb-7">
                <button onClick={() => { setShowRecovery(false); setError(""); }}
                  className="flex items-center gap-1 text-xs mb-5" style={{ color: C.textMuted }}>
                  <ChevronLeft size={14} />{t("Back to authenticator")}</button>
                <h1 className="text-xl font-bold mb-1" style={{ color: C.textPrimary }}>{t("Recovery Code")}</h1>
                <p className="text-sm" style={{ color: C.textSecondary }}>{t("Enter one of the one-time recovery codes you saved when you set up 2FA.")}</p>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Recovery Code")}</label>
                <input
                  type="text"
                  value={recoveryCode}
                  onChange={e => { setRecoveryCode(e.target.value.toUpperCase()); setError(""); }}
                  placeholder={t("XXXX-XXXX-XXXX")}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-mono outline-none"
                  style={{ borderColor: error ? C.red : C.border, background: C.bg, color: C.textPrimary }}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg mb-4"
                  style={{ background: C.redLight, color: C.red }}>
                  <AlertCircle size={13} className="shrink-0" /> {error}
                </div>
              )}

              <button onClick={handleRecoveryVerify} disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mb-4"
                style={{ background: C.gold, color: "#fff", boxShadow: `0 4px 14px ${C.gold}44` }}>
                {loading
                  ? <><RefreshCw size={14} className="animate-spin" /> Verifying…</>
                  : <><CheckCircle2 size={14} />{t("Verify with Recovery Code")}</>}
              </button>

              <div className="px-4 py-3 rounded-xl text-xs" style={{ background: C.orangeLight, color: C.orange }}>{t("Each recovery code can only be used once. After signing in, re-enrol your authenticator in Security Settings.")}</div>
            </>
          )}

          {/* Back to login */}
          <div className="text-center">
            <button onClick={() => { if (onBack) onBack(); else navigate("/login"); }} className="flex items-center gap-1.5 text-xs mx-auto" style={{ color: C.textMuted }}>
              <ChevronLeft size={14} />{t("Back to sign in")}</button>
          </div>

          <p className="text-center text-xs mt-8" style={{ color: C.textMuted }}>
            ZeTime Platform · Admin Console v4.1.0
          </p>
        </div>
      </div>
    </div>
  );
}
