# Boraine MedTrack (Correctional Edition)

**Correctional Facility Pharmacy Management System**
Version 5.2 — Offline-First PWA with Supabase PostgreSQL Cloud Backend, Supplying Facilities Registry, and SAPC GPP Compliance

---

## Overview

Boraine MedTrack is a high-security pharmacy management system designed for South African correctional facilities. It operates in dual mode:
1. **Air-Gapped Offline PWA**: 100% operational on local prison subnets with zero internet dependency, utilizing local caching and cryptographic ledger verification.
2. **Supabase Cloud Backend**: Connected to a dedicated PostgreSQL database on Supabase with Row Level Security (RLS) and statutory database triggers that prohibit `UPDATE` or `DELETE` operations on Schedule 5 & 6 registers (Act 101 of 1965).

---

## Live Supabase Backend Details

- **Supabase Project Name:** `Boraine MedTrack`
- **Project Ref / ID:** `krvuodlsxyngnsyrsxpg`
- **Region:** `eu-west-1` (Ireland)
- **Status:** `ACTIVE_HEALTHY`
- **Database Engine:** PostgreSQL 17
- **Provisioned Tables:**
  - `facilities` (4 South African correctional centres)
  - `suppliers` (9 Accredited provincial medical depots and commercial wholesalers)
  - `staff` (5 statutory personnel across SAPC/SANC cadres)
  - `medicines` (12 National EML pharmaceutical formulations)
  - `batches` (15 physical batch inventories with FEFO tracking)
  - `inmates` (5 offender medical records with chronic regimens & allergies)
  - `s5_s6_ledger` (Immutable cryptographic ledger with PostgreSQL trigger)
  - `dispensing_records` (Full audit trail of administrations)

---

## Quick Start

```bash
# Start local server (running on port 3000)
python -m http.server 3000
# Open http://localhost:3000
```

> **Statutory Security Startup:** MedTrack **always starts at the Security Login Screen** requiring authentication.
> **Default Responsible Pharmacist PIN:** `7492` (Dr. Themba Nkosi / Pharm. Liezel Venter)

---

## Features

### 🚚 Module A: Supplying Facilities & Wholesalers Registry (NEW in v5.2)
- **Accredited Supply Chain:** Register and manage Provincial Medical Depots (Cape Medical Depot, Tshwane Depot, etc.) and Commercial Wholesalers (Aspen, Cipla, Adcock Ingram, Fresenius Kabi).
- **Add Supplying Facility:** Easily register new supplying facilities with SAPC Wholesale License numbers, contact sisters, delivery lead times, and regional jurisdictions.
- **Dynamic GRV Integration:** Automatically populates the supplier dropdown when logging incoming Goods Received Vouchers (GRV).

### 📱 Module B: Full Responsive Mobile & Desktop Console
- **Non-Clipping Desktop Layout:** Flexible vertical sizing and auto-truncation ensure zero word clipping across 1080p, 1440p, 4K, and ultrawide displays.
- **Dedicated Mobile Operations Console:** On mobile/tablet screens, tap the **"Menu / Controls"** button to open a dedicated console with full access to Facility switching, Suppliers registry, Staff switching, Cloud sync, and System reset.

### 🔐 Module C: Statutory Login & Terminal Security
- **Startup Mandate:** Always starts at the security login screen on application load or page refresh.
- **Cadre Selector:** Allows choosing between registered Responsible Pharmacists, Clinical Pharmacists, Post-Basic Assistants, and Ward Nurses.
- **PIN Authentication:** 4-digit security PIN required to unlock.

### ☁️ Module D: Supabase Cloud & Bi-Directional Sync
- **Live Sync Pill:** Visual indicator in header (`SUPABASE CLOUD` / `AIR-GAP OFFLINE`).
- **One-Click Re-Sync:** Click the status pill at any time to verify cloud connectivity and synchronize records.
- **Air-Gap Resilience:** If the cloud is unreachable (loadshedding, air-gap subnet), the system seamlessly continues operating via local storage with zero UI interruption.

### 📦 Module E: FEFO Inventory & Batch Control
- Full inventory table with EML codes, schedule categories (S0–S6), stock levels.
- **Expandable batch details:** supplier, manufacture date, expiry, bin location.
- **FEFO Pick Assistant modal:** Auto-highlights earliest-expiry batch during dispensing.
- **GRV Intake modal:** Log incoming goods linked to accredited suppliers.

### 🔒 Module F: S5/S6 Controlled Substance Register
- **Cryptographic hash-chain audit trail** (SHA-256 immutable ledger).
- Backed by PostgreSQL immutability trigger preventing `UPDATE` and `DELETE`.
- **2FA PIN verification** required for every S5/S6 transaction.
- Dual witness sign-off for Act 101 compliance.
- **Role-based vault restriction:** Only RP and Clinical Pharmacists (L3+) can access.

### 💊 Module G: Inmate Dispensing & Chronic Care
- **Inmate search** by ID or Cell Block.
- **Clinical Allergy Contraindication Interlock:** Blocks dispensing when an adverse allergy is detected (e.g. Amoxicillin to Penicillin-allergic patients).
- **Admit New Inmate modal** with full clinical intake.
- **Nursing Ward MAR Sheet:** Monthly chronic repeat packages for cell block rounds with browser print preview.
- **Transfer & Release Summary:** One-click `.txt` export of medication & clinical notes.

### 📋 Module H: Provincial Depot Ordering
- **Consumption forecasting:** Rolling 30-day usage analysis.
- **Safety stock alerts:** Auto-flags items below buffer thresholds.
- **Requisition Builder:** Editable order quantities mapped to National EML.
- **CSV Download:** Real file download of depot order sheets.

### 🏥 Module I: Multi-Facility Management
- **4 pre-loaded facilities:** St. Albans, Kgosi Mampuru II, Kimberley, Pollsmoor.
- **Commission New Facility:** Add new correctional centres to the network.
- **Decommission & Delete:** Remove facilities with safety guard (can't delete last one).

---

## Technical Architecture

| Component | Technology |
|-----------|-----------|
| Frontend | React 18.2 (JSX via Babel Standalone) |
| Cloud Database | Supabase (PostgreSQL 17 on AWS `eu-west-1`) |
| Client SDK | `@supabase/supabase-js` (Local vendor fallback + CDN) |
| Security | Row-Level Security (RLS) + PL/pgSQL Immutability Triggers |
| Styling | Tailwind CSS 3.x |
| State | React useState/useEffect + LocalStorage + Supabase Sync |
| Offline | Service Worker (v5.2, Cache-First strategy) |
| Cryptography | Web Crypto API SHA-256 for S5/S6 Merkle tree blocks |

---

## License

Proprietary — Boraine Technologies (Pty) Ltd
