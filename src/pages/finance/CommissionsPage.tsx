import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Save, RotateCcw, Info, Percent, DollarSign, Calculator, Layers, Settings2 } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { PrimaryBtn, OutlineBtn, FieldRow, Toast } from "@/components/ui/CommonUI";

export function CommissionsPage({ onToast }: { onToast?: (msg: string) => void }) {
  const outletCtx = useOutletContext<RootCtx | undefined>();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const notify = (msg: string) => {
    if (onToast) onToast(msg);
    else if (outletCtx?.showToast) outletCtx.showToast(msg);
    else setToastMsg(msg);
  };

  const sections = [
    {
      title: "Platform Fee Engine",
      desc: "These percentages are applied to every booking invoice.",
      fields: [
        { label: "Service Fee Percentage",   description: "% of base price charged as platform commission",           value: "5.00",  suffix: "%" },
        { label: "VAT Tax Percentage",        description: "% of base price collected as value-added tax",             value: "14.00", suffix: "%" },
        { label: "Processing Fee Fallback",   description: "Flat EGP added when fee percentage is unset",             value: "2.50",  suffix: "EGP" },
      ],
    },
    {
      title: "Per-Service Commission Overrides",
      desc: "Override the global rate for specific service modules.",
      fields: [
        { label: "Home Services Override",   description: "Overrides global fee for all home service bookings",       value: "5.50",  suffix: "%" },
        { label: "Food Delivery Override",   description: "Overrides global fee for food delivery orders",            value: "8.00",  suffix: "%" },
        { label: "Property Rental Override", description: "Overrides global fee for property rental bookings",        value: "4.00",  suffix: "%" },
        { label: "Roadside Override",        description: "Overrides global fee for roadside assistance orders",      value: "6.00",  suffix: "%" },
      ],
    },
    {
      title: "Fuel Delivery Split Invoice",
      desc: "Parameters for the street assistance fuel delivery sub-billing.",
      fields: [
        { label: "Logistics Delivery Fee",   description: "Fixed fee added to every fuel delivery invoice",           value: "50",    suffix: "EGP" },
        { label: "Fuel Material Surcharge",  description: "Per-litre platform surcharge on fuel material price",      value: "1.20",  suffix: "EGP/L" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {sections.map(section => (
            <div key={section.title} className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: C.border, background: C.bg }}>
                <div>
                  <div className="text-sm font-bold" style={{ color: C.textPrimary }}>{t(section.title)}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t(section.desc)}</div>
                </div>
                <Settings2 size={16} className="text-gray-400" />
              </div>
              <div className="px-6">
                {section.fields.map(f => <FieldRow key={f.label} {...f} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Info & Impact Sidebar Panel */}
        <div className="space-y-6">
          <div className="rounded-xl border p-5 space-y-4" style={{ background: C.card, borderColor: C.border }}>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Commission Impact Summary")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("All commission adjustments are processed in real-time. Modifications update the checkout engine immediately for upcoming bookings.")}
            </p>

            <div className="p-3.5 rounded-lg border bg-amber-50/60 border-amber-200 text-xs space-y-1">
              <div className="font-semibold text-amber-800 flex items-center gap-1.5">
                <Info size={14} />
                <span>{t("Audit & Governance Policy")}</span>
              </div>
              <p className="text-amber-700 text-[11px]">
                {t("Changes apply to new bookings only — existing invoices are unaffected.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: C.border }}>
        <PrimaryBtn onClick={() => notify(t("Commission settings saved successfully."))}>
          <Save size={14} />{t("Save Changes")}
        </PrimaryBtn>
        <OutlineBtn onClick={() => notify(t("Settings reset to platform defaults."))}>
          <RotateCcw size={14} />{t("Reset to Defaults")}
        </OutlineBtn>
      </div>
    </div>
  );
}

