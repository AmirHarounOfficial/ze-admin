import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Home, Clock, DollarSign, BarChart3, AlertTriangle, MapPin, MoreHorizontal, Filter, Download } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  KPICard, Tabs, SearchBar, IconBtn, TableWrapper, Th, Td, OccupancyBar, StatusBadge, Pagination, OutlineBtn, PrimaryBtn
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

const bookingDisputes = [
  { id: "PD-201", listing: "Downtown Loft",     guest: "Sara Mohamed",  host: "CityRent EG",   issue: "Property not as described — photos misleading",   amount: "EGP 800",  status: "open",        opened: "Jul 08" },
  { id: "PD-200", listing: "Garden Villa Maadi",guest: "Omar Saad",     host: "HomeStay Co.",  issue: "Host cancelled 2 days before check-in",            amount: "EGP 7,000",status: "in-progress", opened: "Jul 06" },
  { id: "PD-199", listing: "North Coast Chalet",guest: "Nour Ali",      host: "SeaView Props", issue: "AC not working — refund request for 3 nights",     amount: "EGP 6,600",status: "resolved",    opened: "Jul 02" },
];

const coverageGaps = [
  { city: "Luxor",       listings: 0,  demand: "Medium", gap: "critical" },
  { city: "Aswan",       listings: 2,  demand: "High",   gap: "critical" },
  { city: "Port Said",   listings: 4,  demand: "Medium", gap: "moderate" },
  { city: "Suez",        listings: 1,  demand: "Low",    gap: "moderate" },
  { city: "Mansoura",    listings: 7,  demand: "Medium", gap: "low"      },
  { city: "Tanta",       listings: 3,  demand: "Low",    gap: "low"      },
];

export function PropertyPage({ onToast }: { onToast?: (m: string) => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All Listings");
  const [listingStatuses, setListingStatuses] = useState<Record<string, string>>(
    Object.fromEntries(allListings.map(l => [l.id, l.status]))
  );

  const notify = (msg: string) => onToast ? onToast(msg) : null;

  const pending   = allListings.filter(l => listingStatuses[l.id] === "pending").length;
  const active    = allListings.filter(l => listingStatuses[l.id] === "active").length;
  const avgOcc    = Math.round(allListings.filter(l => listingStatuses[l.id] === "active").reduce((a, l) => a + l.occupancy, 0) / Math.max(active, 1));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Listings")}    value={String(allListings.length)}   sub={t("Across all host providers")}   trend="+6.2%"  trendUp    icon={<Home size={15} />}         accent={C.green}  />
        <KPICard title={t("Pending Approval")}  value={String(pending)}              sub={t("Awaiting platform review")}    trend="+2"     trendUp={false} icon={<Clock size={15} />}  accent={C.orange} />
        <KPICard title={t("Platform GMV")}      value="EGP 218K"                     sub={t("Rental revenue this month")}   trend="+14.1%" trendUp    icon={<DollarSign size={15} />}   accent={C.blue}   />
        <KPICard title={t("Avg Occupancy")}     value={`${avgOcc}%`}                 sub={t("Across active listings")}      trend="+3.1%"  trendUp    icon={<BarChart3 size={15} />}    accent={C.purple} />
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={["All Listings", "Booking Disputes", "Coverage Gaps"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          <SearchBar placeholder={t("Search by listing, provider, city…")} />
          <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
          <IconBtn icon={<Download size={12} />} label={t("Export")} />
        </div>
      </div>

      {tab === "All Listings" && (
        <>
          {pending > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: C.orangeLight, color: C.orange }}>
              <AlertTriangle size={12} /> {pending} listing(s) awaiting platform approval — review and approve or reject before they go live.
            </div>
          )}
          <TableWrapper>
            <thead>
              <tr>
                <Th>{t("Listing ID")}</Th><Th>{t("Property Name")}</Th><Th>{t("Host Provider")}</Th><Th>{t("City")}</Th><Th>{t("Type")}</Th>
                <Th>{t("Nightly Rate")}</Th><Th>{t("Commission")}</Th><Th>{t("Occupancy")}</Th><Th>Bookings</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th>
              </tr>
            </thead>
            <tbody>
              {allListings.map(l => (
                <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{l.id}</Td>
                  <Td>
                    <div className="flex items-center gap-1.5">
                      {l.flag && <AlertTriangle size={11} color={C.red} />}
                      <span className="font-medium">{l.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{l.provider}</span>
                      <span className="text-xs" style={{ color: C.textMuted }}>{l.provId}</span>
                    </div>
                  </Td>
                  <Td><div className="flex items-center gap-1 text-xs" style={{ color: C.textSecondary }}><MapPin size={10} />{l.city}</div></Td>
                  <Td><span className="text-xs" style={{ color: C.textSecondary }}>{l.type}</span></Td>
                  <Td mono>EGP {l.price.toLocaleString()}/night</Td>
                  <Td><span className="text-xs font-medium" style={{ color: C.greenText }}>{l.commission}%</span></Td>
                  <Td><OccupancyBar pct={l.occupancy} /></Td>
                  <Td>{l.bookings}</Td>
                  <Td><StatusBadge status={listingStatuses[l.id]} /></Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      {listingStatuses[l.id] === "pending" && (
                        <>
                          <button className="px-2 py-1 rounded text-xs font-medium transition-opacity hover:opacity-90"
                            style={{ background: C.green, color: "#fff" }}
                            onClick={() => { setListingStatuses(p => ({ ...p, [l.id]: "active" })); notify(`Listing ${l.id} approved and is now live.`); }}>{t("Approve")}</button>
                          <button className="px-2 py-1 rounded text-xs font-medium" style={{ background: C.redLight, color: C.red }}
                            onClick={() => { setListingStatuses(p => ({ ...p, [l.id]: "rejected" })); notify(`Listing ${l.id} rejected. Host notified.`); }}>{t("Reject")}</button>
                        </>
                      )}
                      {listingStatuses[l.id] === "active" && (
                        <button className="px-2 py-1 rounded text-xs border hover:bg-red-50 transition-colors" style={{ borderColor: C.red, color: C.red }}
                          onClick={() => { setListingStatuses(p => ({ ...p, [l.id]: "suspended" })); notify(`Listing ${l.id} suspended. Host notified.`); }}>{t("Suspend")}</button>
                      )}
                      {listingStatuses[l.id] === "suspended" && (
                        <button className="px-2 py-1 rounded text-xs border hover:bg-green-50 transition-colors" style={{ borderColor: C.green, color: C.green }}
                          onClick={() => { setListingStatuses(p => ({ ...p, [l.id]: "active" })); notify(`Listing ${l.id} reinstated.`); }}>{t("Reinstate")}</button>
                      )}
                      <button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/operations/property/${l.id}`)}><MoreHorizontal size={13} color={C.textSecondary} /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
          <Pagination total="184 listings" showing="1–8" />
        </>
      )}

      {tab === "Booking Disputes" && (
        <div className="space-y-3">
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background: C.blueLight, color: C.blueMid }}>{t("Platform arbitrates disputes when guests and hosts cannot reach agreement. Resolutions may result in full/partial refunds debited from the host.")}</div>
          <TableWrapper>
            <thead><tr><Th>{t("Dispute ID")}</Th><Th>{t("Listing")}</Th><Th>{t("Guest")}</Th><Th>{t("Host Provider")}</Th><Th>{t("Issue")}</Th><Th>{t("Amount at Risk")}</Th><Th>{t("Status")}</Th><Th>{t("Opened")}</Th><Th>{t("Actions")}</Th></tr></thead>
            <tbody>
              {bookingDisputes.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{d.id}</Td><Td>{d.listing}</Td>
                  <Td>{d.guest}</Td><Td>{d.host}</Td>
                  <Td><span className="text-xs" style={{ color: C.textSecondary }}>{d.issue}</span></Td>
                  <Td mono>{d.amount}</Td>
                  <Td><StatusBadge status={d.status} /></Td>
                  <Td>{d.opened}</Td>
                  <Td>
                    <div className="flex gap-1">
                      <OutlineBtn small onClick={() => navigate("/support/chat")}>{t("View Chat")}</OutlineBtn>
                      {d.status !== "resolved" && <PrimaryBtn small onClick={() => notify("Refund issued to guest wallet.")}>{t("Issue Refund")}</PrimaryBtn>}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}

      {tab === "Coverage Gaps" && (
        <div className="space-y-3">
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background: C.orangeLight, color: C.orange }}>{t("Cities with insufficient listings relative to platform demand. Consider targeted provider acquisition campaigns in these zones.")}</div>
          <div className="grid grid-cols-3 gap-3">
            {coverageGaps.map(g => (
              <div key={g.city} className="rounded-xl border p-4" style={{ background: C.card, borderColor: g.gap === "critical" ? C.red : g.gap === "moderate" ? C.orange : C.border }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{g.city}</span>
                  <StatusBadge status={g.gap === "critical" ? "cancelled" : g.gap === "moderate" ? "pending" : "active"} />
                </div>
                <div className="space-y-1 text-xs" style={{ color: C.textSecondary }}>
                  <div className="flex justify-between"><span>{t("Active Listings")}</span><span className="font-medium" style={{ color: g.listings === 0 ? C.red : C.textPrimary }}>{g.listings}</span></div>
                  <div className="flex justify-between"><span>{t("User Demand")}</span><span className="font-medium">{g.demand}</span></div>
                </div>
                <button onClick={() => notify(`Acquisition campaign launched for ${g.city}.`)} className="mt-3 w-full py-1.5 rounded-lg text-xs font-medium border hover:bg-gray-50 transition-colors" style={{ borderColor: C.border, color: C.textSecondary }}>{t("Launch Acquisition Campaign")}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
