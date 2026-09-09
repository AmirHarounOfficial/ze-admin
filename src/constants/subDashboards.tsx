import React from "react";
import {
  LayoutDashboard, Map, Navigation, Users, Building2, ShieldCheck, UserCog, HardHat, Bike,
  Home, Wrench, Car, UtensilsCrossed, Pizza, Package, Truck, CreditCard, Wallet, Calculator,
  Megaphone, FileBarChart2, Ticket, MessageSquare, Star, FileText, User, Calendar,
  Banknote, Layers, Database, Settings, KeyRound, Plug, ScrollText, Users2,
  CalendarCheck2, Briefcase, LifeBuoy, Shield, ShieldAlert, BarChart3
} from "lucide-react";
import { Page, NavItem } from "@/types";
import { PAGE_TITLES, PAGE_URLS } from "@/constants/navigation";

export type SubDashboardId =
  | "overview"
  | "bookings"
  | "providers"
  | "finance"
  | "employees"
  | "erp"
  | "support"
  | "system";

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export interface SubDashboardConfig {
  id: SubDashboardId;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  defaultPage: Page;
  defaultUrl: string;
  badge?: number | string;
  groups: NavGroup[];
}

export const SUB_DASHBOARDS: SubDashboardConfig[] = [
  {
    id: "overview",
    title: "Overview Hub",
    subtitle: "Live Operations & Telemetry",
    description: "Real-time executive board, geospatial telemetry and dispatch tracking.",
    icon: <LayoutDashboard size={18} />,
    color: "#2563EB",
    bgColor: "rgba(37, 99, 235, 0.12)",
    defaultPage: "overview",
    defaultUrl: "/overview",
    groups: [
      {
        group: "Live Monitoring",
        items: [
          { label: "Live Executive Board", icon: <LayoutDashboard size={15} />, page: "overview" },
          { label: "Operations Map",        icon: <Map size={15} />,             page: "map" },
          { label: "Live Map",              icon: <Navigation size={15} />,      page: "live-map" },
          { label: "Incident War Room",     icon: <ShieldAlert size={15} />,     page: "incidents", badge: 3 },
        ],
      },
    ],
  },
  {
    id: "bookings",
    title: "Bookings & Operations",
    subtitle: "Services & Fleet Delivery",
    description: "Hospitality bookings, rentals, field services, fleet deliveries and roadside dispatch.",
    icon: <CalendarCheck2 size={18} />,
    color: "#DB8C00",
    bgColor: "rgba(219, 140, 0, 0.12)",
    defaultPage: "restaurant",
    defaultUrl: "/operations/restaurant",
    badge: 2,
    groups: [
      {
        group: "Hospitality & Bookings",
        items: [
          { label: "Restaurant Booking", icon: <UtensilsCrossed size={15} />, page: "restaurant" },
          { label: "Property Rentals",   icon: <Home size={15} />,            page: "property" },
        ],
      },
      {
        group: "Field Services",
        items: [
          { label: "Home Services",     icon: <Wrench size={15} />,          page: "home-services" },
          { label: "Car Services",      icon: <Car size={15} />,             page: "car-services" },
          { label: "Roadside & Assist", icon: <Truck size={15} />,           page: "roadside", badge: 2 },
        ],
      },
      {
        group: "Logistics & Delivery",
        items: [
          { label: "Food Delivery",   icon: <Pizza size={15} />,   page: "food-delivery" },
          { label: "Parcel Delivery", icon: <Package size={15} />, page: "parcel-delivery" },
        ],
      },
    ],
  },
  {
    id: "providers",
    title: "Providers & Staff",
    subtitle: "Merchants, Partners & Workforce",
    description: "Merchant verification queue, active providers registry and field crew roster.",
    icon: <Briefcase size={18} />,
    color: "#06854d",
    bgColor: "rgba(6, 133, 77, 0.12)",
    defaultPage: "providers-queue",
    defaultUrl: "/providers/queue",
    badge: 3,
    groups: [
      {
        group: "Partners & Merchants",
        items: [
          {
            label: "Providers Center",
            icon: <Building2 size={15} />,
            children: [
              { label: "Verification Queue", icon: <ShieldCheck size={14} />, page: "providers-queue", badge: 3 },
              { label: "Merchant Registry",  icon: <Building2 size={14} />,   page: "providers-registry" },
            ],
          },
          { label: "Customers Register", icon: <Users size={15} />, page: "customers" },
        ],
      },
      {
        group: "Staff Management",
        items: [
          {
            label: "Field Staff",
            icon: <UserCog size={15} />,
            children: [
              { label: "Handyman",         icon: <HardHat size={14} />,    page: "handyman" },
              { label: "Delivery Drivers", icon: <Bike size={14} />,       page: "drivers" },
              { label: "Road Captains",    icon: <Navigation size={14} />, page: "captains" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Reports",
    subtitle: "Treasury, Ledger & Settlement",
    description: "Financial reports, ledger transactions, merchant payouts, and affiliate commissions.",
    icon: <BarChart3 size={18} />,
    color: "#de8208",
    bgColor: "rgba(222, 130, 8, 0.12)",
    defaultPage: "reports",
    defaultUrl: "/financial/reports",
    badge: 4,
    groups: [
      {
        group: "Financial Intelligence",
        items: [
          { label: "Financial Reports",  icon: <FileBarChart2 size={15} />, page: "reports" },
          { label: "Transaction Ledger", icon: <CreditCard size={15} />,    page: "transactions" },
        ],
      },
      {
        group: "Disbursements & Rates",
        items: [
          { label: "Payouts & Withdrawals", icon: <Wallet size={15} />,     page: "payouts", badge: 4 },
          { label: "Commission Settings",   icon: <Calculator size={15} />, page: "commissions" },
        ],
      },
      {
        group: "Promotions & Affiliates",
        items: [
          { label: "Promoters & Marketers", icon: <Megaphone size={15} />,  page: "marketers" },
        ],
      },
    ],
  },
  {
    id: "employees",
    title: "HRM & Employees",
    subtitle: "Human Capital & Departmental Operations",
    description: "Employee directories, organizational units, leave approvals and payroll disbursements.",
    icon: <Users2 size={18} />,
    color: "#7C3AED",
    bgColor: "rgba(124, 58, 237, 0.12)",
    defaultPage: "hrm-employees",
    defaultUrl: "/hrm/employees",
    badge: 2,
    groups: [
      {
        group: "Organization",
        items: [
          { label: "Employees",   icon: <User size={15} />,      page: "hrm-employees" },
          { label: "Departments", icon: <Building2 size={15} />, page: "hrm-departments" },
        ],
      },
      {
        group: "Leaves & Payroll",
        items: [
          { label: "Leave Requests", icon: <Calendar size={15} />, page: "hrm-leaves", badge: 2 },
          { label: "Payroll",        icon: <Banknote size={15} />, page: "hrm-payroll" },
        ],
      },
    ],
  },
  {
    id: "erp",
    title: "Enterprise ERP",
    subtitle: "Resources, Assets & Procurement",
    description: "Internal ERP dashboard, fiscal budgets, vendor relations, and company asset inventory.",
    icon: <Layers size={18} />,
    color: "#0284C7",
    bgColor: "rgba(2, 132, 199, 0.12)",
    defaultPage: "erp-dashboard",
    defaultUrl: "/erp/dashboard",
    groups: [
      {
        group: "Enterprise Planning",
        items: [
          { label: "ERP Dashboard",    icon: <LayoutDashboard size={15} />, page: "erp-dashboard" },
          { label: "Budget & Finance", icon: <Calculator size={14} />,      page: "erp-budget" },
        ],
      },
      {
        group: "Supply & Inventory",
        items: [
          { label: "Vendors", icon: <Building2 size={15} />, page: "erp-vendors" },
          { label: "Assets",  icon: <Database size={15} />,  page: "erp-assets" },
        ],
      },
    ],
  },
  {
    id: "support",
    title: "Support & CMS",
    subtitle: "Helpdesk, Chat & Content Management",
    description: "Customer service tickets, real-time messaging, review moderation, and banner campaigns.",
    icon: <LifeBuoy size={18} />,
    color: "#0D9488",
    bgColor: "rgba(13, 148, 136, 0.12)",
    defaultPage: "support",
    defaultUrl: "/support/tickets",
    badge: 7,
    groups: [
      {
        group: "Help Desk",
        items: [
          { label: "Support Tickets",   icon: <Ticket size={15} />,        page: "support", badge: 7 },
          { label: "Unified Chat Logs", icon: <MessageSquare size={15} />, page: "chat" },
        ],
      },
      {
        group: "Content & Localization",
        items: [
          { label: "Reviews & Ratings", icon: <Star size={15} />,     page: "reviews" },
          { label: "Banners & Offers",  icon: <FileText size={15} />, page: "banners" },
          { label: "Translations Desk", icon: <GlobeIcon size={15} />, page: "translations" },
        ],
      },
    ],
  },
  {
    id: "system",
    title: "System Administration",
    subtitle: "Security, Integrations & Audit",
    description: "Global configurations, Spatie role permissions, webhook integrations and audit ledger.",
    icon: <Shield size={18} />,
    color: "#475569",
    bgColor: "rgba(71, 85, 105, 0.12)",
    defaultPage: "settings",
    defaultUrl: "/system/settings",
    groups: [
      {
        group: "Configuration",
        items: [
          { label: "General Config", icon: <Settings size={15} />,   page: "settings" },
          { label: "Access Control", icon: <KeyRound size={15} />,   page: "permissions" },
          { label: "Integrations",   icon: <Plug size={15} />,       page: "integrations" },
        ],
      },
      {
        group: "Security & Governance",
        items: [
          { label: "Audit Logs",       icon: <ScrollText size={15} />, page: "audit" },
          { label: "My Profile",       icon: <User size={15} />,       page: "my-profile" },
          { label: "Account Security", icon: <Shield size={15} />,     page: "account-security" },
        ],
      },
    ],
  },
];

function GlobeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Map each page to its parent sub-dashboard
const PAGE_TO_SUB_DASHBOARD: Record<Page, SubDashboardId> = {
  overview: "overview",
  map: "overview",
  "live-map": "overview",

  restaurant: "bookings",
  property: "bookings",
  "home-services": "bookings",
  "car-services": "bookings",
  "food-delivery": "bookings",
  "parcel-delivery": "bookings",
  roadside: "bookings",

  "providers-queue": "providers",
  "providers-registry": "providers",
  customers: "providers",
  handyman: "providers",
  drivers: "providers",
  captains: "providers",

  reports: "finance",
  transactions: "finance",
  payouts: "finance",
  commissions: "finance",
  marketers: "finance",

  "hrm-employees": "employees",
  "hrm-departments": "employees",
  "hrm-leaves": "employees",
  "hrm-payroll": "employees",

  "erp-dashboard": "erp",
  "erp-budget": "erp",
  "erp-vendors": "erp",
  "erp-assets": "erp",

  support: "support",
  chat: "support",
  reviews: "support",
  banners: "support",
  translations: "support",

  settings: "system",
  permissions: "system",
  integrations: "system",
  audit: "system",
  "my-profile": "system",
  "account-security": "system",
};

export function getSubDashboardById(id: SubDashboardId): SubDashboardConfig {
  return SUB_DASHBOARDS.find(d => d.id === id) || SUB_DASHBOARDS[0];
}

export function getSubDashboardForPage(page: Page): SubDashboardConfig {
  const id = PAGE_TO_SUB_DASHBOARD[page] || "overview";
  return getSubDashboardById(id);
}

export function getSubDashboardForPath(pathname: string): SubDashboardConfig {
  // Check exact prefixes
  if (pathname.startsWith("/financial")) return getSubDashboardById("finance");
  if (pathname.startsWith("/hrm")) return getSubDashboardById("employees");
  if (pathname.startsWith("/erp")) return getSubDashboardById("erp");
  if (pathname.startsWith("/support")) return getSubDashboardById("support");
  if (pathname.startsWith("/system") || pathname.startsWith("/account")) return getSubDashboardById("system");
  if (pathname.startsWith("/providers") || pathname.startsWith("/customers") || pathname.startsWith("/staff")) return getSubDashboardById("providers");
  if (
    pathname.startsWith("/operations/property") ||
    pathname.startsWith("/operations/restaurant") ||
    pathname.startsWith("/operations/food-delivery") ||
    pathname.startsWith("/operations/roadside") ||
    pathname.startsWith("/operations/home-services") ||
    pathname.startsWith("/operations/car-services") ||
    pathname.startsWith("/operations/parcel-delivery")
  ) {
    return getSubDashboardById("bookings");
  }
  return getSubDashboardById("overview");
}

export interface SearchScreenResult {
  type: "screen";
  title: string;
  page: Page;
  url: string;
  subDashboard: SubDashboardConfig;
}

export interface SearchDashboardResult {
  type: "dashboard";
  dashboard: SubDashboardConfig;
}

export function searchSubDashboardsAndScreens(query: string): {
  dashboards: SubDashboardConfig[];
  screens: SearchScreenResult[];
} {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { dashboards: SUB_DASHBOARDS, screens: [] };
  }

  // Matching dashboards
  const matchedDashboards = SUB_DASHBOARDS.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.subtitle.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    d.id.toLowerCase().includes(q)
  );

  // Matching individual screens
  const matchedScreens: SearchScreenResult[] = [];

  for (const dashboard of SUB_DASHBOARDS) {
    for (const group of dashboard.groups) {
      for (const item of group.items) {
        if (item.page) {
          const title = PAGE_TITLES[item.page] || item.label;
          if (title.toLowerCase().includes(q) || item.label.toLowerCase().includes(q)) {
            matchedScreens.push({
              type: "screen",
              title,
              page: item.page,
              url: PAGE_URLS[item.page],
              subDashboard: dashboard,
            });
          }
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.page) {
              const title = PAGE_TITLES[child.page] || child.label;
              if (title.toLowerCase().includes(q) || child.label.toLowerCase().includes(q)) {
                matchedScreens.push({
                  type: "screen",
                  title,
                  page: child.page,
                  url: PAGE_URLS[child.page],
                  subDashboard: dashboard,
                });
              }
            }
          }
        }
      }
    }
  }

  return {
    dashboards: matchedDashboards,
    screens: matchedScreens.slice(0, 8),
  };
}
