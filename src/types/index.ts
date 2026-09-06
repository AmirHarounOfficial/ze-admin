import React from "react";

export type Page =
  | "overview" | "map" | "live-map" | "customers" | "providers-queue" | "providers-registry"
  | "handyman" | "drivers" | "captains" | "property" | "restaurant" | "food-delivery" | "roadside"
  | "home-services" | "car-services" | "parcel-delivery"
  | "transactions" | "payouts" | "commissions" | "marketers" | "reports" | "support" | "chat"
  | "reviews" | "banners" | "translations" | "settings" | "permissions" | "audit" | "integrations"
  | "hrm-employees" | "hrm-departments" | "hrm-leaves" | "hrm-payroll"
  | "erp-dashboard" | "erp-budget" | "erp-vendors" | "erp-assets"
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
