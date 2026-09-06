import React from "react";
import { useNavigate } from "react-router";
import { Filter, Download } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { Stat, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, StatusBadge, Pagination } from "@/components/ui/CommonUI";

const auditLogs = [
  { id: "AL-8801", admin: "Super Admin",    action: "manual_status_override", target: "Booking #B-20402",    ip: "102.41.22.14",  result: "success", ts: "Jul 09 11:42:03" },
  { id: "AL-8800", admin: "Ops Manager",    action: "provider_approved",      target: "Provider M-0411",     ip: "102.41.22.91",  result: "success", ts: "Jul 09 11:38:15" },
  { id: "AL-8799", admin: "Finance Mgr",    action: "payout_released",        target: "WD-500 (EGP 3,500)", ip: "197.53.11.02",  result: "success", ts: "Jul 09 10:55:42" },
  { id: "AL-8798", admin: "Support Agent",  action: "wallet_credit_issued",   target: "Customer C-5881",    ip: "41.236.08.12",  result: "success", ts: "Jul 09 10:12:07" },
  { id: "AL-8797", admin: "Super Admin",    action: "commission_rate_changed", target: "Food Delivery (8%)", ip: "102.41.22.14",  result: "success", ts: "Jul 09 09:48:31" },
  { id: "AL-8796", admin: "Marketing Mgr", action: "banner_created",         target: "BN-301",              ip: "197.53.44.90",  result: "success", ts: "Jul 08 16:21:09" },
  { id: "AL-8795", admin: "Ops Manager",   action: "provider_suspended",     target: "Provider M-0407",    ip: "102.41.22.91",  result: "success", ts: "Jul 08 14:05:22" },
  { id: "AL-8794", admin: "Finance Mgr",   action: "payout_rejected",        target: "WD-498 (EGP 800)",   ip: "197.53.11.02",  result: "success", ts: "Jul 07 11:30:55" },
];

const actionColors: Record<string, { bg: string; text: string }> = {
  manual_status_override:  { bg: C.purpleLight, text: C.purple },
  provider_approved:       { bg: C.greenLight,  text: C.greenText },
  payout_released:         { bg: C.greenLight,  text: C.greenText },
  wallet_credit_issued:    { bg: C.blueLight,   text: C.blueMid },
  commission_rate_changed: { bg: C.orangeLight, text: C.orange },
  banner_created:          { bg: C.blueLight,   text: C.blueMid },
  provider_suspended:      { bg: C.redLight,    text: C.red },
  payout_rejected:         { bg: C.redLight,    text: C.red },
};

function auditTargetRoute(log: typeof auditLogs[0]): string | null {
  const target = log.target;
  if (target.startsWith("Customer C-")) return `/customers/${target.replace("Customer ", "")}`;
  if (target.startsWith("Provider M-") || target.startsWith("Provider P-")) return `/providers/registry`;
  if (target.startsWith("BN-")) return `/support/banners/${target}`;
  if (target.startsWith("WD-")) return `/financial/payouts`;
  if (target.includes("Food Delivery") || target.includes("Home Services")) return `/financial/commissions`;
  return null;
}

export function AuditPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Stat label={t("Total Actions Today")}  value={auditLogs.length} />
        <Stat label={t("Write Operations")}     value={auditLogs.length} color={C.orange} />
        <Stat label={t("Active Admins")}        value={new Set(auditLogs.map(l => l.admin)).size} color={C.green} />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by admin, action, target…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
        <IconBtn icon={<Download size={12} />} label={t("Export CSV")} />
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("Log ID")}</Th><Th>{t("Timestamp")}</Th><Th>{t("Admin")}</Th><Th>{t("Action")}</Th><Th>{t("Target")}</Th><Th>{t("IP Address")}</Th><Th>{t("Result")}</Th></tr></thead>
        <tbody>
          {auditLogs.map(log => {
            const ac = actionColors[log.action] ?? { bg: C.bg, text: C.textSecondary };
            const route = auditTargetRoute(log);
            return (
              <tr key={log.id} className={`hover:bg-slate-50/60 transition-colors ${route ? "cursor-pointer" : ""}`}
                onClick={() => route && navigate(route)}>
                <Td mono>{log.id}</Td>
                <Td><span className="font-mono text-xs" style={{ color: C.textSecondary }}>{log.ts}</span></Td>
                <Td><div className="flex items-center gap-2"><Avatar name={log.admin} size={22} />{log.admin}</div></Td>
                <Td>
                  <span className="text-xs px-2 py-0.5 rounded-md font-mono font-medium" style={{ background: ac.bg, color: ac.text }}>
                    {log.action}
                  </span>
                </Td>
                <Td>
                  <span className={`text-xs ${route ? "underline underline-offset-2" : ""}`} style={{ color: route ? C.blueMid : C.textSecondary }}>
                    {log.target}
                  </span>
                </Td>
                <Td mono>{log.ip}</Td>
                <Td><StatusBadge status={log.result} /></Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <Pagination total="12,480 log entries" showing="1–8" />
    </div>
  );
}
