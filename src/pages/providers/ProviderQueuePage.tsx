import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, CheckCircle2, XCircle, FileText } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { providerQueue } from "@/mock/mockData";
import { Stat, StatusBadge, OutlineBtn, PrimaryBtn } from "@/components/ui/CommonUI";

export function ProviderQueuePage({ onToast }: { onToast: () => void }) {
  const navigate = useNavigate();
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label={t("Awaiting Review")}  value={3 - approved.length} color={C.orange} />
        <Stat label={t("Approved Today")}   value={12 + approved.length} color={C.green} />
        <Stat label={t("Rejected Today")}   value={2} color={C.red} />
      </div>
      {providerQueue.filter(p => !approved.includes(p.id) && !rejected.includes(p.id)).map(p => (
        <div key={p.id} className="rounded-xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className="text-xs mt-1" style={{ color: C.textSecondary }}>
                {p.category} · {p.docs} documents uploaded · Applied {p.submitted}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <OutlineBtn small onClick={() => navigate(`/providers/queue/${p.id}`)}><Eye size={12} />{t("Review Docs")}</OutlineBtn>
              <PrimaryBtn small onClick={() => { setApproved(prev => [...prev, p.id]); onToast(); }}>
                <CheckCircle2 size={12} />{t("Approve")}</PrimaryBtn>
              <PrimaryBtn small danger onClick={() => { setRejected(prev => [...prev, p.id]); onToast(); }}><XCircle size={12} />{t("Reject")}</PrimaryBtn>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {["National ID (Front)", "Commercial Register", "Tax Certificate", "Bank Statement"].map(doc => (
              <div key={doc} className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-6 text-center" style={{ borderColor: C.border }}>
                <FileText size={18} color={C.textMuted} />
                <span className="text-xs mt-2" style={{ color: C.textMuted }}>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {approved.length + rejected.length === providerQueue.length && (
        <div className="rounded-xl border flex flex-col items-center justify-center py-16 text-center" style={{ background: C.card, borderColor: C.border }}>
          <CheckCircle2 size={40} color={C.green} />
          <div className="text-base font-semibold mt-3" style={{ color: C.textPrimary }}>{t("Queue is clear")}</div>
          <div className="text-sm mt-1" style={{ color: C.textSecondary }}>{t("All providers have been reviewed.")}</div>
        </div>
      )}
    </div>
  );
}
