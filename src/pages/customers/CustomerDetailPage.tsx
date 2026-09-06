import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Phone, Lock, Package, DollarSign, CreditCard, Star } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { supportTickets } from "@/mock/mockData";
import {
  BackBtn, Avatar, DetailHeader, OutlineBtn, KPICard, InfoCard, InfoRow, StatusBadge, Tabs, TableWrapper, Th, Td
} from "@/components/ui/CommonUI";

const customerDetailData: Record<string, { name: string; email: string; phone: string; city: string; joined: string; status: string; wallet: string; points: number; bookings: number; spent: string }> = {
  "C-1001": { name: "Sara Mohamed",   email: "sara.m@email.com",    phone: "+20 100 123 4567", city: "Zamalek",    joined: "Jan 14, 2024", status: "active",    wallet: "EGP 340",  points: 1240, bookings: 28, spent: "EGP 12,400" },
  "C-1002": { name: "Ahmed Khaled",   email: "a.khaled@gmail.com",  phone: "+20 101 987 6543", city: "Heliopolis", joined: "Mar 02, 2024", status: "active",    wallet: "EGP 80",   points: 680,  bookings: 14, spent: "EGP 5,200"  },
  "C-1003": { name: "Nour Ali",       email: "nour.ali@outlook.com",phone: "+20 111 444 5566", city: "Maadi",      joined: "Nov 20, 2023", status: "active",    wallet: "EGP 620",  points: 2100, bookings: 41, spent: "EGP 19,800" },
  "C-1004": { name: "Omar Hassan",    email: "o.hassan@yahoo.com",  phone: "+20 102 333 2211", city: "New Cairo",  joined: "Feb 08, 2024", status: "suspended", wallet: "EGP 0",    points: 200,  bookings: 5,  spent: "EGP 1,800"  },
  "C-1005": { name: "Layla Fouad",    email: "layla.f@email.com",   phone: "+20 100 777 8899", city: "Giza",       joined: "Apr 22, 2024", status: "active",    wallet: "EGP 150",  points: 890,  bookings: 19, spent: "EGP 8,100"  },
  "C-1006": { name: "Mona Tarek",     email: "mona.t@gmail.com",    phone: "+20 122 555 6677", city: "Alexandria", joined: "Dec 01, 2023", status: "active",    wallet: "EGP 210",  points: 1560, bookings: 33, spent: "EGP 14,200" },
  "C-5881": { name: "Sara Mohamed",   email: "sara@mail.com",        phone: "+20 100 123 4567", city: "Zamalek",    joined: "Jan 2024",     status: "active",    wallet: "EGP 320",  points: 1180, bookings: 14, spent: "EGP 6,200"  },
  "C-5880": { name: "Ahmed Khaled",   email: "ahmed@mail.com",       phone: "+20 101 987 6543", city: "Heliopolis", joined: "Feb 2024",     status: "active",    wallet: "EGP 80",   points: 420,  bookings: 7,  spent: "EGP 2,900"  },
  "C-5879": { name: "Nour Ali",       email: "nour@mail.com",        phone: "+20 111 444 5566", city: "Maadi",      joined: "Mar 2024",     status: "suspended", wallet: "EGP 0",    points: 80,   bookings: 2,  spent: "EGP 740"    },
  "C-5878": { name: "Omar Saad",      email: "omar@mail.com",        phone: "+20 102 333 2211", city: "New Cairo",  joined: "Dec 2023",     status: "active",    wallet: "EGP 550",  points: 2340, bookings: 21, spent: "EGP 9,800"  },
  "C-5877": { name: "Layla Hassan",   email: "layla@mail.com",       phone: "+20 100 777 8899", city: "6th October", joined: "Apr 2024",    status: "active",    wallet: "EGP 220",  points: 660,  bookings: 11, spent: "EGP 4,400"  },
  "C-5876": { name: "Youssef Fathy",  email: "youssef@mail.com",     phone: "+20 122 555 6677", city: "Dokki",      joined: "Nov 2023",     status: "active",    wallet: "EGP 410",  points: 1820, bookings: 38, spent: "EGP 16,500" },
};

const bookingHistory = [
  { id: "BK-9801", service: "Home Cleaning",     provider: "HomeGuru",        amount: "EGP 350",  date: "Jul 08, 2025", status: "completed"  },
  { id: "BK-9800", service: "AC Servicing",       provider: "TechHome Cairo",  amount: "EGP 480",  date: "Jun 29, 2025", status: "completed"  },
  { id: "BK-9799", service: "Food Delivery",      provider: "Burger Hub",      amount: "EGP 145",  date: "Jun 25, 2025", status: "completed"  },
  { id: "BK-9798", service: "Property Rental",    provider: "PropEgypt",       amount: "EGP 2,400",date: "Jun 14, 2025", status: "completed"  },
  { id: "BK-9797", service: "Roadside — Battery", provider: "QuickTow",        amount: "EGP 220",  date: "May 31, 2025", status: "refunded"   },
];

const walletTxns = [
  { id: "WT-301", desc: "Booking refund — IA-5497",      amount: "+EGP 220", date: "Jun 01", type: "credit" },
  { id: "WT-300", desc: "Loyalty points redeemed",        amount: "-EGP 50",  date: "Jun 25", type: "debit"  },
  { id: "WT-299", desc: "Promo top-up — Welcome25",       amount: "+EGP 100", date: "May 15", type: "credit" },
  { id: "WT-298", desc: "AC servicing payment",           amount: "-EGP 480", date: "Jun 29", type: "debit"  },
];

export function CustomerDetailPage() {
  const { id = "C-1001" } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<RootCtx>();
  const c = customerDetailData[id] ?? customerDetailData["C-1001"];
  const [tab, setTab] = useState("Booking History");

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackBtn to="/customers" />
        <div className="flex items-center gap-3 flex-1">
          <Avatar name={c.name} size={44} />
          <DetailHeader title={c.name} id={id} subtitle={`${c.city} · Joined ${c.joined}`} badge={c.status} />
        </div>
        <div className="flex gap-2">
          <OutlineBtn onClick={() => navigate("/support/chat")}><Phone size={13} />{t("Contact")}</OutlineBtn>
          <OutlineBtn onClick={() => showToast("Customer account suspended. Access revoked.")}><Lock size={13} />{t("Suspend")}</OutlineBtn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard title={t("Total Bookings")}  value={String(c.bookings)} sub={t("All services")}        trend="+3"    trendUp    icon={<Package size={15} />}     accent={C.blue}   />
        <KPICard title={t("Total Spent")}     value={c.spent}            sub={t("Lifetime GMV")}         trend="+12%"  trendUp    icon={<DollarSign size={15} />}  accent={C.green}  />
        <KPICard title={t("Wallet Balance")}  value={c.wallet}           sub={t("Available credit")}     trend="0"     trendUp    icon={<CreditCard size={15} />}  accent={C.orange} />
        <KPICard title={t("Loyalty Points")}  value={c.points.toLocaleString()} sub={t("Redeemable pts")} trend="+180" trendUp icon={<Star size={15} />}        accent={C.purple} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard title={t("Personal Info")}>
          <InfoRow label={t("Full Name")}  value={c.name} />
          <InfoRow label={t("Email")}      value={c.email} />
          <InfoRow label={t("Phone")}      value={c.phone} mono />
          <InfoRow label={t("City")}       value={c.city} />
          <InfoRow label={t("Account ID")} value={id} mono />
          <InfoRow label={t("Status")}     value={<StatusBadge status={c.status} />} />
        </InfoCard>
        <InfoCard title={t("Registered Devices")}>
          <InfoRow label={t("iOS App")}     value="iPhone 15 Pro — active" />
          <InfoRow label={t("Android App")} value="Not registered" />
          <InfoRow label={t("Push Notify")} value={<span style={{ color: C.green }}>{t("Enabled")}</span>} />
          <InfoRow label={t("Last Login")}  value="Jul 09, 2025 — 9:14 AM" />
          <InfoRow label={t("2FA")}         value={<span style={{ color: C.green }}>{t("Active (SMS)")}</span>} />
        </InfoCard>
        <InfoCard title={t("Preferred Services")}>
          {[["Home Services", "42%", C.blue], ["Food Delivery", "31%", C.orange], ["Property Rental", "18%", C.purple], ["Roadside Assist", "9%", C.green]].map(([s, p, col]) => (
            <div key={String(s)} className="flex items-center gap-3 py-2 border-b last:border-b-0" style={{ borderColor: C.border }}>
              <span className="text-xs flex-1" style={{ color: C.textSecondary }}>{s}</span>
              <div className="h-1.5 rounded-full overflow-hidden w-20" style={{ background: C.border }}>
                <div className="h-full rounded-full" style={{ width: p, background: String(col) }} />
              </div>
              <span className="text-xs font-medium w-8 text-right" style={{ color: C.textPrimary }}>{p}</span>
            </div>
          ))}
        </InfoCard>
      </div>

      <Tabs tabs={["Booking History", "Wallet Ledger", "Support Tickets"]} active={tab} onChange={setTab} />

      {tab === "Booking History" && (
        <TableWrapper>
          <thead><tr><Th>{t("Booking ID")}</Th><Th>{t("Service")}</Th><Th>{t("Provider")}</Th><Th>{t("Amount")}</Th><Th>{t("Date")}</Th><Th>{t("Status")}</Th></tr></thead>
          <tbody>
            {bookingHistory.map(b => (
              <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{b.id}</Td><Td><span className="font-medium">{b.service}</span></Td>
                <Td>{b.provider}</Td><Td mono>{b.amount}</Td><Td>{b.date}</Td>
                <Td><StatusBadge status={b.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {tab === "Wallet Ledger" && (
        <div className="space-y-3">
          <div className="rounded-xl border p-5 flex items-center justify-between" style={{ background: C.card, borderColor: C.border }}>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: C.textMuted }}>{t("Current Wallet Balance")}</div>
              <div className="text-2xl font-bold" style={{ color: C.textPrimary }}>{c.wallet}</div>
            </div>
            <div className="flex gap-2">
              <OutlineBtn small onClick={() => showToast("Credit added to wallet successfully.")}>{t("Add Credit")}</OutlineBtn>
              <OutlineBtn small onClick={() => showToast("Amount deducted from wallet.")}>{t("Deduct")}</OutlineBtn>
            </div>
          </div>
          <TableWrapper>
            <thead><tr><Th>{t("TX ID")}</Th><Th>{t("Description")}</Th><Th>{t("Amount")}</Th><Th>{t("Date")}</Th><Th>{t("Type")}</Th></tr></thead>
            <tbody>
              {walletTxns.map(w => (
                <tr key={w.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td mono>{w.id}</Td><Td>{w.desc}</Td>
                  <Td mono><span style={{ color: w.type === "credit" ? C.green : C.red }}>{w.amount}</span></Td>
                  <Td>{w.date}</Td>
                  <Td><span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ background: w.type === "credit" ? C.greenLight : C.redLight, color: w.type === "credit" ? C.greenText : C.red }}>{w.type}</span></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}

      {tab === "Support Tickets" && (
        <TableWrapper>
          <thead><tr><Th>{t("Ticket ID")}</Th><Th>{t("Issue")}</Th><Th>{t("Priority")}</Th><Th>{t("Status")}</Th><Th>{t("Age")}</Th><Th>{t("Actions")}</Th></tr></thead>
          <tbody>
            {supportTickets.filter((_, i) => i < 2).map(t => (
              <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{t.id}</Td><Td>{t.issue}</Td>
                <Td><StatusBadge status={t.priority} /></Td>
                <Td><StatusBadge status={t.status} /></Td>
                <Td>{t.age}</Td>
                <Td><OutlineBtn small onClick={() => navigate(`/support/tickets/${t.id}`)}>{t("View")}</OutlineBtn></Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}
