import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Shield, KeyRound, Monitor, RefreshCcw } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { PrimaryBtn, OutlineBtn, StatusBadge } from "@/components/ui/CommonUI";

export function AccountSecurityPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw,     setNewPw]       = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showBackup,  setShowBackup]  = useState(false);

  const strength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", C.red, C.orange, C.blue, C.green];
  const s = strength(newPw);

  const activeSessions = [
    { device: "Chrome on macOS",   ip: "197.60.12.44", location: "Cairo, EG",    time: "Active now",    current: true  },
    { device: "Safari on iPhone",  ip: "197.60.12.44", location: "Cairo, EG",    time: "1h idle",       current: false },
    { device: "Chrome on Windows", ip: "41.67.88.201", location: "Alexandria, EG",time: "3h idle",       current: false },
  ];

  const backupCodes = ["A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6", "Q7R8-S9T0", "U1V2-W3X4", "Y5Z6-A7B8", "C9D0-E1F2"];

  const inputStyle = (focused?: boolean) => ({
    background: C.bg, border: `1px solid ${focused ? C.gold : C.border}`, borderRadius: 8,
    padding: "9px 40px 9px 12px", fontSize: 13, color: C.textPrimary, width: "100%", outline: "none",
  });

  function PasswordInput({ label, value, onChange, show, onToggle }: { label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void }) {
    const [focused, setFocused] = useState(false);
    return (
      <div>
        <div className="text-xs font-medium mb-1.5" style={{ color: C.textSecondary }}>{label}</div>
        <div className="relative">
          <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={inputStyle(focused)} />
          <button type="button" onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Change Password */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: C.border }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.blueLight }}>
            <Lock size={15} color={C.blueMid} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Change Password")}</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{t("Last changed 90 days ago")}</div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <PasswordInput label={t("Current Password")}  value={currentPw} onChange={setCurrentPw} show={showCurrent} onToggle={() => setShowCurrent(p => !p)} />
          <PasswordInput label={t("New Password")}      value={newPw}     onChange={setNewPw}     show={showNew}     onToggle={() => setShowNew(p => !p)} />
          {newPw && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: C.textMuted }}>{t("Password strength")}</span>
                <span className="text-xs font-semibold" style={{ color: strengthColor[s] }}>{strengthLabel[s]}</span>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4].map(n => (
                  <div key={n} className="flex-1 h-1.5 rounded-full transition-all"
                    style={{ background: n <= s ? strengthColor[s] : C.border }} />
                ))}
              </div>
              <div className="mt-2 space-y-1">
                {[
                  [newPw.length >= 8, "At least 8 characters"],
                  [/[A-Z]/.test(newPw), "One uppercase letter"],
                  [/[0-9]/.test(newPw), "One number"],
                  [/[^A-Za-z0-9]/.test(newPw), "One special character"],
                ].map(([ok, label]) => (
                  <div key={label as string} className="flex items-center gap-1.5 text-xs"
                    style={{ color: ok ? C.green : C.textMuted }}>
                    {ok ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                    {label as string}
                  </div>
                ))}
              </div>
            </div>
          )}
          <PasswordInput label={t("Confirm New Password")} value={confirmPw} onChange={setConfirmPw} show={false} onToggle={() => {}} />
          {confirmPw && newPw !== confirmPw && (
            <div className="text-xs flex items-center gap-1" style={{ color: C.red }}>
              <AlertCircle size={11} />{t("Passwords do not match")}
            </div>
          )}
          <div className="pt-2">
            <PrimaryBtn onClick={() => {
              if (!currentPw) { showToast("Please enter current password."); return; }
              if (newPw !== confirmPw) { showToast("Passwords do not match."); return; }
              showToast("Password updated successfully.");
              setCurrentPw(""); setNewPw(""); setConfirmPw("");
            }}>
              <KeyRound size={13} />{t("Update Password")}
            </PrimaryBtn>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.greenLight }}>
              <Shield size={15} color={C.green} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Two-Factor Authentication (2FA)")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Google Authenticator TOTP is enabled")}</div>
            </div>
          </div>
          <StatusBadge status="active" />
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.border }}>
            <div>
              <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{t("Authenticator App")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Generate TOTP verification codes")}</div>
            </div>
            <OutlineBtn small onClick={() => showToast("Re-authenticating 2FA device...")}>{t("Re-configure")}</OutlineBtn>
          </div>

          <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: C.border }}>
            <div>
              <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{t("Backup Recovery Codes")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Use when primary authenticator device is lost")}</div>
            </div>
            <OutlineBtn small onClick={() => setShowBackup(p => !p)}>
              {showBackup ? t("Hide Codes") : t("View Codes")}
            </OutlineBtn>
          </div>

          {showBackup && (
            <div className="rounded-xl border p-4" style={{ background: C.bg, borderColor: C.border }}>
              <div className="text-xs font-semibold mb-2" style={{ color: C.textPrimary }}>{t("8 One-Time Recovery Codes")}</div>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs mb-3">
                {backupCodes.map(code => (
                  <div key={code} className="p-2 rounded border text-center" style={{ background: C.card, borderColor: C.border, color: C.textSecondary }}>
                    {code}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <OutlineBtn small onClick={() => showToast("Backup codes printed.")}>{t("Print Codes")}</OutlineBtn>
                <OutlineBtn small onClick={() => showToast("New backup codes generated.")}>
                  <RefreshCcw size={11} />{t("Regenerate Codes")}
                </OutlineBtn>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.purpleLight }}>
              <Monitor size={15} color={C.purple} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Active Logged-in Sessions")}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{t("Devices currently authenticated")}</div>
            </div>
          </div>
          <OutlineBtn small onClick={() => showToast("All other sessions signed out.")}>{t("Sign Out All Other Devices")}</OutlineBtn>
        </div>
        <div className="divide-y" style={{ borderColor: C.border }}>
          {activeSessions.map((sess, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor size={16} color={C.textMuted} />
                <div>
                  <div className="text-xs font-medium" style={{ color: C.textPrimary }}>
                    {sess.device} {sess.current && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold ml-1" style={{ background: C.greenLight, color: C.green }}>{t("CURRENT")}</span>}
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: C.textMuted }}>{sess.ip} · {sess.location} · {sess.time}</div>
                </div>
              </div>
              {!sess.current && (
                <button className="text-xs px-2.5 py-1 rounded border hover:bg-red-50" style={{ borderColor: C.redLight, color: C.red }}
                  onClick={() => showToast(`Session on ${sess.device} terminated.`)}>{t("Revoke")}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
