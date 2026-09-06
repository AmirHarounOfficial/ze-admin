import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Plus, MapPin, Star } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, SearchBar, PrimaryBtn, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge, OutlineBtn, Pagination } from "@/components/ui/CommonUI";

const allDrivers = [
  { id: "DRV-101", name: "Amr Mostafa",    phone: "+20 100 111 2233", zone: "Cairo Central", status: "on_delivery", deliveries: 18, rating: 4.9, vehicle: "Motorcycle", joined: "Feb 2024" },
  { id: "DRV-102", name: "Khaled Sami",    phone: "+20 111 444 5566", zone: "Heliopolis",    status: "available",   deliveries: 12, rating: 4.7, vehicle: "Scooter",    joined: "Mar 2024" },
  { id: "DRV-103", name: "Hassan Fawzy",   phone: "+20 101 777 8899", zone: "Maadi",         status: "offline",     deliveries: 0,  rating: 4.5, vehicle: "Motorcycle", joined: "Jan 2024" },
  { id: "DRV-104", name: "Tarek Ibrahim",  phone: "+20 122 333 4455", zone: "Nasr City",     status: "on_delivery", deliveries: 21, rating: 4.8, vehicle: "Bicycle",    joined: "Apr 2024" },
  { id: "DRV-105", name: "Samy Adel",      phone: "+20 100 555 6677", zone: "Giza",          status: "available",   deliveries: 9,  rating: 4.6, vehicle: "Scooter",    joined: "May 2024" },
  { id: "DRV-106", name: "Mohamed Gamal",  phone: "+20 111 222 3344", zone: "Dokki",         status: "on_delivery", deliveries: 14, rating: 4.9, vehicle: "Motorcycle", joined: "Mar 2024" },
];

export function DriversPage() {
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("All");
  const [driverStatuses, setDriverStatuses] = useState<Record<string, string>>({});

  const filtered = tab === "All" ? allDrivers
    : allDrivers.filter(d => {
        const st = driverStatuses[d.id] ?? d.status;
        if (tab === "On Delivery") return st === "on_delivery";
        if (tab === "Available")   return st === "available";
        if (tab === "Offline")     return st === "offline";
        return true;
      });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Drivers")}   value={allDrivers.length} />
        <Stat label={t("On Delivery")}     value={allDrivers.filter(d => d.status === "on_delivery").length} color={C.orange} />
        <Stat label={t("Available")}       value={allDrivers.filter(d => d.status === "available").length}   color={C.green}  />
        <Stat label={t("Offline")}         value={allDrivers.filter(d => d.status === "offline").length}     color={C.textMuted} />
      </div>

      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, zone, vehicle…")} />
        <PrimaryBtn small onClick={() => showToast("Driver invite link sent.")}><Plus size={12} />{t("Add Driver")}</PrimaryBtn>
      </div>

      <Tabs tabs={["All", "On Delivery", "Available", "Offline"]} active={tab} onChange={setTab} />

      <TableWrapper>
        <thead><tr><Th>{t("Driver ID")}</Th><Th>{t("Name")}</Th><Th>{t("Zone")}</Th><Th>{t("Vehicle")}</Th><Th>{t("Deliveries Today")}</Th><Th>{t("Rating")}</Th><Th>{t("Status")}</Th><Th></Th></tr></thead>
        <tbody>
          {filtered.map(d => {
            const status = driverStatuses[d.id] ?? d.status;
            return (
              <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{d.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={d.name} size={28} />{d.name}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{d.zone}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{d.vehicle}</span></Td>
                <Td mono>{d.deliveries}</Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill={C.gold} stroke="none" />
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{d.rating}</span>
                  </div>
                </Td>
                <Td><StatusBadge status={status} /></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <OutlineBtn small onClick={() => navigate(`/operations/food-delivery/drivers/${d.id}`)}>{t("View")}</OutlineBtn>
                    {status !== "offline" && (
                      <button className="text-xs px-2 py-1 rounded border font-medium"
                        style={{ borderColor: C.redLight, color: C.red, background: C.redLight }}
                        onClick={() => { setDriverStatuses(p => ({ ...p, [d.id]: "offline" })); showToast(`${d.name} set offline.`); }}>{t("Offline")}</button>
                    )}
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <Pagination total={`${allDrivers.length} drivers`} showing={`1–${filtered.length}`} />
    </div>
  );
}
