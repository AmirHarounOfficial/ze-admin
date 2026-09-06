import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  KeyRound, Shield, AlertCircle, RefreshCw, Send, Info, CheckCircle2, ChevronLeft, Globe
} from "lucide-react";
import { C, _lang, setLang, applyTheme } from "@/theme";
import { t } from "@/i18n";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import zeTimeLogo from "@/imports/ZETIME_Logo_Symbol.png";

export function ForgotPasswordPage({ prefillEmail = "admin@zetime.io", onBack }: { prefillEmail?: string; onBack?: () => void } = {}) {
  const navigate = useNavigate();
  const [lang, setLangState] = useState<"en" | "ar">(_lang);
  const [stage, setStage] = useState<"request" | "sent">("request");
  const [email, setEmail] = useState(prefillEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [emailFocused, setEmailFocus] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  function handleSwitchLang(newLang: "en" | "ar") {
    if (lang === newLang) return;
    setLang(newLang);
    applyTheme();
    setLangState(newLang);
  }

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) { setError("Enter a valid work email address."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => { setLoading(false); setStage("sent"); setResendCooldown(60); }, 1300);
  }

  function handleResend() {
    if (resendCooldown > 0 || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResendCount(c => c + 1);
      setResendCooldown(60);
    }, 1000);
  }

  const maskedEmail = email
    ? email.replace(/^(.{2})(.*)(@.*)$/, (_, a, b, c) => a + "*".repeat(Math.max(b.length, 3)) + c)
    : "your email";

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
          <div className="flex items-center gap-3">
            <ImageWithFallback src={zeTimeLogo} alt="ZeTime" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold" style={{ color: "#fff" }}>{t("Ze")}<span style={{ color: C.gold }}>{t("Time")}</span></span>
          </div>
          <div className="mt-auto mb-auto space-y-6">
            <div className="text-3xl font-bold leading-snug" style={{ color: "#fff" }}>{t("Account")}<br /><span style={{ color: C.gold }}>{t("recovery.")}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.sidebarText }}>{t("Password resets for admin accounts go through a verified email link. The link expires after 30 minutes and can only be used once.")}</p>

            <div className="space-y-3 pt-2">
              {[
                { title: "Single-use secure tokens", sub: "Reset links are cryptographically signed and expire automatically." },
                { title: "Audit logging", sub: "All password reset requests are recorded in the security audit ledger." },
                { title: "2FA preserved", sub: "Your Google Authenticator requirement remains active after password reset." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
                  <Shield size={16} style={{ color: C.gold, marginTop: 2 }} className="shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.sidebarText }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs" style={{ color: "#ffffff40" }}>ZeTime Platform · Security Layer v4.1</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={`w-full max-w-sm transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {stage === "request" ? (
            <>
              {/* Header */}
              <div className="mb-7">
                <button onClick={() => { if (onBack) onBack(); else navigate("/login"); }} className="flex items-center gap-1 text-xs mb-6" style={{ color: C.textMuted }}>
                  <ChevronLeft size={14} />{t("Back to sign in")}</button>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: C.goldLight, color: C.gold }}>
                  <KeyRound size={22} />
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: C.textPrimary }}>{t("Forgot your password?")}</h1>
                <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{t("Enter your admin email address and we'll send you a secure link to reset your password.")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Admin Email Address")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    placeholder={t("you@zetime.io")}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: emailFocused ? C.gold : C.border,
                      background: C.bg,
                      color: C.textPrimary,
                      boxShadow: emailFocused ? `0 0 0 3px ${C.gold}18` : "none",
                    }}
                    autoFocus
                  />
                  {error && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: C.red }}>
                      <AlertCircle size={12} /> {error}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: loading ? C.textMuted : C.gold,
                    color: "#fff",
                    boxShadow: loading ? "none" : `0 4px 14px ${C.gold}44`,
                  }}>
                  {loading
                    ? <><RefreshCw size={14} className="animate-spin" /> Sending reset link…</>
                    : <><Send size={14} />{t("Send Reset Link")}</>}
                </button>
              </form>

              {/* Security note */}
              <div className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-xl"
                style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                <Info size={13} style={{ color: C.textMuted, marginTop: 1 }} className="shrink-0" />
                <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{t("For security, we don't confirm whether an email address is registered. If you don't receive a link within a few minutes, check your spam folder.")}</p>
              </div>
            </>
          ) : (
            <>
              {/* Sent confirmation */}
              <div className="text-center">
                {/* Animated envelope */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: C.goldLight, border: `2px solid ${C.gold}40` }}>
                    <Send size={32} style={{ color: C.gold }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: C.green, border: "2px solid #fff" }}>
                    <CheckCircle2 size={14} color="#fff" fill="#fff" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>{t("Check your inbox")}</h1>
                <p className="text-sm leading-relaxed mb-1" style={{ color: C.textSecondary }}>{t("A password reset link has been sent to")}</p>
                <p className="text-sm font-semibold mb-6" style={{ color: C.textPrimary }}>{maskedEmail}</p>

                {/* Steps */}
                <div className="text-left space-y-3 mb-7 px-2">
                  {[
                    "Open the email from noreply@zetime.io",
                    'Click "Reset Admin Password" — the link expires in 30 minutes',
                    "Choose a new strong password and confirm",
                    "Sign in with your new credentials and complete 2FA",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{ background: C.sidebar, color: C.gold }}>
                        {i + 1}
                      </div>
                      <p className="text-sm leading-snug" style={{ color: C.textSecondary }}>{s}</p>
                    </div>
                  ))}
                </div>

                {/* Resend */}
                <div className="mb-6 py-3 rounded-xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                  {resendCooldown > 0 ? (
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      Resend available in{" "}
                      <span className="font-mono font-semibold" style={{ color: C.textSecondary }}>
                        {String(Math.floor(resendCooldown / 60)).padStart(2, "0")}:{String(resendCooldown % 60).padStart(2, "0")}
                      </span>
                    </p>
                  ) : (
                    <button onClick={handleResend} disabled={loading}
                      className="text-xs font-semibold flex items-center gap-1.5 mx-auto"
                      style={{ color: C.gold }}>
                      {loading
                        ? <><RefreshCw size={12} className="animate-spin" /> Resending…</>
                        : <><RefreshCw size={12} /> Resend reset link{resendCount > 0 ? ` (${resendCount + 1})` : ""}</>}
                    </button>
                  )}
                </div>

                <button onClick={() => { if (onBack) onBack(); else navigate("/login"); }}
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{ background: C.sidebar, color: "#fff", boxShadow: `0 4px 14px ${C.sidebar}44` }}>
                  <ChevronLeft size={14} />{t("Back to Sign In")}</button>
              </div>

              {/* IT support note */}
              <div className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-xl"
                style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                <AlertCircle size={13} style={{ color: C.textMuted, marginTop: 1 }} className="shrink-0" />
                <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                  Still having trouble? Contact your platform administrator or IT support at{" "}
                  <span className="font-semibold" style={{ color: C.textSecondary }}>it@zetime.io</span>
                </p>
              </div>
            </>
          )}

          <p className="text-center text-xs mt-8" style={{ color: C.textMuted }}>
            ZeTime Platform · Admin Console v4.1.0
          </p>
        </div>
      </div>
    </div>
  );
}
