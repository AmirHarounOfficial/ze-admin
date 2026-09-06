import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Filter, Download, MoreHorizontal } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { merchantData } from "@/mock/mockData";
import { SearchBar, IconBtn, TableWrapper, Th, Td, SkeletonRow, Avatar, StatusBadge, ModuleTag, StarRating, Pagination } from "@/components/ui/CommonUI";

export function MerchantRegistryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <SearchBar placeholder={t("Search by name, category, module…")} />
        <IconBtn icon={<Filter size={12} />} label={t("Filter")} />
        <IconBtn icon={<Download size={12} />} label={t("Export")} />
      </div>
      <TableWrapper>
        <thead>
          <tr><Th>{t("ID")}</Th><Th>{t("Provider")}</Th><Th>{t("Category")}</Th><Th>{t("Modules")}</Th><Th>{t("Points")}</Th><Th>{t("Rating")}</Th><Th>{t("Status")}</Th><Th>{t("Since")}</Th><Th>{t("Actions")}</Th></tr>
        </thead>
        <tbody>
          {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={9} />) :
            merchantData.map(m => (
              <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                <Td mono>{m.id}</Td>
                <Td><div className="flex items-center gap-2"><Avatar name={m.name} size={24} />{m.name}</div></Td>
                <Td><span className="text-xs" style={{ color: C.textSecondary }}>{m.category}</span></Td>
                <Td><div className="flex flex-wrap gap-1">{m.modules.map(mod => <ModuleTag key={mod} label={mod} />)}</div></Td>
                <Td mono>{m.points.toLocaleString()}</Td>
                <Td><StarRating rating={m.rating} /></Td>
                <Td><StatusBadge status={m.status} /></Td>
                <Td><span style={{ color: C.textMuted }}>{m.joined}</span></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <button className="px-2 py-1 rounded text-xs border hover:bg-gray-50" style={{ borderColor: C.border, color: C.textSecondary }} onClick={() => navigate(`/providers/registry/${m.id}`)}>{t("View")}</button>
                    <button className="p-1 rounded hover:bg-gray-100" onClick={() => navigate(`/providers/registry/${m.id}`)}><MoreHorizontal size={14} color={C.textSecondary} /></button>
                  </div>
                </Td>
              </tr>
            ))}
        </tbody>
      </TableWrapper>
      <Pagination total="312 providers" showing="1–7" />
    </div>
  );
}
