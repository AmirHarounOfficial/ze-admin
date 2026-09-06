import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Plus } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, PrimaryBtn, StatusBadge, OutlineBtn } from "@/components/ui/CommonUI";

const erpVendors = [
  { id: "VND-001", name: "AWS Egypt",         category: "Cloud Infrastructure", contact: "aws-support@amazon.com",   contract: "Annual",   value: "EGP 840K/yr",  status: "active"   },
  { id: "VND-002", name: "Paymob",            category: "Payment Gateway",       contact: "partner@paymob.com",       contract: "Revenue-share", value: "1.5%",    status: "active"   },
  { id: "VND-003", name: "Firebase (Google)", category: "Notifications / Auth",  contact: "firebase@google.com",      contract: "Pay-as-go",  value: "EGP 42K/mo", status: "active"   },
  { id: "VND-004", name: "Figma",             category: "Design Tooling",        contact: "accounts@figma.com",       contract: "Annual",   value: "EGP 28K/yr",   status: "active"   },
  { id: "VND-005", name: "Twilio",            category: "SMS & Voice",           contact: "support@twilio.com",       contract: "Pay-as-go",  value: "EGP 8K/mo",  status: "inactive" },
  { id: "VND-006", name: "Sentry",            category: "Error Monitoring",      contact: "billing@sentry.io",        contract: "Annual",   value: "EGP 18K/yr",   status: "active"   },
];

export function ERPVendorsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [intStatuses, setIntStatuses] = useState<Record<string, string>>({});

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <Stat label={t("Active Vendors")}    value={erpVendors.filter(v => v.status === "active").length}   color={C.green} />
          <Stat label={t("Inactive")}          value={erpVendors.filter(v => v.status === "inactive").length} color={C.orange} />
          <Stat label={t("Annual Spend")}      value="EGP 4.2M" color={C.blue} />
        </div>
        <PrimaryBtn small onClick={() => showToast("Vendor onboarding started.")}><Plus size={12} />{t("Add Vendor")}</PrimaryBtn>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {erpVendors.map(v => {
          const status = intStatuses[v.id] ?? v.status;
          return (
            <div key={v.id} className="rounded-xl border p-4 flex items-start gap-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textSecondary }}>
                {v.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{v.name}</span>
                  <StatusBadge status={status} />
                </div>
                <div className="text-xs mb-1" style={{ color: C.textMuted }}>{v.category}</div>
                <div className="text-xs font-mono" style={{ color: C.textSecondary }}>{v.contact}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs" style={{ color: C.textMuted }}>{v.contract}</span>
                  <span className="text-xs font-semibold" style={{ color: C.green }}>{v.value}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <OutlineBtn small onClick={() => showToast(`${v.name} contract opened.`)}>{t("View")}</OutlineBtn>
                {status === "active" ? (
                  <button className="text-xs px-2 py-1 rounded font-medium"
                    style={{ background: C.redLight, color: C.red }}
                    onClick={() => { setIntStatuses(s => ({ ...s, [v.id]: "inactive" })); showToast(`${v.name} disabled.`); }}>{t("Disable")}</button>
                ) : (
                  <button className="text-xs px-2 py-1 rounded font-medium"
                    style={{ background: C.greenLight, color: C.green }}
                    onClick={() => { setIntStatuses(s => ({ ...s, [v.id]: "active" })); showToast(`${v.name} enabled.`); }}>{t("Enable")}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
