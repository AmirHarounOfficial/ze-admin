import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { C } from "@/theme";
import { t } from "@/i18n";

const LIVE_JOBS = [
  // Food delivery
  { id: "ORD-7701", type: "food",     lat: 30.0561, lng: 31.2394, status: "delivering", label: "🍔", desc: "Burger Hub → Dokki",          driver: "Amr Mostafa",    eta: "4 min"  },
  { id: "ORD-7700", type: "food",     lat: 30.0406, lng: 31.2258, status: "preparing",  label: "🍕", desc: "Pizza Palace → Zamalek",      driver: "Khaled Sami",    eta: "12 min" },
  { id: "ORD-7699", type: "food",     lat: 30.0744, lng: 31.2902, status: "delivering", label: "🥗", desc: "Salad Bar → Heliopolis",      driver: "Tarek Ibrahim",  eta: "7 min"  },
  // Home services
  { id: "HSB-901",  type: "home",     lat: 30.0131, lng: 31.2089, status: "in_progress",label: "🔧", desc: "Plumbing — Maadi",            provider: "FixIt Cairo",  eta: "ongoing"},
  { id: "HSB-902",  type: "home",     lat: 30.0660, lng: 31.3381, status: "en_route",   label: "🧹", desc: "Deep Clean — Nasr City",      provider: "CleanPro EG",  eta: "15 min" },
  // Car services
  { id: "CJ-801",   type: "car",      lat: 30.0150, lng: 31.2100, status: "in_progress",label: "🚗", desc: "Oil Change — Maadi",          provider: "AutoSpark",    eta: "ongoing"},
  { id: "CJ-802",   type: "car",      lat: 30.0922, lng: 31.3297, status: "en_route",   label: "🔩", desc: "Tyre Change — Rehab City",    provider: "QuickFix Auto",eta: "20 min" },
  // Roadside
  { id: "INC-441",  type: "roadside", lat: 30.0800, lng: 31.2800, status: "dispatched", label: "🚨", desc: "Battery Dead — Ring Road",    captain: "Mostafa Nasser",eta: "8 min"  },
  { id: "INC-440",  type: "roadside", lat: 30.0500, lng: 31.3500, status: "on_site",    label: "🔋", desc: "Tow Request — New Cairo",     captain: "Wael Samir",    eta: "ongoing"},
  // Parcel
  { id: "PKG-5501", type: "parcel",   lat: 30.0600, lng: 31.2200, status: "in_transit", label: "📦", desc: "Parcel → Agouza",             driver: "Samy Adel",      eta: "22 min" },
  { id: "PKG-5500", type: "parcel",   lat: 30.0222, lng: 31.4763, status: "out_for_delivery", label: "📫", desc: "Docs → New Cairo",      driver: "Mohamed Gamal",  eta: "35 min" },
  // Restaurant
  { id: "RES-8801", type: "restaurant", lat: 30.0450, lng: 31.2370, status: "seated",  label: "🍽️", desc: "Le Grill — table for 4",      time: "7:30 PM",          guests: 4     },
];

const TYPE_COLORS: Record<string, string> = {
  food: "#de8208", home: "#06854d", car: "#2563EB",
  roadside: "#EF4444", parcel: "#7C3AED", restaurant: "#DB8C00",
};

const TYPE_LABELS: Record<string, string> = {
  food: "Food Delivery", home: "Home Services", car: "Car Services",
  roadside: "Roadside", parcel: "Parcel", restaurant: "Restaurant",
};

function LeafletMap({ jobs, onSelect }: { jobs: typeof LIVE_JOBS; onSelect: (id: string) => void }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;
    const map = L.map(mapRef.current, { center: [30.0444, 31.2357], zoom: 12, scrollWheelZoom: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; };
  }, []);

  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    if (!jobs.length) return;

    const bounds: [number, number][] = [];
    jobs.forEach(job => {
      const color = TYPE_COLORS[job.type];
      const icon = L.divIcon({
        html: `<div style="background:${color};width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:12px;">${job.label}</span></div>`,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -34],
      });
      const marker = L.marker([job.lat, job.lng], { icon }).addTo(map);
      const personKey = "driver" in job ? `Driver: ${(job as any).driver}` : "provider" in job ? `Provider: ${(job as any).provider}` : "captain" in job ? `Captain: ${(job as any).captain}` : "";
      marker.bindPopup(`
        <div style="min-width:170px;font-family:Inter,sans-serif">
          <div style="font-weight:700;margin-bottom:4px;color:${color}">${job.label} ${TYPE_LABELS[job.type]}</div>
          <div style="font-size:12px;color:#64748B;margin-bottom:2px"><b>ID:</b> ${job.id}</div>
          <div style="font-size:12px;color:#64748B;margin-bottom:2px"><b>Job:</b> ${job.desc}</div>
          <div style="font-size:12px;color:#64748B;margin-bottom:2px"><b>Status:</b> <span style="background:${color}20;color:${color};padding:1px 6px;border-radius:4px">${job.status.replace(/_/g, " ")}</span></div>
          ${personKey ? `<div style="font-size:12px;color:#64748B;margin-bottom:2px">${personKey}</div>` : ""}
          ${"eta" in job ? `<div style="font-size:12px;color:#64748B;margin-top:4px"><b>ETA:</b> ${(job as any).eta}</div>` : ""}
        </div>
      `);
      marker.on("click", () => onSelect(job.id));
      bounds.push([job.lat, job.lng]);
      markersRef.current.push(marker);
    });

    if (bounds.length) map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
  }, [jobs, onSelect]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}

export function LiveMapPage() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "all" ? LIVE_JOBS : LIVE_JOBS.filter(j => j.type === filter);
  const types = ["all", "food", "home", "car", "roadside", "parcel", "restaurant"];
  const counts = Object.fromEntries(types.slice(1).map(t => [t, LIVE_JOBS.filter(j => j.type === t).length]));
  const handleSelect = useRef((id: string) => setSelected(id)).current;

  return (
    <div className="flex flex-col gap-4 h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
      <div className="grid grid-cols-6 gap-3">
        {types.slice(1).map(t => (
          <div key={t} onClick={() => setFilter(filter === t ? "all" : t)}
            className="rounded-xl p-3 cursor-pointer transition-all"
            style={{ background: filter === t ? TYPE_COLORS[t] + "18" : C.card, border: `1px solid ${filter === t ? TYPE_COLORS[t] : C.border}` }}>
            <div className="text-lg font-bold" style={{ color: TYPE_COLORS[t] }}>{counts[t]}</div>
            <div className="text-xs mt-0.5 font-medium" style={{ color: filter === t ? TYPE_COLORS[t] : C.textSecondary }}>{TYPE_LABELS[t]}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            style={{
              background: filter === t ? (t === "all" ? C.sidebar : TYPE_COLORS[t]) : C.card,
              color: filter === t ? "#fff" : C.textSecondary,
              border: `1px solid ${filter === t ? (t === "all" ? C.sidebar : TYPE_COLORS[t]) : C.border}`,
            }}>
            {t === "all" ? `All Active (${LIVE_JOBS.length})` : `${TYPE_LABELS[t]} (${counts[t]})`}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-1" style={{ minHeight: 520 }}>
        <div className="flex-1 rounded-2xl overflow-hidden border" style={{ borderColor: C.border }}>
          <LeafletMap jobs={filtered} onSelect={handleSelect} />
        </div>

        <div className="w-72 rounded-2xl border overflow-hidden flex flex-col" style={{ background: C.card, borderColor: C.border }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: C.border }}>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Live Activity Feed")}</div>
            <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{filtered.length} active jobs</div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: C.border }}>
            {filtered.map(job => (
              <div key={job.id}
                className="px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50/60"
                style={{ background: selected === job.id ? TYPE_COLORS[job.type] + "08" : undefined }}
                onClick={() => setSelected(selected === job.id ? null : job.id)}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base leading-none">{job.label}</span>
                  <span className="text-xs font-semibold" style={{ color: TYPE_COLORS[job.type] }}>{TYPE_LABELS[job.type]}</span>
                  <span className="ms-auto font-mono text-xs" style={{ color: C.textMuted }}>{job.id}</span>
                </div>
                <div className="text-xs mb-1" style={{ color: C.textPrimary }}>{job.desc}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ background: TYPE_COLORS[job.type] + "18", color: TYPE_COLORS[job.type] }}>
                    {job.status.replace(/_/g, " ")}
                  </span>
                  {"eta" in job && typeof (job as any).eta === "string" && (job as any).eta !== "ongoing" && (
                    <span className="text-xs" style={{ color: C.textMuted }}>ETA {(job as any).eta}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
