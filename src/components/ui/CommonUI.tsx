import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, TrendingDown, Search, CheckCircle2, X, Star, Tag, Calendar, Filter, Save, Download, ChevronLeft
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    completed:    { bg: C.greenLight,  text: C.greenText, label: "Completed" },
    approved:     { bg: C.greenLight,  text: C.greenText, label: "Approved" },
    active:       { bg: C.greenLight,  text: C.greenText, label: "Active" },
    resolved:     { bg: C.greenLight,  text: C.greenText, label: "Resolved" },
    success:      { bg: C.greenLight,  text: C.greenText, label: "Success" },
    available:    { bg: C.greenLight,  text: C.greenText, label: "Available" },
    online:       { bg: C.greenLight,  text: C.greenText, label: "Online" },
    translated:   { bg: C.greenLight,  text: C.greenText, label: "Translated" },
    cleared:      { bg: C.greenLight,  text: C.greenText, label: "Cleared" },
    occupied:     { bg: C.blueLight,   text: C.blueMid,   label: "Occupied" },
    "in-progress":{ bg: C.blueLight,   text: C.blueMid,   label: "In Progress" },
    processing:   { bg: C.blueLight,   text: C.blueMid,   label: "Processing" },
    open:         { bg: "#FEF3C7",     text: "#D97706",   label: "Open" },
    pending:      { bg: C.orangeLight, text: C.orange,    label: "Pending" },
    preparing:    { bg: C.orangeLight, text: C.orange,    label: "Preparing" },
    hold:         { bg: C.orangeLight, text: C.orange,    label: "On Hold" },
    busy:         { bg: C.orangeLight, text: C.orange,    label: "Busy" },
    missing:      { bg: C.orangeLight, text: C.orange,    label: "Missing" },
    dispatched:   { bg: C.purpleLight, text: C.purple,    label: "Dispatched" },
    cancelled:    { bg: C.redLight,    text: C.red,       label: "Cancelled" },
    rejected:     { bg: C.redLight,    text: C.red,       label: "Rejected" },
    suspended:    { bg: C.redLight,    text: C.red,       label: "Suspended" },
    failed:       { bg: C.redLight,    text: C.red,       label: "Failed" },
    offline:      { bg: C.redLight,    text: C.red,       label: "Offline" },
    high:         { bg: C.redLight,    text: C.red,       label: "High" },
    medium:       { bg: C.orangeLight, text: C.orange,    label: "Medium" },
    low:          { bg: "#F0F4FF",     text: "#4F46E5",   label: "Low" },
  };
  const s = map[status] ?? { bg: "#F1F5F9", text: C.textSecondary, label: status };
  return (
    <span style={{ background: s.bg, color: s.text }}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
      {t(s.label)}
    </span>
  );
}

export function KPICard({ title, value, sub, trend, trendUp, icon, accent }: {
  title: string; value: string; sub: string; trend: string;
  trendUp: boolean; icon: React.ReactNode; accent: string;
}) {
  return (
    <div className="rounded-xl border p-5 flex flex-col gap-3" style={{ background: C.card, borderColor: C.border }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textSecondary }}>{t(title)}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent + "18", color: accent }}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight" style={{ color: C.textPrimary }}>{value}</div>
        <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{t(sub)}</div>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium">
        {trendUp ? <TrendingUp size={12} color={C.green} /> : <TrendingDown size={12} color={C.red} />}
        <span style={{ color: trendUp ? C.green : C.red }}>{trend}</span>
        <span style={{ color: C.textMuted }}>{t("vs last month")}</span>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold" style={{ color: C.textPrimary }}>{t(title)}</h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t(subtitle)}</p>}
      </div>
      {actions}
    </div>
  );
}

export function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}

export function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  const content = typeof children === "string" ? t(children) : children;
  return (
    <th className={`text-start px-4 py-3 text-xs font-medium uppercase tracking-wide border-b ${right ? "text-end" : ""}`}
      style={{ color: C.textSecondary, borderColor: C.border, background: "#F8FAFC" }}>
      {content}
    </th>
  );
}

export function Td({ children, mono, right }: { children: React.ReactNode; mono?: boolean; right?: boolean }) {
  return (
    <td className={`px-4 py-3 border-b ${right ? "text-end" : "text-start"}`}
      style={{ color: C.textPrimary, borderColor: C.border, fontFamily: mono ? "'JetBrains Mono', monospace" : undefined }}>
      {children}
    </td>
  );
}

export function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3 border-b" style={{ borderColor: C.border }}>
          <div className="h-4 rounded animate-pulse" style={{ background: "#E2E8F0", width: `${50 + (i * 17) % 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function SearchBar({ placeholder, value, onChange }: { placeholder?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1" style={{ borderColor: C.border, background: C.card }}>
      <Search size={14} color={C.textMuted} />
      <input placeholder={t(placeholder ?? "Search…")} value={value} onChange={e => onChange?.(e.target.value)}
        className="flex-1 outline-none bg-transparent text-sm" style={{ color: C.textPrimary }} />
    </div>
  );
}

export function IconBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors"
      style={{ borderColor: C.border, color: C.textSecondary, background: C.card }}
      onMouseEnter={e => (e.currentTarget.style.background = C.bg)}
      onMouseLeave={e => (e.currentTarget.style.background = C.card)}>
      {icon} {typeof label === "string" ? t(label) : label}
    </button>
  );
}

export function PrimaryBtn({ children, onClick, small, danger }: {
  children: React.ReactNode; onClick?: () => void; small?: boolean; danger?: boolean;
}) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-opacity hover:opacity-90 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
      style={{ background: danger ? C.red : C.gold, color: "#fff" }}>
      {typeof children === "string" ? t(children) : children}
    </button>
  );
}

export function OutlineBtn({ children, onClick, small }: { children: React.ReactNode; onClick?: () => void; small?: boolean }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium border transition-colors hover:bg-gray-50 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
      style={{ borderColor: C.border, color: C.textSecondary }}>
      {typeof children === "string" ? t(children) : children}
    </button>
  );
}

export function Stat({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-xl border px-4 py-3 flex items-center justify-between" style={{ background: C.card, borderColor: C.border }}>
      <span className="text-sm" style={{ color: C.textSecondary }}>{t(label)}</span>
      <span className="text-xl font-bold" style={{ color: color ?? C.textPrimary }}>{typeof value === "string" ? t(value) : value}</span>
    </div>
  );
}

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = [C.green, C.blue, C.orange, C.purple, "#0891B2"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 text-white font-semibold"
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg border" style={{ background: C.bg, borderColor: C.border, width: "fit-content" }}>
      {tabs.map(tb => (
        <button key={tb} onClick={() => onChange(tb)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
          style={{ background: active === tb ? C.gold : "transparent", color: active === tb ? "#fff" : C.textSecondary, boxShadow: active === tb ? "0 1px 3px rgba(219,140,0,0.25)" : "none" }}>
          {t(tb)}
        </button>
      ))}
    </div>
  );
}

export function Pagination({ total, showing }: { total: string; showing: string }) {
  return (
    <div className="flex items-center justify-between text-xs pt-1" style={{ color: C.textSecondary }}>
      <span>{t("Showing")} {showing} {t("of")} {total}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, "…", 99].map((p, i) => (
          <button key={i} className="w-7 h-7 rounded flex items-center justify-center border"
            style={{ borderColor: i === 0 ? C.gold : C.border, background: i === 0 ? C.gold : C.card, color: i === 0 ? "#fff" : C.textSecondary }}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border"
      style={{ background: C.card, borderColor: C.border, maxWidth: 360, animation: "slideInRight 0.25s ease" }}>
      <CheckCircle2 size={16} color={C.green} />
      <span className="text-sm" style={{ color: C.textPrimary }}>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

export function ModuleTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border" style={{ borderColor: C.border, color: C.textSecondary, background: C.bg }}>
      {t(label)}
    </span>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} fill={C.orange} color={C.orange} />
      <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{rating}</span>
    </div>
  );
}

export function OccupancyBar({ pct }: { pct: number }) {
  const color = pct >= 75 ? C.green : pct >= 40 ? C.orange : pct === 0 ? C.border : C.red;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border, width: 56 }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-medium tabular-nums" style={{ color: C.textPrimary }}>{pct}%</span>
    </div>
  );
}

export function CountdownBadge({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const color = remaining > 20 ? C.green : remaining > 10 ? C.orange : C.red;
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
          <circle cx="16" cy="16" r="13" fill="none" stroke={C.border} strokeWidth="3" />
          <circle cx="16" cy="16" r="13" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray="81.68" strokeDashoffset={81.68 * (1 - remaining / 60)} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>{remaining}s</span>
      </div>
    </div>
  );
}

export function FieldRow({ label, description, value, suffix }: { label: string; description: string; value: string; suffix?: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: C.border }}>
      <div className="flex-1">
        <div className="text-sm font-medium" style={{ color: C.textPrimary }}>{t(label)}</div>
        <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t(description)}</div>
      </div>
      <div className="flex items-center gap-2 ms-8">
        <div className="relative">
          <input defaultValue={value} className="w-28 px-3 py-1.5 rounded-lg border text-sm text-right pr-8 outline-none" style={{ borderColor: C.border, background: C.bg, color: C.textPrimary }}
            onFocus={e => (e.target.style.borderColor = C.green)}
            onBlur={e => (e.target.style.borderColor = C.border)} />
          {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" style={{ color: C.textMuted }}>{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

export function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} size={11} fill={n <= rating ? C.orange : "none"} color={n <= rating ? C.orange : C.border} />
      ))}
    </div>
  );
}

export function MaskedInput({ label, value, masked, onSave }: { label: string; value: string; masked?: boolean; onSave?: () => void }) {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: C.border }}>
      <div className="flex-1 text-xs font-medium" style={{ color: C.textSecondary }}>{t(label)}</div>
      <div className="flex items-center gap-2">
        {editing ? (
          <input value={draft} onChange={e => setDraft(e.target.value)} autoFocus
            className="text-xs px-2 py-1 rounded border outline-none w-52"
            style={{ borderColor: C.gold, background: C.bg, color: C.textPrimary, fontFamily: "'JetBrains Mono', monospace" }} />
        ) : (
          <code className="text-xs px-2 py-1 rounded" style={{ background: C.bg, color: C.textPrimary, fontFamily: "'JetBrains Mono', monospace" }}>
            {masked && !show ? "•".repeat(draft.length) : draft}
          </code>
        )}
        {masked && !editing && (
          <button onClick={() => setShow(p => !p)} className="text-xs border px-2 py-1 rounded hover:bg-gray-50" style={{ borderColor: C.border, color: C.textSecondary }}>
            {show ? t("Hide") : t("Reveal")}
          </button>
        )}
        <button onClick={() => { if (editing) { setEditing(false); onSave?.(); } else setEditing(true); }}
          className="text-xs border px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          style={{ borderColor: editing ? C.gold : C.border, color: editing ? C.gold : C.textSecondary, background: editing ? C.goldLight : "transparent" }}>
          {editing ? t("Save") : t("Edit")}
        </button>
      </div>
    </div>
  );
}

export function BackBtn({ to }: { to: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: C.border, color: C.textSecondary }}>
      <ChevronLeft size={13} className="rtl:rotate-180" /> {t("Back")}
    </button>
  );
}

export function DetailHeader({ title, id, subtitle, badge, actions }: { title: string; id: string; subtitle?: string; badge?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 pb-2">
      <div className="flex-1">
        <div className="flex items-center gap-2.5 mb-0.5">
          <h1 className="text-lg font-bold" style={{ color: C.textPrimary }}>{t(title)}</h1>
          {badge && <StatusBadge status={badge} />}
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
          <span className="font-mono">{id}</span>
          {subtitle && <><span>·</span><span>{t(subtitle)}</span></>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function InfoCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
      {title && <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: C.textMuted }}>{t(title)}</div>}
      {children}
    </div>
  );
}

export function InfoRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b last:border-b-0" style={{ borderColor: C.border }}>
      <span className="text-xs" style={{ color: C.textSecondary }}>{t(label)}</span>
      <span className={`text-xs font-medium ${mono ? "font-mono" : ""}`} style={{ color: C.textPrimary }}>{typeof value === "string" ? t(value) : value}</span>
    </div>
  );
}

export function Timeline({ steps }: { steps: { label: string; time?: string; done: boolean; active?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: s.done ? C.green : s.active ? C.orange : C.border, color: s.done || s.active ? "#fff" : C.textMuted }}>
              {s.done ? <CheckCircle2 size={12} /> : <span className="text-xs font-bold">{i + 1}</span>}
            </div>
            {i < steps.length - 1 && <div className="w-0.5 h-6 my-1" style={{ background: s.done ? C.green : C.border }} />}
          </div>
          <div className="pb-5">
            <div className="text-sm font-medium" style={{ color: s.done || s.active ? C.textPrimary : C.textMuted }}>{s.label}</div>
            {s.time && <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{s.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
