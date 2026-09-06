# ZeTime Master Admin Dashboard PRD

## 1. Document Control & Overview
* **Project Name**: ZeTime Super App Admin Dashboard
* **Status**: Approved Blueprint
* **Target Audience**: UI/UX Designers, Backend/Frontend Developers, QA, Product Managers.

ZeTime is a multi-service super app matching customers with providers across Home Services, Car Services, Property Rentals, Restaurant Table Reservations, Food Delivery, and Street Assistance. This Admin Dashboard serves as the central control center for operational monitoring, customer/merchant moderation, financial settlement, fraud prevention, and localization configuration.

---

## 2. Platform Personas & Access Levels

The dashboard serves various internal business functions:
1. **Super Admin**: Full permissions, system config, database modifications, gateway settings.
2. **Operations Manager**: General system monitoring, provider approvals, handyman dispatches, active tracking.
3. **Finance Manager / Accountant**: Processes bank accounts, marketer withdrawals, provider settlements, tax audits.
4. **Support Manager / Agent**: Moderates support tickets, resolves disputes, issues wallet adjustments, reviews ratings.
5. **Marketing Manager**: Manages coupons, banners, marketer approvals, promotions, notifications.
6. **Read-Only Auditor**: Full read-only views for tax compliance.

---

## 3. Global Business Rules & Calculations

### A. Billing Price Engine
For standard transactions:
$$\text{Platform Fee} = \frac{\text{Base Price} \times \text{service\_fee\_percentage}}{100}$$
$$\text{VAT Tax} = \frac{\text{Base Price} \times \text{tax\_percentage}}{100}$$
$$\text{Total Invoice} = \text{Base Price} + \text{Platform Fee} + \text{VAT Tax}$$
*Note: Platform fee and tax percentages are managed via settings. If unset, both default to 2.50 EGP.*

### B. Fuel Delivery Split Invoice (Street Assistant)
$$\text{Invoice Total} = \text{Logistics Delivery Fee} + \text{Fuel Material Price} + \text{Platform Fee} + \text{VAT Tax}$$

### C. Automatic Wallet Refund Flow
If a booking is cancelled by user or rejected by provider (and payment status is `successful` / `paid`):
1. Create a `wallet_transactions` ledger item of type `refund`.
2. Increment the customer's wallet balance:
   $$\text{Wallet Balance} = \text{Wallet Balance} + \text{Refund Amount}$$

---

## 4. Integration Triggers & Handlers

* **OSRM Routing Integration**: Automatically queries routing duration matrix when matching nearest roadside operators. If OSRM driver fails, falls back to raw geometric distance calculations (haversine formula).
* **Firebase FCM Dispatcher**: Sends push notifications on state changes (e.g. `booking_accepted`, `order_ready`). Logs response tokens.
* **SMSala SMS Gateway**: Authenticates phone verification and registers SMS callbacks (`/api/smsala/callback`).
* **Payfort Callback Receiver**: Handles 3DS secure redirection returns and initiates deposits.
