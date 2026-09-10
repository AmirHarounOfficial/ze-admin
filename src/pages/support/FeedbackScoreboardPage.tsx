import React, { useState } from "react";
import { useOutletContext } from "react-router";
import {
  Star, Heart, AlertOctagon, ShieldCheck, ThumbsUp, MessageCircle,
  Filter, Download, Search, CheckCircle2, ShieldAlert, Award, RefreshCw
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  KPICard, Stat, SearchBar, IconBtn, PrimaryBtn, OutlineBtn,
  TableWrapper, Th, Td, StatusBadge, Tabs
} from "@/components/ui/CommonUI";

interface ReviewFeedbackItem {
  id: string;
  customer: string;
  provider: string;
  vertical: string;
  rating: number;
  sentiment: "positive" | "neutral" | "critical";
  comment: string;
  flagReason: string | null;
  date: string;
  status: "approved" | "pending_review" | "flagged_abuse" | "hidden";
}

const mockReviewsFeedback: ReviewFeedbackItem[] = [
  { id: "REV-8801", customer: "Amr Al-Sawy", provider: "Abou El Sid Restaurant", vertical: "Food Delivery", rating: 5, sentiment: "positive", comment: "Food arrived piping hot! Rider was extremely polite and packaging was intact.", flagReason: null, date: "Jul 12, 2025", status: "approved" },
  { id: "REV-8802", customer: "Dalia Mansour", provider: "El-Ghaffar Auto Care", vertical: "Car Maintenance", rating: 1, sentiment: "critical", comment: "Overcharged for synthetic oil change and technician damaged the air filter box!", flagReason: "Low rating severe complaint", date: "Jul 11, 2025", status: "pending_review" },
  { id: "REV-8803", customer: "Hassan Farag", provider: "Zamalek Deluxe Suite #402", vertical: "Property Rentals", rating: 4, sentiment: "positive", comment: "Apartment view was stunning. Minor delay during key handover but hostess fixed it fast.", flagReason: null, date: "Jul 10, 2025", status: "approved" },
  { id: "REV-8804", customer: "Rania Tawfik", provider: "Master Plumber Service", vertical: "Home Services", rating: 5, sentiment: "positive", comment: "Outstanding work! Fixed the bathroom pipe burst in under 30 minutes.", flagReason: null, date: "Jul 09, 2025", status: "approved" },
  { id: "REV-8805", customer: "Yasser Badawy", provider: "Cairo Express Parcel Co.", vertical: "Parcel Delivery", rating: 1, sentiment: "critical", comment: "Package box arrived crushed! Driver refused to wait for content inspection.", flagReason: "Potential fraud / damage claim", date: "Jul 08, 2025", status: "flagged_abuse" },
  { id: "REV-8806", customer: "Mariam Soliman", provider: "Giza Rescue Flatbed Tow", vertical: "Roadside Rescue", rating: 5, sentiment: "positive", comment: "Captain arrived in 8 minutes on the Ring Road! Lifesaver during midnight breakdown.", flagReason: null, date: "Jul 06, 2025", status: "approved" },
  { id: "REV-8807", customer: "Mostafa Helmy", provider: "La Gourmandise Bistro", vertical: "Dining Bookings", rating: 2, sentiment: "neutral", comment: "Table was ready on time but waiter service was very slow.", flagReason: null, date: "Jul 04, 2025", status: "approved" },
];

export function FeedbackScoreboardPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [reviews, setReviews] = useState<ReviewFeedbackItem[]>(mockReviewsFeedback);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const categories = ["All", "Pending Moderation", "Critical Complaints", "5-Star Ratings", "Hidden / Abusive"];

  const filteredReviews = reviews.filter(rev => {
    const q = query.toLowerCase();
    const matchesQ = rev.id.toLowerCase().includes(q) || rev.customer.toLowerCase().includes(q) || rev.provider.toLowerCase().includes(q) || rev.comment.toLowerCase().includes(q);
    if (tab === "Pending Moderation") return matchesQ && (rev.status === "pending_review" || rev.status === "flagged_abuse");
    if (tab === "Critical Complaints") return matchesQ && rev.sentiment === "critical";
    if (tab === "5-Star Ratings")     return matchesQ && rev.rating === 5;
    if (tab === "Hidden / Abusive")   return matchesQ && rev.status === "hidden";
    return matchesQ;
  });

  const handleApprove = (revId: string) => {
    setReviews(prev => prev.map(r => r.id === revId ? { ...r, status: "approved" } : r));
    showToast(`Review ${revId} approved and published to platform.`);
  };

  const handleHide = (revId: string) => {
    setReviews(prev => prev.map(r => r.id === revId ? { ...r, status: "hidden" } : r));
    showToast(`Review ${revId} hidden from public view. Merchant notified.`);
  };

  const handleCompensation = (revId: string, customer: string) => {
    showToast(`EGP 100 wallet credit issued to ${customer} for review inquiry.`);
  };

  const pendingModerationCount = reviews.filter(r => r.status === "pending_review" || r.status === "flagged_abuse").length;

  return (
    <div className="space-y-5">
      {/* NPS & CSAT Telemetry KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Platform CSAT Rating")}  value="4.85 ★" sub={t("Weighted across 14.2K reviews")} trend="+0.04" trendUp icon={<Star size={15} />} accent={C.gold} />
        <KPICard title={t("Net Promoter Score")}    value="+68 NPS" sub={t("Promoters: 78% • Detractors: 10%")} trend="+4" trendUp icon={<Heart size={15} />} accent={C.purple} />
        <KPICard title={t("Pending Moderation")}     value={String(pendingModerationCount)} sub={t("Requires agent review")} trend="-2" trendUp icon={<AlertOctagon size={15} />} accent={C.orange} />
        <KPICard title={t("Disputes Compensated")}   value="EGP 14.2K" sub={t("Wallet credits issued this month")} trend="-8%" trendUp={false} icon={<ShieldCheck size={15} />} accent={C.blue} />
      </div>

      {/* Vertical Ratings Breakdown & Moderation Funnel */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border p-4 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.textPrimary }}>
              <Star size={15} style={{ color: C.gold }} />
              {t("CSAT Score Breakdown by Service Vertical")}
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: C.goldLight, color: C.gold }}>
              Customer Experience
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="w-32 font-medium" style={{ color: C.textPrimary }}>{t("Roadside Rescue")}</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
              </div>
              <span className="font-bold text-emerald-600">4.92 ★</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="w-32 font-medium" style={{ color: C.textPrimary }}>{t("Home Services")}</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }} />
              </div>
              <span className="font-bold text-emerald-600">4.88 ★</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="w-32 font-medium" style={{ color: C.textPrimary }}>{t("Food Delivery")}</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }} />
              </div>
              <span className="font-bold text-emerald-600">4.84 ★</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="w-32 font-medium" style={{ color: C.textPrimary }}>{t("Car Maintenance")}</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "88%" }} />
              </div>
              <span className="font-bold text-amber-600">4.72 ★</span>
            </div>
          </div>
        </div>

        {/* AI Moderation Pipeline */}
        <div className="rounded-xl border p-4 space-y-3 flex flex-col justify-between" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: C.border }}>
              <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: C.textPrimary }}>
                <ShieldAlert size={13} style={{ color: C.orange }} />
                {t("AI Moderation Pipeline")}
              </div>
              <span className="text-[11px] font-semibold text-amber-600">{pendingModerationCount} {t("Flagged")}</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border text-xs" style={{ background: C.orangeLight, borderColor: C.orange }}>
                <div className="font-semibold text-amber-900 flex items-center justify-between">
                  <span>El-Ghaffar Auto Care</span>
                  <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-mono">1 Star</span>
                </div>
                <div className="text-[11px] text-amber-800 mt-0.5">Severe overcharge & damage complaint under agent review.</div>
              </div>

              <div className="p-2.5 rounded-lg border text-xs" style={{ background: C.redLight, borderColor: C.red }}>
                <div className="font-semibold text-red-900 flex items-center justify-between">
                  <span>Cairo Express Parcel</span>
                  <span className="text-[10px] bg-red-200 px-1.5 py-0.5 rounded font-mono">Fraud Claim</span>
                </div>
                <div className="text-[11px] text-red-800 mt-0.5">Parcel damage dispute flagged for wallet reimbursement.</div>
              </div>
            </div>
          </div>

          <OutlineBtn small onClick={() => showToast("AI moderation rules opened.")}>
            <ShieldCheck size={12} />
            {t("Configure AI Filters")}
          </OutlineBtn>
        </div>
      </div>

      {/* Main Search & Filter Controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <SearchBar placeholder={t("Search reviews by customer, provider, comment or rating...")} value={query} onChange={setQuery} />
          <Tabs tabs={categories} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-2">
          <OutlineBtn small onClick={() => showToast("Feedback ledger exported to CSV.")}>
            <Download size={12} />
            {t("Export CSV")}
          </OutlineBtn>
        </div>
      </div>

      {/* Feedback & Moderation Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <TableWrapper>
          <thead>
            <tr>
              <Th>{t("Review ID")}</Th>
              <Th>{t("Customer & Provider")}</Th>
              <Th>{t("Vertical")}</Th>
              <Th>{t("Rating Stars")}</Th>
              <Th>{t("Customer Feedback & Comment")}</Th>
              <Th>{t("Status")}</Th>
              <Th>{t("Actions")}</Th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-sm" style={{ color: C.textMuted }}>
                  {t("No customer reviews match your search filter.")}
                </td>
              </tr>
            ) : (
              filteredReviews.map(rev => (
                <tr key={rev.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>
                    <span className="font-semibold" style={{ color: C.textPrimary }}>{rev.id}</span>
                  </Td>
                  <Td>
                    <div>
                      <span className="font-medium text-sm block" style={{ color: C.textPrimary }}>{rev.customer}</span>
                      <span className="text-[11px] text-emerald-600 font-medium">{rev.provider}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: C.blueLight, color: C.blueMid }}>
                      {rev.vertical}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <span>{rev.rating}</span>
                      <Star size={13} fill="currentColor" />
                    </div>
                  </Td>
                  <Td>
                    <div className="max-w-md">
                      <p className="text-xs text-slate-700 font-medium line-clamp-2">"{rev.comment}"</p>
                      {rev.flagReason && (
                        <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">
                          ⚠ Flag: {rev.flagReason}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge status={rev.status} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5">
                      {rev.status !== "approved" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-emerald-50 text-emerald-600 transition-colors"
                          style={{ borderColor: C.green }}
                          onClick={() => handleApprove(rev.id)}
                        >
                          {t("Approve")}
                        </button>
                      )}
                      {rev.status !== "hidden" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-amber-50 text-amber-600 transition-colors"
                          style={{ borderColor: C.orange }}
                          onClick={() => handleHide(rev.id)}
                        >
                          {t("Hide")}
                        </button>
                      )}
                      {rev.sentiment === "critical" && (
                        <button
                          className="px-2 py-1 rounded text-xs font-semibold border hover:bg-purple-50 text-purple-600 transition-colors"
                          style={{ borderColor: C.purple }}
                          onClick={() => handleCompensation(rev.id, rev.customer)}
                        >
                          {t("Credit EGP 100")}
                        </button>
                      )}
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrapper>
      </div>
    </div>
  );
}
