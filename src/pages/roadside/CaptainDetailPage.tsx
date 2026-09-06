import React from "react";
import { useParams, useOutletContext } from "react-router";
import { Lock, Truck, Timer, Star, CheckCircle2 } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, KPICard, InfoCard, InfoRow, ModuleTag, TableWrapper, Th, Td, StarRating
} from "@/components/ui/CommonUI";

export function CaptainDetailPage() {
  const { id = "C-42" } = useParams();
  const { showToast } = useOutletContext<RootCtx>();

  const captainData: Record<string, { name: string; provider: string; zone: string; specs: string[]; rating: number; incidents: number; avgResponse: string; sla: number }> = {
    "C-42": { name: "Mostafa Saad",  provider: "QuickTow",    zone: "Ring Road", specs: ["Towing", "Fuel"],           rating: 4.3, incidents: 4, avgResponse: "41 sec", sla: 87 },
    "C-38": { name: "Tarek Youssef", provider: "QuickTow",    zone: "Maadi",     specs: ["Fuel", "Battery"],          rating: 4.5, incidents: 3, avgResponse: "38 sec", sla: 92 },
    "C-21": { name: "Hassan Emad",   provider: "CairoAssist", zone: "New Cairo", specs: ["Unlocking", "Diagnostics"], rating: 4.8, incidents: 5, avgResponse: "34 sec", sla: 96 },
    "C-12": { name: "Adel Karim",    provider: "CairoAssist", zone: "Zamalek",   specs: ["Diagnostics", "Towing"],    rating: 4.9, incidents: 6, avgResponse: "31 sec", sla: 98 },
    "C-19": { name: "Samy Fouad",    provider: "FastRescue",  zone: "Heliopolis",specs: ["Battery", "Unlocking"],     rating: 4.6, incidents: 2, avgResponse: "44 sec", sla: 89 },
  };
  const cap = captainData[id] ?? captainData["C-42"];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/roadside" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={cap.name} size={44} />
          <DetailHeader title={cap.name} id={`Captain #${id}`} subtitle={`${cap.provider} · ${cap.zone}`} badge="active" />
        </div>
        <OutlineBtn small onClick={() => showToast(`Captain ${cap.name} suspended.`)}><Lock size={13} />{t("Suspend")}</OutlineBtn>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Incidents (Month)")} value={String(cap.incidents)} sub={t("Completed")} trend="+2" trendUp icon={<Truck size={15} />}   accent={C.green}  />
        <KPICard title={t("Avg Response")}      value={cap.avgResponse}       sub={t("Dispatch acceptance")} trend="-2s" trendUp icon={<Timer size={15} />} accent={C.blue} />
        <KPICard title={t("Rating")}            value={String(cap.rating)}    sub={t("From customers")} trend="+0.1" trendUp icon={<Star size={15} />} accent={C.orange} />
        <KPICard title={t("SLA Compliance")}    value={`${cap.sla}%`}         sub={t("Within 60s window")} trend="+2%" trendUp icon={<CheckCircle2 size={15} />} accent={C.purple} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard title={t("Captain Profile")}>
          <InfoRow label={t("Captain ID")}     value={`#${id}`} mono />
          <InfoRow label={t("Name")}           value={cap.name} />
          <InfoRow label={t("Provider")}       value={cap.provider} />
          <InfoRow label={t("Service Zone")}   value={cap.zone} />
          <InfoRow label={t("Specialties")}    value={<div className="flex flex-wrap gap-1">{cap.specs.map(s => <ModuleTag key={s} label={s} />)}</div>} />
          <InfoRow label={t("Phone")}          value="+20 100 000 4455" mono />
        </InfoCard>
        <div className="col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: C.textMuted }}>{t("Recent Incident History")}</div>
          <TableWrapper>
            <thead><tr><Th>{t("Incident ID")}</Th><Th>{t("Type")}</Th><Th>{t("Customer")}</Th><Th>{t("Response")}</Th><Th>{t("Rating")}</Th><Th>{t("Date")}</Th></tr></thead>
            <tbody>
              {[
                { id: "IA-5501", type: "Towing",      customer: "Omar Farid",    response: "41 sec", rating: 4, date: "Jul 09" },
                { id: "IA-5488", type: "Fuel",        customer: "Layla Hassan",  response: "38 sec", rating: 5, date: "Jul 08" },
                { id: "IA-5471", type: "Towing",      customer: "Ahmed Samir",   response: "55 sec", rating: 3, date: "Jul 06" },
                { id: "IA-5460", type: "Battery",     customer: "Nour Kamal",    response: "42 sec", rating: 5, date: "Jul 05" },
              ].slice(0, cap.incidents).map(i => (
                <tr key={i.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{i.id}</Td><Td>{i.type}</Td><Td>{i.customer}</Td>
                  <Td>{i.response}</Td><Td><StarRating rating={i.rating} /></Td><Td>{i.date}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      </div>
    </div>
  );
}
