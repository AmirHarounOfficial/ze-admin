import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";

// Auth
import { PreloaderScreen } from "@/pages/auth/PreloaderScreen";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { TwoFactorPage } from "@/pages/auth/TwoFactorPage";

// Overview
import { OverviewPage } from "@/pages/overview/OverviewPage";
import { OperationsMapPage } from "@/pages/overview/OperationsMapPage";
import { LiveMapPage } from "@/pages/overview/LiveMapPage";

// Customers
import { CustomersPage } from "@/pages/customers/CustomersPage";
import { CustomerDetailPage } from "@/pages/customers/CustomerDetailPage";

// Providers
import { ProviderQueuePage } from "@/pages/providers/ProviderQueuePage";
import { MerchantRegistryPage } from "@/pages/providers/MerchantRegistryPage";
import { ProviderDetailPage } from "@/pages/providers/ProviderDetailPage";
import { ProviderQueueDetailPage } from "@/pages/providers/ProviderQueueDetailPage";

// Handyman
import { HandymanPage } from "@/pages/handyman/HandymanPage";
import { HandymanDetailPage } from "@/pages/handyman/HandymanDetailPage";

// Property
import { PropertyPage } from "@/pages/property/PropertyPage";
import { PropertyDetailPage } from "@/pages/property/PropertyDetailPage";

// Restaurant
import { RestaurantPage } from "@/pages/restaurant/RestaurantPage";
import { RestaurantDetailPage } from "@/pages/restaurant/RestaurantDetailPage";

// Food Delivery
import { FoodDeliveryPage } from "@/pages/food-delivery/FoodDeliveryPage";
import { OrderTrackPage } from "@/pages/food-delivery/OrderTrackPage";

// Roadside
import { RoadsidePage } from "@/pages/roadside/RoadsidePage";
import { DriversPage } from "@/pages/roadside/DriversPage";
import { DriverDetailPage } from "@/pages/roadside/DriverDetailPage";
import { CaptainsPage } from "@/pages/roadside/CaptainsPage";
import { CaptainDetailPage } from "@/pages/roadside/CaptainDetailPage";

// Home Services
import { HomeServicesPage } from "@/pages/home-services/HomeServicesPage";
import { HomeBookingDetailPage } from "@/pages/home-services/HomeBookingDetailPage";

// Car Services
import { CarServicesPage } from "@/pages/car-services/CarServicesPage";
import { CarJobDetailPage } from "@/pages/car-services/CarJobDetailPage";

// Parcel Delivery
import { ParcelDeliveryPage } from "@/pages/parcel-delivery/ParcelDeliveryPage";
import { ParcelTrackPage } from "@/pages/parcel-delivery/ParcelTrackPage";

// Finance
import { TransactionsPage } from "@/pages/finance/TransactionsPage";
import { TransactionDetailPage } from "@/pages/finance/TransactionDetailPage";
import { CommissionsPage } from "@/pages/finance/CommissionsPage";
import { PayoutsPage } from "@/pages/finance/PayoutsPage";
import { ReportsPage } from "@/pages/finance/ReportsPage";
import { MarketersPage } from "@/pages/finance/MarketersPage";
import { MarketerDetailPage } from "@/pages/finance/MarketerDetailPage";

// Support
import { SupportPage } from "@/pages/support/SupportPage";
import { TicketDetailPage } from "@/pages/support/TicketDetailPage";
import { ChatPage } from "@/pages/support/ChatPage";

// Content
import { ReviewsPage } from "@/pages/content/ReviewsPage";
import { BannersPage } from "@/pages/content/BannersPage";
import { BannerDetailPage } from "@/pages/content/BannerDetailPage";
import { TranslationsPage } from "@/pages/content/TranslationsPage";

// System
import { SettingsPage } from "@/pages/system/SettingsPage";
import { PermissionsPage } from "@/pages/system/PermissionsPage";
import { AuditPage } from "@/pages/system/AuditPage";
import { IntegrationsPage } from "@/pages/system/IntegrationsPage";

// HRM
import { HRMEmployeesPage } from "@/pages/hrm/HRMEmployeesPage";
import { HRMEmployeeDetailPage } from "@/pages/hrm/HRMEmployeeDetailPage";
import { HRMDepartmentsPage } from "@/pages/hrm/HRMDepartmentsPage";
import { HRMLeavesPage } from "@/pages/hrm/HRMLeavesPage";
import { HRMPayrollPage } from "@/pages/hrm/HRMPayrollPage";

// ERP
import { ERPDashboardPage } from "@/pages/erp/ERPDashboardPage";
import { ERPBudgetPage } from "@/pages/erp/ERPBudgetPage";
import { ERPVendorsPage } from "@/pages/erp/ERPVendorsPage";
import { ERPAssetsPage } from "@/pages/erp/ERPAssetsPage";

// Account
import { MyProfilePage } from "@/pages/account/MyProfilePage";
import { AccountSecurityPage } from "@/pages/account/AccountSecurityPage";

export const router = createBrowserRouter([
  // Full-page screens without sidebar/topbar
  { path: "/loader", element: <PreloaderScreen /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/2fa", element: <TwoFactorPage /> },

  // Admin shell with Sidebar & Topbar
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "overview", element: <OverviewPage /> },
      { path: "operations/map", element: <OperationsMapPage /> },
      { path: "operations/live-map", element: <LiveMapPage /> },

      // Customers
      { path: "customers", element: <CustomersPage /> },
      { path: "customers/:id", element: <CustomerDetailPage /> },

      // Providers
      { path: "providers/queue", element: <ProviderQueuePage /> },
      { path: "providers/queue/:id", element: <ProviderQueueDetailPage /> },
      { path: "providers/registry", element: <MerchantRegistryPage /> },
      { path: "providers/registry/:id", element: <ProviderDetailPage /> },

      // Handyman
      { path: "staff/handyman", element: <HandymanPage /> },
      { path: "staff/handyman/:id", element: <HandymanDetailPage /> },

      // Property
      { path: "operations/property", element: <PropertyPage /> },
      { path: "operations/property/listings/:id", element: <PropertyDetailPage /> },

      // Restaurant
      { path: "operations/restaurant", element: <RestaurantPage /> },
      { path: "operations/restaurant/providers/:id", element: <RestaurantDetailPage /> },

      // Food Delivery
      { path: "operations/food-delivery", element: <FoodDeliveryPage /> },
      { path: "operations/food-delivery/orders/:id", element: <OrderTrackPage /> },
      { path: "operations/food-delivery/drivers", element: <DriversPage /> },
      { path: "operations/food-delivery/drivers/:id", element: <DriverDetailPage /> },

      // Roadside Assistance
      { path: "operations/roadside", element: <RoadsidePage /> },
      { path: "operations/roadside/captains", element: <CaptainsPage /> },
      { path: "operations/roadside/captains/:id", element: <CaptainDetailPage /> },

      // Home Services
      { path: "operations/home-services", element: <HomeServicesPage /> },
      { path: "operations/home-services/bookings/:id", element: <HomeBookingDetailPage /> },

      // Car Services
      { path: "operations/car-services", element: <CarServicesPage /> },
      { path: "operations/car-services/jobs/:id", element: <CarJobDetailPage /> },

      // Parcel Delivery
      { path: "operations/parcel-delivery", element: <ParcelDeliveryPage /> },
      { path: "operations/parcel-delivery/parcels/:id", element: <ParcelTrackPage /> },

      // Finance
      { path: "financial/transactions", element: <TransactionsPage /> },
      { path: "financial/transactions/:id", element: <TransactionDetailPage /> },
      { path: "financial/commissions", element: <CommissionsPage /> },
      { path: "financial/payouts", element: <PayoutsPage /> },
      { path: "financial/reports", element: <ReportsPage /> },
      { path: "financial/marketers", element: <MarketersPage /> },
      { path: "financial/marketers/:id", element: <MarketerDetailPage /> },

      // Support & Content
      { path: "support/tickets", element: <SupportPage /> },
      { path: "support/tickets/:id", element: <TicketDetailPage /> },
      { path: "support/chat", element: <ChatPage /> },
      { path: "support/reviews", element: <ReviewsPage /> },
      { path: "support/banners", element: <BannersPage /> },
      { path: "support/banners/:id", element: <BannerDetailPage /> },
      { path: "support/translations", element: <TranslationsPage /> },

      // System Settings & Administration
      { path: "system/settings", element: <SettingsPage /> },
      { path: "system/permissions", element: <PermissionsPage /> },
      { path: "system/audit", element: <AuditPage /> },
      { path: "system/integrations", element: <IntegrationsPage /> },

      // HRM (Human Resource Management)
      { path: "hrm/employees", element: <HRMEmployeesPage /> },
      { path: "hrm/employees/:id", element: <HRMEmployeeDetailPage /> },
      { path: "hrm/departments", element: <HRMDepartmentsPage /> },
      { path: "hrm/leaves", element: <HRMLeavesPage /> },
      { path: "hrm/payroll", element: <HRMPayrollPage /> },

      // ERP (Enterprise Resource Planning)
      { path: "erp/dashboard", element: <ERPDashboardPage /> },
      { path: "erp/budget", element: <ERPBudgetPage /> },
      { path: "erp/vendors", element: <ERPVendorsPage /> },
      { path: "erp/assets", element: <ERPAssetsPage /> },

      // Account
      { path: "account/profile", element: <MyProfilePage /> },
      { path: "account/security", element: <AccountSecurityPage /> },

      // Fallback
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
