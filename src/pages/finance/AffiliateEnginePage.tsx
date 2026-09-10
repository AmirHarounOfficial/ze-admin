import React, { useState } from "react";
import {
  Megaphone, TrendingUp, Wallet, Percent, Plus, Copy,
  Check, Filter, Search, Award, Settings, ArrowRight,
  Gift, RefreshCw, Download, ExternalLink
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, Avatar, Toast
} from "@/components/ui/CommonUI";

interface CommissionRule {
  vertical: string;
  baseTakeRate: string;
  affiliateShare: string;
  platinumMultiplier: string;
  minPayout: string;
  status: "active" | "paused";
}

const MOCK_RULES: CommissionRule[] = [
  { vertical: "Home Services", baseTakeRate: "5.0%", affiliateShare: "1.5%", platinumMultiplier: "1.2x", minPayout: "EGP 500", status: "active" },
  { vertical: "Food Delivery", baseTakeRate: "4.0%", affiliateShare: "1.0%", platinumMultiplier: "1.1x", minPayout: "EGP 250", status: "active" },
  { vertical: "Property Rentals", baseTakeRate: "5.0%", affiliateShare: "2.0%", platinumMultiplier: "1.3x", minPayout: "EGP 1,000", status: "active" },
  { vertical: "Car Maintenance", baseTakeRate: "4.0%", affiliateShare: "1.2%", platinumMultiplier: "1.15x", minPayout: "EGP 500", status: "active" },
  { vertical: "Roadside Assistance", baseTakeRate: "8.0%", affiliateShare: "3.0%", platinumMultiplier: "1.25x", minPayout: "EGP 500", status: "active" },
  { vertical: "Parcel Delivery", baseTakeRate: "5.1%", affiliateShare: "1.0%", platinumMultiplier: "1.1x", minPayout: "EGP 200", status: "active" },
];

interface Promoter {
  id: string;
  name: string;
  phone: string;
  tier: "Platinum" | "Gold" | "Silver" | "Bronze";
  referralsCount: number;
  points: number;
  generatedGMV: number;
  pendingBalance: number;
  lastPayoutDate: string;
  promoCode: string;
}

const MOCK_PROMOTERS: Promoter[] = [
  {
    id: "AFF-101",
    name: "Ahmed Hassan Marketing",
    phone: "+20 100 987 6543",
    tier: "Platinum",
    referralsCount: 420,
    points: 12500,
    generatedGMV: 480000,
    pendingBalance: 14200,
    lastPayoutDate: "2026-09-01",
    promoCode: "AHMED-ZETIME",
  },
  {
    id: "AFF-102",
    name: "Cairo Offers Blog",
    phone: "+20 111 888 7766",
    tier: "Gold",
    referralsCount: 285,
    points: 8400,
    generatedGMV: 310000,
    pendingBalance: 9150,
    lastPayoutDate: "2026-08-28",
    promoCode: "CAIRO-DEALS",
  },
  {
    id: "AFF-103",
    name: "Mahmoud Fawzy",
    phone: "+20 120 444 3322",
    tier: "Silver",
    referralsCount: 142,
    points: 4100,
    generatedGMV: 165000,
    pendingBalance: 4800,
    lastPayoutDate: "2026-09-05",
    promoCode: "FAWZY-VIP",
  },
  {
    id: "AFF-104",
    name: "Auto & Home Reviews EG",
    phone: "+20 106 222 1100",
    tier: "Gold",
    referralsCount: 198,
    points: 6200,
    generatedGMV: 240000,
    pendingBalance: 7300,
    lastPayoutDate: "2026-09-02",
    promoCode: "REVIEW-ZT",
  },
];

export function AffiliateEnginePage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredPromoters = MOCK_PROMOTERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.promoCode.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || p.tier.toLowerCase() === tierFilter.toLowerCase();
    return matchesSearch && matchesTier;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setToastMsg(`Promo code '${code}' copied to clipboard!`);
  };

  const handlePayoutPromoter = (name: string, amount: number) => {
    setToastMsg(`Payout of EGP ${amount.toLocaleString()} dispatched to ${name}.`);
  };

  const handleCreateCode = () => {
    setToastMsg("Opening affiliate campaign & promo code creation modal...");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Affiliate & Commission Engine"
        subtitle="Multi-vertical commission rate rules, promoter network tiers & payout distribution"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={() => setToastMsg("Exporting affiliate network ledger...")}>
              <Download size={14} className="mr-1" />
              {t("Export Matrix")}
            </OutlineBtn>
            <PrimaryBtn onClick={handleCreateCode}>
              <Plus size={14} className="mr-1" />
              {t("Create Promo Code")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Promoters"
          value="284 Marketers"
          sub="Across all 7 verticals"
          trend="+12.4%"
          trendUp={true}
          icon={<Megaphone size={16} />}
          accent={C.purple}
        />
        <KPICard
          title="Referred GMV"
          value="EGP 1,840,000"
          sub="18.2% total platform sales"
          trend="+22.5%"
          trendUp={true}
          icon={<TrendingUp size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Commissions Paid"
          value="EGP 147,200"
          sub="Current month payout volume"
          trend="+15.1%"
          trendUp={true}
          icon={<Wallet size={16} />}
          accent={C.blue}
        />
        <KPICard
          title="Conversion Rate"
          value="8.4%"
          sub="Lead-to-booking conversion"
          trend="+1.2%"
          trendUp={true}
          icon={<Percent size={16} />}
          accent={C.gold}
        />
      </div>

      {/* Multi-Vertical Commission Rate Rules Table */}
      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Multi-Vertical Commission Share Rules")}</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Base take rates and promoter payout tiers per vertical module")}</p>
          </div>
          <OutlineBtn small onClick={() => setToastMsg("Commission rule editor modal opened.")}>
            <Settings size={13} className="mr-1" />
            {t("Edit Rate Rules")}
          </OutlineBtn>
        </div>

        <TableWrapper>
          <thead>
            <tr>
              <Th>Vertical Module</Th>
              <Th>Base Platform Take</Th>
              <Th>Affiliate Commission Share</Th>
              <Th>Platinum Tier Multiplier</Th>
              <Th>Min Payout Threshold</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RULES.map((rule) => (
              <tr key={rule.vertical} className="hover:bg-gray-50/50 transition-colors">
                <Td>
                  <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{t(rule.vertical)}</span>
                </Td>
                <Td mono>{rule.baseTakeRate}</Td>
                <Td mono>
                  <span className="font-bold text-blue-600">{rule.affiliateShare}</span>
                </Td>
                <Td mono>
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold text-xs">
                    {rule.platinumMultiplier}
                  </span>
                </Td>
                <Td mono>{rule.minPayout}</Td>
                <Td>
                  <StatusBadge status={rule.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      </div>

      {/* Promoter Network Leaderboard */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search promoter name, ID, or promo code..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex items-center gap-2">
          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Tiers")}</option>
            <option value="Platinum">{t("Platinum Tier")}</option>
            <option value="Gold">{t("Gold Tier")}</option>
            <option value="Silver">{t("Silver Tier")}</option>
          </select>
        </div>
      </div>

      <TableWrapper>
        <thead>
          <tr>
            <Th>Promoter Name</Th>
            <Th>Tier Level</Th>
            <Th>Promo Code</Th>
            <Th>Active Referrals</Th>
            <Th>Points Earned</Th>
            <Th>GMV Generated</Th>
            <Th>Pending Balance</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPromoters.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} size={34} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{p.name}</div>
                    <div className="text-xs font-mono" style={{ color: C.textMuted }}>{p.id} • {p.phone}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: p.tier === "Platinum" ? "#EFF6FF" : p.tier === "Gold" ? "#FEF3C7" : "#F1F5F9",
                    color: p.tier === "Platinum" ? "#1D4ED8" : p.tier === "Gold" ? "#D97706" : "#475569",
                  }}>
                  ⭐ {p.tier}
                </span>
              </Td>
              <Td mono>
                <button
                  onClick={() => handleCopyCode(p.promoCode)}
                  className="px-2 py-1 rounded border bg-gray-50 text-xs font-semibold flex items-center gap-1 hover:bg-gray-100 transition-colors"
                  style={{ borderColor: C.border, color: C.textPrimary }}
                >
                  <span>{p.promoCode}</span>
                  <Copy size={11} className="text-gray-400" />
                </button>
              </Td>
              <Td mono>{p.referralsCount} {t("users")}</Td>
              <Td mono>{p.points.toLocaleString()} pts</Td>
              <Td mono>EGP {p.generatedGMV.toLocaleString()}</Td>
              <Td mono>
                <span className="font-bold text-purple-600">EGP {p.pendingBalance.toLocaleString()}</span>
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handlePayoutPromoter(p.name, p.pendingBalance)}
                    className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                    style={{ borderColor: C.purpleLight }}
                  >
                    {t("Pay Now")}
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
