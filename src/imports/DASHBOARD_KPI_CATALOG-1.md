# ZeTime Dashboard KPI Catalog

This document provides the mathematical formulas, database table sources, and business meanings for all Key Performance Indicators (KPIs) in the dashboard.

---

## 🧮 1. Platform Performance KPIs

### A. Gross Merchandise Value (GMV)
* **Description**: Aggregate transaction value of all user expenditures before commission deductions.
* **Database Source**: Sum of `bookings.price` + `property_bookings.total_price` + `food_delivery_orders.total_amount`.
* **Formula**:
  $$\text{GMV} = \sum P_{\text{bookings}} + \sum P_{\text{property}} + \sum P_{\text{delivery\_orders}}$$

### B. Platform Net Revenue (Take Rate)
* **Description**: Platform net earnings after paying out providers and drivers.
* **Database Source**: Sum of platform commission cuts from `bookings` and `service_payments` table ledger entries.
* **Formula**:
  $$\text{Net Revenue} = \sum \left( \frac{\text{Base Price} \times \text{service\_fee\_percentage}}{100} \right) - \sum \text{Processing Fees}$$

### C. Booking Completion Rate
* **Description**: Efficiency index of successfully completed requests vs total placed bookings.
* **Database Source**: Table `bookings`.
* **Formula**:
  $$\text{Completion Rate} = \left( \frac{\text{Count of bookings where status} = \text{'completed'}}{\text{Total count of bookings placed}} \right) \times 100$$

---

## ⏱️ 2. Geolocation & Dispatch KPIs

### A. Dispatch ETA Deviation
* **Description**: Divergence between OSRM-estimated travel duration and actual driver transit time.
* **Database Source**: `TripLocation` logs + `bookings.created_at` / `bookings.arrived_at`.
* **Formula**:
  $$\Delta t = t_{\text{actual\_arrival}} - t_{\text{osrm\_estimated}}$$

### B. Captain Response Time
* **Description**: Speed at which roadside captains accept dispatch popups.
* **Database Source**: Time difference between `instant_orders.created_at` and `instant_orders.responded_at`.
* **Formula**:
  $$\text{Avg Response Time} = \text{Average}(t_{\text{responded}} - t_{\text{created}})$$
* **Target SLA**: $< 60$ seconds.

---

## 🏠 3. Rental & Seating Performance KPIs

### A. Seating Delay Index (Restaurant Seating)
* **Description**: Delay interval between check-in arrival and table assignment.
* **Database Source**: `reservations.arrived_at` vs `reservations.seated_at` (logged in `reservation_delays` and `dining_sessions`).
* **Formula**:
  $$\text{Avg Seating Delay} = \text{Average}(t_{\text{seated}} - t_{\text{arrived}})$$

### B. Property Occupancy Rate
* **Description**: Rental nights filled vs total available host seasonal listings.
* **Database Source**: `property_bookings` vs `property_availabilities`.
* **Formula**:
  $$\text{Occupancy Rate} = \left( \frac{\text{Sum of booked nights}}{\text{Total active available dates listed}} \right) \times 100$$
