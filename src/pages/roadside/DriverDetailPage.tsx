import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { AlertTriangle, Lock, Package, Star, Activity } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, KPICard, InfoCard, InfoRow, Tabs, TableWrapper, Th, Td, StarRating
} from "@/components/ui/CommonUI";

const platformDrivers = [
  { id: "D-401", name: "Maged Samir",    restaurant: "Burger Hub",      restId: "RS-102", vehicle: "Bike",       zone: "Dokki",       deliveries: 12, rating: 4.8, violations: 0, status: "available", verified: true  },
  { id: "D-402", name: "Islam Nabil",    restaurant: "Le Grill",        restId: "RS-101", vehicle: "Motorcycle", zone: "Heliopolis",  deliveries: 9,  rating: 4.6, violations: 1, status: "busy",      verified: true  },
  { id: "D-403", name: "Ramy Fouad",     restaurant: "Nile Brasserie",  restId: "RS-104", vehicle: "Bike",       zone: "Zamalek",     deliveries: 15, rating: 4.9, violations: 0, status: "available", verified: true  },
  { id: "D-404", name: "Ahmed Gouda",    restaurant: "Spice Route",     restId: "RS-105", vehicle: "Scooter",    zone: "Maadi",       deliveries: 7,  rating: 4.4, violations: 2, status: "busy",      verified: true  },
  { id: "D-405", name: "Karim Zidan",    restaurant: "Burger Hub",      restId: "RS-102", vehicle: "Motorcycle", zone: "New Cairo",   deliveries: 3,  rating: 4.5, violations: 0, status: "offline",   verified: true  },
  { id: "D-406", name: "Hossam Wael",    restaurant: "Lotus Garden",    restId: "RS-103", vehicle: "Bike",       zone: "Giza",        deliveries: 11, rating: 4.7, violations: 0, status: "available", verified: true  },
  { id: "D-407", name: "Sherif Hassan",  restaurant: "Le Grill",        restId: "RS-101", vehicle: "Scooter",    zone: "Zamalek",     deliveries: 0,  rating: 0,   violations: 0, status: "offline",   verified: false },
];

export function DriverDetailPage() {
  const { id = "D-401" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("Delivery History");
  const driver = platformDrivers.find(d => d.id === id) ?? platformDrivers[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/food-delivery" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={driver.name} size={44} />
          <DetailHeader title={driver.name} id={id} subtitle={`${driver.restaurant} · ${driver.zone}`} badge={driver.status} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn small onClick={() => showToast("Warning issued to driver.")}><AlertTriangle size={13} />{t("Warn")}</OutlineBtn>
          <OutlineBtn small onClick={() => showToast("Driver suspended.")}><Lock size={13} />{t("Suspend")}</OutlineBtn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Deliveries (Month)")} value="142"             sub={t("Current month")}      trend="+18"  trendUp icon={<Package size={15} />}   accent={C.green}  />
        <KPICard title={t("Rating")}             value={String(driver.rating)} sub={t("Avg customer rating")} trend="+0.2" trendUp icon={<Star size={15} />} accent={C.orange} />
        <KPICard title={t("Violations")}         value={String(driver.violations)} sub={t("Logged incidents")} trend={driver.violations > 0 ? "+1" : "0"} trendUp={false} icon={<AlertTriangle size={15} />} accent={C.red} />
        <KPICard title={t("Online Hours")}       value="6.4 hrs"         sub={t("Today")}               trend="+0.8" trendUp icon={<Activity size={15} />}  accent={C.blue}   />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard title={t("Driver Info")}>
          <InfoRow label={t("Driver ID")}         value={id} mono />
          <InfoRow label={t("Name")}              value={driver.name} />
          <InfoRow label={t("Vehicle")}           value={driver.vehicle} />
          <InfoRow label={t("Zone")}              value={driver.zone} />
          <InfoRow label={t("Assigned To")}       value={driver.restaurant} />
          <InfoRow label={t("Verification")}      value={<span style={{ color: driver.verified ? C.green : C.orange }}>{driver.verified ? "✓ Verified" : "⚠ Pending"}</span>} />
          <InfoRow label={t("Phone")}             value="+20 101 000 2233" mono />
        </InfoCard>
        <div className="col-span-2">
          <Tabs tabs={["Delivery History", "Violations"]} active={tab} onChange={setTab} />
          {tab === "Delivery History" && (
            <TableWrapper>
              <thead><tr><Th>{t("Order ID")}</Th><Th>{t("Restaurant")}</Th><Th>{t("Zone")}</Th><Th>{t("Duration")}</Th><Th>{t("Rating")}</Th><Th>{t("Date")}</Th></tr></thead>
              <tbody>
                {[
                  { id: "ORD-7701", rest: driver.restaurant, zone: driver.zone, duration: "22 min", rating: 5, date: "Jul 09" },
                  { id: "ORD-7695", rest: driver.restaurant, zone: driver.zone, duration: "18 min", rating: 4, date: "Jul 09" },
                  { id: "ORD-7688", rest: driver.restaurant, zone: driver.zone, duration: "31 min", rating: 3, date: "Jul 08" },
                  { id: "ORD-7672", rest: driver.restaurant, zone: driver.zone, duration: "25 min", rating: 5, date: "Jul 08" },
                ].map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td mono>{o.id}</Td><Td>{o.rest}</Td><Td>{o.zone}</Td>
                    <Td>{o.duration}</Td><Td><StarRating rating={o.rating} /></Td><Td>{o.date}</Td>
                  </tr>
                ))}
              </tbody>
            </TableWrapper>
          )}
          {tab === "Violations" && (
            <div className="space-y-3 mt-3">
              {driver.violations > 0 ? [
                { id: "VL-101", type: "Late Delivery (>30 min)", date: "Jul 05", severity: "warning", note: "Customer reported 35-min delay on rainy day" },
                ...(driver.violations > 1 ? [{ id: "VL-100", type: "Item Missing — Customer Complaint", date: "Jun 28", severity: "critical", note: "One item missing from order ORD-7544" }] : []),
              ].map(v => (
                <div key={v.id} className="rounded-xl border p-4" style={{ background: C.card, borderColor: v.severity === "critical" ? C.red : C.orange }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: C.textPrimary }}>{v.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: v.severity === "critical" ? C.redLight : C.orangeLight, color: v.severity === "critical" ? C.red : C.orange }}>{v.severity}</span>
                  </div>
                  <div className="text-xs" style={{ color: C.textMuted }}>{v.date} · {v.note}</div>
                </div>
              )) : <div className="text-sm text-center py-8" style={{ color: C.textMuted }}>{t("No violations recorded.")}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
