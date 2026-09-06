import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Send, CheckCircle2, UserCheck } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { supportTickets } from "@/mock/mockData";
import {
  BackBtn, DetailHeader, OutlineBtn, PrimaryBtn, InfoCard, InfoRow, StatusBadge, Avatar
} from "@/components/ui/CommonUI";

const ticketMessages: Record<string, { sender: "customer" | "agent" | "system"; name: string; text: string; time: string }[]> = {
  default: [
    { sender: "customer", name: "Sara Mohamed",   text: "My AC service was booked for 10 AM and the technician hasn't arrived. It's now 11:30 AM.", time: "10:31 AM" },
    { sender: "system",   name: "System",         text: "Ticket auto-escalated — provider SLA breach detected (>60 min delay).", time: "10:45 AM" },
    { sender: "agent",    name: "Agent Hana",     text: "Hi Sara, I'm looking into this now. I've contacted TechHome Cairo and they're dispatching a technician immediately.", time: "10:52 AM" },
    { sender: "customer", name: "Sara Mohamed",   text: "Thank you. Please make sure this doesn't happen again.", time: "10:54 AM" },
    { sender: "agent",    name: "Agent Hana",     text: "The technician is now 10 minutes away. We're applying a 20% discount on this booking as compensation. Apologies for the inconvenience.", time: "11:05 AM" },
  ],
};

export function TicketDetailPage() {
  const { id = "TK-1101" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const ticketData = supportTickets.find(x => x.id === id) ?? supportTickets[0];
  const msgs = ticketMessages.default;
  const [reply, setReply] = useState("");

  const bubbleStyle = (sender: string) => ({
    background: sender === "customer" ? C.blueLight : sender === "system" ? C.border : C.greenLight,
    color: sender === "customer" ? C.blueMid : sender === "system" ? C.textMuted : C.greenText,
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/support/tickets" />
        <DetailHeader title={ticketData.issue} id={id} subtitle={`${ticketData.user} · Age: ${ticketData.age}`} badge={ticketData.status}
          actions={
            <div className="flex gap-2">
              <OutlineBtn onClick={() => showToast("Ticket escalated to Tier 2 support.")}><UserCheck size={13} />{t("Escalate")}</OutlineBtn>
              <PrimaryBtn onClick={() => { showToast("Ticket resolved."); navigate("/support/tickets"); }}>
                <CheckCircle2 size={13} />{t("Resolve Ticket")}</PrimaryBtn>
            </div>
          } />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border flex flex-col overflow-hidden" style={{ background: C.card, borderColor: C.border, minHeight: 460 }}>
          <div className="px-5 py-3.5 border-b text-xs font-semibold uppercase tracking-wide" style={{ borderColor: C.border, color: C.textMuted }}>{t("Ticket Thread")}</div>
          <div className="flex-1 p-5 overflow-y-auto space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.sender === "agent" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1 text-xs" style={{ color: C.textMuted }}>
                  <span className="font-semibold" style={{ color: C.textSecondary }}>{m.name}</span>
                  <span>· {m.time}</span>
                </div>
                <div className="max-w-md px-4 py-2.5 rounded-xl text-xs leading-relaxed" style={bubbleStyle(m.sender)}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2" style={{ borderColor: C.border, background: C.bg }}>
            <input value={reply} onChange={e => setReply(e.target.value)}
              placeholder={t("Type support reply…")}
              className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none" style={{ borderColor: C.border, background: C.card, color: C.textPrimary }}
              onKeyDown={e => { if (e.key === "Enter" && reply.trim()) { showToast("Reply sent to customer."); setReply(""); } }} />
            <PrimaryBtn onClick={() => { if (reply.trim()) { showToast("Reply sent to customer."); setReply(""); } }}><Send size={13} />{t("Send")}</PrimaryBtn>
          </div>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Ticket Metadata")}>
            <InfoRow label={t("Ticket ID")}    value={id} mono />
            <InfoRow label={t("Customer")}     value={ticketData.user} />
            <InfoRow label={t("Priority")}     value={<StatusBadge status={ticketData.priority} />} />
            <InfoRow label={t("Status")}       value={<StatusBadge status={ticketData.status} />} />
            <InfoRow label={t("Ticket Age")}   value={ticketData.age} />
            <InfoRow label={t("Assigned Agent")} value="Agent Hana" />
          </InfoCard>
          <InfoCard title={t("Related Booking")}>
            <InfoRow label={t("Booking ID")}   value="HSB-902" mono />
            <InfoRow label={t("Service")}      value="AC Servicing" />
            <InfoRow label={t("Provider")}     value="TechHome Cairo" />
            <InfoRow label={t("Amount")}       value="EGP 480" mono />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
