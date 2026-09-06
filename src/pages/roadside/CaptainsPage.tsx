import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Plus, MapPin, Star } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, SearchBar, PrimaryBtn, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge, Pagination } from "@/components/ui/CommonUI";

const allCaptains = [
  { id: "CAP-201", name: "Mostafa Nasser",  phone: "+20 100 111 2233", zone: "Cairo Ring Road", status: "on_job",    jobs: 5,  rating: 4.8, vehicle: "Tow Truck",    joined: "Jan 2024" },
  { id: "CAP-202", name: "Ahmed Fawzy",     phone: "+20 111 333 4455", zone: "Alexandria",      status: "available", jobs: 3,  rating: 4.9, vehicle: "Service Van",  joined: "Feb 2024" },
  { id: "CAP-203", name: "Wael Samir",      phone: "+20 101 555 6677", zone: "Giza Plateau",    status: "offline",   jobs: 0,  rating: 4.6, vehicle: "Tow Truck",    joined: "Mar 2024" },
  { id: "CAP-204", name: "Karim Barakat",   phone: "+20 122 777 8899", zone: "6th October",     status: "on_job",    jobs: 7,  rating: 4.7, vehicle: "Recovery Truck", joined: "Apr 2024" },
  { id: "CAP-205", name: "Sherif Mansour",  phone: "+20 100 999 0011", zone: "New Cairo",       status: "available", jobs: 2,  rating: 4.9, vehicle: "Service Van",  joined: "Jan 2024" },
];

export function CaptainsPage() {
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("All");
  const [capStatuses, setCapStatuses] = useState<Record<string, string>>({});

  const filtered = tab === "All" ? allCaptains
    : allCaptains.filter(c => {
        const st = capStatuses[c.id] ?? c.status;
        if (tab === "On Job")    return st === "on_job";
        if (tab === "Available") return st === "available";
        if (tab === "Offline")   return st === "offline";
        return true;
      });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Captains")} value={allCaptains.length} />
        <Stat label={t("On Job")}         value={allCaptains.filter(c => c.status === "on_job").length}    color={C.orange} />
        <Stat label={t("Available")}      value={allCaptains.filter(c => c.status === "available").length} color={C.green}  />
        <Stat label={t("Offline")}        value={allCaptains.filter(c => c.status === "offline").length}   color={C.textMuted} />
      </div>

      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, zone, vehicle…")} />
        <PrimaryBtn small onClick={() => showToast("Captain onboarding link sent.")}><Plus size={12} />{t("Add Captain")}</PrimaryBtn>
      </div>

      <Tabs tabs={["All", "On Job", "Available", "Offline"]} active={tab} onChange={setTab} />

      <TableWrapper>
        <thead><tr><Th>{t("Captain ID")}</Th><Th>{t("Name")}</Th><Th>{t("Zone")}</Th><Th>{t("Vehicle")}</Th><Th>{t("Jobs Today")}</Th><Th>{t("Rating")}</Th><Th>{t("Status")}</Th><Th></Th></tr></thead>
        <tbody>
          {filtered.map(c => {
            const status = capStatuses[c.id] ?? c.status;
            return (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{c.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={c.name} size={28} />{c.name}</div></Td>
                <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{c.zone}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{c.vehicle}</span></Td>
                <Td mono>{c.jobs}</Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill={C.gold} stroke="none" />
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{c.rating}</span>
                  </div>
                </Td>
                <Td><StatusBadge status={status} /></Td>
                <Td>
                  <button className="px-2 py-1 rounded text-xs border hover:bg-gray-50 font-medium"
                    style={{ borderColor: C.border, color: C.textSecondary }}
                    onClick={() => navigate(`/operations/roadside/captains/${c.id}`)}>{t("View")}</button>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <Pagination total={`${allCaptains.length} captains`} showing={`1–${filtered.length}`} />
    </div>
  );
}
