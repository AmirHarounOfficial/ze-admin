import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Filter } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { supportTickets } from "@/mock/mockData";
import { Stat, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, StatusBadge, OutlineBtn, PrimaryBtn } from "@/components/ui/CommonUI";

export function SupportPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [resolved, setResolved] = useState<string[]>([]);
  const notify = (m: string) => onToast ? onToast(m) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Open Tickets")}      value={supportTickets.filter(t => t.status === "open" && !resolved.includes(t.id)).length}        color={C.red}    />
        <Stat label={t("In Progress")}       value={supportTickets.filter(t => t.status === "in-progress" && !resolved.includes(t.id)).length} color={C.orange} />
        <Stat label={t("Resolved Today")}    value={supportTickets.filter(t => t.status === "resolved").length + resolved.length}    color={C.green}  />
        <Stat label={t("Avg Resolution")}    value="4.2 h" />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search tickets by ID, user, issue…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("Ticket ID")}</Th><Th>{t("User")}</Th><Th>{t("Issue")}</Th><Th>{t("Priority")}</Th><Th>{t("Status")}</Th><Th>{t("Age")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {supportTickets.map(tData => (
            <tr key={tData.id} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{tData.id}</Td>
              <Td><div className="flex items-center gap-2"><Avatar name={tData.user} size={24} />{tData.user}</div></Td>
              <Td><span style={{ color: C.textSecondary }}>{tData.issue}</span></Td>
              <Td><StatusBadge status={tData.priority} /></Td>
              <Td><StatusBadge status={tData.status} /></Td>
              <Td><span style={{ color: C.textMuted }}>{tData.age}</span></Td>
              <Td>
                <div className="flex gap-1">
                  <OutlineBtn small onClick={() => navigate(`/support/tickets/${tData.id}`)}>{t("View")}</OutlineBtn>
                  {tData.status !== "resolved" && !resolved.includes(tData.id) && (
                    <PrimaryBtn small onClick={() => { setResolved(p => [...p, tData.id]); notify("Ticket resolved. Customer notified."); }}>{t("Resolve")}</PrimaryBtn>
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
