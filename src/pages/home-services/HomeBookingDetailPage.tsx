import React from "react";
import { useParams, useOutletContext } from "react-router";
import { X } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, DetailHeader, OutlineBtn, InfoCard, Timeline, TableWrapper, Th, Td, Avatar, InfoRow
} from "@/components/ui/CommonUI";

const homeServiceBookings = [
  { id: "HSB-901", service: "Plumbing Repair",    provider: "FixIt Pro",       customer: "Sara Ahmed",    techName: "Kareem Ali",    scheduledAt: "Jul 9, 10:00 AM", status: "in-progress" },
  { id: "HSB-902", service: "AC Servicing",       provider: "TechHome Cairo",  customer: "Omar Hassan",   techName: "Amr Sayed",     scheduledAt: "Jul 9, 11:30 AM", status: "pending"     },
  { id: "HSB-903", service: "Deep Cleaning",      provider: "HomeGuru",        customer: "Nour Farid",    techName: "Team #HG-7",    scheduledAt: "Jul 9, 2:00 PM",  status: "completed"   },
  { id: "HSB-904", service: "Electrical Fault",   provider: "FixPro Alex",     customer: "Mona Kamal",    techName: "Hassan Emad",   scheduledAt: "Jul 9, 3:30 PM",  status: "pending"     },
  { id: "HSB-905", service: "Painting — 2 rooms", provider: "QuickFix Egypt",  customer: "Youssef Tarek", techName: "Samy Abdou",    scheduledAt: "Jul 10, 9:00 AM", status: "pending"     },
];

export function HomeBookingDetailPage() {
  const { id = "HSB-901" } = useParams();
  const { showToast } = useOutletContext<RootCtx>();
  const booking = homeServiceBookings.find(b => b.id === id) ?? homeServiceBookings[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/home-services" />
        <DetailHeader title={booking.service} id={id} subtitle={`${booking.provider} · ${booking.customer}`} badge={booking.status}
          actions={
            <div className="flex gap-2">
              <OutlineBtn small onClick={() => showToast("Booking reassigned.")}>{t("Reassign Tech")}</OutlineBtn>
              {booking.status !== "completed" && <OutlineBtn small onClick={() => showToast("Booking cancelled. Customer refunded.")}><X size={13} />{t("Cancel")}</OutlineBtn>}
            </div>
          } />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <InfoCard title={t("Job Progress")}>
            <Timeline steps={[
              { label: "Booking Confirmed",      time: "Jul 08 — 08:30 AM", done: true },
              { label: "Technician Assigned",     time: `${booking.techName} assigned`, done: true },
              { label: "Technician Dispatched",   time: booking.scheduledAt, done: booking.status !== "pending" },
              { label: "Job In Progress",          time: booking.status === "in-progress" ? "Started" : "Pending", done: booking.status === "in-progress" || booking.status === "completed", active: booking.status === "in-progress" },
              { label: "Job Completed & Signed Off", time: booking.status === "completed" ? "Confirmed" : "Pending", done: booking.status === "completed" },
            ]} />
          </InfoCard>
          <InfoCard title={t("Materials & Notes")}>
            <div className="text-xs mb-3" style={{ color: C.textSecondary }}>{t("Customer notes:")}<em>"Please bring all required tools. Building has elevator access."</em></div>
            <TableWrapper>
              <thead><tr><Th>{t("Item / Material")}</Th><Th>{t("Qty")}</Th><Th>{t("Unit")}</Th><Th>{t("Cost")}</Th></tr></thead>
              <tbody>
                {[
                  { item: "Labour (2 hrs)", qty: 1, unit: "session", cost: "EGP 200" },
                  { item: "Replacement Part", qty: 1, unit: "pcs", cost: "EGP 120" },
                ].map(i => (
                  <tr key={i.item} className="hover:bg-slate-50/60"><Td>{i.item}</Td><Td>{i.qty}</Td><Td>{i.unit}</Td><Td mono>{i.cost}</Td></tr>
                ))}
              </tbody>
            </TableWrapper>
          </InfoCard>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Technician")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={booking.techName} size={32} /><span className="font-medium text-sm">{booking.techName}</span></div>
            <InfoRow label={t("Provider")}    value={booking.provider} />
            <InfoRow label={t("Scheduled")}   value={booking.scheduledAt} />
            <InfoRow label={t("Phone")}       value="+20 100 000 3344" mono />
          </InfoCard>
          <InfoCard title={t("Customer")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={booking.customer} size={32} /><span className="font-medium text-sm">{booking.customer}</span></div>
            <InfoRow label={t("Address")}  value="45 Nile St, Floor 3" />
            <InfoRow label={t("City")}     value="Cairo" />
            <InfoRow label={t("Phone")}    value="+20 111 000 7788" mono />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
