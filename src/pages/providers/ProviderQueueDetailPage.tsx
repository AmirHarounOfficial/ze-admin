import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { XCircle, CheckCircle2, AlertTriangle, FileCheck, FileText, FileX } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { providerQueue } from "@/mock/mockData";
import {
  BackBtn, DetailHeader, PrimaryBtn, Stat, InfoCard, InfoRow, StatusBadge, SectionHeader, OutlineBtn
} from "@/components/ui/CommonUI";

export function ProviderQueueDetailPage() {
  const { id = "P-1021" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const p = providerQueue.find(x => x.id === id) ?? providerQueue[0];
  const [docStatuses, setDocStatuses] = useState<Record<string, string>>({
    "National ID (Front)": "pending",
    "Commercial Register": "pending",
    "Tax Certificate": "verified",
    "Bank Statement": "pending",
  });

  const docs = Object.entries(docStatuses);
  const allVerified = docs.every(([, s]) => s === "verified");

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/providers/queue" />
        <DetailHeader title={p.name} id={id} subtitle={`${p.category} · Applied ${p.submitted}`} badge={p.status} />
        <div className="flex gap-2 ms-auto">
          <PrimaryBtn danger onClick={() => { showToast("Application rejected. Provider notified."); navigate("/providers/queue"); }}>
            <XCircle size={13} />{t("Reject Application")}</PrimaryBtn>
          <PrimaryBtn onClick={() => { showToast("Provider approved! Account is now active."); navigate("/providers/queue"); }}>
            <CheckCircle2 size={13} /> Approve &amp; Activate
          </PrimaryBtn>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat label={t("Documents Uploaded")} value={p.docs} />
        <Stat label={t("Documents Verified")}  value={docs.filter(([, s]) => s === "verified").length} color={C.green} />
        <Stat label={t("Pending Review")}      value={docs.filter(([, s]) => s === "pending").length}  color={C.orange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InfoCard title={t("Application Details")}>
          <InfoRow label={t("Company Name")}   value={p.name} />
          <InfoRow label={t("Application ID")} value={id} mono />
          <InfoRow label={t("Service Module")} value={p.category} />
          <InfoRow label={t("Submitted On")}   value={p.submitted} />
          <InfoRow label={t("Documents Sent")} value={`${p.docs} files`} />
          <InfoRow label={t("Current Status")} value={<StatusBadge status={p.status} />} />
        </InfoCard>
        <InfoCard title={t("KYC Checklist")}>
          {[
            { label: "Business name matches Commercial Register", done: true  },
            { label: "Owner National ID valid & not expired",     done: true  },
            { label: "Tax certificate active",                    done: false },
            { label: "Bank account matches owner name",           done: false },
            { label: "Operating zone within service coverage",    done: true  },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5 py-2 border-b last:border-0" style={{ borderColor: C.border }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: item.done ? C.greenLight : C.orangeLight }}>
                {item.done ? <CheckCircle2 size={10} color={C.green} /> : <AlertTriangle size={10} color={C.orange} />}
              </div>
              <span className="text-xs" style={{ color: item.done ? C.textPrimary : C.orange }}>{item.label}</span>
            </div>
          ))}
        </InfoCard>
      </div>

      <div>
        <SectionHeader title={t("Document Review")} subtitle={t("Verify each document before approving the application")} />
        <div className="grid grid-cols-2 gap-4">
          {docs.map(([doc, status]) => (
            <div key={doc} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.blueLight }}>
                  <FileCheck size={18} color={C.blueMid} />
                </div>
                <StatusBadge status={status} />
              </div>
              <div className="font-medium text-sm mb-1" style={{ color: C.textPrimary }}>{doc}</div>
              <div className="text-xs mb-4" style={{ color: C.textMuted }}>Submitted {p.submitted}</div>
              <div className="rounded-lg border-2 border-dashed flex items-center justify-center py-8 mb-3" style={{ borderColor: C.border }}>
                <div className="text-center">
                  <FileText size={24} color={C.textMuted} />
                  <div className="text-xs mt-2" style={{ color: C.textMuted }}>{t("Document preview")}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {status !== "verified" && (
                  <PrimaryBtn small onClick={() => { setDocStatuses(p => ({ ...p, [doc]: "verified" })); showToast(`${doc} verified.`); }}>
                    <CheckCircle2 size={11} />{t("Verify")}</PrimaryBtn>
                )}
                {status !== "rejected" && (
                  <OutlineBtn small onClick={() => { setDocStatuses(p => ({ ...p, [doc]: "rejected" })); showToast("Document rejected. Provider notified to reupload."); }}>
                    <FileX size={11} />{t("Reject")}</OutlineBtn>
                )}
                {status === "verified" && (
                  <span className="text-xs flex items-center gap-1" style={{ color: C.green }}><CheckCircle2 size={11} />{t("Verified")}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {allVerified && (
          <div className="mt-4 px-4 py-3 rounded-xl" style={{ background: C.greenLight }}>
            <span className="text-sm font-medium" style={{ color: C.green }}>{t("All documents verified — you can now approve this provider application.")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
