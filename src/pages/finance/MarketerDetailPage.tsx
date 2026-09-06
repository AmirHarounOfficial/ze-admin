import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { Users, Activity, DollarSign, TrendingUp, Lock } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, KPICard, Tabs, TableWrapper, Th, Td, StatusBadge
} from "@/components/ui/CommonUI";

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

export function MarketerDetailPage() {
  const { id = "MK-101" } = useParams();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("Referral Network");
  const m = marketers.find(x => x.id === id) ?? marketers[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/financial/marketers" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={m.name} size={44} />
          <DetailHeader title={m.name} id={id} subtitle={`Referral code: REF-${id.split("-")[1]}`} badge={m.status} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn small onClick={() => showToast("Payout initiated.")}><DollarSign size={13} />{t("Pay Now")}</OutlineBtn>
          <OutlineBtn small onClick={() => showToast("Marketer suspended.")}><Lock size={13} />{t("Suspend")}</OutlineBtn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Referrals")}     value={String(m.referrals)}                  sub={t("Lifetime")}         trend="+2"    trendUp    icon={<Users size={15} />}       accent={C.green}  />
        <KPICard title={t("Active Subscribers")}  value={String(m.active)}                     sub={t("Currently active")} trend="+1"    trendUp    icon={<Activity size={15} />}    accent={C.blue}   />
        <KPICard title={t("Pending Balance")}     value={m.balance}                             sub={t("Awaiting payout")}  trend="+3%"   trendUp    icon={<DollarSign size={15} />}  accent={C.orange} />
        <KPICard title={t("Total Earned")}        value={`EGP ${(m.points * 1.2).toLocaleString()}`} sub={t("All-time payout")} trend="+12%" trendUp icon={<TrendingUp size={15} />} accent={C.purple} />
      </div>

      <Tabs tabs={["Referral Network", "Payout History"]} active={tab} onChange={setTab} />

      {tab === "Referral Network" && (
        <TableWrapper>
          <thead><tr><Th>{t("Provider")}</Th><Th>{t("Joined Via")}</Th><Th>{t("Status")}</Th><Th>{t("Commission Earned")}</Th><Th>{t("Joined")}</Th></tr></thead>
          <tbody>
            {[
              { name: "FixIt Pro",    via: `REF-${id.split("-")[1]}`, status: "active",   earned: "EGP 480", joined: "Feb 2024" },
              { name: "SwiftShip",    via: `REF-${id.split("-")[1]}`, status: "active",   earned: "EGP 320", joined: "Mar 2024" },
              { name: "HomeGuru",     via: `REF-${id.split("-")[1]}`, status: "active",   earned: "EGP 560", joined: "Apr 2024" },
              { name: "QuickLane",    via: `REF-${id.split("-")[1]}`, status: "suspended",earned: "EGP 120", joined: "May 2024" },
            ].slice(0, m.referrals).map(r => (
              <tr key={r.name} className="hover:bg-slate-50/60 transition-colors">
                <Td><div className="flex items-center gap-2"><Avatar name={r.name} size={22} />{r.name}</div></Td>
                <Td mono>{r.via}</Td><Td><StatusBadge status={r.status} /></Td>
                <Td mono>{r.earned}</Td><Td>{r.joined}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Payout History" && (
        <TableWrapper>
          <thead><tr><Th>{t("Withdrawal ID")}</Th><Th>{t("Amount")}</Th><Th>{t("Bank Account")}</Th><Th>{t("Submitted")}</Th><Th>{t("Status")}</Th></tr></thead>
          <tbody>
            {withdrawals.filter((_, i) => i < 2).map(w => (
              <tr key={w.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{w.id}</Td><Td mono>{w.amount}</Td>
                <Td mono>{w.bank}</Td><Td>{w.submitted}</Td>
                <Td><StatusBadge status={w.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}
