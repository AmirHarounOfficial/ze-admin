import React, { useState } from "react";
import { Filter, Download, Save } from "lucide-react";
import { C } from "@/theme";
import { t, AR } from "@/i18n";
import { Stat, SearchBar, IconBtn, PrimaryBtn, TableWrapper, Th, Td, StatusBadge } from "@/components/ui/CommonUI";

const initialTranslationStrings = [
  { key: "booking.status.completed",    en: "Booking Completed",          ar: "تم إتمام الحجز",           status: "translated" },
  { key: "booking.status.pending",      en: "Booking Pending",            ar: "الحجز قيد الانتظار",       status: "translated" },
  { key: "error.payment.failed",        en: "Payment Failed",             ar: "فشل الدفع",                status: "translated" },
  { key: "button.cancel",              en: "Cancel",                     ar: "إلغاء",                    status: "translated" },
  { key: "dashboard.kpi.gmv",          en: "Gross Merchandise Value",    ar: "إجمالي حجم البضائع (GMV)", status: "translated" },
  { key: "nav.roadside.assistance",    en: "Roadside Assistance",        ar: "المساعدة على الطريق",      status: "translated" },
  { key: "error.session.expired",      en: "Your session has expired",   ar: "انتهت صلاحية الجلسة الخاصة بك", status: "translated" },
  { key: "label.property.occupancy",   en: "Occupancy Rate",             ar: "نسبة الإشغال",             status: "translated" },
  { key: "dashboard.net_revenue",      en: "Net Revenue",                ar: "صافي الإيرادات",           status: "translated" },
  { key: "dashboard.completion_rate",  en: "Completion Rate",            ar: "معدل الإكمال",             status: "translated" },
  { key: "nav.food_delivery",          en: "Food Delivery",              ar: "توصيل الطعام",             status: "translated" },
  { key: "nav.merchant_registry",      en: "Merchant Registry",          ar: "سجل التجار والمزودين",    status: "translated" },
  { key: "system.access_control",      en: "Access Control",             ar: "التحكم في الوصول",          status: "translated" },
  { key: "hrm.payroll",                en: "Payroll",                    ar: "الرواتب",                  status: "translated" },
  { key: "erp.budget",                 en: "Budget & Finance",           ar: "الميزانية والمالية",       status: "translated" },
];

export function TranslationsPage({ onToast }: { onToast?: (msg: string) => void }) {
  const [items, setItems] = useState(initialTranslationStrings);
  const [query, setQuery] = useState("");
  const [missingOnly, setMissingOnly] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const filtered = items.filter(tItem => {
    const q = query.toLowerCase();
    const matchesQ = tItem.key.toLowerCase().includes(q) || tItem.en.toLowerCase().includes(q) || tItem.ar.includes(q);
    const matchesMissing = missingOnly ? tItem.status === "missing" : true;
    return matchesQ && matchesMissing;
  });

  function handleSave(key: string, enText: string) {
    const newAr = edits[key];
    if (!newAr) {
      notify("Translation saved.");
      return;
    }
    AR[enText] = newAr;
    setItems(prev => prev.map(item => item.key === key ? { ...item, ar: newAr, status: "translated" } : item));
    notify(`Translation for "${enText}" saved to Arabic dictionary.`);
  }

  const translatedCount = items.filter(tItem => tItem.status === "translated").length;
  const missingCount = items.filter(tItem => tItem.status === "missing").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Stat label={t("Total Strings")}   value={items.length} />
        <Stat label={t("Translated")}      value={translatedCount} color={C.green}  />
        <Stat label={t("Missing (AR)")}    value={missingCount}    color={C.orange} />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by key or text…")} value={query} onChange={setQuery} />
        <IconBtn icon={<Filter size={12} />} label={missingOnly ? "Show All" : "Missing only"} onClick={() => setMissingOnly(p => !p)} />
        <PrimaryBtn small onClick={() => notify("Translations exported to CSV.")}><Download size={12} />{t("Export")}</PrimaryBtn>
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("Key")}</Th><Th>{t("English (Default)")}</Th><Th>{t("Arabic")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={5} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>{t("No translation strings found.")}</td></tr>
          ) : filtered.map(item => (
            <tr key={item.key} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{item.key}</Td>
              <Td><span className="text-sm font-medium" style={{ color: C.textPrimary }}>{item.en}</span></Td>
              <Td>
                <input
                  value={edits[item.key] !== undefined ? edits[item.key] : item.ar}
                  onChange={e => setEdits(prev => ({ ...prev, [item.key]: e.target.value }))}
                  placeholder={t("Add Arabic translation…")}
                  className="w-full text-sm bg-transparent outline-none border-b px-1 py-0.5"
                  style={{ borderColor: item.status === "missing" ? C.orange : C.border, color: C.textPrimary }}
                  dir="rtl"
                />
              </Td>
              <Td><StatusBadge status={edits[item.key] ? "translated" : item.status} /></Td>
              <Td>
                <button className="px-2.5 py-1 rounded text-xs font-semibold border hover:bg-gray-50 transition-colors" style={{ borderColor: C.border, color: C.textSecondary }}
                  onClick={() => handleSave(item.key, item.en)}>
                  <Save size={11} className="inline mr-1" />{t("Save")}</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
