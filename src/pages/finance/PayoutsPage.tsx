import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Filter, Download } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, SearchBar, IconBtn, Tabs, TableWrapper, Th, Td, Avatar, StatusBadge, Pagination } from "@/components/ui/CommonUI";

const payoutRequests = [
  { id: "WD-501", provider: "CleanPro EG",      category: "Home Services", amount: "EGP 8,420", bank: "Banque Misr", requested: "Jul 09, 2025", status: "pending"    },
  { id: "WD-500", provider: "Burger Hub",       category: "Food Delivery", amount: "EGP 14,800",bank: "CIB",         requested: "Jul 09, 2025", status: "pending"    },
  { id: "WD-499", provider: "AutoSpark",        category: "Car Services",  amount: "EGP 6,100", bank: "NBE",         requested: "Jul 08, 2025", status: "processing" },
  { id: "WD-498", provider: "PropEgypt",        category: "Property",      amount: "EGP 24,000",bank: "Alex Bank",   requested: "Jul 08, 2025", status: "processing" },
  { id: "WD-497", provider: "FixIt Cairo",      category: "Home Services", amount: "EGP 3,400", bank: "Banque Misr", requested: "Jul 07, 2025", status: "completed"  },
  { id: "WD-496", provider: "QuickTow",         category: "Roadside",      amount: "EGP 2,100", bank: "CIB",         requested: "Jul 06, 2025", status: "completed"  },
  { id: "WD-495", provider: "Le Grill",         category: "Restaurant",    amount: "EGP 4,600", bank: "HSBC",        requested: "Jul 05, 2025", status: "completed"  },
  { id: "WD-494", provider: "SpeedBox EG",      category: "Parcel",        amount: "EGP 1,200", bank: "NBE",         requested: "Jul 04, 2025", status: "completed"  },
  { id: "WD-493", provider: "TechFix Cairo",    category: "Home Services", amount: "EGP 950",   bank: "CIB",         requested: "Jul 03, 2025", status: "rejected"   },
];

export function PayoutsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("All");
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  function getStatus(p: typeof payoutRequests[0]) {
    return statuses[p.id] ?? p.status;
  }

  const filtered = payoutRequests.filter(p => {
    const st = getStatus(p);
    if (tab === "Pending")    return st === "pending";
    if (tab === "Processing") return st === "processing";
    if (tab === "Completed")  return st === "completed";
    if (tab === "Rejected")   return st === "rejected";
    return true;
  });

  const pending    = payoutRequests.filter(p => getStatus(p) === "pending").length;
  const processing = payoutRequests.filter(p => getStatus(p) === "processing").length;
  const totalPaid  = "EGP 148,300";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Pending Approvals")} value={pending}    color={C.orange} />
        <Stat label={t("Processing")}        value={processing} color={C.blue}   />
        <Stat label={t("Paid This Month")}   value={totalPaid}  color={C.green}  />
        <Stat label={t("Avg Processing Time")} value="1.2 days" />
      </div>

      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by WD-ID, provider, bank…")} />
        <IconBtn icon={<Filter size={12} />}   label={t("Filter")} />
        <IconBtn icon={<Download size={12} />} label={t("Export CSV")} />
      </div>

      <Tabs tabs={["All", "Pending", "Processing", "Completed", "Rejected"]} active={tab} onChange={setTab} />

      <TableWrapper>
        <thead>
          <tr><Th>{t("WD ID")}</Th><Th>{t("Provider")}</Th><Th>{t("Category")}</Th><Th>{t("Amount")}</Th><Th>{t("Bank")}</Th><Th>{t("Requested")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr>
        </thead>
        <tbody>
          {filtered.map(p => {
            const st = getStatus(p);
            return (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{p.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={p.provider} size={26} />{p.provider}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{p.category}</span></Td>
                <Td><span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{p.amount}</span></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{p.bank}</span></Td>
                <Td><span className="text-xs" style={{ color: C.textMuted }}>{p.requested}</span></Td>
                <Td><StatusBadge status={st} /></Td>
                <Td>
                  {st === "pending" && (
                    <div className="flex items-center gap-1">
                      <button className="text-xs px-2.5 py-1 rounded font-medium"
                        style={{ background: C.greenLight, color: C.green }}
                        onClick={() => { setStatuses(s => ({ ...s, [p.id]: "processing" })); showToast(`${p.id} approved and queued for processing.`); }}>{t("Approve")}</button>
                      <button className="text-xs px-2.5 py-1 rounded font-medium"
                        style={{ background: C.redLight, color: C.red }}
                        onClick={() => { setStatuses(s => ({ ...s, [p.id]: "rejected" })); showToast(`${p.id} rejected. Provider notified.`); }}>{t("Reject")}</button>
                    </div>
                  )}
                  {st === "processing" && (
                    <button className="text-xs px-2.5 py-1 rounded font-medium"
                      style={{ background: C.blueLight, color: C.blueMid }}
                      onClick={() => { setStatuses(s => ({ ...s, [p.id]: "completed" })); showToast(`${p.id} marked as paid.`); }}>{t("Mark Paid")}</button>
                  )}
                  {(st === "completed" || st === "rejected") && (
                    <span className="text-xs" style={{ color: C.textMuted }}>—</span>
                  )}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <Pagination total={`${payoutRequests.length} withdrawal requests`} showing={`1–${filtered.length}`} />
    </div>
  );
}
