import React, { useState } from "react";
import { useOutletContext } from "react-router";
import {
  Ticket, MessageSquare, Clock, ShieldAlert, CheckCircle2, UserCheck,
  AlertTriangle, ArrowUpRight, Search, Download, Filter, Users, Send
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs, Avatar
} from "@/components/ui/CommonUI";

interface SupportTicketItem {
  id: string;
  customer: string;
  vertical: string;
  issue: string;
  priority: "critical" | "high" | "medium" | "low";
  tier: "Tier 1 (Bot)" | "Tier 2 (Agent)" | "Tier 3 (Supervisor)";
  agent: string;
  slaMinutes: number;
  openedAt: string;
  status: "open" | "in_progress" | "escalated" | "resolved";
}

const mockSupportTickets: SupportTicketItem[] = [
  { id: "TCK-9901", customer: "Mostafa Mahmoud", vertical: "Roadside Rescue", issue: "Flatbed Tow delay exceeding 45 minutes SLA", priority: "critical", tier: "Tier 3 (Supervisor)", agent: "Sami Mansour", slaMinutes: 4, openedAt: "10 mins ago", status: "escalated" },
  { id: "TCK-9902", customer: "Nouran El-Ghandour", vertical: "Property Rentals", issue: "Key handover escort did not show up at Zamalek apartment", priority: "high", tier: "Tier 2 (Agent)", agent: "Dina Farouk", slaMinutes: 12, openedAt: "25 mins ago", status: "in_progress" },
  { id: "TCK-9903", customer: "Tarek Al-Ahmady", vertical: "Food Delivery", issue: "Order missing main item from Abou El Sid Restaurant", priority: "medium", tier: "Tier 2 (Agent)", agent: "Omar Soliman", slaMinutes: 18, openedAt: "32 mins ago", status: "open" },
  { id: "TCK-9904", customer: "Salma Ibrahim", vertical: "Car Maintenance", issue: "Dispute regarding engine filter billing extra charges", priority: "high", tier: "Tier 2 (Agent)", agent: "Dina Farouk", slaMinutes: 8, openedAt: "40 mins ago", status: "in_progress" },
  { id: "TCK-9905", customer: "Kareem Zaki", vertical: "Home Services", issue: "Plumbing leak repair incomplete after technician departed", priority: "critical", tier: "Tier 3 (Supervisor)", agent: "Sami Mansour", slaMinutes: 2, openedAt: "45 mins ago", status: "escalated" },
  { id: "TCK-9906", customer: "Hoda Rashad", vertical: "Parcel Delivery", issue: "Express parcel package tracking static for 3 hours", priority: "low", tier: "Tier 1 (Bot)", agent: "Automated Bot", slaMinutes: 45, openedAt: "1 hour ago", status: "open" },
  { id: "TCK-9907", customer: "Ahmed Naguib", vertical: "Dining Bookings", issue: "Table 4 reservation seating delayed past 20m window", priority: "medium", tier: "Tier 2 (Agent)", agent: "Omar Soliman", slaMinutes: 22, openedAt: "1.5 hours ago", status: "resolved" },
];

const supportAgents = [
  { name: "Dina Farouk", tier: "Tier 2 Specialist", activeChats: 4, velocity: "1.4 min", csat: "4.9 ★", status: "online" },
  { name: "Sami Mansour", tier: "Tier 3 Supervisor", activeChats: 2, velocity: "2.1 min", csat: "5.0 ★", status: "online" },
  { name: "Omar Soliman", tier: "Tier 2 Specialist", activeChats: 5, velocity: "1.8 min", csat: "4.8 ★", status: "online" },
  { name: "Laila Hany", tier: "Tier 2 Specialist", activeChats: 0, velocity: "1.2 min", csat: "4.9 ★", status: "idle" },
];

export function SupportCommandPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [tickets, setTickets] = useState<SupportTicketItem[]>(mockSupportTickets);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Critical & Escalated", "In Progress", "Open", "Resolved"];

  const filteredTickets = tickets.filter(tItem => {
    const q = query.toLowerCase();
    const matchesQ = tItem.id.toLowerCase().includes(q) || tItem.customer.toLowerCase().includes(q) || tItem.vertical.toLowerCase().includes(q) || tItem.issue.toLowerCase().includes(q);
    if (tab === "Critical & Escalated") return matchesQ && (tItem.priority === "critical" || tItem.status === "escalated");
    if (tab === "In Progress")          return matchesQ && tItem.status === "in_progress";
    if (tab === "Open")                 return matchesQ && tItem.status === "open";
    if (tab === "Resolved")             return matchesQ && tItem.status === "resolved";
    return matchesQ;
  });

  const handleEscalateTier3 = (ticketId: string) => {
    setTickets(prev => prev.map(tk => tk.id === ticketId ? { ...tk, status: "escalated", tier: "Tier 3 (Supervisor)", priority: "critical" } : tk));
    showToast(`Ticket ${ticketId} escalated to Tier 3 Supervisor War Room.`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(tk => tk.id === ticketId ? { ...tk, status: "resolved" } : tk));
    showToast(`Ticket ${ticketId} resolved successfully. Satisfaction survey sent.`);
  };

  const openTicketsCount = tickets.filter(tk => tk.status !== "resolved").length;
  const escalatedCount = tickets.filter(tk => tk.status === "escalated" || tk.priority === "critical").length;

  return (
    <div className="space-y-5">
      {/* Helpdesk Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Open Tickets")}    value={String(openTicketsCount)} sub={t("Active support queries")} trend="-4" trendUp icon={<Ticket size={15} />} accent={C.blue} />
        <KPICard title={t("First Response SLA")}     value="1.8 Mins" sub={t("Target SLA: < 2.5m")} trend="+0.3m" trendUp icon={<Clock size={15} />} accent={C.green} />
        <KPICard title={t("Resolution Rate")}        value="96.4%" sub={t("Same-day ticket closure")} trend="+1.2%" trendUp icon={<CheckCircle2 size={15} />} accent={C.purple} />
        <KPICard title={t("Critical Escalations")}   value={String(escalatedCount)} sub={t("Requires supervisor action")} trend="stable" trendUp={false} icon={<ShieldAlert size={15} />} accent={C.red} />
      </div>

      {/* Support Funnel & Agent Roster */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
              <Users size={15} style={{ color: C.blue }} />
              {t("3-Tier Escalation Pipeline & Automation Split")}
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: C.blueLight, color: C.blueMid }}>
              AI + Human Desk
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border flex flex-col justify-between" style={{ background: C.bg, borderColor: C.border }}>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t("Tier 1: AI Auto-Bot")}</span>
                <span className="text-xl font-bold" style={{ color: C.green }}>68.4%</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2">Instant resolution for FAQs & tracking</span>
            </div>

            <div className="p-3 rounded-lg border flex flex-col justify-between" style={{ background: C.bg, borderColor: C.border }}>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t("Tier 2: Live Support Agents")}</span>
                <span className="text-xl font-bold" style={{ color: C.blue }}>23.8%</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2">Complex inquiries & disputes</span>
            </div>

            <div className="p-3 rounded-lg border flex flex-col justify-between" style={{ background: C.redLight, borderColor: C.red }}>
              <div>
                <span className="text-xs font-semibold text-red-800 block mb-1">{t("Tier 3: Supervisor War Room")}</span>
                <span className="text-xl font-bold" style={{ color: C.red }}>7.8%</span>
              </div>
              <span className="text-[11px] text-red-600 mt-2 font-medium">Critical SLA breaches & refunds</span>
            </div>
          </div>
        </div>

        {/* Live Support Agent Capacity Scoreboard */}
        <div className="rounded-xl border p-4 space-y-3" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: C.border }}>
            <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
              <UserCheck size={13} style={{ color: C.green }} />
              {t("Online Agents Roster")}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600">3 {t("Active")}</span>
          </div>

          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
            {supportAgents.map((ag, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg text-xs" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2">
                  <Avatar name={ag.name} size={24} />
                  <div>
                    <div className="font-semibold" style={{ color: C.textPrimary }}>{ag.name}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>{ag.tier} • {ag.csat}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-600">{ag.activeChats} {t("chats")}</span>
                  <div className="text-[10px] text-slate-400">{ag.velocity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filter & Search Controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search tickets by ID, customer, issue or vertical...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <PrimaryBtn small onClick={() => showToast("Manual ticket creation modal opened.")}>
            <Ticket size={12} />
            {t("Create Ticket")}
          </PrimaryBtn>
          <OutlineBtn small onClick={() => showToast("Helpdesk ledger exported to CSV.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Ticket Dispatch Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Ticket ID")}</Th>
              <Th>{t("Customer & Issue")}</Th>
              <Th>{t("Vertical Module")}</Th>
              <Th>{t("Priority")}</Th>
              <Th>{t("Tier & Assigned Agent")}</Th>
              <Th>{t("SLA Timer")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No support tickets match your filter criteria.")}
                </td>
              </tr>
            ) : (
              filteredTickets.map(tk => (
                <tr key={tk.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>
                    <span className="font-semibold" style={{ color: C.blueMid }}>{tk.id}</span>
                  </Td>
                  <Td>
                    <div>
                      <span className="font-medium text-sm block" style={{ color: C.textPrimary }}>{tk.customer}</span>
                      <span className="text-[11px]" style={{ color: C.textMuted }}>{tk.issue}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: C.blueLight, color: C.blueMid }}>
                      {tk.vertical}
                    </span>
                  </Td>
                  <Td>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      tk.priority === "critical" ? "bg-red-100 text-red-700" :
                      tk.priority === "high" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                    }`}>
                      {tk.priority.toUpperCase()}
                    </span>
                  </Td>
                  <Td>
                    <div>
                      <span className="text-xs font-medium block" style={{ color: C.textSecondary }}>{tk.agent}</span>
                      <span className="text-[11px] text-slate-400">{tk.tier}</span>
                    </div>
                  </Td>
                  <Td mono>
                    <span className={`text-xs font-semibold ${tk.slaMinutes <= 5 ? "text-red-600" : "text-emerald-600"}`}>
                      {tk.slaMinutes}m {t("remaining")}
                    </span>
                  </Td>
                  <Td>
                    <StatusBadge status={tk.status} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5">
                      {tk.status !== "escalated" && tk.status !== "resolved" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-red-50 text-red-600 transition-colors"
                          style={{ borderColor: C.red }}
                          onClick={() => handleEscalateTier3(tk.id)}
                        >
                          {t("Escalate Tier 3")}
                        </button>
                      )}
                      {tk.status !== "resolved" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-emerald-50 text-emerald-600 transition-colors"
                          style={{ borderColor: C.green }}
                          onClick={() => handleResolveTicket(tk.id)}
                        >
                          {t("Resolve")}
                        </button>
                      )}
                      <OutlineBtn small onClick={() => showToast(`Opening chat thread for ${tk.id}`)}>
                        {t("View Chat")}
                      </OutlineBtn>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
