# Admin Dashboard UI/UX Specification

This document details the interface components, interactive states, responsiveness, and SaaS design standards to be implemented in the ZeTime Admin Dashboard.

---

## 🎨 1. SaaS Design System & Palettes

We follow clean, premium dark-mode-first patterns with Harmonious light-mode controls:
* **Background Canvas**: Primary Light: `#F9FAFB` | Primary Dark: `#0B0F19`
* **Nav Sidebar**: `#0F172A` (Slate Dark)
* **Accent Color (Primary Action)**: `#06854d` (Green)
* **Secondary Action Accent**: `#063259` (Blue)
* **Danger/Alerts**: `#EF4444` (Red)

---

## 📐 2. Layout Grid & Widgets

Pages follow a modular masonry dashboard card grid:
* **Metrics Cards Layout (Grid 4-Column)**:
  * Flex-layout row on screens $> 1024$px.
  * Collapses to 2-columns on tablets ($< 1024$px) and 1-column on mobile ($< 640$px).
* **Data Tables**:
  * Hover states: highlight rows with `#F1F5F9`.
  * Status badges: Round border pill shape matching colors:
    * `completed` / `approved`: `#e6f4ee` BG, `#06854d` text.
    * `pending` / `preparing`: `#fef4e6` BG, `#de8208` text.
    * `cancelled` / `rejected`: `#FEE2E2` BG, `#EF4444` text.

---

## 🔄 3. UI Interactive States

### A. Loading Skeleton State
Tables and metric cards must display custom animated SVG skeleton rows when loading data. DO NOT display blocky circular spinners.

### B. Empty State Component
If search query returns empty:
* Render empty state card with a clean illustrative icon, "No Results Found" title, secondary description, and "Clear Filters" primary action button.

### C. Success Toast Alert
When an action succeeds (e.g. provider approved):
* Display temporary slide-in toast from the top-right corner:
  * Icon: Check-Circle.
  * Message: "Provider verified successfully. A notification has been sent."
  * Expiry: Fades out in 3 seconds.
