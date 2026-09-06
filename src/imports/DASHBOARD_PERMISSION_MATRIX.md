# Admin Dashboard Permission Matrix

This document defines the Role-Based Access Control (RBAC) definitions and module authorization restrictions for all administrative user accounts on ZeTime.

---

## 🔒 1. System Role Definitions

1. **Super Admin**: Master role. Overrides all controls. Only role allowed to edit database columns, access gateway keys, or adjust platform fee commissions.
2. **Operations Manager**: Full access to bookings, fleet map, driver monitoring, and provider registers. Cannot access ledgers or change tax settings.
3. **Finance Manager**: Oversees settlements, processes marketer payouts, sets VAT and service rates.
4. **Accountant**: Read-only access to financials, but can approve cash reconciliation transactions.
5. **Support Manager**: Oversees agent routing, monitors chats, overrides cancellation fees, reviews ratings.
6. **Customer Support Agent**: Access to customer registers, ticket drawers, chat logs. Cannot view financials or marketer databases.
7. **Marketing Manager**: Access to CMS, banners scheduler, coupon creation, push notification campaigns.
8. **Content Manager**: Access to FAQs, translations desk, review moderations.
9. **Analyst**: Access to KPI dashboards, cohort reports, geographic charts. Cannot run write operations.
10. **Read-Only Auditor**: Read-only access to all dashboards for compliance auditing.

---

## 📊 2. Granular Permissions Matrix

| Dashboard Section | Super Admin | Operations Manager | Finance Manager | Accountant | Support Agent | Marketing Manager | Auditor |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Global Overview** | Read/Write | Read | Read | Read | Read | Read | Read |
| **Provider Verification** | Read/Write | Read/Write | No | No | No | No | Read |
| **Driver Fleet Map** | Read/Write | Read/Write | No | No | Read | No | Read |
| **Table Seating Edit** | Read/Write | Read/Write | No | No | No | No | Read |
| **Financial Settlements** | Read/Write | No | Read/Write | Read/Write | No | No | Read |
| **Marketer Withdrawals** | Read/Write | No | Read/Write | Read | No | No | Read |
| **Support Chat / Tickets** | Read/Write | Read | No | No | Read/Write | No | Read |
| **Coupons & Banners** | Read/Write | No | No | No | No | Read/Write | Read |
| **Global Settings & Keys**| Read/Write | No | No | No | No | No | No |
| **Spatie RBAC Config** | Read/Write | No | No | No | No | No | No |

---

## 🔒 3. Granular Restrictions & Policies
* **Fields Obfuscation**: Passwords, bank IBAN digits (except last 4 characters), and authorization keys must be masked/obfuscated for all roles except Super Admin and Finance Manager.
* **Audit Trails**: Any database alteration (e.g. suspending a provider, releasing a payout) must log the operator's admin ID, IP address, timestamp, and action description.
