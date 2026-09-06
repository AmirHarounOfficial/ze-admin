import React from "react";
import { Save, RotateCcw, Info } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { PrimaryBtn, OutlineBtn, FieldRow } from "@/components/ui/CommonUI";

export function CommissionsPage({ onToast }: { onToast?: (msg: string) => void }) {
  const notify = (msg: string) => onToast ? onToast(msg) : null;
  return (
    <div className="space-y-6 max-w-2xl">
      {[
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
      ].map(section => (
        <div key={section.title} className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: C.border, background: "#F8FAFC" }}>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{section.title}</div>
            <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{section.desc}</div>
          </div>
          <div className="px-5">
            {section.fields.map(f => <FieldRow key={f.label} {...f} />)}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <PrimaryBtn onClick={() => notify("Commission settings saved successfully.")}>
          <Save size={14} />{t("Save Changes")}</PrimaryBtn>
        <OutlineBtn onClick={() => notify("Settings reset to platform defaults.")}><RotateCcw size={14} />{t("Reset to Defaults")}</OutlineBtn>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: C.textSecondary }}>
          <Info size={12} />{t("Changes apply to new bookings only — existing invoices are unaffected.")}</div>
      </div>
    </div>
  );
}
