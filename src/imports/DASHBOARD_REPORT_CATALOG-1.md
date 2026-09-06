# ZeTime Admin Dashboard Report Catalog

This document specifies the metrics, filters, aggregation levels, and exports for all standard administrative report layouts.

---

## 📊 1. Financial Reports Directory

### A. Platform Net Commission Report
* **Metrics**: Gross Merchandise Value (GMV), net platform fee revenue, processing charges, tax collections.
* **Filters**: Module key, date range (daily/weekly/monthly/custom), payment method, region.
* **Drill-down**: Click to view itemized transactions for a single provider.
* **Export**: CSV, PDF (with logo header), Excel.

### B. Tax Audit Ledger
* **Metrics**: Net sales, collected VAT tax, provider payable tax offset.
* **Filters**: Provider ID, tax period, city, state.
* **Drill-down**: View billing invoices for specific dates.
* **Export**: CSV, Excel.

### C. Marketer Payout & Commissions Ledger
* **Metrics**: Referrals count, active subscriptions, total points renewed, approved payouts, pending queue balance.
* **Filters**: Marketer status, withdrawal date range.
* **Export**: CSV.

---

## 🛵 2. Operational & Service Reports Directory

### A. Roadside Incident Completion Report
* **Metrics**: Incident requests count, OSRM dispatch ETA, actual arrival duration, completion speed, customer rating.
* **Filters**: Service type (towing/battery/fuel/unlocking/diagnostics), captain ID, duration offset (over 15 mins).
* **Drill-down**: View captain coordinate logs and route map trails.
* **Export**: PDF.

### B. Restaurant Waitlist Delay Audit
* **Metrics**: Average queue delay, check-in rate, table turnover time.
* **Filters**: Restaurant ID, day of week, slot interval (lunch/dinner).
* **Export**: CSV, PDF.

### C. Fleet Performance Logs
* **Metrics**: Driver online hours, active deliveries count, average transit speed, emergency triggers.
* **Filters**: Driver ID, region, vehicle type.
* **Export**: Excel.
