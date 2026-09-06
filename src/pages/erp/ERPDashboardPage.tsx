import React from "react";
import { useNavigate } from "react-router";
import { DollarSign, TrendingUp, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "@/theme";
import { t } from "@/i18n";
import { hrmDepartments } from "@/mock/mockData";
import { KPICard, OutlineBtn } from "@/components/ui/CommonUI";

const erpVendors = [
  { id: "VND-001", name: "AWS Egypt",         category: "Cloud Infrastructure", contact: "aws-support@amazon.com",   contract: "Annual",   value: "EGP 840K/yr",  status: "active"   },
  { id: "VND-002", name: "Paymob",            category: "Payment Gateway",       contact: "partner@paymob.com",       contract: "Revenue-share", value: "1.5%",    status: "active"   },
  { id: "VND-003", name: "Firebase (Google)", category: "Notifications / Auth",  contact: "firebase@google.com",      contract: "Pay-as-go",  value: "EGP 42K/mo", status: "active"   },
  { id: "VND-004", name: "Figma",             category: "Design Tooling",        contact: "accounts@figma.com",       contract: "Annual",   value: "EGP 28K/yr",   status: "active"   },
  { id: "VND-005", name: "Twilio",            category: "SMS & Voice",           contact: "support@twilio.com",       contract: "Pay-as-go",  value: "EGP 8K/mo",  status: "inactive" },
  { id: "VND-006", name: "Sentry",            category: "Error Monitoring",      contact: "billing@sentry.io",        contract: "Annual",   value: "EGP 18K/yr",   status: "active"   },
];

const deptBudgets = hrmDepartments.map(d => ({
  dept: d.name,
  budget: parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000,
  spent: Math.round(parseInt(d.budget.replace(/[^0-9]/g, "")) * 1000 * 0.65),
}));

export function ERPDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <KPICard title={t("Annual Budget")}    value="EGP 22.14M"  sub={t("Total allocated")}  trend="stable" trendUp icon={<DollarSign size={15} />}  accent={C.green}  />
        <KPICard title={t("YTD Spend")}        value="EGP 11.8M"   sub={t("Budget utilised")}  trend="+3%"   trendUp icon={<TrendingUp size={15} />}   accent={C.orange} />
        <KPICard title={t("Active Vendors")}   value={String(erpVendors.filter(v => v.status === "active").length)} sub={t("Contracted")} trend="stable" trendUp icon={<Building2 size={15} />} accent={C.purple} />
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <div className="text-sm font-semibold" style={{ color: C.textPrimary }}>{t("Department Budget vs Actual")}</div>
          <OutlineBtn small onClick={() => navigate("/erp/budget")}>{t("View All")}</OutlineBtn>
        </div>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptBudgets} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="dept" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} formatter={(v: number) => `EGP ${v.toLocaleString()}`} />
              <Bar key="bar-budget" dataKey="budget" fill={C.blueLight} stroke={C.blueMid} name="Budget" radius={[2,2,0,0]} />
              <Bar key="bar-spent"  dataKey="spent"  fill={C.gold}     name="Spent"  radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
