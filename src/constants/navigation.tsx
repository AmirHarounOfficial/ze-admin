import React from "react";
import {
  LayoutDashboard, Map, Navigation, Users, Building2, ShieldCheck, UserCog, HardHat, Bike,
  Home, Wrench, Car, UtensilsCrossed, Pizza, Package, Truck, CreditCard, Wallet, Calculator,
  Megaphone, FileBarChart2, Ticket, MessageSquare, Star, FileText, Globe, User, Calendar,
  Banknote, Layers, Database, Settings, KeyRound, Plug, ScrollText, Users2
} from "lucide-react";
import { Page, NavItem } from "@/types";

export const PAGE_TITLES: Record<Page, string> = {
  overview: "Live Executive Board", map: "Operations Map", "live-map": "Live Operations Map",
  customers: "Customers Register",
  "providers-queue": "Provider Verification Queue", "providers-registry": "Merchant Registry",
  handyman: "Handyman Staff List", drivers: "Delivery Drivers", captains: "Road Captains",
  property: "Property Rentals",
  "home-services": "Home Services Control", "car-services": "Car Services Control",
  restaurant: "Restaurant Booking", "food-delivery": "Food Delivery Fleet",
  "parcel-delivery": "Parcel Delivery Network", roadside: "Roadside & Assistance",
  transactions: "Transaction Ledger", payouts: "Payouts & Withdrawals",
  commissions: "Commission Settings", marketers: "Promoters & Marketers",
  reports: "Financial Reports",
  support: "Support Tickets", chat: "Unified Chat Logs",
  reviews: "Reviews & Ratings", banners: "Banners & Offers",
  translations: "Translations Desk", settings: "General Configurations",
  permissions: "Access Control (Spatie)", integrations: "System Integrations",
  audit: "Audit Logs Ledger",
  "hrm-employees": "Employees", "hrm-departments": "Departments",
  "hrm-leaves": "Leave Requests", "hrm-payroll": "Payroll",
  "erp-dashboard": "ERP Dashboard",
  "erp-budget": "Budget & Finance", "erp-vendors": "Vendors", "erp-assets": "Assets",
  "my-profile": "My Profile", "account-security": "Account Security",
};

export const PAGE_URLS: Record<Page, string> = {
  overview:             "/overview",
  map:                  "/operations/map",
  "live-map":           "/operations/live-map",
  customers:            "/customers",
  "providers-queue":    "/providers/queue",
  "providers-registry": "/providers/registry",
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
  transactions:         "/financial/transactions",
  payouts:              "/financial/payouts",
  commissions:          "/financial/commissions",
  marketers:            "/financial/marketers",
  reports:              "/financial/reports",
  support:              "/support/tickets",
  chat:                 "/support/chat",
  reviews:              "/support/reviews",
  banners:              "/support/banners",
  translations:         "/support/translations",
  settings:             "/system/settings",
  permissions:          "/system/permissions",
  audit:                "/system/audit",
  integrations:         "/system/integrations",
  "hrm-employees":      "/hrm/employees",
  "hrm-departments":    "/hrm/departments",
  "hrm-leaves":         "/hrm/leaves",
  "hrm-payroll":        "/hrm/payroll",
  "erp-dashboard":      "/erp/dashboard",
  "erp-budget":         "/erp/budget",
  "erp-vendors":        "/erp/vendors",
  "erp-assets":         "/erp/assets",
  "my-profile":         "/account/profile",
  "account-security":   "/account/security",
};

export const URL_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_URLS).map(([page, url]) => [url, page as Page])
) as Record<string, Page>;

export const leaveRequestsBadge = 2;

export const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview Hub",
    items: [
      { label: "Live Executive Board", icon: <LayoutDashboard size={15} />, page: "overview" },
      { label: "Operations Map",        icon: <Map size={15} />,             page: "map" },
      { label: "Live Map",              icon: <Navigation size={15} />,      page: "live-map" },
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
      { label: "Transaction Ledger",    icon: <CreditCard size={15} />,    page: "transactions" },
      { label: "Payouts & Withdrawals", icon: <Wallet size={15} />,        page: "payouts",      badge: 4 },
      { label: "Commission Settings",   icon: <Calculator size={15} />,    page: "commissions" },
      { label: "Promoters & Marketers", icon: <Megaphone size={15} />,     page: "marketers" },
      { label: "Financial Reports",     icon: <FileBarChart2 size={15} />, page: "reports" },
    ],
  },
  {
    group: "Support & CMS",
    items: [
      { label: "Support Tickets",   icon: <Ticket size={15} />,        page: "support",       badge: 7 },
      { label: "Unified Chat Logs", icon: <MessageSquare size={15} />, page: "chat" },
      { label: "Reviews & Ratings", icon: <Star size={15} />,          page: "reviews" },
      { label: "Banners & Offers",  icon: <FileText size={15} />,      page: "banners" },
      { label: "Translations Desk", icon: <Globe size={15} />,         page: "translations" },
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
        ],
      },
    ],
  },
  {
    group: "System",
    items: [
      { label: "General Config",   icon: <Settings size={15} />,    page: "settings" },
      { label: "Access Control",   icon: <KeyRound size={15} />,    page: "permissions" },
      { label: "Integrations",     icon: <Plug size={15} />,        page: "integrations" },
      { label: "Audit Logs",       icon: <ScrollText size={15} />,  page: "audit" },
    ],
  },
];
