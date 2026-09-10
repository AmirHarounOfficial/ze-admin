import React, { useState } from "react";
import {
  Wallet, Landmark, CreditCard, Lock, ShieldAlert, ArrowUpRight,
  ArrowDownLeft, RefreshCw, CheckCircle2, Download, Filter, Search,
  Zap, Clock, FileSpreadsheet, Building2, AlertCircle
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, SectionHeader, TableWrapper, Th, Td, StatusBadge,
  SearchBar, PrimaryBtn, OutlineBtn, Toast
} from "@/components/ui/CommonUI";

interface SettlementBatch {
  id: string;
  gateway: "CIB Direct ACH" | "Vodafone Cash" | "Paymob" | "Fawry Pay";
  merchantsCount: number;
  grossAmount: number;
  netDisbursal: number;
  vatTax: number;
  status: "approved" | "pending" | "processing" | "on-hold";
  scheduledTime: string;
  disbursalRef: string;
}

const MOCK_BATCHES: SettlementBatch[] = [
  {
    id: "BATCH-9081",
    gateway: "CIB Direct ACH",
    merchantsCount: 48,
    grossAmount: 450000,
    netDisbursal: 427500,
    vatTax: 22500,
    status: "approved",
    scheduledTime: "Today 16:00",
    disbursalRef: "ACH-2026-0910-01",
  },
  {
    id: "BATCH-9082",
    gateway: "Vodafone Cash",
    merchantsCount: 112,
    grossAmount: 280000,
    netDisbursal: 266000,
    vatTax: 14000,
    status: "processing",
    scheduledTime: "Today 17:30",
    disbursalRef: "VFC-8849201",
  },
  {
    id: "BATCH-9083",
    gateway: "Paymob",
    merchantsCount: 35,
    grossAmount: 180000,
    netDisbursal: 171000,
    vatTax: 9000,
    status: "pending",
    scheduledTime: "Tomorrow 10:00",
    disbursalRef: "PMB-9910482",
  },
  {
    id: "BATCH-9084",
    gateway: "Fawry Pay",
    merchantsCount: 19,
    grossAmount: 70400,
    netDisbursal: 66880,
    vatTax: 3520,
    status: "on-hold",
    scheduledTime: "Pending Audit",
    disbursalRef: "FWY-1049281",
  },
];

export function TreasuryCommandPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredBatches = MOCK_BATCHES.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.gateway.toLowerCase().includes(search.toLowerCase()) ||
      b.disbursalRef.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSweep = (gatewayName: string) => {
    setToastMsg(`Instant settlement sweep triggered for ${gatewayName}. Funds releasing to treasury vault.`);
  };

  const handleApproveBatch = (batchId: string) => {
    setToastMsg(`Settlement batch ${batchId} approved for bank disbursal.`);
  };

  const handleExportLedger = () => {
    setToastMsg("Exporting full treasury balance & settlement ledger CSV...");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* Header */}
      <SectionHeader
        title="Treasury Command & Settlement Hub"
        subtitle="Real-time liquidity monitoring, payment gateway reserves & batch settlement clearing"
        actions={
          <div className="flex items-center gap-2">
            <OutlineBtn onClick={handleExportLedger}>
              <FileSpreadsheet size={14} className="mr-1" />
              {t("Export Treasury Ledger")}
            </OutlineBtn>
            <PrimaryBtn onClick={() => handleSweep("All Gateways")}>
              <Zap size={14} className="mr-1" />
              {t("Trigger Gateway Clearance Sweep")}
            </PrimaryBtn>
          </div>
        }
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Vault Liquidity"
          value="EGP 4,850,200"
          sub="Across bank vaults & gateways"
          trend="+14.2%"
          trendUp={true}
          icon={<Landmark size={16} />}
          accent={C.green}
        />
        <KPICard
          title="Gateway Escrow Reserve"
          value="EGP 1,240,000"
          sub="Paymob, Fawry, Vodafone Cash"
          trend="+6.8%"
          trendUp={true}
          icon={<Lock size={16} />}
          accent={C.blue}
        />
        <KPICard
          title="Pending Disbursals"
          value="EGP 980,400"
          sub="4 batches awaiting signoff"
          trend="-3 batches"
          trendUp={true}
          icon={<RefreshCw size={16} />}
          accent={C.orange}
        />
        <KPICard
          title="Held / Risk Funds"
          value="EGP 42,500"
          sub="3 accounts under audit hold"
          trend="-1.2%"
          trendUp={true}
          icon={<ShieldAlert size={16} />}
          accent={C.red}
        />
      </div>

      {/* Gateway Reserves & Clearance Matrix */}
      <div className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>{t("Payment Gateway Reserves & Clearing Channels")}</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{t("Live balance breakdown across automated clearing partners")}</p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {t("System Status: All Channels Operational")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "CIB Primary Treasury", balance: "EGP 3,690,200", status: "Primary Vault", cycle: "Real-time", color: C.green, icon: <Landmark size={18} /> },
            { name: "Paymob Merchant Escrow", balance: "EGP 620,000", status: "Online (Sync 30s)", cycle: "Daily (T+1)", color: C.blue, icon: <CreditCard size={18} /> },
            { name: "Fawry Pay Channel", balance: "EGP 380,000", status: "Online", cycle: "Daily (T+1)", color: C.gold, icon: <Building2 size={18} /> },
            { name: "Vodafone Cash Wallet", balance: "EGP 160,000", status: "High Volume", cycle: "Instant", color: C.purple, icon: <Zap size={18} /> },
          ].map((gw, idx) => (
            <div key={idx} className="p-4 rounded-xl border flex flex-col justify-between"
              style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: gw.color + "20", color: gw.color }}>
                  {gw.icon}
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: gw.color + "18", color: gw.color }}>
                  {t(gw.status)}
                </span>
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight" style={{ color: C.textPrimary }}>{gw.balance}</div>
                <div className="text-xs font-medium mt-1" style={{ color: C.textPrimary }}>{t(gw.name)}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.textMuted }}>{t("Cycle:")} {t(gw.cycle)}</div>
              </div>
              <button
                onClick={() => handleSweep(gw.name)}
                className="mt-3 pt-2 border-t w-full text-left text-xs font-semibold flex items-center justify-between transition-colors hover:opacity-80"
                style={{ borderColor: C.border, color: gw.color }}
              >
                <span>{t("Trigger Sweep")}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Batches Controls & Table */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by batch ID, clearing gateway, or reference..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer"
            style={{ background: C.card, borderColor: C.border, color: C.textPrimary }}
          >
            <option value="all">{t("All Batch Statuses")}</option>
            <option value="approved">{t("Approved")}</option>
            <option value="processing">{t("Processing")}</option>
            <option value="pending">{t("Pending Approval")}</option>
            <option value="on-hold">{t("On Hold / Audit")}</option>
          </select>
        </div>
      </div>

      <TableWrapper>
        <thead>
          <tr>
            <Th>Batch Reference</Th>
            <Th>Clearing Gateway</Th>
            <Th>Merchants Count</Th>
            <Th>Gross Volume</Th>
            <Th>Net Disbursal</Th>
            <Th>Tax (14% VAT)</Th>
            <Th>Status</Th>
            <Th>Scheduled Time</Th>
            <Th right>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredBatches.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
              <Td mono>
                <div className="flex flex-col">
                  <span className="font-bold text-sm" style={{ color: C.textPrimary }}>{b.id}</span>
                  <span className="text-[10px]" style={{ color: C.textMuted }}>{b.disbursalRef}</span>
                </div>
              </Td>
              <Td>
                <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>{t(b.gateway)}</span>
              </Td>
              <Td mono>{b.merchantsCount} {t("Merchants")}</Td>
              <Td mono>EGP {b.grossAmount.toLocaleString()}</Td>
              <Td mono>
                <span className="font-bold text-emerald-600">EGP {b.netDisbursal.toLocaleString()}</span>
              </Td>
              <Td mono>EGP {b.vatTax.toLocaleString()}</Td>
              <Td>
                <StatusBadge status={b.status} />
              </Td>
              <Td>
                <div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}>
                  <Clock size={12} color={C.textMuted} />
                  <span>{b.scheduledTime}</span>
                </div>
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-1.5">
                  {b.status === "pending" && (
                    <button
                      onClick={() => handleApproveBatch(b.id)}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      style={{ borderColor: C.greenLight }}
                    >
                      {t("Approve Batch")}
                    </button>
                  )}
                  <button
                    onClick={() => setToastMsg(`Downloading ACH payment file for ${b.id}...`)}
                    className="p-1.5 rounded-lg border hover:bg-gray-100 transition-colors"
                    title={t("Download ACH File")}
                    style={{ borderColor: C.border, color: C.textSecondary }}
                  >
                    <Download size={14} />
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
