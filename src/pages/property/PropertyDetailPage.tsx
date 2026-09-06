import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { BarChart3, Calendar, DollarSign, Calculator, CheckCircle2 } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import {
  BackBtn, DetailHeader, PrimaryBtn, OutlineBtn, KPICard, Tabs, InfoCard, InfoRow, StatusBadge, TableWrapper, Th, Td, Avatar, StarRating
} from "@/components/ui/CommonUI";

const allListings = [
  { id: "PR-801", name: "Luxury Nile View Apt",    provider: "PropEgypt",      provId: "M-0408", type: "Apartment", city: "Zamalek",     price: 1200, commission: 4, occupancy: 82, bookings: 24, status: "active",    flag: false },
  { id: "PR-800", name: "Garden Villa Maadi",       provider: "HomeStay Co.",   provId: "M-0412", type: "Villa",     city: "Maadi",       price: 3500, commission: 4, occupancy: 61, bookings: 11, status: "active",    flag: false },
  { id: "PR-799", name: "Studio – New Cairo",       provider: "PropEgypt",      provId: "M-0408", type: "Studio",    city: "New Cairo",   price: 650,  commission: 4, occupancy: 74, bookings: 36, status: "active",    flag: false },
  { id: "PR-798", name: "Beach Cabin Alexandria",   provider: "SeaView Props",  provId: "M-0415", type: "Cabin",     city: "Alexandria",  price: 900,  commission: 4, occupancy: 90, bookings: 29, status: "active",    flag: false },
  { id: "PR-797", name: "Downtown Loft",            provider: "CityRent EG",    provId: "M-0419", type: "Apartment", city: "Downtown",    price: 800,  commission: 4, occupancy: 45, bookings: 5,  status: "suspended", flag: true  },
  { id: "PR-796", name: "North Coast Chalet",       provider: "SeaView Props",  provId: "M-0415", type: "Chalet",    city: "North Coast", price: 2200, commission: 4, occupancy: 71, bookings: 18, status: "active",    flag: false },
  { id: "PR-795", name: "Heliopolis Family Apt",    provider: "HomeStay Co.",   provId: "M-0412", type: "Apartment", city: "Heliopolis",  price: 980,  commission: 4, occupancy: 0,  bookings: 0,  status: "pending",   flag: false },
  { id: "PR-794", name: "Giza Pyramid View Room",   provider: "TourStay",       provId: "M-0421", type: "Room",      city: "Giza",        price: 450,  commission: 4, occupancy: 55, bookings: 42, status: "active",    flag: false },
];

export function PropertyDetailPage() {
  const { id = "PR-801" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("Overview");
  const listing = allListings.find(l => l.id === id) ?? allListings[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/operations/property" />
        <DetailHeader title={listing.name} id={id} subtitle={`${listing.type} · ${listing.city} · ${listing.provider}`} badge={listing.status}
          actions={
            <div className="flex gap-2">
              {listing.status === "pending" && <PrimaryBtn small onClick={() => showToast(`Listing ${id} approved.`)}>{t("Approve Listing")}</PrimaryBtn>}
              {listing.status === "active" && <OutlineBtn small onClick={() => showToast(`Listing ${id} suspended.`)}>{t("Suspend")}</OutlineBtn>}
            </div>
          } />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Occupancy Rate")}  value={`${listing.occupancy}%`} sub={t("Current month")}  trend="+3%"  trendUp    icon={<BarChart3 size={15} />}   accent={C.green}  />
        <KPICard title={t("Total Bookings")}  value={String(listing.bookings)} sub={t("Confirmed")}     trend="+4"   trendUp    icon={<Calendar size={15} />}    accent={C.blue}   />
        <KPICard title={t("Nightly Rate")}    value={`EGP ${listing.price}`}  sub={t("Host-set price")} trend="0"    trendUp    icon={<DollarSign size={15} />}  accent={C.orange} />
        <KPICard title={t("Commission")}      value={`${listing.commission}%`} sub={t("Platform fee")}  trend="fixed" trendUp   icon={<Calculator size={15} />}  accent={C.purple} />
      </div>

      <Tabs tabs={["Overview", "Booking History", "Reviews"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid grid-cols-2 gap-4">
          <InfoCard title={t("Listing Details")}>
            <InfoRow label={t("Listing ID")}     value={id} mono />
            <InfoRow label={t("Property Name")}  value={listing.name} />
            <InfoRow label={t("Type")}           value={listing.type} />
            <InfoRow label={t("City")}           value={listing.city} />
            <InfoRow label={t("Host Provider")}  value={listing.provider} />
            <InfoRow label={t("Provider ID")}    value={listing.provId} mono />
            <InfoRow label={t("Status")}         value={<StatusBadge status={listing.status} />} />
          </InfoCard>
          <InfoCard title={t("Amenities")}>
            {["WiFi", "Air Conditioning", "Kitchen", "Parking", "24h Security", "Swimming Pool"].map(a => (
              <div key={a} className="flex items-center gap-2 py-2 border-b last:border-b-0" style={{ borderColor: C.border }}>
                <CheckCircle2 size={12} color={C.green} />
                <span className="text-xs" style={{ color: C.textSecondary }}>{a}</span>
              </div>
            ))}
          </InfoCard>
        </div>
      )}

      {tab === "Booking History" && (
        <TableWrapper>
          <thead><tr><Th>{t("Booking ID")}</Th><Th>{t("Guest")}</Th><Th>{t("Check-In")}</Th><Th>{t("Check-Out")}</Th><Th>{t("Nights")}</Th><Th>{t("Total")}</Th><Th>{t("Status")}</Th></tr></thead>
          <tbody>
            {[
              { id: "RB-1201", guest: "Sara Mohamed",  in: "Jul 12", out: "Jul 15", nights: 3, total: `EGP ${listing.price * 3}`,  status: "completed" },
              { id: "RB-1198", guest: "Nour Ali",      in: "Jun 28", out: "Jul 02", nights: 4, total: `EGP ${listing.price * 4}`,  status: "completed" },
              { id: "RB-1195", guest: "Ahmed Saad",    in: "Jun 10", out: "Jun 13", nights: 3, total: `EGP ${listing.price * 3}`,  status: "completed" },
            ].map(b => (
              <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{b.id}</Td><Td>{b.guest}</Td><Td>{b.in}</Td><Td>{b.out}</Td>
                <Td>{b.nights}</Td><Td mono>{b.total}</Td><Td><StatusBadge status={b.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Reviews" && (
        <div className="space-y-3">
          {[
            { guest: "Sara Mohamed", rating: 5, text: "Fantastic location, spotless clean, host was very responsive. Highly recommended!", date: "Jul 15" },
            { guest: "Nour Ali",     rating: 4, text: "Great apartment with a beautiful view. AC was a bit noisy but overall excellent stay.", date: "Jul 02" },
            { guest: "Ahmed Saad",   rating: 4, text: "Very comfortable and well-equipped. Would definitely book again.", date: "Jun 13" },
          ].map(r => (
            <div key={r.guest} className="rounded-xl border p-4" style={{ background: C.card, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><Avatar name={r.guest} size={28} /><span className="text-sm font-medium" style={{ color: C.textPrimary }}>{r.guest}</span></div>
                <div className="flex items-center gap-2"><StarRating rating={r.rating} /><span className="text-xs" style={{ color: C.textMuted }}>{r.date}</span></div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.textSecondary }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
