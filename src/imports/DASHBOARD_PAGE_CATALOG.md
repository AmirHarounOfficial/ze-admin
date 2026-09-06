# ZeTime Dashboard Page Catalog

This document details every page, modal, and drawer layout to be built for the ZeTime Admin Dashboard.

---

## 📁 1. Executive Board & Maps Pages

### A. Executive Analytics Dashboard
* **Route**: `/admin/overview`
* **Components**: 4 Top Metric Cards (Revenue, GMV, Conversion, Retention), Revenue chart, active bookings table, support overview widget.

### B. Live Operations Map
* **Route**: `/admin/operations-map`
* **Components**: Leaflet/Google Maps canvas, real-time vehicle icons, filter panel (by delivery/assistance status), status side list showing active dispatch progress.

---

## 📁 2. User & Provider Directory Pages

### A. Customer Register View
* **Route**: `/admin/customers`
* **Components**: Paginated table, bulk actions header (e.g. suspend), side drawer detailing default car profiles, address list, and wallet adjustment triggers.

### B. Provider Audit Queue
* **Route**: `/admin/providers/verify-queue`
* **Components**: Document grid showing uploaded commercial registers, NID cards, tax IDs, side-by-side verification preview modal, approve/reject buttons.

### C. Provider Directory
* **Route**: `/admin/providers/registry`
* **Components**: Provider table, points balance status column, module permission tags column, action dropdowns.

---

## 📁 3. Operations & Service Module Pages

### A. Restaurant Floorplans Layout Editor
* **Route**: `/admin/modules/restaurant-seating`
* **Components**: Floor layout canvas displaying seating layouts (halls, tables, layout items), coordinate editor panel, tags dropdowns.

### B. Food Delivery Drivers Fleet Desk
* **Route**: `/admin/modules/food-delivery-drivers`
* **Components**: Driver roster, active status toggle (`available`/`busy`), emergency alerts alert modal, bank account review drawer.

### C. Roadside Assistance Dispatch Monitor
* **Route**: `/admin/modules/roadside-dispatch`
* **Components**: Instant orders grid displaying live 60-second timeouts, map drawer indicating dispatched captain's location, manual cancel modal.

---

## 📁 4. Financial & CMS Pages

### A. Financial Ledger
* **Route**: `/admin/financial-ledger`
* **Components**: Payfort deposit logs, transaction ledger, cash payment verification prompts.

### B. Promotional Banners Scheduler
* **Route**: `/admin/cms/banners`
* **Components**: Drag-and-drop banner queue card, image uploader, time range date-picker, category link selector.
