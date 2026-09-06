import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Wrench, Pizza, Home, Car, Truck, Package, UtensilsCrossed, Eye, AlertCircle, RefreshCw, Shield, Globe
} from "lucide-react";
import { C, _lang, setLang, applyTheme } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";

export function LoginPage({
  onSuccess,
  onForgot,
}: {
  onSuccess?: (email: string) => void;
  onForgot?: (email: string) => void;
} = {}) {
  const navigate = useNavigate();
  const [lang, setLangState] = useState<"en" | "ar">(_lang);
  const [email, setEmail] = useState("admin@zetime.io");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  function handleSwitchLang(newLang: "en" | "ar") {
    if (lang === newLang) return;
    setLang(newLang);
    applyTheme();
    setLangState(newLang);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Email is required."); return; }
    if (!password) { setError("Password is required."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem("zetime_auth", "true");
        localStorage.setItem("zetime_user", email);
      } catch {}
      if (onSuccess) {
        onSuccess(email);
      } else {
        navigate("/overview", { replace: true });
      }
    }, 1000);
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all";
  const inputStyle = (focused: boolean) => ({
    borderColor: focused ? C.gold : C.border,
    background: C.bg,
    color: C.textPrimary,
    boxShadow: focused ? `0 0 0 3px ${C.gold}18` : "none",
  });
  const [pwdFocused, setPwdFocus] = useState(false);
  const [emailFocused, setEmailFocus] = useState(false);

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

      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col w-[480px] shrink-0 relative overflow-hidden"
        style={{ background: C.sidebar }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(${C.sidebarLabel} 1px, transparent 1px), linear-gradient(90deg, ${C.sidebarLabel} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold" style={{ color: "#fff" }}>
              {_lang === "ar" ? <>زي <span style={{ color: C.gold }}>تايم</span></> : <>Ze<span style={{ color: C.gold }}>Time</span></>}
            </span>
          </div>

          {/* Main headline */}
          <div className="mt-auto mb-auto">
            <div className="text-4xl font-bold leading-tight mb-4" style={{ color: "#fff" }}>{t("One console.")}<br />{t("Every")}<br />
              <span style={{ color: C.gold }}>{t("service.")}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.sidebarText }}>{t("ZeTime Admin gives platform operators complete visibility and control across all verticals — home services, food delivery, property, car services, roadside assistance, and more.")}</p>

            {/* Service icons row */}
            <div className="flex gap-3 mt-8">
              {[
                { icon: <Wrench size={14} />,         label: "Home" },
                { icon: <Pizza size={14} />,           label: "Food" },
                { icon: <Home size={14} />,            label: "Property" },
                { icon: <Car size={14} />,             label: "Auto" },
                { icon: <Truck size={14} />,           label: "Roadside" },
                { icon: <Package size={14} />,         label: "Parcel" },
                { icon: <UtensilsCrossed size={14} />, label: "Dining" },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "#ffffff10", border: "1px solid #ffffff18", color: C.sidebarText }}>
                    {s.icon}
                  </div>
                  <span className="text-xs" style={{ color: "#ffffff40" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-auto">
            {[
              { value: "7", label: "Verticals" },
              { value: "404", label: "Providers" },
              { value: "12K+", label: "Daily Bookings" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
                <div className="text-xl font-bold" style={{ color: C.gold }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: C.sidebarText }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={`w-full max-w-sm transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold" style={{ color: C.textPrimary }}>
              {_lang === "ar" ? <>زي <span style={{ color: C.gold }}>تايم</span></> : <>Ze<span style={{ color: C.gold }}>Time</span></>}
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ color: C.textPrimary }}>{t("Welcome back")}</h1>
            <p className="text-sm" style={{ color: C.textSecondary }}>{t("Sign in to your admin account to continue.")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Work Email")}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder={t("you@zetime.io")}
                className={inputCls}
                style={inputStyle(emailFocused)}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: C.textSecondary }}>{t("Password")}</label>
                <button type="button" className="text-xs font-medium"
                  style={{ color: C.gold }} onClick={() => {
                    if (onForgot) onForgot(email);
                    else navigate("/forgot-password");
                  }}>{t("Forgot password?")}</button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder={t("••••••••••••")}
                  className={inputCls}
                  style={{ ...inputStyle(pwdFocused), paddingRight: "44px" }}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.textMuted }}>
                  <Eye size={15} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg"
                style={{ background: C.redLight, color: C.red }}>
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: loading ? C.textMuted : C.gold,
                color: "#fff",
                boxShadow: loading ? "none" : `0 4px 14px ${C.gold}44`,
              }}>
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>{t("Sign in to Admin Console")}</>
              )}
            </button>
          </form>

          {/* Role note */}
          <div className="mt-6 flex items-start gap-2.5 px-4 py-3 rounded-xl"
            style={{ background: C.blueLight, border: `1px solid ${C.border}` }}>
            <Shield size={14} style={{ color: C.blueMid, marginTop: 1 }} className="shrink-0" />
            <p className="text-xs leading-relaxed" style={{ color: C.blue }}>{t("This portal is restricted to authorized platform administrators. Access attempts are logged and monitored.")}</p>
          </div>

          <p className="text-center text-xs mt-8" style={{ color: C.textMuted }}>
            ZeTime Platform · Admin Console v4.1.0
          </p>
        </div>
      </div>
    </div>
  );
}
