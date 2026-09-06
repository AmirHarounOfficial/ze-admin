# Admin Dashboard Sidebar Navigational Structure

This document details the exact navigational tree to be implemented in the left-side sidebar panel of the ZeTime Admin Dashboard.

---

## 🧭 1. Sidebar Navigational Hierarchy

```
📁 Overview Hub
├── 📊 Live Executive Board
│    └── [Icon: LayoutDashboard] - Main landing page. Shows real-time KPIs.
└── 🗺️ Operations Map
     └── [Icon: Map] - Live coordinate map of drivers and captains.

📁 User Accounts Directory
├── 👥 Customers Register
│    └── [Icon: Users] - Customers lookup, wallet credits, address ledger.
├── 🏢 Providers Center
│    ├── 📋 Verification Queue  [Badge: Pending count] - Document audit desk.
│    └── 📁 Merchant Registry   - Approved provider databases.
└── 👷 Handyman Staff List
     └── [Icon: ShieldAlert] - Technician listing and schedules.

📁 Operations & Service Modules
├── 🏠 Property Rentals
│    └── [Icon: Home] - Properties, bookings, seasonal price overrides.
├── 🍽️ Restaurant Table Booking
│    ├── 🖼️ Floorplans Layout  - Table mapping and halls editor.
│    └── ⏱️ Waitlist queue     - Live check-in monitors.
├── 🍕 Food Delivery
│    ├── 🍔 Menu Modifiers     - Modifier options, category tags.
│    └── 🛵 Driver Fleet Desk  [Badge: Active drivers count] - Driver profiles.
└── 🚗 Roadside & Assistance
     ├── 🏎️ Vehicle Registers  - Car spec templates, VIN data.
     └── 🚨 Instant Assist     [Badge: Live cases count] - Live roadside towing.

📁 Financial Settlements Desk
├── 💳 Transaction Ledger
│    └── [Icon: CreditCard] - Payment statements, Payfort logs.
├── 💸 Commission Settings
│    └── [Icon: Calculator] - Fee configuration coefficients.
└── 🎫 Promoters & Marketers
     ├── 📊 Referral Registry  - Referred provider subscription trackers.
     └── 📥 Withdrawal Queue   [Badge: Pending withdrawals] - Payout checks.

📁 Support, Moderation & CMS
├── 📥 Support Ticketing Desk   [Badge: Unresolved count] - [Icon: Ticket]
├── 💬 Unified Chat logs        - Direct chats monitor.
├── ⭐️ Reviews & Attributes     - Review moderation.
└── 📝 CMS Configuration
     ├── 📰 Banners & Offers   - Promotion slider scheduler.
     └── 💬 Translations Desk  - Dynamic localization translation strings.

📁 System Settings & Compliance
├── ⚙️ General Configurations - Global gateway configs (FCM, SMSala, Maps).
├── 🔑 Access control Spatie  - Spatie permissions editor.
└── 📜 Audit Logs Ledger       - Logs trace.
```

---

## 🎨 2. Navigation Styling & Indicators
* **Hover State**: Highlights list items with dynamic background palettes (`#e6f4ee` with `#06854d` text for active items).
* **Live Badges**: Dynamic counting tags showing pending tasks (e.g. pending documents, live dispatches, new support chats).
* **Collapsible Groups**: Navigation folders (e.g. Operations, Financials) collapse with animated arrow toggles.
