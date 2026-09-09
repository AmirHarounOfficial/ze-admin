import React, { useState, useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import {
  Search, Play, Pause, Compass, Layers, Phone, Navigation,
  Clock, ShieldAlert, ArrowRight, X, ExternalLink, RefreshCw,
  Plus, Minus, Gauge
} from "lucide-react";
import { C, _dark, _lang } from "@/theme";
import { t } from "@/i18n";
import { OrderDetailModal, DetailedBooking } from "@/components/overview/OrderDetailModal";
import { detailedRecentBookings } from "@/mock/mockData";

export interface LiveJob {
  id: string;
  type: "food" | "home" | "car" | "roadside" | "parcel" | "restaurant";
  lat: number;
  lng: number;
  status: string;
  label: string;
  desc: string;
  personName: string;
  personRole: string;
  personPhone: string;
  eta: string;
  customer: string;
  speedKmh?: number;
}

const INITIAL_LIVE_JOBS: LiveJob[] = [
  { id: "ORD-7701", type: "food", lat: 30.0561, lng: 31.2394, status: "delivering", label: "🍔", desc: "Burger Hub → Dokki", personName: "Amr Mostafa", personRole: "Courier", personPhone: "+20 109 443 2211", eta: "4 min", customer: "Nour Ali", speedKmh: 34 },
  { id: "ORD-7700", type: "food", lat: 30.0406, lng: 31.2258, status: "preparing", label: "🍕", desc: "Pizza Palace → Zamalek", personName: "Khaled Sami", personRole: "Courier", personPhone: "+20 101 556 7788", eta: "12 min", customer: "Tarek Fayed", speedKmh: 0 },
  { id: "ORD-7699", type: "food", lat: 30.0744, lng: 31.2902, status: "delivering", label: "🥗", desc: "Salad Bar → Heliopolis", personName: "Tarek Ibrahim", personRole: "Courier", personPhone: "+20 114 778 9900", eta: "7 min", customer: "Dina Mansour", speedKmh: 28 },
  { id: "HSB-901", type: "home", lat: 30.0131, lng: 31.2089, status: "in_progress", label: "🔧", desc: "Plumbing Service — Maadi", personName: "Mahmoud Sobhy", personRole: "Master Plumber", personPhone: "+20 102 334 5566", eta: "ongoing", customer: "Sara Mohamed", speedKmh: 0 },
  { id: "HSB-902", type: "home", lat: 30.0660, lng: 31.3381, status: "en_route", label: "🧹", desc: "Deep Clean — Nasr City", personName: "Hassan Emad", personRole: "Specialist", personPhone: "+20 100 111 2233", eta: "15 min", customer: "Nabila Zaki", speedKmh: 22 },
  { id: "CJ-801", type: "car", lat: 30.0150, lng: 31.2100, status: "in_progress", label: "🚗", desc: "Mobile Car Wash — Maadi", personName: "Karim Zidan", personRole: "Auto Tech", personPhone: "+20 106 778 9900", eta: "ongoing", customer: "Ahmed Khaled", speedKmh: 0 },
  { id: "CJ-802", type: "car", lat: 30.0922, lng: 31.3297, status: "en_route", label: "🔩", desc: "Tyre Replacement — Rehab", personName: "Wael Samir", personRole: "Mobile Mechanic", personPhone: "+20 112 334 4455", eta: "20 min", customer: "Karim Safwat", speedKmh: 42 },
  { id: "INC-441", type: "roadside", lat: 30.0800, lng: 31.2800, status: "dispatched", label: "🚨", desc: "Battery Dead — Ring Road", personName: "Mostafa Nasser", personRole: "Road Captain", personPhone: "+20 100 223 4455", eta: "8 min", customer: "Layla Hassan", speedKmh: 58 },
  { id: "INC-440", type: "roadside", lat: 30.0500, lng: 31.3500, status: "on_site", label: "🔋", desc: "Emergency Tow — New Cairo", personName: "Hany Nabil", personRole: "Flatbed Tow", personPhone: "+20 114 556 7788", eta: "ongoing", customer: "Adel Mourad", speedKmh: 0 },
  { id: "PKG-5501", type: "parcel", lat: 30.0600, lng: 31.2200, status: "in_transit", label: "📦", desc: "Express Parcel → Agouza", personName: "Samy Adel", personRole: "Dispatch Courier", personPhone: "+20 109 223 1144", eta: "22 min", customer: "Mohamed Gamal", speedKmh: 31 },
  { id: "PKG-5500", type: "parcel", lat: 30.0222, lng: 31.4763, status: "out_for_delivery", label: "📫", desc: "Legal Docs → 5th Settl.", personName: "Adel Ibrahim", personRole: "Courier", personPhone: "+20 122 777 8899", eta: "35 min", customer: "Sherif Helal", speedKmh: 45 },
  { id: "RES-8801", type: "restaurant", lat: 30.0450, lng: 31.2370, status: "seated", label: "🍽️", desc: "Le Grill — Table for 4", personName: "Maitre D' Hany", personRole: "Host", personPhone: "+20 101 443 2211", eta: "7:30 PM", customer: "Youssef Fathy", speedKmh: 0 },
];

const TYPE_COLORS: Record<string, string> = {
  food: "#de8208",
  home: "#06854d",
  car: "#2563EB",
  roadside: "#EF4444",
  parcel: "#7C3AED",
  restaurant: "#DB8C00",
};

const TYPE_LABELS: Record<string, string> = {
  food: "Food Delivery",
  home: "Home Services",
  car: "Car Services",
  roadside: "Roadside Rescue",
  parcel: "Parcel Network",
  restaurant: "Dining & Bookings",
};

export function LiveMapPage() {
  const [jobs, setJobs] = useState<LiveJob[]>(INITIAL_LIVE_JOBS);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(true);
  const [showSpeeds, setShowSpeeds] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [inspectedBooking, setInspectedBooking] = useState<DetailedBooking | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersMap = useRef<Record<string, L.Marker>>({});

  // Real-Time Fleet Movement Simulation
  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      setJobs(prevJobs =>
        prevJobs.map(job => {
          if (["delivering", "en_route", "dispatched", "in_transit", "out_for_delivery"].includes(job.status)) {
            const dLat = (Math.random() - 0.48) * 0.0006;
            const dLng = (Math.random() - 0.48) * 0.0006;
            return {
              ...job,
              lat: job.lat + dLat,
              lng: job.lng + dLng,
              speedKmh: Math.max(15, Math.min(65, (job.speedKmh || 30) + Math.floor((Math.random() - 0.5) * 6))),
            };
          }
          return job;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [simulating]);

  // Initialize Map with OpenStreetMap
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [30.0444, 31.2357],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    const tileUrl = _dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    leafletMap.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesType = filterType === "all" || j.type === filterType;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        j.id.toLowerCase().includes(q) ||
        j.personName.toLowerCase().includes(q) ||
        j.customer.toLowerCase().includes(q) ||
        j.desc.toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [jobs, filterType, searchQuery]);

  // Update Markers on Leaflet Map
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    // Remove old markers
    Object.values(markersMap.current).forEach(m => m.remove());
    markersMap.current = {};

    filteredJobs.forEach(job => {
      const color = TYPE_COLORS[job.type];
      const isSelected = selectedJobId === job.id;
      const localizedType = t(TYPE_LABELS[job.type]);
      const localizedStatus = t(job.status);
      const localizedRole = t(job.personRole);

      const icon = L.divIcon({
        html: `
          <div style="
            position: relative;
            background: ${color};
            width: ${isSelected ? "38px" : "30px"};
            height: ${isSelected ? "38px" : "30px"};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2.5px solid #fff;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <span style="transform: rotate(45deg); font-size: ${isSelected ? "15px" : "12px"};">${job.label}</span>
            ${showSpeeds && job.speedKmh && job.speedKmh > 0 ? `
              <span style="
                position: absolute;
                top: -8px;
                right: -8px;
                background: #0F172A;
                color: #fff;
                font-size: 8px;
                font-weight: bold;
                padding: 1px 3px;
                border-radius: 4px;
                transform: rotate(45deg);
                border: 1px solid #334155;
              ">${job.speedKmh}k</span>
            ` : ""}
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([job.lat, job.lng], { icon }).addTo(map);

      // Interactive Popup
      marker.bindPopup(`
        <div style="
          min-width: 190px;
          font-family: ${_lang === "ar" ? "'Alexandria', sans-serif" : "'Satoshi', sans-serif"};
          direction: ${_lang === "ar" ? "rtl" : "ltr"};
          text-align: ${_lang === "ar" ? "right" : "left"};
        ">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 700; color: ${color}; font-size: 13px;">${job.label} ${localizedType}</span>
            <span style="font-family: monospace; font-size: 11px; color: #64748B;">${job.id}</span>
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #0F172A; margin-bottom: 4px;">${job.desc}</div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 2px;">
            <b>${localizedRole}:</b> ${job.personName}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; padding-top: 4px; border-top: 1px solid #E2E8F0;">
            <span style="background: ${color}20; color: ${color}; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px;">
              ${localizedStatus}
            </span>
            <span style="font-size: 11px; font-weight: 600; color: #DB8C00;">
              ETA: ${job.eta}
            </span>
          </div>
        </div>
      `);

      marker.on("click", () => {
        setSelectedJobId(job.id);
        map.flyTo([job.lat, job.lng], 14, { duration: 0.8 });
      });

      markersMap.current[job.id] = marker;
    });
  }, [filteredJobs, selectedJobId, showSpeeds]);

  // Fly to selected job
  function handleSelectJob(job: LiveJob) {
    setSelectedJobId(job.id);
    if (leafletMap.current) {
      leafletMap.current.flyTo([job.lat, job.lng], 15, { duration: 0.9 });
      const marker = markersMap.current[job.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }

  // Inspect full order modal
  function handleInspect(job: LiveJob) {
    const found = detailedRecentBookings.find(b => b.id.includes(job.id.slice(-4))) || detailedRecentBookings[0];
    setInspectedBooking(found);
  }

  const types = ["all", "food", "home", "car", "roadside", "parcel", "restaurant"];
  const counts = Object.fromEntries(types.slice(1).map(t => [t, jobs.filter(j => j.type === t).length]));

  return (
    <div className="flex flex-col gap-4 h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 end-6 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold text-white bg-slate-900 border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Control Bar: Vertical Filter Chips & Live Telemetry Controls */}
      <div
        className="p-3 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs"
        style={{ background: C.card, borderColor: C.border }}
      >
        {/* Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {types.map(tKey => {
            const isSelected = filterType === tKey;
            const badgeCount = tKey === "all" ? jobs.length : counts[tKey];

            return (
              <button
                key={tKey}
                onClick={() => setFilterType(tKey)}
                className="text-xs px-3 py-1.5 rounded-xl font-semibold transition-all duration-150 flex items-center gap-1.5 border"
                style={{
                  background: isSelected
                    ? (tKey === "all" ? C.sidebar : TYPE_COLORS[tKey])
                    : C.bg,
                  color: isSelected ? "#fff" : C.textSecondary,
                  borderColor: isSelected
                    ? (tKey === "all" ? C.sidebar : TYPE_COLORS[tKey])
                    : C.border,
                }}
              >
                <span>{tKey === "all" ? t("All Verticals") : t(TYPE_LABELS[tKey])}</span>
                <span
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-mono"
                  style={{
                    background: isSelected ? "rgba(255,255,255,0.25)" : C.border,
                    color: isSelected ? "#fff" : C.textPrimary,
                  }}
                >
                  {badgeCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Telemetry Simulator Toggle & Search */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setShowSpeeds(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors shadow-2xs"
            style={{
              background: showSpeeds ? C.card : C.bg,
              borderColor: C.border,
              color: showSpeeds ? C.gold : C.textSecondary,
            }}
            title={showSpeeds ? t("Hide Speeds") : t("Show Speeds")}
          >
            <Gauge size={13} />
            <span>{showSpeeds ? t("Hide Speeds") : t("Show Speeds")}</span>
          </button>

          <button
            onClick={() => setSimulating(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors shadow-2xs"
            style={{
              background: simulating ? C.greenLight : C.bg,
              borderColor: simulating ? `${C.green}40` : C.border,
              color: simulating ? C.green : C.textSecondary,
            }}
          >
            {simulating ? <Pause size={12} /> : <Play size={12} />}
            <span>{simulating ? t("Telemetry Active (Auto)") : t("Telemetry Paused")}</span>
          </button>
        </div>
      </div>

      {/* Main Map + Live Feed Split View */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1" style={{ minHeight: 560 }}>
        {/* OpenStreetMap Canvas */}
        <div
          className="flex-1 rounded-2xl overflow-hidden border relative shadow-xs"
          style={{ borderColor: C.border, minHeight: 450 }}
        >
          <div ref={mapRef} className="absolute inset-0 w-full h-full" />

          {/* Map Overlay Badge */}
          <div
            className="absolute top-3.5 start-3.5 z-[1000] px-3 py-1.5 rounded-xl border shadow-md flex items-center gap-2 backdrop-blur-md"
            style={{ background: `${C.card}E6`, borderColor: C.border }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold" style={{ color: C.textPrimary }}>
              {filteredJobs.length} {t("Active GPS Units on Map")}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded font-mono" style={{ background: C.greenLight, color: C.green }}>
              OpenStreetMap
            </span>
          </div>

          {/* Floating Zoom & Center Controls */}
          <div className="absolute top-3.5 end-3.5 z-[1000] flex flex-col gap-1.5">
            <button
              onClick={() => leafletMap.current?.zoomIn()}
              className="w-8 h-8 rounded-xl border shadow-md flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
              title={t("Zoom In")}
            >
              <Plus size={14} />
            </button>
            <button
              onClick={() => leafletMap.current?.zoomOut()}
              className="w-8 h-8 rounded-xl border shadow-md flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
              title={t("Zoom Out")}
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => leafletMap.current?.flyTo([30.0444, 31.2357], 12, { duration: 0.8 })}
              className="w-8 h-8 rounded-xl border shadow-md flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: C.card, borderColor: C.border, color: C.gold }}
              title={t("Reset Center")}
            >
              <Compass size={14} />
            </button>
          </div>
        </div>

        {/* Right Drawer: Live Activity Stream & Inspector */}
        <div
          className="w-full lg:w-80 rounded-2xl border flex flex-col shadow-xs overflow-hidden shrink-0"
          style={{ background: C.card, borderColor: C.border, maxHeight: 680 }}
        >
          {/* Header & Search */}
          <div className="p-3.5 border-b space-y-2.5 shrink-0" style={{ borderColor: C.border }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.textPrimary }}>
                {t("Live Fleet Roster")}
              </span>
              <span className="text-[11px] font-mono" style={{ color: C.textMuted }}>
                {filteredJobs.length} {t("in flight")}
              </span>
            </div>

            <div
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border"
              style={{ background: C.bg, borderColor: C.border }}
            >
              <Search size={13} style={{ color: C.textMuted }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t("Filter by driver, ID, or user…")}
                className="bg-transparent text-xs outline-none flex-1 font-medium"
                style={{ color: C.textPrimary }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={12} style={{ color: C.textMuted }} />
                </button>
              )}
            </div>
          </div>

          {/* List of Active Jobs */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-200/40 dark:divide-slate-800" style={{ scrollbarWidth: "thin" }}>
            {filteredJobs.map(job => {
              const isSelected = selectedJobId === job.id;
              const color = TYPE_COLORS[job.type];

              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className="p-3.5 cursor-pointer transition-all hover:bg-slate-500/5 group"
                  style={{
                    background: isSelected ? `${color}12` : undefined,
                    borderInlineStart: isSelected ? `3px solid ${color}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-sm leading-none">{job.label}</span>
                      <span className="text-xs font-bold truncate" style={{ color }}>
                        {t(TYPE_LABELS[job.type])}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold shrink-0" style={{ color: C.textMuted }}>
                      {job.id}
                    </span>
                  </div>

                  <div className="text-xs font-medium truncate mt-0.5" style={{ color: C.textPrimary }}>
                    {job.desc}
                  </div>

                  <div className="flex items-center justify-between text-[11px] mt-1.5 pt-1 border-t" style={{ borderColor: `${C.border}40` }}>
                    <div className="truncate text-slate-500 dark:text-slate-400">
                      <b>{t(job.personRole)}:</b> {job.personName}
                    </div>
                    {job.speedKmh && job.speedKmh > 0 ? (
                      <span className="font-mono font-bold text-[10px]" style={{ color: C.green }}>
                        {job.speedKmh} km/h
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono" style={{ color: C.textMuted }}>
                        {t("Idle / On-Site")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.2 rounded capitalize"
                      style={{ background: `${color}18`, color }}
                    >
                      {t(job.status)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInspect(job);
                      }}
                      className="text-[10px] flex items-center gap-1 font-semibold opacity-75 group-hover:opacity-100 hover:underline"
                      style={{ color }}
                    >
                      <span>{t("Inspect Order")}</span>
                      <ArrowRight size={10} className="rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredJobs.length === 0 && (
              <div className="p-8 text-center text-xs" style={{ color: C.textMuted }}>
                {t("No active fleet units match your filter.")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        booking={inspectedBooking}
        onClose={() => setInspectedBooking(null)}
        onActionSuccess={(msg) => {
          setToastMsg(msg);
          setTimeout(() => setToastMsg(null), 3000);
        }}
      />
    </div>
  );
}
