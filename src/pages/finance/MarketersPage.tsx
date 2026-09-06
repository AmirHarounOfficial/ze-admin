import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { Stat, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge, PrimaryBtn } from "@/components/ui/CommonUI";

const marketers = [
  { id: "MK-101", name: "Dina Rashad",   referrals: 34, active: 28, points: 8400,  balance: "EGP 4,200", status: "active" },
  { id: "MK-102", name: "Hossam Emad",   referrals: 21, active: 15, points: 5100,  balance: "EGP 2,550", status: "active" },
  { id: "MK-103", name: "Nesma Kamel",   referrals: 9,  active: 6,  points: 2100,  balance: "EGP 1,050", status: "active" },
  { id: "MK-104", name: "Sherif Naguib", referrals: 47, active: 40, points: 12800, balance: "EGP 6,400", status: "active" },
];

const withdrawals = [
  { id: "WD-501", marketer: "Dina Rashad",   amount: "EGP 2,000", bank: "CIB **** 4821", submitted: "Jul 08", status: "hold" },
  { id: "WD-500", marketer: "Sherif Naguib", amount: "EGP 3,500", bank: "NBE **** 1234", submitted: "Jul 07", status: "approved" },
  { id: "WD-499", marketer: "Hossam Emad",   amount: "EGP 1,200", bank: "Alex **** 6612", submitted: "Jul 06", status: "cleared" },
  { id: "WD-498", marketer: "Nesma Kamel",   amount: "EGP 800",   bank: "QNB **** 3390", submitted: "Jul 05", status: "rejected" },
];

export function MarketersPage({ onToast }: { onToast?: (msg: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Referral Registry");
  const notify = (msg: string) => onToast ? onToast(msg) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Marketers")}    value={marketers.length} />
        <Stat label={t("Total Referrals")}    value={marketers.reduce((a, m) => a + m.referrals, 0)} color={C.green} />
        <Stat label={t("Pending Payouts")}    value={withdrawals.filter(w => w.status === "hold").length} color={C.orange} />
        <Stat label={t("Payout Volume (Jul)")} value="EGP 7,500" />
      </div>
      <Tabs tabs={["Referral Registry", "Withdrawal Queue"]} active={tab} onChange={setTab} />
      {tab === "Referral Registry" && (
        <TableWrapper>
          <thead><tr><Th>{t("ID")}</Th><Th>{t("Marketer")}</Th><Th>{t("Referred Providers")}</Th><Th>{t("Active Subs")}</Th><Th>{t("Total Points")}</Th><Th>{t("Balance")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {marketers.map(m => (
              <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{m.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={m.name} size={24} />{m.name}</div></Td>
                <Td>{m.referrals}</Td><Td>{m.active}</Td>
                <Td mono>{m.points.toLocaleString()}</Td>
                <Td mono>{m.balance}</Td>
                <Td><StatusBadge status={m.status} /></Td>
                <Td><button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/financial/marketers/${m.id}`)}><MoreHorizontal size={14} color={C.textSecondary} /></button></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
      {tab === "Withdrawal Queue" && (
        <TableWrapper>
          <thead><tr><Th>{t("ID")}</Th><Th>{t("Marketer")}</Th><Th>{t("Amount")}</Th><Th>{t("Bank Account")}</Th><Th>{t("Submitted")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {withdrawals.map(w => (
              <tr key={w.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{w.id}</Td><Td>{w.marketer}</Td>
                <Td mono>{w.amount}</Td>
                <Td><span className="font-mono text-xs" style={{ color: C.textSecondary }}>{w.bank}</span></Td>
                <Td>{w.submitted}</Td>
                <Td><StatusBadge status={w.status} /></Td>
                <Td>
                  {w.status === "hold" && (
                    <div className="flex gap-1">
                      <PrimaryBtn small onClick={() => notify("Withdrawal approved and sent to processor.")}>{t("Approve")}</PrimaryBtn>
                      <PrimaryBtn small danger onClick={() => notify("Withdrawal rejected. Marketer notified.")}>{t("Reject")}</PrimaryBtn>
                    </div>
                  )}
                  {w.status !== "hold" && <span className="text-xs" style={{ color: C.textMuted }}>—</span>}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}
