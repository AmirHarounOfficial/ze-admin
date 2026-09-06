import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Send, Edit, Lock, Package, Star, Calendar, CheckCircle2, Plus } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, PrimaryBtn, KPICard, Tabs, InfoCard, InfoRow, StatusBadge, ModuleTag, TableWrapper, Th, Td, StarRating
} from "@/components/ui/CommonUI";

const handymen = [
  { id: "H-201", name: "Khaled Samir",   specialty: ["Plumbing", "General Repair"],   cert: "Licensed Plumber",   rating: 4.9, bookings: 7,  status: "available", zone: "Cairo North"    },
  { id: "H-202", name: "Tarek Mostafa",  specialty: ["Electrical", "AC Maintenance"],  cert: "Electrical Cert.",  rating: 4.7, bookings: 5,  status: "busy",      zone: "Giza"           },
  { id: "H-203", name: "Samy Adel",      specialty: ["Painting", "Tiling"],            cert: "Skilled Trades",    rating: 4.6, bookings: 3,  status: "available", zone: "Cairo South"    },
  { id: "H-204", name: "Hassan Fathy",   specialty: ["Carpentry", "Furniture Assy"],   cert: "Carpentry Cert.",   rating: 4.5, bookings: 9,  status: "offline",   zone: "Alexandria"     },
  { id: "H-205", name: "Mahmoud Nasser", specialty: ["Deep Clean", "Upholstery"],      cert: "Cleaning Pro",      rating: 4.8, bookings: 12, status: "available", zone: "New Cairo"      },
];

const handymanSchedule = [
  { day: "Monday",    jobs: ["Home Cleaning — 9:00 AM", "Plumbing Fix — 1:00 PM"] },
  { day: "Tuesday",   jobs: ["AC Servicing — 10:30 AM"] },
  { day: "Wednesday", jobs: ["General Repair — 9:00 AM", "Painting — 2:00 PM", "Tiling — 5:00 PM"] },
  { day: "Thursday",  jobs: [] },
  { day: "Friday",    jobs: ["Deep Clean — 8:00 AM"] },
];

const handymanHistory = [
  { id: "JB-5501", service: "Home Cleaning",      customer: "Sara Mohamed",  amount: "EGP 350", date: "Jul 09", rating: 5, status: "completed" },
  { id: "JB-5500", service: "Plumbing Repair",    customer: "Ahmed Khaled",  amount: "EGP 420", date: "Jul 07", rating: 4, status: "completed" },
  { id: "JB-5499", service: "AC Servicing",        customer: "Nour Ali",      amount: "EGP 480", date: "Jul 05", rating: 5, status: "completed" },
  { id: "JB-5498", service: "Furniture Assembly",  customer: "Omar Saad",     amount: "EGP 280", date: "Jul 03", rating: 3, status: "completed" },
  { id: "JB-5497", service: "General Repair",      customer: "Layla Hassan",  amount: "EGP 190", date: "Jun 30", rating: 4, status: "completed" },
];

export function HandymanDetailPage() {
  const { id = "H-201" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const isNew = id === "new";
  const h = handymen.find(x => x.id === id) ?? handymen[0];
  const [tab, setTab] = useState("Overview");

  if (isNew) return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <BackBtn to="/staff/handyman" />
        <h2 className="text-base font-semibold" style={{ color: C.textPrimary }}>{t("Add New Technician")}</h2>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-4 border-b text-sm font-semibold" style={{ borderColor: C.border, color: C.textPrimary }}>{t("Staff Profile")}</div>
        <div className="px-5 py-4 grid grid-cols-2 gap-4">
          {[
            { label: "Full Name",      placeholder: "e.g. Mohamed Ali" },
            { label: "Phone",          placeholder: "+20 100 000 0000" },
            { label: "Certification",  placeholder: "e.g. Licensed Plumber" },
            { label: "Assigned Zone",  placeholder: "e.g. Cairo North" },
            { label: "National ID",    placeholder: "29x…" },
            { label: "Emergency Contact", placeholder: "+20 111 000 0000" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs font-medium block mb-1.5" style={{ color: C.textSecondary }}>{f.label}</label>
              <input placeholder={f.placeholder} className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: C.border, background: C.bg, color: C.textPrimary }}
                onFocus={e => (e.target.style.borderColor = C.gold)}
                onBlur={e => (e.target.style.borderColor = C.border)} />
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t" style={{ borderColor: C.border }}>
          <div className="text-xs font-medium mb-2" style={{ color: C.textSecondary }}>{t("Specialties")}</div>
          <div className="flex flex-wrap gap-2">
            {["Plumbing", "Electrical", "AC Maintenance", "Carpentry", "Painting", "Tiling", "Deep Clean", "General Repair"].map(s => (
              <button key={s} className="text-xs px-3 py-1.5 rounded-full border font-medium" style={{ borderColor: C.border, color: C.textSecondary }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <OutlineBtn onClick={() => navigate("/staff/handyman")}>{t("Cancel")}</OutlineBtn>
        <PrimaryBtn onClick={() => { showToast("Technician profile created and activated."); navigate("/staff/handyman"); }}>
          <Plus size={13} />{t("Create Technician")}</PrimaryBtn>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/staff/handyman" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={h.name} size={44} />
          <DetailHeader title={h.name} id={id} subtitle={`${h.cert} · ${h.zone}`} badge={h.status} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn onClick={() => showToast("Message sent to technician.")}><Send size={13} />{t("Message")}</OutlineBtn>
          <OutlineBtn onClick={() => showToast("Technician assignment updated.")}><Edit size={13} />{t("Edit Zone")}</OutlineBtn>
          <PrimaryBtn danger onClick={() => showToast("Technician suspended.")}><Lock size={13} />{t("Suspend")}</PrimaryBtn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Jobs This Month")} value="24"              sub={t("Completed assignments")} trend="+4"   trendUp icon={<Package size={15} />}    accent={C.green}  />
        <KPICard title={t("Avg Rating")}      value={String(h.rating)} sub={t("From customer reviews")} trend="+0.1" trendUp icon={<Star size={15} />}       accent={C.orange} />
        <KPICard title={t("Jobs This Week")}  value={String(h.bookings)} sub={t("Active bookings")}    trend="+2"   trendUp icon={<Calendar size={15} />}   accent={C.blue}   />
        <KPICard title={t("Completion Rate")} value="97.8%"           sub={t("No cancellations")}      trend="+1.2%" trendUp icon={<CheckCircle2 size={15} />} accent={C.purple} />
      </div>

      <Tabs tabs={["Overview", "Weekly Schedule", "Job History", "Violations"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Staff Profile")}>
            <InfoRow label={t("Full Name")}        value={h.name} />
            <InfoRow label={t("Staff ID")}         value={id} mono />
            <InfoRow label={t("Certification")}    value={h.cert} />
            <InfoRow label={t("Assigned Zone")}    value={h.zone} />
            <InfoRow label={t("Status")}           value={<StatusBadge status={h.status} />} />
            <InfoRow label={t("Joined Platform")}  value="Mar 15, 2023" />
          </InfoCard>
          <InfoCard title={t("Specialties & Equipment")}>
            <div className="flex flex-wrap gap-2 mb-4">{h.specialty.map(s => <ModuleTag key={s} label={s} />)}</div>
            <InfoRow label={t("Phone")}           value="+20 100 000 2211" mono />
            <InfoRow label={t("Emergency Contact")} value="+20 111 999 8877" mono />
            <InfoRow label={t("ID Number")}       value="29801••••••••••••" mono />
            <InfoRow label={t("Background Check")} value={<span style={{ color: C.green }}>{t("Cleared — Jan 2024")}</span>} />
          </InfoCard>
        </div>
      )}

      {tab === "Weekly Schedule" && (
        <div className="grid grid-cols-5 gap-3">
          {handymanSchedule.map(day => (
            <div key={day.day} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="text-xs font-semibold mb-3" style={{ color: C.textPrimary }}>{day.day}</div>
              {day.jobs.length === 0 ? (
                <div className="text-xs text-center py-4" style={{ color: C.textMuted }}>{t("Free")}</div>
              ) : (
                <div className="space-y-2">
                  {day.jobs.map(j => (
                    <div key={j} className="text-xs px-2 py-1.5 rounded-lg" style={{ background: C.goldLight, color: C.gold }}>{j}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "Job History" && (
        <TableWrapper>
          <thead><tr><Th>{t("Job ID")}</Th><Th>{t("Service")}</Th><Th>{t("Customer")}</Th><Th>{t("Amount")}</Th><Th>{t("Date")}</Th><Th>{t("Rating")}</Th><Th>{t("Status")}</Th></tr></thead>
          <tbody>
            {handymanHistory.map(j => (
              <tr key={j.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{j.id}</Td>
                <Td><span className="font-medium">{j.service}</span></Td>
                <Td><div className="flex items-center gap-2"><Avatar name={j.customer} size={22} />{j.customer}</div></Td>
                <Td mono>{j.amount}</Td>
                <Td>{j.date}</Td>
                <Td><StarRating rating={j.rating} /></Td>
                <Td><StatusBadge status={j.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Violations" && (
        <div className="rounded-xl border flex flex-col items-center justify-center py-16 text-center" style={{ background: C.card, borderColor: C.border }}>
          <CheckCircle2 size={40} color={C.green} />
          <div className="text-base font-semibold mt-3" style={{ color: C.textPrimary }}>{t("No violations on record")}</div>
          <div className="text-sm mt-1" style={{ color: C.textSecondary }}>{t("This technician has maintained a clean compliance record.")}</div>
        </div>
      )}
    </div>
  );
}
