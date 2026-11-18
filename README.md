# Boraine MedTrack (Correctional Edition)

**Correctional Facility Pharmacy Management System**
Version 5.0 — Offline-First PWA with Supabase PostgreSQL Cloud Backend & SAPC GPP Compliance

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
  - `staff` (5 statutory personnel across SAPC/SANC cadres)
  - `medicines` (12 National EML pharmaceutical formulations)
  - `batches` (15 physical batch inventories with FEFO tracking)
  - `inmates` (5 offender medical records with chronic regimens & allergies)
  - `s5_s6_ledger` (Immutable cryptographic ledger with PostgreSQL trigger)
  - `dispensing_records` (Full audit trail of administrations)

### Immutability Trigger
```sql
CREATE OR REPLACE FUNCTION enforce_s5_s6_immutability()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'SAPC / Act 101 Violation: Modifying or deleting records from the S5/S6 Register is strictly prohibited by law.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_s5_s6_no_mutation
BEFORE UPDATE OR DELETE ON s5_s6_ledger
FOR EACH ROW EXECUTE FUNCTION enforce_s5_s6_immutability();
```

---

## Quick Start

```bash
# Start local server (running on port 3000)
python -m http.server 3000
# Open http://localhost:3000
```

> **Default Responsible Pharmacist PIN:** `7492` (Dr. Themba Nkosi)

---

## Features

### ☁️ Module A: Supabase Cloud & Bi-Directional Sync
- **Live Sync Pill:** Visual indicator in header (`SUPABASE CLOUD` / `AIR-GAP OFFLINE`).
- **One-Click Re-Sync:** Click the status pill at any time to verify cloud connectivity and synchronize records.
- **Air-Gap Resilience:** If the cloud is unreachable (loadshedding, air-gap subnet), the system seamlessly continues operating via local storage with zero UI interruption.

### 🏠 Module B: Dashboard & KPI Overview
- **4 KPI Cards:** Active Inmates, Low Stock Items, Expiring Batches (FEFO), Pending S5/S6 Verifications.
- **Quick Action Bar:** New Ward Round, Log GRV Intake, Add S5/S6 Vault Issue, Export Depot Requisition.

### 📦 Module C: FEFO Inventory & Batch Control
- Full inventory table with EML codes, schedule categories (S0–S6), stock levels.
- **Expandable batch details:** supplier, manufacture date, expiry, bin location.
- **FEFO Pick Assistant modal:** Auto-highlights earliest-expiry batch during dispensing.
- **GRV Intake modal:** Log incoming goods with batch details.

### 🔒 Module D: S5/S6 Controlled Substance Register
- **Cryptographic hash-chain audit trail** (SHA-256 immutable ledger).
- Backed by PostgreSQL immutability trigger preventing `UPDATE` and `DELETE`.
- **2FA PIN verification** required for every S5/S6 transaction.
- Dual witness sign-off for Act 101 compliance.
- **Role-based vault restriction:** Only RP and Clinical Pharmacists (L3+) can access.

### 💊 Module E: Inmate Dispensing & Chronic Care
- **Inmate search** by ID or Cell Block.
- **Clinical Allergy Contraindication Interlock:** Blocks dispensing when an adverse allergy is detected (e.g. Amoxicillin to Penicillin-allergic patients).
- **Admit New Inmate modal** with full clinical intake.
- **Nursing Ward MAR Sheet:** Monthly chronic repeat packages for cell block rounds with browser print preview.
- **Transfer & Release Summary:** One-click `.txt` export of medication & clinical notes.

### 📋 Module F: Provincial Depot Ordering
- **Consumption forecasting:** Rolling 30-day usage analysis.
- **Safety stock alerts:** Auto-flags items below buffer thresholds.
- **Requisition Builder:** Editable order quantities mapped to National EML.
- **CSV Download:** Real file download of depot order sheets.

### 🔐 Module G: Pharmacist Login & Terminal Security
- **Air-gapped security lockscreen** with PIN authentication.
- **Session management** with active pharmacist display.
- **Shift handover modal** for formal session transfers.

### 👥 Module H: Staff Registry & Role-Based Access Control (RBAC)
- **5 statutory cadres** per SAPC/SANC Act:
  | Level | Role | S5/S6 Access | PIN |
  |-------|------|-------------|-----|
  | L4 | Responsible Pharmacist (RP) | ✅ Full | 7492 |
  | L3 | Clinical Pharmacist | ✅ Full | 3156 |
  | L2 | Post-Basic Pharmacist Assistant | ❌ Blocked | 2048 |
  | L1 | Basic Pharmacist Assistant | ❌ Blocked | 6734 |
  | L2 | Registered Nurse (SANC) | ❌ Blocked | 8521 |
- **Register New Staff** with role assignment and auto-PIN generation.
- **Switch User** functionality without full logout.

### 🏥 Module I: Multi-Facility Management
- **4 pre-loaded facilities:** St. Albans, Kgosi Mampuru II, Kimberley, Pollsmoor.
- **Switch active facility** from header dropdown.
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
| Offline | Service Worker (v5.0, Cache-First strategy) |
| Cryptography | Web Crypto API SHA-256 for S5/S6 Merkle tree blocks |

---

## License

Proprietary — Boraine Technologies (Pty) Ltd
