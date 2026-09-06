import React from "react";
import { useNavigate } from "react-router";
import { Filter, Plus, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import {
  Stat, SearchBar, IconBtn, PrimaryBtn, TableWrapper, Th, Td, Avatar, ModuleTag, StarRating, StatusBadge
} from "@/components/ui/CommonUI";

const handymen = [
  { id: "H-201", name: "Khaled Samir",   specialty: ["Plumbing", "General Repair"],   cert: "Licensed Plumber",   rating: 4.9, bookings: 7,  status: "available", zone: "Cairo North"    },
  { id: "H-202", name: "Tarek Mostafa",  specialty: ["Electrical", "AC Maintenance"],  cert: "Electrical Cert.",  rating: 4.7, bookings: 5,  status: "busy",      zone: "Giza"           },
  { id: "H-203", name: "Samy Adel",      specialty: ["Painting", "Tiling"],            cert: "Skilled Trades",    rating: 4.6, bookings: 3,  status: "available", zone: "Cairo South"    },
  { id: "H-204", name: "Hassan Fathy",   specialty: ["Carpentry", "Furniture Assy"],   cert: "Carpentry Cert.",   rating: 4.5, bookings: 9,  status: "offline",   zone: "Alexandria"     },
  { id: "H-205", name: "Mahmoud Nasser", specialty: ["Deep Clean", "Upholstery"],      cert: "Cleaning Pro",      rating: 4.8, bookings: 12, status: "available", zone: "New Cairo"      },
];

export function HandymanPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Stat label={t("Total Staff")}      value={handymen.length} />
        <Stat label={t("Available Now")}    value={handymen.filter(h => h.status === "available").length} color={C.green} />
        <Stat label={t("On Assignment")}    value={handymen.filter(h => h.status === "busy").length} color={C.orange} />
        <Stat label={t("Offline Today")}    value={handymen.filter(h => h.status === "offline").length} color={C.textMuted} />
      </div>
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, specialty, zone…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
        <PrimaryBtn small onClick={() => navigate("/staff/handyman/new")}><Plus size={12} />{t("Add Staff")}</PrimaryBtn>
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("ID")}</Th><Th>{t("Technician")}</Th><Th>{t("Specialties")}</Th><Th>{t("Certification")}</Th><Th>{t("Zone")}</Th><Th>{t("Rating")}</Th><Th>{t("Bookings / Week")}</Th><Th>{t("Status")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {handymen.map(h => (
            <tr key={h.id} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{h.id}</Td>
              <Td><div className="flex items-center gap-2"><Avatar name={h.name} size={26} />{h.name}</div></Td>
              <Td><div className="flex flex-wrap gap-1">{h.specialty.map(s => <ModuleTag key={s} label={s} />)}</div></Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{h.cert}</span></Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{h.zone}</span></Td>
              <Td><StarRating rating={h.rating} /></Td>
              <Td><span className="font-medium">{h.bookings}</span></Td>
              <Td><StatusBadge status={h.status} /></Td>
              <Td><button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/staff/handyman/${h.id}`)}><MoreHorizontal size={14} color={C.textSecondary} /></button></Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
