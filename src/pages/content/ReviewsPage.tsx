import React, { useState } from "react";
import { Star, Filter } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { Stat, SearchBar, IconBtn, TableWrapper, Th, Td, Avatar, StatusBadge, PrimaryBtn } from "@/components/ui/CommonUI";

const reviews = [
  { id: "RV-901", reviewer: "Sara Mohamed",  provider: "CleanPro EG",  service: "Home Cleaning",  rating: 2, comment: "Arrived late and left early without finishing.", status: "pending",  date: "Jul 09" },
  { id: "RV-900", reviewer: "Ahmed Khaled",  provider: "AutoSpark",    service: "Car Wash",        rating: 5, comment: "Excellent service, very thorough job!",          status: "approved", date: "Jul 09" },
  { id: "RV-899", reviewer: "Nour Ali",      provider: "Burger Hub",   service: "Food Delivery",  rating: 1, comment: "Wrong items delivered and cold food.",            status: "pending",  date: "Jul 08" },
  { id: "RV-898", reviewer: "Omar Saad",     provider: "PropEgypt",    service: "Property Rental", rating: 4, comment: "Great apartment, very clean and cozy.",           status: "approved", date: "Jul 07" },
  { id: "RV-897", reviewer: "Layla Hassan",  provider: "QuickTow",     service: "Roadside",        rating: 3, comment: "Driver was rude but resolved the problem.",       status: "pending",  date: "Jul 07" },
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} size={11} fill={n <= rating ? C.orange : "none"} color={n <= rating ? C.orange : C.border} />
      ))}
    </div>
  );
}

export function ReviewsPage({ onToast }: { onToast?: (msg: string) => void }) {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(reviews.map(r => [r.id, r.status]))
  );
  const notify = (msg: string) => onToast ? onToast(msg) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Stat label={t("Pending Moderation")} value={Object.values(statuses).filter(s => s === "pending").length} color={C.orange} />
        <Stat label={t("Approved")}           value={Object.values(statuses).filter(s => s === "approved").length} color={C.green} />
        <Stat label={t("Removed")}            value={Object.values(statuses).filter(s => s === "removed").length} color={C.red} />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search reviews…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter by Rating")} />
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("ID")}</Th><Th>{t("Reviewer")}</Th><Th>{t("Provider")}</Th><Th>{t("Service")}</Th><Th>{t("Rating")}</Th><Th>{t("Comment")}</Th><Th>{t("Status")}</Th><Th>{t("Date")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{r.id}</Td>
              <Td><div className="flex items-center gap-2"><Avatar name={r.reviewer} size={24} />{r.reviewer}</div></Td>
              <Td>{r.provider}</Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{r.service}</span></Td>
              <Td><StarDisplay rating={r.rating} /></Td>
              <Td><span className="text-xs line-clamp-1" style={{ color: C.textSecondary, maxWidth: 200 }}>{r.comment}</span></Td>
              <Td><StatusBadge status={statuses[r.id]} /></Td>
              <Td><span style={{ color: C.textMuted }}>{r.date}</span></Td>
              <Td>
                {statuses[r.id] === "pending" ? (
                  <div className="flex gap-1">
                    <PrimaryBtn small onClick={() => { setStatuses(p => ({ ...p, [r.id]: "approved" })); notify("Review approved."); }}>{t("Approve")}</PrimaryBtn>
                    <PrimaryBtn small danger onClick={() => { setStatuses(p => ({ ...p, [r.id]: "removed" })); notify("Review removed."); }}>{t("Remove")}</PrimaryBtn>
                  </div>
                ) : <span className="text-xs" style={{ color: C.textMuted }}>—</span>}
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
