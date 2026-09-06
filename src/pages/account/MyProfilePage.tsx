import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Activity, ClipboardList, Globe, ShieldCheck, CheckCircle2, Edit, Download, Save, Shield, XCircle, Plus, DollarSign, Monitor } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { OutlineBtn, PrimaryBtn, Tabs, InfoCard, InfoRow, StatusBadge, SectionHeader, TableWrapper, Th, Td } from "@/components/ui/CommonUI";

export function MyProfilePage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Super Admin");
  const [phone, setPhone] = useState("+20 100 000 0001");
  const [dept, setDept] = useState("Platform Administration");
  const [bio, setBio] = useState("Platform Super Administrator overseeing core operations, financial ledgers, provider queue approvals, and security compliance.");
  const [location, setLocation] = useState("Cairo HQ, Egypt");
  const [tab, setTab] = useState("Overview");

  const stats = [
    { label: "Sessions Today",   value: "3",         sub: "1 active session",   icon: <Activity size={16} />,     color: C.green,  bg: C.greenLight },
    { label: "Actions Logged",   value: "1,247",     sub: "This month",         icon: <ClipboardList size={16} />, color: C.blueMid, bg: C.blueLight },
    { label: "Pages Managed",    value: "34",        sub: "Full CRUD access",   icon: <Globe size={16} />,         color: C.purple,  bg: C.purpleLight },
    { label: "Security Health",  value: "100%",      sub: "2FA TOTP Active",    icon: <ShieldCheck size={16} />,   color: C.gold,    bg: C.goldLight },
  ];

  const recentActivity = [
    { action: "Approved provider TechFix Cairo (KYC Verified)", time: "2 min ago",   icon: <CheckCircle2 size={14} />, color: C.green,  badge: "Provider" },
    { action: "Updated commission rate — Home Services to 5%",  time: "1h ago",      icon: <Edit size={14} />,         color: C.orange, badge: "Finance"  },
    { action: "Exported transaction ledger report (July 2025)", time: "3h ago",      icon: <Download size={14} />,      color: C.blueMid,badge: "Reports"  },
    { action: "Suspended customer account C-5879 for breach",   time: "Yesterday",   icon: <XCircle size={14} />,       color: C.red,    badge: "Security" },
    { action: "Created promotional banner — Eid Al-Adha 2025",  time: "2 days ago",  icon: <Plus size={14} />,          color: C.purple, badge: "CMS"      },
    { action: "Executed monthly payroll run for July 2025",     time: "3 days ago",  icon: <DollarSign size={14} />,   color: C.green,  badge: "HRM"      },
  ];

  const loginHistory = [
    { device: "Chrome 126 on macOS (Apple Silicon)", ip: "197.60.12.44",  location: "Cairo, EG",    time: "Just now",     current: true,  browser: "Chrome" },
    { device: "Safari 17 on iPhone 15 Pro",          ip: "197.60.12.44",  location: "Cairo, EG",    time: "Yesterday 9pm",current: false, browser: "Safari" },
    { device: "Chrome 125 on Windows 11",            ip: "41.67.88.201",  location: "Alexandria, EG",time: "Jul 10, 2025", current: false, browser: "Chrome" },
    { device: "Firefox 127 on Ubuntu Linux",          ip: "102.213.5.88",  location: "Giza, EG",     time: "Jul 8, 2025",  current: false, browser: "Firefox"},
  ];

  const permissions = [
    { label: "Platform Configuration",  key: "config",       granted: true, desc: "Full systemic settings & feature flags" },
    { label: "User & Customer Accounts", key: "users",        granted: true, desc: "CRUD customer records & wallet ledgers" },
    { label: "Financial Ledger & Payouts",key: "finance",      granted: true, desc: "Approve settlements & commission rules" },
    { label: "Provider KYC Approvals",  key: "kyc",          granted: true, desc: "Verify commercial registers & tax IDs" },
    { label: "Security & Audit Logs",   key: "security",     granted: true, desc: "View full admin trail & IP logins" },
    { label: "HRM & Internal Payroll",  key: "hrm",          granted: true, desc: "Run monthly payroll & leave management" },
    { label: "ERP Assets & Vendors",    key: "erp",          granted: true, desc: "Track platform assets & vendor contracts" },
    { label: "System Integrations",     key: "integrations", granted: true, desc: "Manage Paymob, Twilio, and Maps API keys" },
  ];

  const inputStyle = {
    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px",
    fontSize: 13, color: C.textPrimary, width: "100%", outline: "none",
  };

  return (
    <div className="space-y-6 w-full">
      <div className="rounded-2xl border overflow-hidden shadow-sm w-full" style={{ background: C.card, borderColor: C.border }}>
        <div className="h-36 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.sidebar} 0%, #0a4a7a 50%, ${C.gold}30 100%)` }}>
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 40px)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-4 end-4 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md"
              style={{ background: "rgba(255, 255, 255, 0.15)", color: "#fff", border: "1px solid rgba(255, 255, 255, 0.25)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t("Active Now")}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-12 mb-5 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 min-w-0 flex-1">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 rounded-2xl border-4 flex items-center justify-center text-3xl font-black shadow-md transition-transform group-hover:scale-105 relative z-10"
                  style={{ background: C.sidebar, color: "#fff", borderColor: C.card, boxShadow: `0 0 0 3px ${C.gold}` }}>
                  SA
                </div>
                <div className="absolute bottom-1 right-1 z-20 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.green, border: "2px solid #fff" }}>
                  <CheckCircle2 size={12} color="#fff" />
                </div>
              </div>

              <div className="flex-1 min-w-0 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: C.textPrimary }}>{name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: C.goldLight, color: C.gold, border: `1px solid ${C.gold}40` }}>
                    {t("Super Administrator")}
                  </span>
                </div>
                <div className="text-xs mt-1.5 font-medium flex items-center gap-2 flex-wrap" style={{ color: C.textSecondary }}>
                  <span>admin@zetime.app</span>
                  <span className="opacity-40">•</span>
                  <span>{dept}</span>
                  <span className="opacity-40">•</span>
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ms-auto shrink-0">
              {editing ? (
                <>
                  <OutlineBtn small onClick={() => setEditing(false)}>{t("Cancel")}</OutlineBtn>
                  <PrimaryBtn small onClick={() => { setEditing(false); showToast("Profile updated successfully."); }}>
                    <Save size={13} />{t("Save Changes")}
                  </PrimaryBtn>
                </>
              ) : (
                <>
                  <OutlineBtn small onClick={() => setEditing(true)}>
                    <Edit size={13} />{t("Edit Profile")}
                  </OutlineBtn>
                  <PrimaryBtn small onClick={() => showToast("Profile summary downloaded.")}>
                    <Download size={13} />{t("Export Summary")}
                  </PrimaryBtn>
                </>
              )}
            </div>
          </div>

          <p className="text-xs leading-relaxed w-full mb-5" style={{ color: C.textSecondary }}>
            {bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t" style={{ borderColor: C.border }}>
            {stats.map(s => (
              <div key={s.label} className="rounded-xl p-3.5 flex items-center gap-3.5 border transition-all hover:border-gold/50"
                style={{ background: C.bg, borderColor: C.border }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-bold leading-tight truncate" style={{ color: C.textPrimary }}>{s.value}</div>
                  <div className="text-xs font-medium truncate" style={{ color: C.textSecondary }}>{t(s.label)}</div>
                  <div className="text-[10px] truncate" style={{ color: C.textMuted }}>{t(s.sub)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tabs tabs={["Overview", "Edit Info", "Permissions", "Activity Log", "Login History"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <InfoCard title={t("Personal Information")}>
            <InfoRow label={t("Employee ID")}  value="EMP-0001" mono />
            <InfoRow label={t("Full Name")}    value={name} />
            <InfoRow label={t("Email Address")}value="admin@zetime.app" mono />
            <InfoRow label={t("Phone Number")} value={phone} />
            <InfoRow label={t("Department")}   value={dept} />
            <InfoRow label={t("Location / HQ")}value={location} />
            <InfoRow label={t("Account Role")} value={<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: C.goldLight, color: C.gold }}>{t("Super Administrator")}</span>} />
            <InfoRow label={t("Joined Date")}  value="January 1, 2022" />
            <InfoRow label={t("Timezone")}     value="UTC+03:00 (Africa/Cairo)" />
          </InfoCard>

          <InfoCard title={t("Account Security Overview")}>
            <InfoRow label={t("Two-Factor Auth")} value={<StatusBadge status="active" />} />
            <InfoRow label={t("TOTP Method")}     value="Google Authenticator" />
            <InfoRow label={t("Last Password Change")} value="90 days ago" />
            <InfoRow label={t("Active Sessions")} value="3 active devices" />
            <InfoRow label={t("Security Health")} value={<span className="text-xs font-bold" style={{ color: C.green }}>100% Compliant</span>} />
            <div className="mt-4 pt-4 border-t flex gap-2" style={{ borderColor: C.border }}>
              <OutlineBtn small onClick={() => showToast("Redirecting to security settings...")}>
                <Shield size={12} />{t("Manage 2FA & Passwords")}
              </OutlineBtn>
            </div>
          </InfoCard>
        </div>
      )}

      {tab === "Edit Info" && (
        <div className="rounded-2xl border p-6 space-y-5 w-full" style={{ background: C.card, borderColor: C.border }}>
          <SectionHeader title={t("Edit Profile Information")} subtitle={t("Update your personal details and contact preferences.")} />

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Full Name")}</label>
              <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                onBlur={e  => (e.currentTarget.style.borderColor = C.border)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Phone Number")}</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                  onBlur={e  => (e.currentTarget.style.borderColor = C.border)} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Department")}</label>
                <input value={dept} onChange={e => setDept(e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                  onBlur={e  => (e.currentTarget.style.borderColor = C.border)} />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Location / HQ")}</label>
              <input value={location} onChange={e => setLocation(e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                onBlur={e  => (e.currentTarget.style.borderColor = C.border)} />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textSecondary }}>{t("Bio / Operator Notes")}</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ ...inputStyle, resize: "none" }}
                onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                onBlur={e  => (e.currentTarget.style.borderColor = C.border)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textMuted }}>{t("Email (read-only)")}</label>
                <input value="admin@zetime.app" disabled style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: C.textMuted }}>{t("Role (read-only)")}</label>
                <input value="Super Administrator" disabled style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t" style={{ borderColor: C.border }}>
            <PrimaryBtn onClick={() => showToast("Profile updated successfully.")}>
              <Save size={13} />{t("Save Changes")}
            </PrimaryBtn>
            <OutlineBtn onClick={() => setTab("Overview")}>{t("Discard")}</OutlineBtn>
          </div>
        </div>
      )}

      {tab === "Permissions" && (
        <div className="rounded-2xl border overflow-hidden w-full" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <div>
              <h2 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("System Permissions Matrix")}</h2>
              <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Role privileges assigned to Super Administrator")}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold shrink-0" style={{ background: C.greenLight, color: C.green }}>
              {t("Full Access (Super Admin)")}
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: C.border }}>
            {permissions.map(p => (
              <div key={p.key} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="min-w-0 flex-1 me-4">
                  <div className="text-sm font-semibold truncate" style={{ color: C.textPrimary }}>{t(p.label)}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: C.textMuted }}>{t(p.desc)}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5"
                    style={{ background: C.greenLight, color: C.green, border: `1px solid ${C.green}30` }}>
                    <CheckCircle2 size={12} />{t("Granted")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Activity Log" && (
        <div className="rounded-2xl border overflow-hidden w-full" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <h2 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Recent Activity Log")}</h2>
            <OutlineBtn small onClick={() => showToast("Activity log exported.")}>
              <Download size={12} />{t("Export Log")}
            </OutlineBtn>
          </div>
          <div className="divide-y" style={{ borderColor: C.border }}>
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: a.color + "18", color: a.color }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0 me-2">
                  <div className="text-sm font-medium truncate" style={{ color: C.textPrimary }}>{t(a.action)}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{t(a.time)}</div>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: C.bg, color: C.textSecondary, border: `1px solid ${C.border}` }}>
                  {t(a.badge)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Login History" && (
        <div className="rounded-2xl border overflow-hidden w-full" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
            <div>
              <h2 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Active & Previous Sessions")}</h2>
              <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("IP addresses and device tokens registered to your account")}</p>
            </div>
            <OutlineBtn small onClick={() => showToast("Terminated all other active sessions.")}>
              {t("Terminate Other Sessions")}
            </OutlineBtn>
          </div>

          <TableWrapper>
            <thead>
              <tr>
                <Th>{t("Device / Browser")}</Th>
                <Th>{t("IP Address")}</Th>
                <Th>{t("Location")}</Th>
                <Th>{t("Time")}</Th>
                <Th>{t("Status")}</Th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                        <Monitor size={14} color={C.textSecondary} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-xs truncate" style={{ color: C.textPrimary }}>{h.device}</div>
                        <div className="text-[10px] truncate" style={{ color: C.textMuted }}>{h.browser}</div>
                      </div>
                    </div>
                  </Td>
                  <Td mono>{h.ip}</Td>
                  <Td>{h.location}</Td>
                  <Td><span className="text-xs" style={{ color: C.textMuted }}>{h.time}</span></Td>
                  <Td>
                    {h.current ? (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-max" style={{ background: C.greenLight, color: C.green }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t("Current Device")}
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: C.textMuted }}>{t("Expired")}</span>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}
    </div>
  );
}
