import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Send, CheckCircle2, Lock, DollarSign, Package, Star, Calculator, FileCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { merchantData } from "@/mock/mockData";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, PrimaryBtn, KPICard, Tabs, InfoCard, InfoRow, ModuleTag, StatusBadge, StarRating
} from "@/components/ui/CommonUI";

export function ProviderDetailPage() {
  const { id = "M-0401" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("Profile");
  const m = merchantData.find(x => x.id === id) ?? merchantData[0];
  const [localStatus, setLocalStatus] = useState(m.status);

  const providerModules: Record<string, string[]> = {
    "M-0401": ["Cleaning", "Pest Control"], "M-0403": ["Electrical", "Plumbing"],
    "M-0405": ["Oil Change", "Tyres"], "M-0406": ["Dine-In", "Reservations"],
    "M-0408": ["Property Listing", "Short-Term Rental"], "M-0409": ["Dine-In", "Takeaway"],
  };
  const modules = providerModules[id] ?? m.modules;

  const weeklyOrders = [
    { day: "Mon", orders: 14 }, { day: "Tue", orders: 22 }, { day: "Wed", orders: 18 },
    { day: "Thu", orders: 31 }, { day: "Fri", orders: 27 }, { day: "Sat", orders: 41 }, { day: "Sun", orders: 35 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/providers/registry" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={m.name} size={44} />
          <DetailHeader title={m.name} id={id} subtitle={`${m.category} · Joined ${m.joined}`} badge={localStatus} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn onClick={() => showToast("Notification sent to provider.")}><Send size={13} />{t("Notify")}</OutlineBtn>
          {localStatus === "suspended" ? (
            <PrimaryBtn onClick={() => { setLocalStatus("active"); showToast("Provider reactivated successfully."); }}>
              <CheckCircle2 size={13} />{t("Reactivate")}</PrimaryBtn>
          ) : (
            <OutlineBtn onClick={() => { setLocalStatus("suspended"); showToast("Provider suspended."); }}><Lock size={13} />{t("Suspend")}</OutlineBtn>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Monthly GMV")}      value="EGP 48,200"      sub={t("This month")}        trend="+11.4%"  trendUp    icon={<DollarSign size={15} />}  accent={C.green}  />
        <KPICard title={t("Total Orders")}     value={(m.points ?? 0).toLocaleString()} sub={t("Lifetime orders")}  trend="+8%"     trendUp    icon={<Package size={15} />}     accent={C.blue}   />
        <KPICard title={t("Platform Rating")}  value={String(m.rating)} sub={t("Customer rating")}  trend="+0.1"    trendUp    icon={<Star size={15} />}        accent={C.orange} />
        <KPICard title={t("Commission Rate")}  value="4%"               sub={t("Standard tier")}    trend="stable"  trendUp    icon={<Calculator size={15} />}  accent={C.purple} />
      </div>

      <Tabs tabs={["Profile", "Documents", "Performance", "Financial"]} active={tab} onChange={setTab} />

      {tab === "Profile" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Business Information")}>
            <InfoRow label={t("Company Name")}    value={m.name} />
            <InfoRow label={t("Category")}        value={m.category} />
            <InfoRow label={t("Active Modules")}  value={<div className="flex flex-wrap gap-1">{modules.map(mod => <ModuleTag key={mod} label={mod} />)}</div>} />
            <InfoRow label={t("Provider ID")}     value={id} mono />
            <InfoRow label={t("Status")}          value={<StatusBadge status={localStatus} />} />
            <InfoRow label={t("Platform Since")}  value={m.joined} />
          </InfoCard>
          <InfoCard title={t("Contact & Banking")}>
            <InfoRow label={t("Contact Email")}  value="ops@provider.eg" />
            <InfoRow label={t("Phone")}          value="+20 100 000 1111" mono />
            <InfoRow label={t("City")}           value="Cairo" />
            <InfoRow label={t("Bank Name")}      value="Banque Misr" />
            <InfoRow label={t("IBAN")}           value="EG••••••••••••4821" mono />
            <InfoRow label={t("Tax ID")}         value="TAX-••••-7732" mono />
          </InfoCard>
        </div>
      )}

      {tab === "Documents" && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { doc: "National ID (Owner)", status: "verified", updated: "Jan 2024" },
            { doc: "Commercial Register", status: "verified", updated: "Jan 2024" },
            { doc: "Tax Registration Card", status: "verified", updated: "Feb 2024" },
            { doc: "Business Premises Proof", status: "pending", updated: "Jul 2025" },
            { doc: "Health & Safety Certificate", status: "rejected", updated: "Mar 2024" },
            { doc: "Insurance Certificate", status: "pending", updated: "Jul 2025" },
          ].map(d => (
            <div key={d.doc} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.blueLight }}>
                  <FileCheck size={16} color={C.blueMid} />
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="text-sm font-medium mb-1" style={{ color: C.textPrimary }}>{d.doc}</div>
              <div className="text-xs mb-3" style={{ color: C.textMuted }}>Last updated: {d.updated}</div>
              <div className="flex gap-2">
                <OutlineBtn small onClick={() => showToast("Opening document viewer…")}>{t("View File")}</OutlineBtn>
                {d.status === "pending" && <PrimaryBtn small onClick={() => showToast(`${d.doc} verified.`)}>{t("Verify")}</PrimaryBtn>}
                {d.status === "rejected" && <OutlineBtn small onClick={() => showToast("Reupload requested. Provider notified.")}>{t("Request Reupload")}</OutlineBtn>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Performance" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Weekly Order Volume")}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyOrders} margin={{ top: 8, right: 0, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: C.textMuted }} />
                <YAxis tick={{ fontSize: 11, fill: C.textMuted }} />
                <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                <Bar key="bar-orders" dataKey="orders" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </InfoCard>
          <InfoCard title={t("Rating Breakdown")}>
            {[{ stars: 5, pct: 68 }, { stars: 4, pct: 21 }, { stars: 3, pct: 7 }, { stars: 2, pct: 3 }, { stars: 1, pct: 1 }].map(({ stars, pct }) => (
              <div key={`star-${stars}`} className="flex items-center gap-2 py-1.5">
                <span className="text-xs w-8" style={{ color: C.textSecondary }}>{stars}★</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: C.border }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: C.orange }} />
                </div>
                <span className="text-xs w-8 text-right font-medium" style={{ color: C.textPrimary }}>{pct}%</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: C.border }}>
              <span className="text-xs" style={{ color: C.textSecondary }}>{t("Overall Rating")}</span>
              <StarRating rating={m.rating} />
            </div>
          </InfoCard>
        </div>
      )}

      {tab === "Financial" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Settlement Summary")}>
            <InfoRow label={t("Pending Settlement")}  value={<span style={{ color: C.orange }}>{t("EGP 8,420")}</span>} />
            <InfoRow label={t("Last Payout")}          value="EGP 12,800 — Jun 30" />
            <InfoRow label={t("Commission Rate")}      value="4% of GMV" />
            <InfoRow label={t("VAT Rate")}             value="14% (collected from customer)" />
            <InfoRow label={t("Payment Cycle")}        value="Monthly (1st of month)" />
            <InfoRow label={t("Bank Account")}         value="EG••••••••4821" mono />
            <div className="mt-4">
              <PrimaryBtn onClick={() => showToast("Settlement initiated for EGP 8,420.")}>{t("Initiate Settlement")}</PrimaryBtn>
            </div>
          </InfoCard>
          <InfoCard title={t("Payout History")}>
            {[
              { month: "Jun 2025", amount: "EGP 12,800", status: "cleared" },
              { month: "May 2025", amount: "EGP 11,200", status: "cleared" },
              { month: "Apr 2025", amount: "EGP 9,600",  status: "cleared" },
            ].map(p => (
              <div key={p.month} className="flex items-center justify-between py-2.5 border-b last:border-b-0" style={{ borderColor: C.border }}>
                <div>
                  <div className="text-xs font-medium" style={{ color: C.textPrimary }}>{p.month}</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>{p.amount}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </InfoCard>
        </div>
      )}
    </div>
  );
}
