import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Image, Tag, Calendar, Edit, Copy, Trash2 } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { PrimaryBtn, OutlineBtn, StatusBadge } from "@/components/ui/CommonUI";

const banners = [
  { id: "BN-301", title: "Eid Al-Adha Offers",     category: "Home Services", start: "Jun 14", end: "Jun 20", status: "active",  priority: 1 },
  { id: "BN-300", title: "Free Delivery Weekend",   category: "Food Delivery",  start: "Jul 05", end: "Jul 07", status: "active",  priority: 2 },
  { id: "BN-299", title: "Property Summer Deals",   category: "Property",       start: "Jul 10", end: "Jul 31", status: "pending", priority: 3 },
  { id: "BN-298", title: "Roadside 50% Off",        category: "Roadside",       start: "Aug 01", end: "Aug 15", status: "pending", priority: 4 },
];

export function BannersPage({ onToast }: { onToast?: (msg: string) => void }) {
  const navigate = useNavigate();
  const [items, setItems] = useState(banners);
  const notify = (msg: string) => onToast ? onToast(msg) : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm" style={{ color: C.textSecondary }}>
          <span><span className="font-semibold" style={{ color: C.green }}>2 </span>{t("Active")}</span>
          <span><span className="font-semibold" style={{ color: C.orange }}>2 </span>{t("Scheduled")}</span>
        </div>
        <PrimaryBtn small onClick={() => navigate("/support/banners/new")}><Plus size={12} />{t("Create Banner")}</PrimaryBtn>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {items.map((b, i) => (
          <div key={b.id} className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
            <div className="h-32 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${[C.green, C.blue, C.orange, C.purple][i % 4]}18, ${[C.green, C.blue, C.orange, C.purple][i % 4]}30)`, borderBottom: `1px solid ${C.border}` }}>
              <Image size={32} color={[C.green, C.blue, C.orange, C.purple][i % 4]} />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: [C.green, C.blue, C.orange, C.purple][i % 4], color: "#fff" }}>#{b.priority}</span>
              </div>
              <div className="absolute top-3 right-3"><StatusBadge status={b.status} /></div>
            </div>
            <div className="px-4 py-3">
              <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{b.title}</div>
              <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: C.textSecondary }}>
                <div className="flex items-center gap-1"><Tag size={11} />{b.category}</div>
                <div className="flex items-center gap-1"><Calendar size={11} />{b.start} – {b.end}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <OutlineBtn small onClick={() => navigate(`/support/banners/${b.id}`)}><Edit size={11} />{t("Edit")}</OutlineBtn>
                <OutlineBtn small onClick={() => { setItems(p => [...p, { ...b, id: `BN-${Date.now()}`, title: `${b.title} (Copy)`, status: "pending" }]); notify("Banner duplicated."); }}><Copy size={11} />{t("Duplicate")}</OutlineBtn>
                <button className="px-2 py-1 rounded text-xs border hover:bg-red-50 transition-colors" style={{ borderColor: C.border, color: C.red }} onClick={() => { setItems(p => p.filter(x => x.id !== b.id)); notify("Banner deleted."); }}><Trash2 size={11} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
