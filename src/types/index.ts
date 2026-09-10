import React from "react";

export type Page =
  | "overview" | "map" | "live-map" | "incidents" | "customers" | "providers-queue" | "providers-registry"
  | "providers-workforce" | "providers-compliance"
  | "handyman" | "drivers" | "captains" | "property" | "restaurant" | "food-delivery" | "roadside"
  | "home-services" | "car-services" | "parcel-delivery"
  | "bookings-command" | "bookings-quality"
  | "transactions" | "payouts" | "commissions" | "marketers" | "reports"
  | "financial-treasury" | "financial-affiliates"
  | "support" | "chat" | "support-command" | "support-feedback"
  | "reviews" | "banners" | "translations" | "settings" | "permissions" | "audit" | "integrations" | "system-security"
  | "hrm-employees" | "hrm-departments" | "hrm-leaves" | "hrm-payroll"
  | "hrm-performance" | "hrm-attendance"
  | "erp-dashboard" | "erp-budget" | "erp-vendors" | "erp-assets" | "erp-procurement" | "erp-lifecycle"
  | "my-profile" | "account-security";

export type NavItem = {
  label: string;
  icon: React.ReactNode;
  page?: Page;
  badge?: string | number;
  children?: NavItem[];
};

export type NotifType = "all" | "alert" | "provider" | "finance" | "support" | "review";

export type IncidentType = "Towing" | "Battery" | "Fuel" | "Unlocking" | "Diagnostics";

export type RootCtx = {
  showToast: (msg?: string) => void;
};

export type AuthStep = "preloader" | "login" | "forgot-password" | "2fa" | "app";
