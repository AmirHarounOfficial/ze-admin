import React from "react";
import { useParams, useOutletContext } from "react-router";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { transactionData } from "@/mock/mockData";
import {
  BackBtn, DetailHeader, OutlineBtn, PrimaryBtn, InfoCard, Timeline, InfoRow, StatusBadge, Avatar
} from "@/components/ui/CommonUI";

export function TransactionDetailPage() {
  const { id = "TX-9901" } = useParams();
  const { showToast } = useOutletContext<RootCtx>();
  const tx = transactionData.find(x => x.id === id) ?? transactionData[0];
  const rawAmt = parseFloat(tx.amount.replace(/[^0-9.]/g, ""));
  const feePct = 4, vatPct = 14;
  const fee = +(rawAmt * feePct / 100).toFixed(2);
  const vat = +(rawAmt * vatPct / 100).toFixed(2);
  const total = +(rawAmt + fee + vat).toFixed(2);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/financial/transactions" />
        <DetailHeader title={`Transaction ${id}`} id={id} subtitle={`${tx.date} · ${tx.method}`} badge={tx.status}
          actions={
            <div className="flex gap-2">
              <OutlineBtn onClick={() => showToast("Transaction flagged for audit.")}><AlertTriangle size={13} />{t("Flag")}</OutlineBtn>
              <PrimaryBtn onClick={() => showToast("Refund issued to customer wallet.")}><RotateCcw size={13} />{t("Issue Refund")}</PrimaryBtn>
            </div>
          } />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <InfoCard title={t("Amount Breakdown")}>
            <div className="space-y-0">
              {[
                { label: "Base Service Amount", amount: `EGP ${rawAmt.toLocaleString()}`, note: "Provider fee before platform charges" },
                { label: `Platform Fee (${feePct}%)`,    amount: `EGP ${fee}`,             note: `EGP ${rawAmt} × ${feePct}/100` },
                { label: `VAT (${vatPct}%)`,             amount: `EGP ${vat}`,             note: `EGP ${rawAmt} × ${vatPct}/100` },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: C.border }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: C.textPrimary }}>{r.label}</div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: C.textMuted }}>{r.note}</div>
                  </div>
                  <span className="font-mono font-semibold text-sm" style={{ color: C.textPrimary }}>{r.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <div className="text-base font-bold" style={{ color: C.textPrimary }}>{t("Total Charged")}</div>
                <div className="text-lg font-bold font-mono" style={{ color: C.green }}>EGP {total.toLocaleString()}</div>
              </div>
            </div>
          </InfoCard>
          <InfoCard title={t("Transaction Timeline")}>
            <Timeline steps={[
              { label: "Order Placed",              time: `${tx.date} — 09:12 AM`, done: true },
              { label: "Payment Authorized",        time: `${tx.date} — 09:12 AM`, done: true },
              { label: "Funds Captured",            time: `${tx.date} — 09:13 AM`, done: tx.status === "completed" || tx.status === "cleared" },
              { label: "Settlement to Provider",    time: tx.status === "cleared" ? "End of billing cycle" : "Pending",  done: tx.status === "cleared" },
            ]} />
          </InfoCard>
        </div>
        <div className="space-y-4">
          <InfoCard title={t("Customer")}>
            <div className="flex items-center gap-2 mb-3"><Avatar name={tx.user} size={32} /><span className="font-medium text-sm" style={{ color: C.textPrimary }}>{tx.user}</span></div>
            <InfoRow label={t("Payment Method")} value={tx.method} />
            <InfoRow label={t("Card / Wallet")}  value="•••• •••• •••• 4821" mono />
            <InfoRow label={t("Service Module")} value={tx.type} />
          </InfoCard>
          <InfoCard title={t("Platform Reference")}>
            <InfoRow label={t("TX ID")}          value={id} mono />
            <InfoRow label={t("Gateway Ref")}    value="PF-8812-XQZT" mono />
            <InfoRow label={t("Currency")}       value="EGP" />
            <InfoRow label={t("Status")}         value={<StatusBadge status={tx.status} />} />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
