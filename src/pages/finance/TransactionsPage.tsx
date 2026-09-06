import React from "react";
import { useNavigate } from "react-router";
import { Filter, Download } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { transactionData } from "@/mock/mockData";
import { Stat, SearchBar, IconBtn, TableWrapper, Th, Td, StatusBadge, Pagination } from "@/components/ui/CommonUI";

export function TransactionsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Volume (Jul)")}  value="EGP 4.1M" />
        <Stat label={t("Success Rate")}        value="96.2%"     color={C.green}  />
        <Stat label={t("Refunds Today")}       value="EGP 12,400" color={C.orange} />
        <Stat label={t("Pending Payouts")}     value="7"          color={C.red}    />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by TX ID, user, method…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
        <IconBtn icon={<Download size={12} />} label={t("Export CSV")} />
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("TX ID")}</Th><Th>{t("Type")}</Th><Th>{t("User / Entity")}</Th><Th>{t("Amount")}</Th><Th>{t("Method")}</Th><Th>{t("Status")}</Th><Th>{t("Date")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {transactionData.map(tData => (
            <tr key={tData.id} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{tData.id}</Td>
              <Td>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: tData.type === "Payout" ? C.blueLight : tData.type === "Refund" ? C.orangeLight : C.greenLight, color: tData.type === "Payout" ? C.blueMid : tData.type === "Refund" ? C.orange : C.greenText }}>
                  {tData.type}
                </span>
              </Td>
              <Td>{tData.user}</Td><Td mono>{tData.amount}</Td>
              <Td><span style={{ color: C.textSecondary }}>{tData.method}</span></Td>
              <Td><StatusBadge status={tData.status} /></Td>
              <Td><span style={{ color: C.textMuted }}>{tData.date}</span></Td>
              <Td><button className="px-2 py-1 rounded text-xs border hover:bg-gray-50" style={{ borderColor: C.border, color: C.textSecondary }} onClick={() => navigate(`/financial/transactions/${tData.id}`)}>{t("Detail")}</button></Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <Pagination total="82,441 transactions" showing="1–5" />
    </div>
  );
}
