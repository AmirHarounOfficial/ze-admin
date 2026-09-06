import React from "react";
import { useOutletContext } from "react-router";
import { Plus } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { hrmDepartments } from "@/mock/mockData";
import { Stat, PrimaryBtn, OutlineBtn, Avatar } from "@/components/ui/CommonUI";

export function HRMDepartmentsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-4 flex-1 mr-4">
          <Stat label={t("Departments")}      value={hrmDepartments.length} />
          <Stat label={t("Total Headcount")}  value={hrmDepartments.reduce((s, d) => s + d.headcount, 0)} color={C.blue} />
          <Stat label={t("Total Budget")}     value="EGP 1.845M" color={C.green} />
        </div>
        <PrimaryBtn small onClick={() => showToast("New department created.")}><Plus size={12} />{t("Add Department")}</PrimaryBtn>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {hrmDepartments.map(d => (
          <div key={d.id} className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-bold" style={{ color: C.textPrimary }}>{d.name}</div>
                <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>Head: {d.head}</div>
              </div>
              <OutlineBtn small onClick={() => showToast(`${d.name} settings opened.`)}>{t("Manage")}</OutlineBtn>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3" style={{ background: C.bg }}>
                <div className="text-xs mb-1" style={{ color: C.textMuted }}>{t("Headcount")}</div>
                <div className="text-lg font-bold" style={{ color: C.blue }}>{d.headcount}</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: C.bg }}>
                <div className="text-xs mb-1" style={{ color: C.textMuted }}>{t("Monthly Budget")}</div>
                <div className="text-sm font-bold" style={{ color: C.green }}>{d.budget}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
