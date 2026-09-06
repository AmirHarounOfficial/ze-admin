import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Save } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, DetailHeader, OutlineBtn, PrimaryBtn
} from "@/components/ui/CommonUI";

const banners = [
  { id: "BN-301", title: "Eid Al-Adha Offers",     category: "Home Services", start: "Jun 14", end: "Jun 20", status: "active",  priority: 1 },
  { id: "BN-300", title: "Free Delivery Weekend",   category: "Food Delivery",  start: "Jul 05", end: "Jul 07", status: "active",  priority: 2 },
  { id: "BN-299", title: "Property Summer Deals",   category: "Property",       start: "Jul 10", end: "Jul 31", status: "pending", priority: 3 },
  { id: "BN-298", title: "Roadside 50% Off",        category: "Roadside",       start: "Aug 01", end: "Aug 15", status: "pending", priority: 4 },
];

export function BannerDetailPage() {
  const { id = "BN-301" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const isNew = id === "new";
  const b = banners.find(x => x.id === id) ?? (isNew ? null : banners[0]);

  const [title, setTitle]       = useState(b?.title ?? "");
  const [category, setCategory] = useState(b?.category ?? "Promotional");
  const [startDate, setStart]   = useState(b?.start ?? "");
  const [endDate, setEnd]       = useState(b?.end ?? "");
  const [discount, setDiscount] = useState(isNew ? "" : "20");
  const [promoCode, setPromo]   = useState(isNew ? "" : "ZETIME20");
  const [targeting, setTargeting] = useState<string[]>(isNew ? [] : ["Home Services", "All Users"]);

  const modules = ["Home Services", "Food Delivery", "Property Rentals", "Car Services", "Roadside", "Restaurant", "Parcel Delivery"];

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <BackBtn to="/support/banners" />
        <DetailHeader
          title={isNew ? "Create New Banner" : `Edit Banner: ${b?.title}`}
          id={isNew ? "New" : id}
          subtitle={isNew ? "Fill in the details below to publish a new banner" : `${b?.category} · ${b?.start} – ${b?.end}`}
          badge={isNew ? "Draft" : b?.status}
        />
        <div className="flex gap-2 ms-auto">
          <OutlineBtn onClick={() => navigate("/support/banners")}>{t("Discard")}</OutlineBtn>
          <PrimaryBtn onClick={() => { showToast(isNew ? "Banner created and published." : "Banner saved and published."); navigate("/support/banners"); }}>
            <Save size={13} /> {isNew ? "Create & Publish" : "Save & Publish"}
          </PrimaryBtn>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
            <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Banner Content")}</div>
            <div className="px-5 py-4 space-y-4">
              {[
                { label: "Banner Title",    value: title,    set: setTitle,    placeholder: "e.g. Summer Sale 2025" },
                { label: "Discount Code",   value: promoCode,set: setPromo,    placeholder: "e.g. SAVE20" },
                { label: "Discount Value (%)", value: discount, set: setDiscount, placeholder: "e.g. 20" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: C.textSecondary }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: C.border, background: C.bg, color: C.textPrimary }}
                    onFocus={e => (e.target.style.borderColor = C.gold)}
                    onBlur={e => (e.target.style.borderColor = C.border)} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Start Date", value: startDate, set: setStart },
                  { label: "End Date",   value: endDate,   set: setEnd   },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: C.textSecondary }}>{f.label}</label>
                    <input value={f.value} onChange={e => f.set(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                      style={{ borderColor: C.border, background: C.bg, color: C.textPrimary }}
                      onFocus={e => (e.target.style.borderColor = C.gold)}
                      onBlur={e => (e.target.style.borderColor = C.border)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
            <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Module Targeting")}</div>
            <div className="px-5 py-4 flex flex-wrap gap-2">
              {modules.map(mod => {
                const active = targeting.includes(mod);
                return (
                  <button key={mod} onClick={() => setTargeting(p => active ? p.filter(x => x !== mod) : [...p, mod])}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
                    style={{ background: active ? C.gold : "transparent", color: active ? "#fff" : C.textSecondary, borderColor: active ? C.gold : C.border }}>
                    {mod}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-5 py-3.5 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Mobile Preview")}</div>
          <div className="p-6 flex flex-col items-center">
            <div className="w-64 rounded-2xl border-4 p-3 space-y-3" style={{ borderColor: C.border, background: C.bg }}>
              <div className="h-2.5 w-16 bg-gray-300 rounded-full mx-auto" />
              <div className="rounded-xl p-4 text-white text-center space-y-2" style={{ background: `linear-gradient(135deg, ${C.gold}, #B8860B)` }}>
                <div className="text-xs font-bold uppercase tracking-wider">{category}</div>
                <div className="text-lg font-bold">{title || "Banner Title"}</div>
                {promoCode && <div className="text-xs bg-white/20 px-2 py-1 rounded inline-block font-mono">Use code: {promoCode}</div>}
              </div>
              <div className="text-xs text-center" style={{ color: C.textMuted }}>{t("Appears at top of app home screen")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
