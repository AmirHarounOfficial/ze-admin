import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  Activity, Navigation, Bike, Timer, MapPin, Zap, AlertTriangle,
  CheckCircle2, Flame, ShieldAlert, Sliders, RefreshCw, Plus, Minus, Compass,
  Layers, Radio, Search
} from "lucide-react";
import { C, _dark, _lang } from "@/theme";
import { t } from "@/i18n";
import { districtDemandSupply } from "@/mock/mockData";
import { KPICard } from "@/components/ui/CommonUI";

export interface HeatmapHotspot {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  intensity: "extreme" | "high" | "moderate" | "low";
  pingsPerMin: number;
  surgeMultiplier: number;
  dominantVertical: string;
}

const DEMAND_HOTSPOTS: HeatmapHotspot[] = [
  { id: "HS-1", name: "New Cairo (90th St Axis)", city: "Cairo", lat: 30.0222, lng: 31.4763, intensity: "extreme", pingsPerMin: 1240, surgeMultiplier: 1.4, dominantVertical: "Food Delivery" },
  { id: "HS-2", name: "Heliopolis (Korba / Merghany)", city: "Cairo", lat: 30.0900, lng: 31.3250, intensity: "high", pingsPerMin: 890, surgeMultiplier: 1.3, dominantVertical: "Food Delivery" },
  { id: "HS-3", name: "Nasr City (Abbas El Akkad)", city: "Cairo", lat: 30.0600, lng: 31.3400, intensity: "high", pingsPerMin: 980, surgeMultiplier: 1.3, dominantVertical: "Home Services" },
  { id: "HS-4", name: "Maadi (Degla & Road 9)", city: "Cairo", lat: 30.0131, lng: 31.2089, intensity: "high", pingsPerMin: 780, surgeMultiplier: 1.2, dominantVertical: "Car Services" },
  { id: "HS-5", name: "Zamalek (26th of July)", city: "Cairo", lat: 30.0600, lng: 31.2200, intensity: "high", pingsPerMin: 690, surgeMultiplier: 1.2, dominantVertical: "Food Delivery" },
  { id: "HS-6", name: "Dokki & Mohandessin", city: "Giza", lat: 30.0400, lng: 31.2100, intensity: "extreme", pingsPerMin: 1110, surgeMultiplier: 1.4, dominantVertical: "Roadside Rescue" },
  { id: "HS-7", name: "6th of October (Sheikh Zayed)", city: "Giza", lat: 30.0100, lng: 30.9800, intensity: "high", pingsPerMin: 840, surgeMultiplier: 1.3, dominantVertical: "Home Services" },
  { id: "HS-8", name: "Downtown (Tahrir Square)", city: "Cairo", lat: 30.0444, lng: 31.2357, intensity: "moderate", pingsPerMin: 490, surgeMultiplier: 1.0, dominantVertical: "Parcel Network" },
  { id: "HS-9", name: "Ring Road (Munib Sector)", city: "Giza", lat: 29.9800, lng: 31.2150, intensity: "high", pingsPerMin: 720, surgeMultiplier: 1.3, dominantVertical: "Roadside Rescue" },
];

export function OperationsMapPage() {
  const [viewMode, setViewMode] = useState<"zones" | "heatmap">("zones");
  const [districts, setDistricts] = useState(districtDemandSupply);
  const [selectedDistrict, setSelectedDistrict] = useState(districtDemandSupply[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<HeatmapHotspot>(DEMAND_HOTSPOTS[0]);
  const [verticalFilter, setVerticalFilter] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const circlesRef = useRef<L.Circle[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  // Toggle surge pricing for a district
  function handleToggleSurge(districtName: string) {
    setDistricts(prev =>
      prev.map(d => {
        if (d.name === districtName) {
          const newStatus = !d.surgeActive;
          const newSurge = newStatus ? (d.surge === 1.0 ? 1.3 : d.surge) : 1.0;
          setToastMsg(
            newStatus
              ? `${t("Surge pricing")} ${newSurge}x ${t("activated for")} ${t(d.name)}`
              : `${t("Surge pricing deactivated for")} ${t(d.name)}`
          );
          setTimeout(() => setToastMsg(null), 3000);
          return { ...d, surgeActive: newStatus, surge: newSurge };
        }
        return d;
      })
    );
  }

  // Initialize Leaflet Map with OpenStreetMap tiles
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [30.0444, 31.2357],
      zoom: 11,
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

  // Update map canvas when viewMode or data changes
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    // Clear previous shapes & markers
    circlesRef.current.forEach(c => c.remove());
    markersRef.current.forEach(m => m.remove());
    circlesRef.current = [];
    markersRef.current = [];

    if (viewMode === "zones") {
      // MODE 1: Geofence Territory Zones
      districts.forEach(d => {
        const isSelected = selectedDistrict.name === d.name;
        const isDeficit = d.gap < 0;
        const circleColor = isDeficit ? "#EF4444" : "#06854d";
        const districtTitle = t(d.name);

        const circle = L.circle([d.lat, d.lng], {
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: isSelected ? 0.28 : 0.12,
          radius: isSelected ? 3400 : 2600,
          weight: isSelected ? 3 : 1.5,
        }).addTo(map);

        const icon = L.divIcon({
          html: `
            <div style="
              background: ${circleColor};
              color: #fff;
              padding: 4px 9px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 700;
              font-family: ${_lang === "ar" ? "'Alexandria', sans-serif" : "'Satoshi', sans-serif"};
              border: 2px solid #fff;
              box-shadow: 0 4px 14px rgba(0,0,0,0.35);
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 4px;
              cursor: pointer;
              direction: ${_lang === "ar" ? "rtl" : "ltr"};
            ">
              <span>${districtTitle}</span>
              <span style="background: rgba(255,255,255,0.25); padding: 1px 5px; border-radius: 6px; font-size: 10px;">
                ${d.activeOrders} ${t("Orders")}
              </span>
            </div>
          `,
          className: "",
          iconSize: [120, 26],
          iconAnchor: [60, 13],
        });

        const marker = L.marker([d.lat, d.lng], { icon }).addTo(map);

        marker.on("click", () => {
          setSelectedDistrict(d);
          map.flyTo([d.lat, d.lng], 13, { duration: 1.0 });
        });

        circle.on("click", () => {
          setSelectedDistrict(d);
          map.flyTo([d.lat, d.lng], 13, { duration: 1.0 });
        });

        circlesRef.current.push(circle);
        markersRef.current.push(marker);
      });
    } else {
      // MODE 2: Demand Density Heatmap
      DEMAND_HOTSPOTS.forEach(hs => {
        if (verticalFilter !== "all" && !hs.dominantVertical.toLowerCase().includes(verticalFilter)) {
          return;
        }

        const isSelected = selectedHotspot.id === hs.id;
        const color = hs.intensity === "extreme" ? "#EF4444" : hs.intensity === "high" ? "#F97316" : "#EAB308";

        // Concentric radial glow circles
        const outerCircle = L.circle([hs.lat, hs.lng], {
          color: "transparent",
          fillColor: color,
          fillOpacity: 0.12,
          radius: 3800,
          interactive: false,
        }).addTo(map);

        const midCircle = L.circle([hs.lat, hs.lng], {
          color: "transparent",
          fillColor: color,
          fillOpacity: 0.28,
          radius: 2200,
          interactive: false,
        }).addTo(map);

        const coreCircle = L.circle([hs.lat, hs.lng], {
          color: color,
          fillColor: color,
          fillOpacity: isSelected ? 0.65 : 0.45,
          radius: 1200,
          weight: 2,
        }).addTo(map);

        // Heatmap Badge Marker
        const icon = L.divIcon({
          html: `
            <div style="
              background: ${color};
              color: #fff;
              padding: 3px 8px;
              border-radius: 10px;
              font-size: 10px;
              font-weight: 800;
              font-family: ${_lang === "ar" ? "'Alexandria', sans-serif" : "'Satoshi', sans-serif"};
              border: 1.5px solid #fff;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 4px;
              cursor: pointer;
            ">
              <span>🔥 ${hs.pingsPerMin} ${t("pings/min")}</span>
              <span style="background: rgba(0,0,0,0.25); padding: 1px 4px; border-radius: 4px;">
                ${hs.surgeMultiplier}x
              </span>
            </div>
          `,
          className: "",
          iconSize: [120, 24],
          iconAnchor: [60, 12],
        });

        const marker = L.marker([hs.lat, hs.lng], { icon }).addTo(map);

        const handleSelect = () => {
          setSelectedHotspot(hs);
          map.flyTo([hs.lat, hs.lng], 13, { duration: 0.8 });
        };

        marker.on("click", handleSelect);
        coreCircle.on("click", handleSelect);

        circlesRef.current.push(outerCircle, midCircle, coreCircle);
        markersRef.current.push(marker);
      });
    }
  }, [viewMode, districts, selectedDistrict, selectedHotspot, verticalFilter]);

  const totalActiveJobs = districts.reduce((s, d) => s + d.activeOrders, 0);
  const totalFleetOnline = districts.reduce((s, d) => s + d.availableFleet, 0);
  const totalDeficit = districts.filter(d => d.gap < 0).length;

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 end-6 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold text-white bg-slate-900 border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard
          title={t("Total Active Jobs")}
          value={totalActiveJobs.toString()}
          sub={t("In-flight bookings across zones")}
          trend="+12%"
          trendUp
          icon={<Activity size={15} />}
          accent={C.green}
        />
        <KPICard
          title={t("Active Fleet Online")}
          value={totalFleetOnline.toString()}
          sub={t("Ready & in-dispatch status")}
          trend="+8%"
          trendUp
          icon={<Navigation size={15} />}
          accent={C.blue}
        />
        <KPICard
          title={t("Fleet Deficit Zones")}
          value={`${totalDeficit} ${t("Districts")}`}
          sub={t("Demand exceeding available fleet")}
          trend={t("Surge Active")}
          trendUp={false}
          icon={<AlertTriangle size={15} />}
          accent={C.red}
        />
        <KPICard
          title={t("Avg Dispatch Time")}
          value="3.8 min"
          sub={t("City-wide SLA target < 4.5 min")}
          trend="-0.4m"
          trendUp
          icon={<Timer size={15} />}
          accent={C.gold}
        />
      </div>

      {/* Main Grid: Interactive Zone Map & District Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: OpenStreetMap Territory Map */}
        <div
          className="lg:col-span-2 rounded-2xl border overflow-hidden flex flex-col shadow-xs relative"
          style={{ background: C.card, borderColor: C.border, minHeight: 560 }}
        >
          {/* Map Header with View Mode Switch */}
          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10" style={{ borderColor: C.border }}>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>
                  {viewMode === "zones" ? t("Geofence Territory & Supply/Demand Map") : t("Demand Density Heatmap")}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono" style={{ background: C.greenLight, color: C.green }}>
                  OpenStreetMap
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: C.textMuted }}>
                {viewMode === "zones"
                  ? t("Click any district marker to inspect fleet density, demand surges, and geofence coverage.")
                  : t("Real-time customer app pings and demand concentration clusters.")}
              </p>
            </div>

            {/* View Mode Toggle Button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl border" style={{ borderColor: C.border, background: C.bg }}>
                <button
                  onClick={() => setViewMode("zones")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "zones"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <Layers size={13} />
                  <span>{t("Geofence Zones")}</span>
                </button>
                <button
                  onClick={() => setViewMode("heatmap")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "heatmap"
                      ? "bg-red-600 text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <Flame size={13} />
                  <span>{t("Demand Heatmap")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-toolbar for Heatmap Filters */}
          {viewMode === "heatmap" && (
            <div className="px-4 py-2 border-b flex items-center justify-between gap-2 flex-wrap z-10" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: C.textSecondary }}>{t("Vertical Filter")}:</span>
                <div className="flex items-center gap-1">
                  {["all", "food", "roadside", "home", "car"].map(v => (
                    <button
                      key={v}
                      onClick={() => setVerticalFilter(v)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                        verticalFilter === v
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : "border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {v === "all" ? t("All") : t(v.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-3 text-[11px] font-medium">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> {t("Moderate")}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> {t("High Demand")}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> {t("Extreme Surge")}</span>
              </div>
            </div>
          )}

          {/* Map Container & Floating Controls */}
          <div className="flex-1 relative" style={{ minHeight: 440 }}>
            <div ref={mapRef} className="absolute inset-0 w-full h-full" />

            {/* Floating Map Zoom & Recenter Controls */}
            <div className="absolute top-4 end-4 z-[1000] flex flex-col gap-1.5">
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
                onClick={() => leafletMap.current?.flyTo([30.0444, 31.2357], 11, { duration: 0.8 })}
                className="w-8 h-8 rounded-xl border shadow-md flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: C.card, borderColor: C.border, color: C.gold }}
                title={t("Reset Center")}
              >
                <Compass size={14} />
              </button>
            </div>
          </div>

          {/* Selected Telemetry Footer */}
          <div className="p-4 border-t flex items-center justify-between gap-4 flex-wrap z-10" style={{ background: C.bg, borderColor: C.border }}>
            {viewMode === "zones" ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.goldLight, color: C.gold }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold" style={{ color: C.textPrimary }}>
                      {t(selectedDistrict.name)} ({t(selectedDistrict.city)})
                    </span>
                    <div className="text-[11px] font-mono" style={{ color: C.textMuted }}>
                      {t("Orders")}: <b style={{ color: C.textPrimary }}>{selectedDistrict.activeOrders}</b> • {t("Fleet")}: <b style={{ color: C.textPrimary }}>{selectedDistrict.availableFleet}</b> • {t("Wait")}: <b style={{ color: C.textSecondary }}>{selectedDistrict.avgWait}</b>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-end">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: selectedDistrict.gap < 0 ? C.redLight : C.greenLight,
                        color: selectedDistrict.gap < 0 ? C.red : C.green,
                      }}
                    >
                      {selectedDistrict.gap < 0 ? `${selectedDistrict.gap} ${t("Fleet Deficit")}` : `+${selectedDistrict.gap} ${t("Surplus")}`}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleSurge(selectedDistrict.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs"
                    style={{
                      background: selectedDistrict.surgeActive ? C.gold : C.card,
                      color: selectedDistrict.surgeActive ? "#fff" : C.textPrimary,
                      borderColor: selectedDistrict.surgeActive ? C.gold : C.border,
                    }}
                  >
                    <Flame size={13} className={selectedDistrict.surgeActive ? "animate-bounce" : ""} />
                    <span>{selectedDistrict.surgeActive ? `${t("Surge Active")} (${selectedDistrict.surge}x)` : t("Activate Surge")}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-red-500/10 text-red-500">
                    <Flame size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold" style={{ color: C.textPrimary }}>
                      {selectedHotspot.name} — {selectedHotspot.city}
                    </span>
                    <div className="text-[11px] font-mono" style={{ color: C.textMuted }}>
                      {t("Customer App Pings")}: <b className="text-red-500">{selectedHotspot.pingsPerMin}/min</b> • {t("Dominant")}: <b>{selectedHotspot.dominantVertical}</b>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                    {t("Surge Rate")}: {selectedHotspot.surgeMultiplier}x
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right 1 Col: Dynamic Roster (Zones or Hotspots) */}
        <div className="rounded-2xl border p-4 shadow-xs flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: C.textPrimary }}>
                  {viewMode === "zones" ? t("District Demand Matrix") : t("Demand Density Clusters")}
                </h3>
                <p className="text-[10px]" style={{ color: C.textMuted }}>
                  {viewMode === "zones" ? t("Real-time orders vs available fleet by zone") : t("Top active customer request concentrations")}
                </p>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                {viewMode === "zones" ? `${districts.length} ${t("Zones")}` : `${DEMAND_HOTSPOTS.length} ${t("Hotspots")}`}
              </span>
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {viewMode === "zones" ? (
                districts.map(d => {
                  const isSelected = selectedDistrict.name === d.name;
                  const isDeficit = d.gap < 0;

                  return (
                    <div
                      key={d.name}
                      onClick={() => {
                        setSelectedDistrict(d);
                        if (leafletMap.current) {
                          leafletMap.current.flyTo([d.lat, d.lng], 13, { duration: 1.0 });
                        }
                      }}
                      className="p-3 rounded-xl border cursor-pointer transition-all hover:border-opacity-100"
                      style={{
                        borderColor: isSelected ? C.gold : C.border,
                        background: isSelected ? `${C.gold}08` : C.bg,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="font-bold text-xs truncate" style={{ color: C.textPrimary }}>
                          {t(d.name)}
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: isDeficit ? C.redLight : C.greenLight,
                            color: isDeficit ? C.red : C.green,
                          }}
                        >
                          {isDeficit ? `${d.gap} ${t("Deficit")}` : `+${d.gap} ${t("Surplus")}`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: C.textMuted }}>
                        <span>{t("Orders")}: <b style={{ color: C.textPrimary }}>{d.activeOrders}</b></span>
                        <span>{t("Fleet")}: <b style={{ color: C.textPrimary }}>{d.availableFleet}</b></span>
                        <span>{t("Wait")}: <b style={{ color: C.textSecondary }}>{d.avgWait}</b></span>
                      </div>
                    </div>
                  );
                })
              ) : (
                DEMAND_HOTSPOTS.map(hs => {
                  const isSelected = selectedHotspot.id === hs.id;
                  const color = hs.intensity === "extreme" ? "#EF4444" : hs.intensity === "high" ? "#F97316" : "#EAB308";

                  return (
                    <div
                      key={hs.id}
                      onClick={() => {
                        setSelectedHotspot(hs);
                        if (leafletMap.current) {
                          leafletMap.current.flyTo([hs.lat, hs.lng], 13, { duration: 0.8 });
                        }
                      }}
                      className="p-3 rounded-xl border cursor-pointer transition-all hover:border-opacity-100"
                      style={{
                        borderColor: isSelected ? color : C.border,
                        background: isSelected ? `${color}10` : C.bg,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-xs truncate" style={{ color: C.textPrimary }}>
                          {hs.name}
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${color}20`, color }}
                        >
                          {hs.surgeMultiplier}x Surge
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px]" style={{ color: C.textMuted }}>
                        <span className="font-mono font-bold" style={{ color }}>{hs.pingsPerMin} pings/min</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">{hs.dominantVertical}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
