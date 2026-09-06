# ZeTime Dashboard Future Expansion & Scalability Plan

This document establishes the architecture required to scale the ZeTime Admin Dashboard internationally, support white-label franchise models, and integrate dynamic modules without redesigning the application code.

---

## 🗺️ 1. Multi-Country & Localization Architecture

To support geographical growth:
* **Database Scaling**: Localization parameters are loaded dynamically from the `language_lines` and `settings` tables.
* **Currency Formatting Engine**: Centralized helper processes currencies according to local country rules:
  $$\text{Formatted Value} = \text{Symbol} \cdot \text{value} \quad (\text{e.g. } \text{EGP } 250.00 \text{ vs } \$ 10.00)$$
* **Routing Matrices**: Configures multiple OSRM gateway instances based on selected country (e.g. Dubai instances vs Cairo instances).

---

## 🏢 2. Multi-Tenant Franchise & White-Label Setup

To support brand partitioning:
* **Franchise Scopes**: Admin accounts can be bound to specific geographic IDs (`country_id` or `city_id`). If bound:
  * SQL Queries apply a global scope to filter all bookings, providers, and transactions by that country ID.
* **Custom Palette Overrides**: Color parameters (`color`, `color_palette`) are loaded dynamically from the `modules` table. A franchisee can edit these fields from the portal to instantly update the customer app interface theme.

---

## 📋 3. Dynamic Form & Document Builders
* **Form Builder**: Admin panel houses a form editor to inject vehicle inspection forms or technician checks.
* **Fields Schema**: Form inputs are stored in the database as JSON schema structures:
  ```json
  {
    "fields": [
      {"name": "odometer_reading", "type": "number", "required": true},
      {"name": "check_engine_light", "type": "boolean", "required": false}
    ]
  }
  ```
The customer and provider mobile apps render forms dynamically using this JSON structure.
