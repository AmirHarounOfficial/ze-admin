import React from "react";
import {
  LayoutDashboard, Map, Navigation, Users, Building2, ShieldCheck, UserCog, HardHat, Bike,
  Home, Wrench, Car, UtensilsCrossed, Pizza, Package, Truck, CreditCard, Wallet, Calculator,
  Megaphone, FileBarChart2, Ticket, MessageSquare, Star, FileText, Globe, User, Calendar,
  Banknote, Layers, Database, Settings, KeyRound, Plug, ScrollText, Users2, ShieldAlert,
  Award, Clock
} from "lucide-react";
import { Page, NavItem } from "@/types";

export const PAGE_TITLES: Record<Page, string> = {
  overview: "Live Executive Board", map: "Operations Map", "live-map": "Live Operations Map", incidents: "Incident War Room",
  customers: "Customers Register",
  "providers-queue": "Provider Verification Queue", "providers-registry": "Merchant Registry",
  "providers-workforce": "Workforce & Shift Roster", "providers-compliance": "Compliance & KYC Scoreboard",
  handyman: "Handyman Staff List", drivers: "Delivery Drivers", captains: "Road Captains",
  property: "Property Rentals",
  "home-services": "Home Services Control", "car-services": "Car Services Control",
  restaurant: "Restaurant Booking", "food-delivery": "Food Delivery Fleet",
  "parcel-delivery": "Parcel Delivery Network", roadside: "Roadside & Assistance",
  "bookings-command": "Bookings Command Center", "bookings-quality": "Service Quality Scoreboard",
  transactions: "Transaction Ledger", payouts: "Payouts & Withdrawals",
  commissions: "Commission Settings", marketers: "Promoters & Marketers",
  reports: "Financial Reports",
  "financial-treasury": "Treasury Command & Settlement Hub",
  "financial-affiliates": "Affiliate & Commission Engine",
  support: "Support Tickets", chat: "Unified Chat Logs",
  "support-command": "Support Desk Command Center",
  "support-feedback": "Customer Feedback Intelligence",
  reviews: "Reviews & Ratings", banners: "Banners & Offers",
  translations: "Translations Desk", settings: "General Configurations",
  permissions: "Access Control (Spatie)", integrations: "System Integrations",
  audit: "Audit Logs Ledger", "system-security": "Security Command Center & Threat Audit",
  "hrm-employees": "Employees", "hrm-departments": "Departments",
  "hrm-leaves": "Leave Requests", "hrm-payroll": "Payroll",
  "hrm-performance": "Performance Evaluation & OKR Scoreboard",
  "hrm-attendance": "Attendance & Shift Roster Control",
  "erp-dashboard": "ERP Dashboard",
  "erp-budget": "Budget & Finance", "erp-vendors": "Vendors", "erp-assets": "Assets",
  "erp-procurement": "Procurement & Vendor Ledger",
  "erp-lifecycle": "Asset Depreciation & Lifecycle",
  "my-profile": "My Profile", "account-security": "Account Security",
};

export const PAGE_URLS: Record<Page, string> = {
  overview:             "/overview",
  map:                  "/operations/map",
  "live-map":           "/operations/live-map",
  incidents:            "/incidents",
  customers:            "/customers",
  "providers-queue":    "/providers/queue",
  "providers-registry": "/providers/registry",
  "providers-workforce": "/providers/workforce",
  "providers-compliance": "/providers/compliance",
  handyman:             "/staff/handyman",
  drivers:              "/staff/drivers",
  captains:             "/staff/captains",
  property:             "/operations/property",
  "home-services":      "/operations/home-services",
  "car-services":       "/operations/car-services",
  restaurant:           "/operations/restaurant",
  "food-delivery":      "/operations/food-delivery",
  "parcel-delivery":    "/operations/parcel-delivery",
  roadside:             "/operations/roadside",
  "bookings-command":   "/bookings/command-center",
  "bookings-quality":   "/bookings/quality",
  transactions:         "/financial/transactions",
  payouts:              "/financial/payouts",
  commissions:          "/financial/commissions",
  marketers:            "/financial/marketers",
  reports:              "/financial/reports",
  "financial-treasury": "/financial/treasury",
  "financial-affiliates": "/financial/affiliates",
  support:              "/support/tickets",
  chat:                 "/support/chat",
  "support-command":     "/support/command-center",
  "support-feedback":    "/support/feedback",
  reviews:              "/support/reviews",
  banners:              "/support/banners",
  translations:         "/support/translations",
  settings:             "/system/settings",
  permissions:          "/system/permissions",
  audit:                "/system/audit",
  integrations:         "/system/integrations",
  "system-security":    "/system/security",
  "hrm-employees":      "/hrm/employees",
  "hrm-departments":    "/hrm/departments",
  "hrm-leaves":         "/hrm/leaves",
  "hrm-payroll":        "/hrm/payroll",
  "hrm-performance":    "/hrm/performance",
  "hrm-attendance":     "/hrm/attendance",
  "erp-dashboard":      "/erp/dashboard",
  "erp-budget":         "/erp/budget",
  "erp-vendors":        "/erp/vendors",
  "erp-assets":         "/erp/assets",
  "erp-procurement":    "/erp/procurement",
  "erp-lifecycle":      "/erp/lifecycle",
  "my-profile":         "/account/profile",
  "account-security":   "/account/security",
};

export const URL_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_URLS).map(([page, url]) => [url, page as Page])
) as Record<string, Page>;

export function getPageFromPathname(pathname: string): Page {
  if (URL_TO_PAGE[pathname]) return URL_TO_PAGE[pathname];
  if (pathname.startsWith("/customers/")) return "customers";
  if (pathname.startsWith("/providers/queue/")) return "providers-queue";
  if (pathname.startsWith("/providers/registry/")) return "providers-registry";
  if (pathname.startsWith("/providers/workforce")) return "providers-workforce";
  if (pathname.startsWith("/providers/compliance")) return "providers-compliance";
  if (pathname.startsWith("/staff/handyman/")) return "handyman";
  if (pathname.startsWith("/staff/drivers/")) return "drivers";
  if (pathname.startsWith("/staff/captains/")) return "captains";
  if (pathname.startsWith("/operations/property/listings/")) return "property";
  if (pathname.startsWith("/operations/restaurant/providers/")) return "restaurant";
  if (pathname.startsWith("/operations/food-delivery/orders/")) return "food-delivery";
  if (pathname.startsWith("/operations/food-delivery/drivers/")) return "drivers";
  if (pathname.startsWith("/operations/roadside/captains/")) return "captains";
  if (pathname.startsWith("/operations/home-services/bookings/")) return "home-services";
  if (pathname.startsWith("/operations/car-services/jobs/")) return "car-services";
  if (pathname.startsWith("/operations/parcel-delivery/parcels/")) return "parcel-delivery";
  if (pathname.startsWith("/financial/transactions/")) return "transactions";
  if (pathname.startsWith("/financial/marketers/")) return "marketers";
  if (pathname.startsWith("/financial/treasury")) return "financial-treasury";
  if (pathname.startsWith("/financial/affiliates")) return "financial-affiliates";
  if (pathname.startsWith("/support/tickets/")) return "support";
  if (pathname.startsWith("/support/banners/")) return "banners";
  if (pathname.startsWith("/support/command-center")) return "support-command";
  if (pathname.startsWith("/support/feedback")) return "support-feedback";
  if (pathname.startsWith("/system/security")) return "system-security";
  if (pathname.startsWith("/hrm/employees/")) return "hrm-employees";
  if (pathname.startsWith("/hrm/performance")) return "hrm-performance";
  if (pathname.startsWith("/hrm/attendance")) return "hrm-attendance";
  if (pathname.startsWith("/erp/procurement")) return "erp-procurement";
  if (pathname.startsWith("/erp/lifecycle")) return "erp-lifecycle";
  return URL_TO_PAGE[pathname] ?? "overview";
}

export const leaveRequestsBadge = 2;

export const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview Hub",
    items: [
      { label: "Live Executive Board", icon: <LayoutDashboard size={15} />, page: "overview" },
      { label: "Operations Map",        icon: <Map size={15} />,             page: "map" },
      { label: "Live Map",              icon: <Navigation size={15} />,      page: "live-map" },
      { label: "Incident War Room",     icon: <ShieldAlert size={15} />,     page: "incidents", badge: 3 },
    ],
  },
  {
    group: "User Accounts",
    items: [
      { label: "Customers Register", icon: <Users size={15} />,       page: "customers" },
      {
        label: "Providers Center", icon: <Building2 size={15} />,
        children: [
          { label: "Verification Queue", icon: <ShieldCheck size={14} />, page: "providers-queue",    badge: 3 },
          { label: "Merchant Registry",  icon: <Building2 size={14} />,   page: "providers-registry" },
          { label: "Workforce Roster",   icon: <Users2 size={14} />,     page: "providers-workforce" },
          { label: "Compliance Scoreboard", icon: <ShieldCheck size={14} />, page: "providers-compliance" },
        ],
      },
      {
        label: "Staff Management", icon: <UserCog size={15} />,
        children: [
          { label: "Handyman",       icon: <HardHat size={14} />,  page: "handyman" },
          { label: "Delivery Drivers", icon: <Bike size={14} />,   page: "drivers" },
          { label: "Road Captains",  icon: <Navigation size={14} />, page: "captains" },
        ],
      },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Property Rentals",   icon: <Home size={15} />,            page: "property" },
      { label: "Home Services",      icon: <Wrench size={15} />,          page: "home-services" },
      { label: "Car Services",       icon: <Car size={15} />,             page: "car-services" },
      { label: "Restaurant Booking", icon: <UtensilsCrossed size={15} />, page: "restaurant" },
      { label: "Food Delivery",      icon: <Pizza size={15} />,           page: "food-delivery" },
      { label: "Parcel Delivery",    icon: <Package size={15} />,         page: "parcel-delivery" },
      { label: "Roadside & Assist",  icon: <Truck size={15} />,           page: "roadside", badge: 2 },
    ],
  },
  {
    group: "Financial",
    items: [
      { label: "Treasury Command Hub",   icon: <Wallet size={15} />,        page: "financial-treasury" },
      { label: "Transaction Ledger",    icon: <CreditCard size={15} />,    page: "transactions" },
      { label: "Payouts & Withdrawals", icon: <Wallet size={15} />,        page: "payouts",      badge: 4 },
      { label: "Commission Settings",   icon: <Calculator size={15} />,    page: "commissions" },
      { label: "Affiliate Engine",      icon: <Megaphone size={15} />,     page: "financial-affiliates" },
      { label: "Promoters & Marketers", icon: <Megaphone size={15} />,     page: "marketers" },
      { label: "Financial Reports",     icon: <FileBarChart2 size={15} />, page: "reports" },
    ],
  },
  {
    group: "Support & CMS",
    items: [
      { label: "Desk Command Center", icon: <Ticket size={15} />,        page: "support-command" },
      { label: "Feedback & NPS",      icon: <Star size={15} />,          page: "support-feedback" },
      { label: "Support Tickets",     icon: <Ticket size={15} />,        page: "support",       badge: 7 },
      { label: "Unified Chat Logs",   icon: <MessageSquare size={15} />, page: "chat" },
      { label: "Reviews & Ratings",   icon: <Star size={15} />,          page: "reviews" },
      { label: "Banners & Offers",    icon: <FileText size={15} />,      page: "banners" },
      { label: "Translations Desk",   icon: <Globe size={15} />,         page: "translations" },
    ],
  },
  {
    group: "HR & People",
    items: [
      {
        label: "Human Resources", icon: <Users2 size={15} />,
        children: [
          { label: "Employees",        icon: <User size={14} />,         page: "hrm-employees"   },
          { label: "Departments",      icon: <Building2 size={14} />,    page: "hrm-departments" },
          { label: "Leave Requests",   icon: <Calendar size={14} />,     page: "hrm-leaves",     badge: leaveRequestsBadge },
          { label: "Payroll",          icon: <Banknote size={14} />,     page: "hrm-payroll"     },
          { label: "Performance & OKRs", icon: <Award size={14} />,      page: "hrm-performance" },
          { label: "Attendance & Shifts", icon: <Clock size={14} />,     page: "hrm-attendance" },
        ],
      },
    ],
  },
  {
    group: "Internal ERP",
    items: [
      {
        label: "Enterprise Resource", icon: <Layers size={15} />,
        children: [
          { label: "ERP Dashboard",    icon: <LayoutDashboard size={14} />, page: "erp-dashboard" },
          { label: "Budget & Finance", icon: <Calculator size={14} />,      page: "erp-budget"    },
          { label: "Vendors",          icon: <Building2 size={14} />,       page: "erp-vendors"   },
          { label: "Assets",           icon: <Database size={14} />,        page: "erp-assets"    },
          { label: "Procurement & POs", icon: <FileText size={14} />,       page: "erp-procurement" },
          { label: "Asset Lifecycle",  icon: <Database size={14} />,        page: "erp-lifecycle" },
        ],
      },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Security Command", icon: <ShieldAlert size={15} />, page: "system-security" },
      { label: "General Config",   icon: <Settings size={15} />,    page: "settings" },
      { label: "Access Control",   icon: <KeyRound size={15} />,    page: "permissions" },
      { label: "Integrations",     icon: <Plug size={15} />,        page: "integrations" },
      { label: "Audit Logs",       icon: <ScrollText size={15} />,  page: "audit" },
    ],
  },
];
