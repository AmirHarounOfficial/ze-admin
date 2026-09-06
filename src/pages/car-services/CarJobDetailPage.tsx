import React from "react";
import { useParams, useOutletContext } from "react-router";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, DetailHeader, OutlineBtn, InfoCard, Timeline, TableWrapper, Th, Td, InfoRow, Avatar
} from "@/components/ui/CommonUI";

const liveCarJobs = [
  { id: "CJ-801", service: "Full Oil Change",     provider: "AutoCare Elite",  customer: "Ahmed Saad",    vehicle: "Toyota Camry 2020",  bay: "Bay 3", eta: "10 min",  status: "in-progress" },
  { id: "CJ-802", service: "AC Recharge",         provider: "Pit Stop Cairo",  customer: "Layla Hassan",  vehicle: "Kia Sportage 2022",  bay: "Bay 1", eta: "35 min",  status: "in-progress" },
  { id: "CJ-803", service: "Wheel Alignment",     provider: "WheelWorks",      customer: "Omar Farid",    vehicle: "Hyundai Elantra",    bay: "Bay 2", eta: "20 min",  status: "in-progress" },
  { id: "CJ-804", service: "Brake Pad Replacement",provider: "ZoomFix",        customer: "Nour Mohamed",  vehicle: "BMW 3 Series 2019",  bay: "Bay 7", eta: "55 min",  status: "pending"     },
];

export function CarJobDetailPage() {
  const { id = "CJ-801" } = useParams();
  const { showToast } = useOutletContext<RootCtx>();
  const job = liveCarJobs.find(j => j.id === id) ?? liveCarJobs[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/car-services" />
        <DetailHeader title={job.service} id={id} subtitle={`${job.provider} · ${job.customer}`} badge={job.status}
          actions={
            <div className="flex gap-2">
              {job.status !== "completed" && <OutlineBtn small onClick={() => showToast("Job cancelled.")}>{t("Cancel Job")}</OutlineBtn>}
            </div>
          } />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <InfoCard title={t("Job Progress")}>
            <Timeline steps={[
              { label: "Job Created & Customer Arrived",  time: "09:00 AM", done: true },
              { label: "Vehicle Inspected",                time: "09:10 AM", done: true },
              { label: "Work In Progress",                 time: job.status === "in-progress" ? "Ongoing" : "Pending", done: job.status === "in-progress" || job.status === "completed", active: job.status === "in-progress" },
              { label: "Quality Check",                    time: "Pending",  done: false },
              { label: "Job Complete — Customer Notified", time: "ETA " + job.eta, done: false },
            ]} />
          </InfoCard>
          <InfoCard title={t("Parts & Labour Breakdown")}>
            <TableWrapper>
              <thead><tr><Th>{t("Item")}</Th><Th>{t("Type")}</Th><Th>{t("Qty")}</Th><Th>{t("Unit Price")}</Th><Th>{t("Total")}</Th></tr></thead>
              <tbody>
                {[
                  { item: "Labour", type: "Service", qty: 1, price: 200, total: 200 },
                  { item: "Oil Filter",  type: "Part",    qty: 1, price: 80,  total: 80  },
                  { item: "Engine Oil (4L)", type: "Material", qty: 1, price: 220, total: 220 },
                ].map(i => (
                  <tr key={i.item} className="hover:bg-slate-50/60">
                    <Td>{i.item}</Td><Td><span className="text-xs" style={{ color: C.textSecondary }}>{i.type}</span></Td>
                    <Td>{i.qty}</Td><Td mono>EGP {i.price}</Td><Td mono>EGP {i.total}</Td>
                  </tr>
                ))}
                <tr><Td colSpan={4}><span className="font-semibold">{t("Total")}</span></Td><Td mono><span className="font-bold">{t("EGP 500")}</span></Td></tr>
              </tbody>
            </TableWrapper>
          </InfoCard>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Vehicle")}>
            <InfoRow label={t("Vehicle")}      value={job.vehicle} />
            <InfoRow label={t("Plate No.")}    value="Cairo — A 44321" mono />
            <InfoRow label={t("Bay Assigned")} value={<span className="font-mono" style={{ color: C.blue }}>{job.bay}</span>} />
            <InfoRow label={t("ETA")}          value={job.eta} />
          </InfoCard>
          <InfoCard title={t("Customer")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={job.customer} size={32} /><span className="font-medium text-sm">{job.customer}</span></div>
            <InfoRow label={t("Garage")}   value={job.provider} />
            <InfoRow label={t("Phone")}    value="+20 100 000 5566" mono />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
