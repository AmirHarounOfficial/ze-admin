# Admin Dashboard Operational Workflows

This document outlines the state transitions and manual overrides executed by administrators from the dashboard.

---

## 🏢 1. Merchant Onboarding Verification Workflow

```mermaid
stateDiagram-v2
    [*] --> Pending : Provider registers basic profile
    Pending --> AuditQueue : Documents uploaded (NID, Register)
    AuditQueue --> ReviewDesk : Admin opens detail drawer
    ReviewDesk --> Approved : Verify files & Approve
    ReviewDesk --> Rejected : Missing documents & Reject
    Rejected --> AuditQueue : Provider uploads updated files
    Approved --> Suspended : Admin flags violation (fraud)
    Suspended --> Approved : Suspension cleared
```

---

## 💸 2. Marketer Payout (Withdrawals) Workflow

```mermaid
stateDiagram-v2
    [*] --> Requested : Marketer submits withdrawal
    Requested --> Hold : Pending verification check
    Hold --> Approved : Payout approved
    Hold --> Rejected : Payout rejected (invalid bank details)
    Approved --> Processing : Sent to payment processor
    Processing --> Cleared : Processor confirmation callback
```

### Business Rules (Marketer Payouts)
* Withdrawals can only be requested if available marketer balance ($B$) is greater than or equal to the requested amount ($W$):
  $$B \ge W$$
* Upon rejection, the requested amount must be instantly refunded to the marketer's ledger account:
  $$B_{\text{new}} = B_{\text{old}} + W$$

---

## 🚨 3. Support Incident & Dispute Override Workflow

```mermaid
stateDiagram-v2
    [*] --> Opened : Guest triggers dispute / complaint
    Opened --> Active : Support Agent reviews chat history
    Active --> Dispatched : Agent coordinates with Handyman/Captain
    Active --> Refunded : Agent grants direct wallet override
    Active --> Resolved : Ticket marked resolved
```

### Manual Booking Status Override
If a provider fails to mark a service completed or customer disputes completion:
1. Support Manager can manually override status to `completed` or `cancelled`.
2. Logging: System generates a `BookingLog` record:
   * `action` = `manual_status_override`
   * `reason` = Agent's audit explanation
   * `action_by_id` = Admin ID.
