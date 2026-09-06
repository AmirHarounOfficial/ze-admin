import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { CheckCircle2, Eye, RotateCcw, Save, Shield } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { PrimaryBtn, OutlineBtn } from "@/components/ui/CommonUI";

const ROLES = ["Super Admin", "Ops Manager", "Finance Mgr", "Support Agent", "Marketing Mgr", "Auditor"];
const SECTIONS = [
  "Global Overview",
  "Provider Verification",
  "Driver Fleet Map",
  "Table Seating Edit",
  "Financial Settlements",
  "Marketer Withdrawals",
  "Support Chat / Tickets",
  "Coupons & Banners",
  "Global Settings & Keys",
  "Spatie RBAC Config",
];

const PERMISSIONS: Record<string, Record<string, string>> = {
  "Global Overview":          { "Super Admin": "rw", "Ops Manager": "r", "Finance Mgr": "r", "Support Agent": "r",  "Marketing Mgr": "r",  "Auditor": "r"  },
  "Provider Verification":    { "Super Admin": "rw", "Ops Manager": "rw","Finance Mgr": "-", "Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "r"  },
  "Driver Fleet Map":         { "Super Admin": "rw", "Ops Manager": "rw","Finance Mgr": "-", "Support Agent": "r",  "Marketing Mgr": "-",  "Auditor": "r"  },
  "Table Seating Edit":       { "Super Admin": "rw", "Ops Manager": "rw","Finance Mgr": "-", "Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "r"  },
  "Financial Settlements":    { "Super Admin": "rw", "Ops Manager": "-", "Finance Mgr": "rw","Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "r"  },
  "Marketer Withdrawals":     { "Super Admin": "rw", "Ops Manager": "-", "Finance Mgr": "rw","Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "r"  },
  "Support Chat / Tickets":   { "Super Admin": "rw", "Ops Manager": "r", "Finance Mgr": "-", "Support Agent": "rw", "Marketing Mgr": "-",  "Auditor": "r"  },
  "Coupons & Banners":        { "Super Admin": "rw", "Ops Manager": "-", "Finance Mgr": "-", "Support Agent": "-",  "Marketing Mgr": "rw", "Auditor": "r"  },
  "Global Settings & Keys":   { "Super Admin": "rw", "Ops Manager": "-", "Finance Mgr": "-", "Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "-"  },
  "Spatie RBAC Config":       { "Super Admin": "rw", "Ops Manager": "-", "Finance Mgr": "-", "Support Agent": "-",  "Marketing Mgr": "-",  "Auditor": "-"  },
};

const PERM_CYCLE: Record<string, string> = { "-": "r", "r": "rw", "rw": "-" };

export function PermissionsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [perms, setPerms] = useState<Record<string, Record<string, string>>>(
    JSON.parse(JSON.stringify(PERMISSIONS))
  );
  const [saved, setSaved] = useState(false);

  function toggle(section: string, role: string) {
    if (role === "Super Admin") return;
    setPerms(p => ({
      ...p,
      [section]: { ...p[section], [role]: PERM_CYCLE[p[section]?.[role] ?? "-"] ?? "r" },
    }));
    setSaved(false);
  }

  function renderCell(section: string, role: string) {
    const perm = perms[section]?.[role] ?? "-";
    const locked = role === "Super Admin";
    const styles: Record<string, { bg: string; color: string; label: string; icon: React.ReactNode }> = {
      rw: { bg: C.greenLight,  color: C.greenText, label: "Read/Write", icon: <CheckCircle2 size={10} /> },
      r:  { bg: C.blueLight,   color: C.blueMid,   label: "Read",       icon: <Eye size={10} /> },
      "-": { bg: "transparent", color: C.textMuted, label: "No Access",  icon: null },
    };
    const s = styles[perm] ?? styles["-"];
    return (
      <td key={role} className="px-3 py-3 border-b text-center" style={{ borderColor: C.border }}>
        <button
          onClick={() => toggle(section, role)}
          disabled={locked}
          title={locked ? "Super Admin permissions are fixed" : `Click to change permission (${s.label})`}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${locked ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-80"}`}
          style={{ background: s.bg, color: s.color, borderColor: perm === "-" ? C.border : "transparent" }}
        >
          {s.icon}
          <span>{s.label}</span>
        </button>
      </td>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs" style={{ color: C.textSecondary }}>
          <Shield size={14} color={C.gold} />
          <span>{t("Click any cell to cycle permissions: No Access → Read → Read/Write")}</span>
        </div>
        <div className="flex gap-2">
          <OutlineBtn onClick={() => { setPerms(JSON.parse(JSON.stringify(PERMISSIONS))); setSaved(false); }}><RotateCcw size={13} />{t("Reset")}</OutlineBtn>
          <PrimaryBtn onClick={() => { setSaved(true); showToast("Permission matrix saved. Changes are now live."); }}>
            <Save size={13} /> {saved ? "Saved ✓" : "Save Changes"}
          </PrimaryBtn>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: `1px solid ${C.border}` }}>
                <th className="px-4 py-3 font-semibold" style={{ color: C.textPrimary }}>{t("Module / Resource")}</th>
                {ROLES.map(r => (
                  <th key={r} className="px-3 py-3 font-semibold text-center" style={{ color: C.textPrimary }}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTIONS.map(sec => (
                <tr key={sec} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 border-b font-medium" style={{ borderColor: C.border, color: C.textPrimary }}>{sec}</td>
                  {ROLES.map(r => renderCell(sec, r))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
