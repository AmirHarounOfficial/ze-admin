import React, { useState } from "react";
import {
  Users2, Activity, AlertTriangle, RefreshCw, Filter, Search,
  Phone, MessageSquare, Shield, CheckCircle2, Zap, Radio, MapPin,
  Clock, Battery, Signal, UserCheck, ArrowUpDown, ChevronRight, Send
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, IconBtn, Avatar, Toast
} from "@/components/ui/CommonUI";

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: "Handyman" | "Rider" | "Captain";
  serviceType: string;
  district: string;
  city: string;
  status: "on-duty" | "en-route" | "in-job" | "idle" | "offline";
  battery: number;
  gpsSignal: "strong" | "moderate" | "weak";
  dutyTime: string;
  currentJobId: string | null;
  rating: number;
  jobsCompletedToday: number;
}

const MOCK_STAFF: StaffMember[] = [
  {
    id: "STF-9021",
    name: "Tarek Mahmoud",
    phone: "+20 100 234 5678",
    role: "Handyman",
    serviceType: "Plumbing & AC Repair",
    district: "Maadi",
    city: "Cairo",
    status: "in-job",
    battery: 88,
    gpsSignal: "strong",
    dutyTime: "5h 42m",
    currentJobId: "JOB-4819",
    rating: 4.92,
    jobsCompletedToday: 6,
  },
  {
    id: "STF-8842",
    name: "Hassan Al-Sayed",
    phone: "+20 101 876 5432",
    role: "Rider",
    serviceType: "Food & Parcel Delivery",
    district: "New Cairo",
    city: "Cairo",
    status: "en-route",
    battery: 64,
    gpsSignal: "strong",
    dutyTime: "4h 15m",
    currentJobId: "ORD-9912",
    rating: 4.85,
    jobsCompletedToday: 11,
  },
  {
    id: "STF-7719",
    name: "Karim Abdelrahman",
    phone: "+20 112 345 6789",
    role: "Captain",
    serviceType: "Flatbed Towing & Recovery",
    district: "Sheikh Zayed",
    city: "Giza",
    status: "on-duty",
    battery: 92,
    gpsSignal: "strong",
    dutyTime: "6h 10m",
    currentJobId: null,
    rating: 4.98,
    jobsCompletedToday: 4,
  },
  {
    id: "STF-6504",
    name: "Omar Farouk",
    phone: "+20 120 987 6543",
    role: "Handyman",
    serviceType: "Electrical & Lighting",
    district: "Dokki",
    city: "Giza",
    status: "idle",
    battery: 45,
    gpsSignal: "moderate",
    dutyTime: "3h 50m",
    currentJobId: null,
    rating: 4.78,
    jobsCompletedToday: 3,
  },
  {
    id: "STF-5211",
    name: "Mahmoud Soliman",
    phone: "+20 106 112 2334",
    role: "Rider",
    serviceType: "Express Grocery Delivery",
    district: "Nasr City",
    city: "Cairo",
    status: "in-job",
    battery: 79,
    gpsSignal: "strong",
    dutyTime: "7h 05m",
    currentJobId: "ORD-8821",
    rating: 4.90,
    jobsCompletedToday: 14,
  },
  {
    id: "STF-4390",
    name: "Youssef Ibrahim",
    phone: "+20 114 556 6778",
    role: "Captain",
    serviceType: "Battery Jumpstart & Fuel",
    district: "Heliopolis",
    city: "Cairo",
    status: "en-route",
    battery: 31,
    gpsSignal: "moderate",
    dutyTime: "2h 30m",
    currentJobId: "INC-3021",
    rating: 4.88,
    jobsCompletedToday: 5,
  },
  {
    id: "STF-3108",
    name: "Ahmed Mostafa",
    phone: "+20 109 443 3221",
    role: "Handyman",
    serviceType: "Carpentry & Locks",
    district: "Smouha",
    city: "Alexandria",
    status: "offline",
    battery: 15,
    gpsSignal: "weak",
    dutyTime: "0h 00m",
    currentJobId: null,
    rating: 4.70,
    jobsCompletedToday: 0,
  },
];

export function WorkforceCommandPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredStaff = MOCK_STAFF.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.district.toLowerCase().includes(search.toLowerCase()) ||
      s.serviceType.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || s.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesDistrict = districtFilter === "all" || s.district.toLowerCase().includes(districtFilter.toLowerCase());
    return matchesSearch && matchesRole && matchesStatus && matchesDistrict;
  });

  const handleRedispatch = (staffName: string, id: string) => {
    setToastMsg(`Re-dispatch triggered for ${staffName} (${id}). Shift route updated.`);
  };

  const handleSendNotice = (staffName: string) => {
    setToastMsg(`Shift dispatch message sent to ${staffName}.`);
  };

  const handleEmergencySwap = () => {
    setToastMsg("Emergency shift re-allocation broadcasted to 45 nearby available staff.");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Workforce & Shift Roster"
        subtitle="Real-time control center for field staff, roadside captains & delivery riders"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={() => setToastMsg("Exporting full workforce roster CSV...")}>
              {t("Export Roster")}
            </OutlineBtn>
            <PrimaryBtn onClick={handleEmergencySwap} danger>
              <Zap size={14} className="mr-1" />
              {t("Emergency Shift Swap")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="On-Duty Staff"
          value="1,482"
          sub="94.2% shift attendance rate"
          trend="+5.4%"
          trendUp={true}
          icon={<Users2 size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Shift Utilization"
          value="88.6%"
          sub="1,313 active on assignments"
          trend="+3.1%"
          trendUp={true}
          icon={<Activity size={16} />}
          accent={C.blue}
        />
        <KPICard
          title="Coverage Deficits"
          value="3 Zones"
          sub="New Cairo, Sheikh Zayed, Maadi"
          trend="-2 zones"
          trendUp={true}
          icon={<AlertTriangle size={16} />}
          accent={C.orange}
        />
        <KPICard
          title="Re-dispatch Queue"
          value="14 Jobs"
          sub="Avg dispatch time < 45s"
          trend="-4 queued"
          trendUp={true}
          icon={<RefreshCw size={16} />}
          accent={C.purple}
        />
      </div>

      {/* Zone Alert Banner */}
      <div className="p-4 rounded-xl border flex items-center justify-between gap-4"
        style={{ background: "rgba(245, 158, 11, 0.08)", borderColor: "rgba(245, 158, 11, 0.25)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.orange + "20", color: C.orange }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>
              {t("District Coverage Warning: Demand Spike Detected")}
            </div>
            <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
              {t("New Cairo & Sheikh Zayed have 14 pending requests awaiting nearby technician assignment.")}
            </div>
          </div>
        </div>
        <button onClick={handleEmergencySwap}
          className="px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          style={{ background: C.gold, color: "#fff" }}>
          {t("Re-allocate Nearby Staff")}
        </button>
      </div>

      {/* Filter and Roster Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by staff name, ID, zone, or service..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg border text-xs" style={{ background: C.bg, borderColor: C.border }}>
            {["all", "handyman", "rider", "captain"].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className="px-3 py-1.5 rounded-md font-medium capitalize transition-colors"
                style={{
                  background: roleFilter === r ? C.gold : "transparent",
                  color: roleFilter === r ? "#fff" : C.textSecondary,
                }}
              >
                {t(r === "all" ? "All Roles" : r)}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Statuses")}</option>
            <option value="in-job">{t("In Job")}</option>
            <option value="en-route">{t("En Route")}</option>
            <option value="on-duty">{t("On Duty (Idle)")}</option>
            <option value="offline">{t("Offline")}</option>
          </select>

          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Districts")}</option>
            <option value="Maadi">{t("Maadi")}</option>
            <option value="New Cairo">{t("New Cairo")}</option>
            <option value="Sheikh Zayed">{t("Sheikh Zayed")}</option>
            <option value="Dokki">{t("Dokki")}</option>
            <option value="Nasr City">{t("Nasr City")}</option>
            <option value="Smouha">{t("Smouha")}</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <TableWrapper>
        <thead>
          <tr>
            <Th>Staff Member</Th>
            <Th>Role & Specialty</Th>
            <Th>District & City</Th>
            <Th>Shift Status</Th>
            <Th>Telemetry & Battery</Th>
            <Th>Current Job</Th>
            <Th>Rating & Jobs</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staff) => (
            <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={staff.name} size={34} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{staff.name}</div>
                    <div className="text-xs font-mono" style={{ color: C.textMuted }}>{staff.id} • {staff.phone}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border"
                    style={{
                      background: staff.role === "Handyman" ? C.purpleLight : staff.role === "Rider" ? C.orangeLight : C.blueLight,
                      color: staff.role === "Handyman" ? C.purple : staff.role === "Rider" ? C.orange : C.blueMid,
                      borderColor: "transparent"
                    }}>
                    {t(staff.role)}
                  </span>
                  <span className="text-xs" style={{ color: C.textSecondary }}>{staff.serviceType}</span>
                </div>
              </Td>
              <Td>
                <div className="flex items-center gap-1 text-xs" style={{ color: C.textPrimary }}>
                  <MapPin size={13} color={C.textMuted} />
                  <span>{staff.district}, {staff.city}</span>
                </div>
              </Td>
              <Td>
                <StatusBadge status={staff.status} />
              </Td>
              <Td>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Battery size={13} color={staff.battery < 30 ? C.red : C.green} />
                    <span className="font-mono text-xs">{staff.battery}%</span>
                    <span className="text-[10px] text-gray-400">| {staff.dutyTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]" style={{ color: C.textMuted }}>
                    <Signal size={12} color={staff.gpsSignal === "strong" ? C.green : staff.gpsSignal === "moderate" ? C.orange : C.red} />
                    <span className="capitalize">{staff.gpsSignal} GPS</span>
                  </div>
                </div>
              </Td>
              <Td mono>
                {staff.currentJobId ? (
                  <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
                    {staff.currentJobId}
                  </span>
                ) : (
                  <span className="text-xs italic" style={{ color: C.textMuted }}>
                    {t("Unassigned")}
                  </span>
                )}
              </Td>
              <Td>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-amber-600">⭐ {staff.rating.toFixed(2)}</span>
                  <span style={{ color: C.textMuted }}>{staff.jobsCompletedToday} jobs today</span>
                </div>
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleRedispatch(staff.name, staff.id)}
                    className="p-1.5 rounded-lg border hover:bg-gray-100 transition-colors"
                    title={t("Re-dispatch")}
                    style={{ borderColor: C.border, color: C.blueMid }}
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    onClick={() => handleSendNotice(staff.name)}
                    className="p-1.5 rounded-lg border hover:bg-gray-100 transition-colors"
                    title={t("Send Message")}
                    style={{ borderColor: C.border, color: C.green }}
                  >
                    <MessageSquare size={14} />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {/* Roster Distribution & Live Event Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Shift Workload Breakdown")}</h3>
            <span className="text-xs" style={{ color: C.textMuted }}>{t("Live capacity snapshot")}</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1" style={{ color: C.textSecondary }}>
                <span>{t("In Job / Active Task")}</span>
                <span>54% (800 staff)</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "54%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1" style={{ color: C.textSecondary }}>
                <span>{t("En Route to Location")}</span>
                <span>28% (415 staff)</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1" style={{ color: C.textSecondary }}>
                <span>{t("On Duty (Idle / Waiting)")}</span>
                <span>12% (178 staff)</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1" style={{ color: C.textSecondary }}>
                <span>{t("Offline / Off Shift")}</span>
                <span>6% (89 staff)</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: "6%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Live Roster Events */}
        <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: C.textPrimary }}>{t("Live Shift Activity")}</h3>
          <div className="space-y-3">
            {[
              { title: "Tarek Mahmoud arrived at job site", zone: "Maadi", time: "2 min ago", icon: <CheckCircle2 size={14} color={C.green} /> },
              { title: "Hassan Al-Sayed accepted ORD-9912", zone: "New Cairo", time: "5 min ago", icon: <Zap size={14} color={C.blueMid} /> },
              { title: "Karim Abdelrahman checked into shift", zone: "Sheikh Zayed", time: "12 min ago", icon: <UserCheck size={14} color={C.purple} /> },
              { title: "Omar Farouk completed JOB-4012", zone: "Dokki", time: "18 min ago", icon: <CheckCircle2 size={14} color={C.green} /> },
            ].map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50/70 border border-gray-100">
                <div className="mt-0.5">{event.icon}</div>
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{event.title}</div>
                  <div className="flex items-center gap-2 text-[10px] mt-0.5" style={{ color: C.textMuted }}>
                    <span>{event.zone}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
