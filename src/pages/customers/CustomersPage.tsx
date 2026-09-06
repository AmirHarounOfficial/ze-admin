import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Filter, Download, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { customerData } from "@/mock/mockData";
import { SearchBar, IconBtn, TableWrapper, Th, Td, SkeletonRow, Avatar, StatusBadge, Pagination } from "@/components/ui/CommonUI";

export function CustomersPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, email, phone…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
        <IconBtn icon={<Download size={12} />} label={t("Export CSV")} />
      </div>
      <TableWrapper>
        <thead><tr><Th>{t("ID")}</Th><Th>{t("Name")}</Th><Th>{t("Email")}</Th><Th>{t("Wallet")}</Th><Th>Bookings</Th><Th>{t("Status")}</Th><Th>{t("Joined")}</Th><Th>{t("Actions")}</Th></tr></thead>
        <tbody>
          {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={8} />) :
            customerData.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{c.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={c.name} size={24} />{c.name}</div></Td>
                <Td><span style={{ color: C.textSecondary }}>{c.email}</span></Td>
                <Td mono>{c.wallet}</Td><Td>{c.bookings}</Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td><span style={{ color: C.textMuted }}>{c.joined}</span></Td>
                <Td><button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/customers/${c.id}`)}><MoreHorizontal size={14} color={C.textSecondary} /></button></Td>
              </tr>
            ))}
        </tbody>
      </TableWrapper>
      <Pagination total="4,821 customers" showing="1–6" />
    </div>
  );
}
