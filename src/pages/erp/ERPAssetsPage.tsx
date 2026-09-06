import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { Plus } from "lucide-react";
import { C } from "@/theme";
import { t } from "@/i18n";
import { RootCtx } from "@/types";
import { Stat, PrimaryBtn, Tabs, TableWrapper, Th, Td, StatusBadge, OutlineBtn } from "@/components/ui/CommonUI";

const erpAssets = [
  { id: "AST-001", name: "MacBook Pro 16\" (Eng)",  category: "Hardware", assignedTo: "Youssef Mansour", value: "EGP 95,000", status: "in_use",     purchased: "Jan 2024" },
  { id: "AST-002", name: "Dell Server Rack x4",     category: "Hardware", assignedTo: "IT Dept",         value: "EGP 420,000",status: "in_use",     purchased: "Mar 2023" },
  { id: "AST-003", name: "Office — Zamalek HQ",     category: "Property", assignedTo: "All Staff",       value: "EGP 180K/mo",status: "in_use",     purchased: "Jan 2022" },
  { id: "AST-004", name: "Company Van — Cairo",      category: "Vehicle",  assignedTo: "Operations",      value: "EGP 320,000",status: "in_use",     purchased: "Jun 2023" },
  { id: "AST-005", name: "iPhone 15 Pro (QA)",       category: "Hardware", assignedTo: "QA Team",         value: "EGP 42,000", status: "in_use",     purchased: "Feb 2024" },
  { id: "AST-006", name: "Cisco Switch x2",          category: "Hardware", assignedTo: "IT Dept",         value: "EGP 28,000", status: "maintenance",purchased: "Apr 2022" },
];

export function ERPAssetsPage() {
  const { showToast } = useOutletContext<RootCtx>();
  const [tab, setTab] = useState("All");
  const categories = ["All", "Hardware", "Property", "Vehicle"];
  const filtered = tab === "All" ? erpAssets : erpAssets.filter(a => a.category === tab);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-4 gap-4 flex-1">
          <Stat label={t("Total Assets")}   value={erpAssets.length} />
          <Stat label={t("In Use")}         value={erpAssets.filter(a => a.status === "in_use").length}      color={C.green}  />
          <Stat label={t("Maintenance")}    value={erpAssets.filter(a => a.status === "maintenance").length} color={C.orange} />
          <Stat label={t("Est. Value")}     value="EGP 1.1M+" color={C.blue} />
        </div>
        <PrimaryBtn small onClick={() => showToast("Asset record created.")}><Plus size={12} />{t("Add Asset")}</PrimaryBtn>
      </div>
      <Tabs tabs={categories} active={tab} onChange={setTab} />
      <TableWrapper>
        <thead><tr><Th>{t("Asset ID")}</Th><Th>{t("Name")}</Th><Th>{t("Category")}</Th><Th>{t("Assigned To")}</Th><Th>{t("Est. Value")}</Th><Th>{t("Purchased")}</Th><Th>{t("Status")}</Th><Th></Th></tr></thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
              <Td mono>{a.id}</Td>
              <Td><span className="font-medium text-sm" style={{ color: C.textPrimary }}>{a.name}</span></Td>
              <Td><span className="text-xs px-2 py-0.5 rounded" style={{ background: C.blueLight, color: C.blueMid }}>{a.category}</span></Td>
              <Td><span className="text-xs" style={{ color: C.textSecondary }}>{a.assignedTo}</span></Td>
              <Td mono>{a.value}</Td>
              <Td><span className="text-xs" style={{ color: C.textMuted }}>{a.purchased}</span></Td>
              <Td><StatusBadge status={a.status} /></Td>
              <Td><OutlineBtn small onClick={() => showToast(`${a.name} record opened.`)}>{t("Edit")}</OutlineBtn></Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
}
