import React, { useState } from "react";
import {
  Star, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  MessageSquare, ThumbsUp, ThumbsDown, Filter, ArrowUpDown, ChevronRight,
  Award, Users, BarChart3, Frown, Meh, Smile, Heart,
  UtensilsCrossed, Home, Wrench, Car, Truck, Pizza, Package
} from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { KPICard, Tabs, SearchBar, IconBtn } from "@/components/ui/CommonUI";

/* ─── Mock Data ─── */

const npsScore = 72; // out of 100

const verticalQuality = [
  { key: "restaurant",  label: "Restaurant",     icon: <UtensilsCrossed size={15} />, color: "#6366f1", avgRating: 4.5, totalReviews: 1842, complaints: 23,  complaintRate: 1.2, trend: "+0.2", trendUp: true  },
  { key: "property",    label: "Property",        icon: <Home size={15} />,            color: "#de8208", avgRating: 4.3, totalReviews: 624,  complaints: 18,  complaintRate: 2.9, trend: "-0.1", trendUp: false },
  { key: "home",        label: "Home Services",   icon: <Wrench size={15} />,          color: "#06854d", avgRating: 4.6, totalReviews: 2105, complaints: 31,  complaintRate: 1.5, trend: "+0.3", trendUp: true  },
  { key: "car",         label: "Car Services",    icon: <Car size={15} />,             color: "#2563EB", avgRating: 4.4, totalReviews: 1389, complaints: 19,  complaintRate: 1.4, trend: "+0.1", trendUp: true  },
  { key: "roadside",    label: "Roadside",        icon: <Truck size={15} />,           color: "#EF4444", avgRating: 4.2, totalReviews: 897,  complaints: 42,  complaintRate: 4.7, trend: "-0.3", trendUp: false },
  { key: "food",        label: "Food Delivery",   icon: <Pizza size={15} />,           color: "#7C3AED", avgRating: 4.5, totalReviews: 3421, complaints: 58,  complaintRate: 1.7, trend: "+0.1", trendUp: true  },
  { key: "parcel",      label: "Parcel Delivery", icon: <Package size={15} />,         color: "#0891b2", avgRating: 4.3, totalReviews: 1856, complaints: 41,  complaintRate: 2.2, trend: "+0.2", trendUp: true  },
];

const recentReviews = [
  { id: 1,  customer: "Sara Mohamed",  rating: 5, vertical: "food",       provider: "Burger Hub",      text: "Excellent service! The delivery was super fast and the food was hot.",                         time: "12 min ago",  sentiment: "positive" },
  { id: 2,  customer: "Omar Saad",     rating: 2, vertical: "roadside",   provider: "FastRescue",      text: "Waited 20 minutes for a battery jump. The captain was rude when he arrived.",                time: "18 min ago",  sentiment: "negative" },
  { id: 3,  customer: "Nour Ali",      rating: 4, vertical: "home",        provider: "HomeGuru",        text: "Good cleaning job overall. A bit late but the team was professional.",                        time: "25 min ago",  sentiment: "positive" },
  { id: 4,  customer: "Layla Hassan",  rating: 5, vertical: "restaurant", provider: "Le Grill",        text: "Perfect dining experience. The table was ready and the ambiance was amazing.",                time: "31 min ago",  sentiment: "positive" },
  { id: 5,  customer: "Ahmed Khaled",  rating: 1, vertical: "property",   provider: "CityRent EG",     text: "Photos were completely misleading. The apartment was dirty and not as described.",            time: "42 min ago",  sentiment: "negative" },
  { id: 6,  customer: "Mona Tarek",    rating: 4, vertical: "car",        provider: "ZoomFix",         text: "Quick oil change, fair pricing. Would recommend for routine maintenance.",                    time: "48 min ago",  sentiment: "positive" },
  { id: 7,  customer: "Youssef Fathy", rating: 3, vertical: "parcel",     provider: "NextDay EG",      text: "Package arrived but the box was slightly damaged. Contents were fine though.",                time: "55 min ago",  sentiment: "neutral"  },
  { id: 8,  customer: "Hana Fouad",    rating: 5, vertical: "food",       provider: "Nile Brasserie",  text: "Best shawarma in Cairo! Driver was friendly and delivery was right on time.",                 time: "1 hr ago",    sentiment: "positive" },
  { id: 9,  customer: "Karim Zidan",   rating: 2, vertical: "home",        provider: "EasyMend",        text: "Technician didn't show up at the scheduled time. Had to call support twice.",                time: "1.2 hrs ago", sentiment: "negative" },
  { id: 10, customer: "Dina Ashraf",   rating: 4, vertical: "roadside",   provider: "CairoAssist",     text: "Fast response time, the captain was helpful. Just wish the app showed live ETA.",             time: "1.5 hrs ago", sentiment: "positive" },
];

const complaintPipeline = [
  { stage: "New",          count: 14, color: "#2563EB", items: [
    { id: "CMP-301", customer: "Omar Saad",    vertical: "Roadside",  issue: "Late response + rude captain", time: "18 min" },
    { id: "CMP-302", customer: "Ahmed Khaled", vertical: "Property",  issue: "Misleading listing photos",    time: "42 min" },
    { id: "CMP-303", customer: "Karim Zidan",  vertical: "Home",      issue: "No-show technician",           time: "1.2 hrs" },
  ]},
  { stage: "Under Review", count: 8,  color: "#de8208", items: [
    { id: "CMP-298", customer: "Mona Kamal",   vertical: "Parcel",    issue: "Package delivered to wrong address", time: "3 hrs" },
    { id: "CMP-297", customer: "Ramy Fouad",   vertical: "Food",      issue: "Order missing items",          time: "4 hrs" },
  ]},
  { stage: "Escalated",    count: 3,  color: "#EF4444", items: [
    { id: "CMP-291", customer: "Sara Ahmed",   vertical: "Property",  issue: "Host cancelled + no refund",   time: "2 days" },
    { id: "CMP-290", customer: "Nour Farid",   vertical: "Roadside",  issue: "Vehicle damage during towing",  time: "3 days" },
  ]},
  { stage: "Resolved",     count: 187, color: "#06854d", items: [
    { id: "CMP-289", customer: "Layla Hassan", vertical: "Food",      issue: "Late delivery — credit issued", time: "1 day" },
    { id: "CMP-288", customer: "Omar Farid",   vertical: "Car",       issue: "Overcharged — refund processed", time: "2 days" },
  ]},
];

const providerRankings = [
  { rank: 1,  name: "HomeGuru",        vertical: "Home Services",   rating: 4.7, responseTime: "14 min",  completionRate: 97, complaintRatio: 1.1, score: 96 },
  { rank: 2,  name: "Le Grill",        vertical: "Restaurant",      rating: 4.7, responseTime: "—",       completionRate: 99, complaintRatio: 0.8, score: 95 },
  { rank: 3,  name: "ZoomFix",         vertical: "Car Services",    rating: 4.6, responseTime: "12 min",  completionRate: 96, complaintRatio: 1.2, score: 94 },
  { rank: 4,  name: "SwiftShip",       vertical: "Parcel Delivery", rating: 4.6, responseTime: "—",       completionRate: 94, complaintRatio: 1.8, score: 93 },
  { rank: 5,  name: "CairoAssist",     vertical: "Roadside",        rating: 4.6, responseTime: "41 sec",  completionRate: 95, complaintRatio: 2.1, score: 92 },
  { rank: 6,  name: "AutoCare Elite",  vertical: "Car Services",    rating: 4.7, responseTime: "8 min",   completionRate: 98, complaintRatio: 0.9, score: 91 },
  { rank: 7,  name: "QuickBox",        vertical: "Parcel Delivery", rating: 4.7, responseTime: "—",       completionRate: 96, complaintRatio: 1.4, score: 91 },
  { rank: 8,  name: "Burger Hub",      vertical: "Food Delivery",   rating: 4.5, responseTime: "6 min",   completionRate: 93, complaintRatio: 2.0, score: 89 },
  { rank: 9,  name: "PropEgypt",       vertical: "Property",        rating: 4.4, responseTime: "—",       completionRate: 91, complaintRatio: 2.4, score: 87 },
  { rank: 10, name: "FastRescue",      vertical: "Roadside",        rating: 4.4, responseTime: "55 sec",  completionRate: 88, complaintRatio: 4.2, score: 78 },
];

/* ─── Component ─── */

export function ServiceQualityPage() {
  const [activeTab, setActiveTab] = useState("Quality Grid");
  const [sortBy, setSortBy] = useState<"score" | "rating" | "complaints">("score");

  const totalReviews   = verticalQuality.reduce((a, v) => a + v.totalReviews, 0);
  const avgRating      = (verticalQuality.reduce((a, v) => a + v.avgRating, 0) / verticalQuality.length).toFixed(1);
  const totalComplaints = verticalQuality.reduce((a, v) => a + v.complaints, 0);
  const overallComplaintRate = ((totalComplaints / totalReviews) * 100).toFixed(1);

  const sentimentIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    positive: { icon: <Smile size={13} />,   color: C.green,  bg: C.greenLight },
    neutral:  { icon: <Meh size={13} />,     color: C.orange, bg: C.orangeLight },
    negative: { icon: <Frown size={13} />,   color: C.red,    bg: C.redLight },
  };

  const verticalColorMap: Record<string, string> = Object.fromEntries(verticalQuality.map(v => [v.key, v.color]));
  const verticalIconMap: Record<string, React.ReactNode> = Object.fromEntries(verticalQuality.map(v => [v.key, v.icon]));

  const sorted = [...providerRankings].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "complaints") return a.complaintRatio - b.complaintRatio;
    return b.score - a.score;
  });

  // NPS gauge angle (0-180)
  const npsAngle = (npsScore / 100) * 180;

  return (
    <div className="space-y-5">
      {/* ─── Hero KPIs ─── */}
      <div className="grid grid-cols-5 gap-4">
        {/* NPS Score — Large hero card */}
        <div className="col-span-1 rounded-xl border p-5 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide mb-3" style={{ color: C.textSecondary }}>{t("NPS Score")}</div>
          {/* Gauge */}
          <div className="relative w-28 h-14 mb-2">
            <svg viewBox="0 0 120 60" className="w-full h-full">
              {/* Background arc */}
              <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke={C.border} strokeWidth="8" strokeLinecap="round" />
              {/* Value arc */}
              <path
                d="M 10 55 A 50 50 0 0 1 110 55"
                fill="none"
                stroke={npsScore >= 70 ? C.green : npsScore >= 50 ? C.orange : C.red}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(npsScore / 100) * 157} 157`}
              />
            </svg>
            <div className="absolute inset-0 flex items-end justify-center pb-0">
              <span className="text-2xl font-bold" style={{ color: C.textPrimary }}>{npsScore}</span>
            </div>
          </div>
          <div className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: C.greenLight, color: C.green }}>{t("Great")}</div>
        </div>

        <KPICard title={t("Platform Rating")}    value={avgRating}                         sub={t("Weighted average")}        trend="+0.2"  trendUp    icon={<Star size={15} />}          accent={C.gold}   />
        <KPICard title={t("Total Reviews")}      value={totalReviews.toLocaleString()}     sub={t("All-time across platform")} trend="+18%"  trendUp    icon={<MessageSquare size={15} />} accent={C.blue}   />
        <KPICard title={t("Open Complaints")}    value={String(totalComplaints)}           sub={t("Pending resolution")}       trend="-8%"   trendUp    icon={<AlertTriangle size={15} />} accent={C.orange} />
        <KPICard title={t("Complaint Rate")}     value={`${overallComplaintRate}%`}        sub={t("Of total reviews")}         trend="-0.3%" trendUp    icon={<ThumbsDown size={15} />}    accent={C.red}    />
      </div>

      {/* ─── Tabs ─── */}
      <Tabs tabs={["Quality Grid", "Recent Reviews", "Complaint Pipeline", "Provider Rankings"]} active={activeTab} onChange={setActiveTab} />

      {/* ─── Quality Grid ─── */}
      {activeTab === "Quality Grid" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {verticalQuality.map(v => {
            const isGood = v.complaintRate < 2;
            return (
              <div key={v.key} className="rounded-xl border p-5 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer" style={{ background: C.card, borderColor: C.border }}>
                <div className="absolute top-0 start-0 end-0 h-1" style={{ background: v.color }} />
                <div className="flex items-center gap-2 mb-4 mt-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: v.color + "18", color: v.color }}>{v.icon}</div>
                  <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>{t(v.label)}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={12} fill={s <= Math.round(v.avgRating) ? C.orange : "transparent"} color={s <= Math.round(v.avgRating) ? C.orange : C.border} />
                    ))}
                  </div>
                  <span className="text-sm font-bold" style={{ color: C.textPrimary }}>{v.avgRating}</span>
                  <div className="flex items-center gap-0.5 text-[10px] font-medium">
                    {v.trendUp ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                    <span style={{ color: v.trendUp ? C.green : C.red }}>{v.trend}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: C.textMuted }}>{t("Reviews")}</span>
                    <span className="font-bold" style={{ color: C.textPrimary }}>{v.totalReviews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: C.textMuted }}>{t("Complaints")}</span>
                    <span className="font-bold" style={{ color: v.complaints > 30 ? C.red : C.textPrimary }}>{v.complaints}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: C.textMuted }}>{t("Complaint Rate")}</span>
                    <span className="font-bold px-1.5 py-0.5 rounded-full" style={{ background: isGood ? C.greenLight : C.redLight, color: isGood ? C.green : C.red }}>{v.complaintRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Recent Reviews ─── */}
      {activeTab === "Recent Reviews" && (
        <div className="rounded-2xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="space-y-2">
            {recentReviews.map(rv => {
              const senti = sentimentIcons[rv.sentiment] || sentimentIcons.neutral;
              const vertColor = verticalColorMap[rv.vertical] || "#888";
              const vertIcon = verticalIconMap[rv.vertical];
              return (
                <div key={rv.id} className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: vertColor + "18", color: vertColor }}>
                    {rv.customer.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>{rv.customer}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium flex items-center gap-1" style={{ background: vertColor + "18", color: vertColor }}>
                        {vertIcon} {t(rv.vertical.charAt(0).toUpperCase() + rv.vertical.slice(1))}
                      </span>
                      <span className="text-[10px]" style={{ color: C.textMuted }}>{rv.time}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-1.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={11} fill={s <= rv.rating ? C.orange : "transparent"} color={s <= rv.rating ? C.orange : C.border} />
                      ))}
                      <span className="text-[10px] font-medium ms-1" style={{ color: C.textMuted }}>{rv.provider}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: C.textSecondary }}>{rv.text}</p>
                  </div>
                  {/* Sentiment */}
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: senti.bg, color: senti.color }}>
                    {senti.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Complaint Pipeline ─── */}
      {activeTab === "Complaint Pipeline" && (
        <div className="grid grid-cols-4 gap-4">
          {complaintPipeline.map(stage => (
            <div key={stage.stage} className="rounded-2xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>{t(stage.stage)}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: stage.color + "18", color: stage.color }}>{stage.count}</span>
              </div>
              <div className="space-y-2">
                {stage.items.map(item => (
                  <div key={item.id} className="p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all" style={{ background: C.bg, borderColor: C.border }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-medium" style={{ color: stage.color }}>{item.id}</span>
                      <span className="text-[10px]" style={{ color: C.textMuted }}>{item.time}</span>
                    </div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: C.textPrimary }}>{item.customer}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>{item.vertical} · {item.issue}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Provider Rankings ─── */}
      {activeTab === "Provider Rankings" && (
        <div className="rounded-2xl border p-5" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={16} color={C.gold} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("All Providers — Quality Ranking")}</span>
            </div>
            <div className="flex gap-1.5">
              {(["score", "rating", "complaints"] as const).map(key => (
                <button key={key} onClick={() => setSortBy(key)}
                  className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all"
                  style={{ background: sortBy === key ? C.blueMid : C.bg, color: sortBy === key ? "#fff" : C.textSecondary }}>
                  {t(key === "score" ? "Score" : key === "rating" ? "Rating" : "Complaints")}
                </button>
              ))}
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-8 gap-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>
            <span>#</span>
            <span className="col-span-2">{t("Provider")}</span>
            <span>{t("Rating")}</span>
            <span>{t("Response")}</span>
            <span>{t("Completion")}</span>
            <span>{t("Complaints")}</span>
            <span>{t("Score")}</span>
          </div>

          <div className="space-y-1.5">
            {sorted.map((p, i) => {
              const scoreColor = p.score >= 90 ? C.green : p.score >= 80 ? C.orange : C.red;
              return (
                <div key={p.name} className="grid grid-cols-8 gap-3 px-3 py-3 rounded-xl items-center border hover:shadow-sm transition-all" style={{ background: i < 3 ? C.goldLight : C.bg, borderColor: i < 3 ? C.gold + "33" : C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: i < 3 ? C.gold + "22" : C.bg, color: i < 3 ? C.gold : C.textSecondary }}>
                    {i + 1}
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-semibold" style={{ color: C.textPrimary }}>{p.name}</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>{t(p.vertical)}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={10} fill={C.orange} color={C.orange} />
                    <span className="text-xs font-bold" style={{ color: C.textPrimary }}>{p.rating}</span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: C.textSecondary }}>{p.responseTime}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}>
                      <div className="h-full rounded-full" style={{ width: `${p.completionRate}%`, background: p.completionRate >= 95 ? C.green : C.orange }} />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: C.textPrimary }}>{p.completionRate}%</span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: p.complaintRatio > 3 ? C.red : C.textSecondary }}>{p.complaintRatio}%</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: scoreColor + "18", color: scoreColor }}>
                      {p.score}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
