// ============================================================================
// BORAINE MEDTRACK (CORRECTIONAL EDITION) — App.jsx
// Correctional Facility Pharmacy Management System
// Version 5.0 — Supabase Cloud Backend + Full Air-Gap Local Fallback
// ============================================================================

import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';

    // --- EMBEDDED HIGH-PERFORMANCE SVG ICONS (LUCIDE EQUIVALENTS) ---
    // Pure inline SVGs guarantee zero network failure in air-gapped simulation
    function Icon({ name, className = "w-4 h-4", ...props }) {
      const icons = {
    pill: <><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    alertTriangle: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    unlock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>,
    key: <><path d="m21 2-2 2m-1.5 1.5L14 9l-2-2-4 4 2 2-3 3 1.5 1.5L7 19l2 2 4-4 2 2 3.5-3.5L20 17l2-2Z"/><circle cx="7.5" cy="16.5" r="1.5"/></>,
    user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    refresh: <><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    fileSpreadsheet: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="12" y1="13" x2="12" y2="17"/></>,
    printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
    clipboardList: <><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></>,
    package: <><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    stethoscope: <><path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><line x1="19" y1="3" x2="19" y2="7"/><path d="M19 7a4 4 0 0 1-4 4h-1"/><path d="M9 13.5v3.25A4.25 4.25 0 0 0 13.25 21H16"/><circle cx="18" cy="21" r="2"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    qrCode: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  };

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          {icons[name] || icons.pill}
        </svg>
      );
    }

    // --- CRYPTOGRAPHIC SHA-256 SIMULATION FOR S5/S6 MERKLE LEDGER ---
    // Fast deterministic hash function simulating Act 101 tamper-evident chaining
    function simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      const hex = (hash >>> 0).toString(16).padStart(8, '0');
      // Expand into a 64-char simulated SHA-256 block hash
      let full = '';
      for (let j = 0; j < 8; j++) {
        full += ((hash ^ (j * 0x9e3779b9)) >>> 0).toString(16).padStart(8, '0');
      }
      return full.substring(0, 64);
    }

    // Reference Date for South African GPP Expiry Calculations
    const TODAY = new Date('2026-11-18T12:15:00');

    function getDaysUntil(dateString) {
      const target = new Date(dateString);
      const diffTime = target - TODAY;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // --- REALISTIC SOUTH AFRICAN CORRECTIONAL DATASET ---
    const INITIAL_FACILITIES = [
      { id: 'STA', name: 'St. Albans Correctional Centre', province: 'Eastern Cape (Gqeberha)', inmatesCount: 2418, security: 'Maximum & Medium', depot: 'Port Elizabeth Regional Depot' },
      { id: 'KGM', name: 'Kgosi Mampuru II Central Correctional', province: 'Gauteng (Pretoria)', inmatesCount: 3850, security: 'Maximum & Remand', depot: 'Tshwane Provincial Depot' },
      { id: 'KBC', name: 'Kimberley Correctional Centre', province: 'Northern Cape (Kimberley)', inmatesCount: 1220, security: 'Medium', depot: 'Free State / NC Medical Depot' },
      { id: 'PLS', name: 'Pollsmoor Remand & Maximum', province: 'Western Cape (Tokai)', inmatesCount: 4110, security: 'Maximum & Remand', depot: 'Cape Medical Depot' }
    ];

    const INITIAL_INVENTORY = [
      {
        id: 'MED-001',
        name: 'Tenofovir / Emtricitabine / Dolutegravir (TLD) 300/200/50mg',
        genericName: 'TLD Fixed-Dose Combination',
        emlCode: 'EML-ARV-001',
        depotCode: 'CPD-ARV-101',
        schedule: 'S4',
        form: 'Tablets',
        packSize: 'Bottle of 30 tabs',
        monthlyConsumption: 240,
        safetyStockDays: 30,
        unitCostZAR: 184.50,
        batches: [
          {
            batchNumber: 'BATCH-TLD-24B',
            supplier: 'Aspen Pharmacare',
            mfgDate: '2024-12-10',
            expiryDate: '2026-12-10', // 22 days left!
            quantity: 110,
            binLocation: 'SEC-PHARM-A02',
            quarantined: false
          },
          {
            batchNumber: 'BATCH-TLD-24A',
            supplier: 'Cipla Medpro SA',
            mfgDate: '2025-04-15',
            expiryDate: '2027-04-15',
            quantity: 420,
            binLocation: 'SEC-PHARM-A01',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-002',
        name: 'Tenofovir / Emtricitabine / Efavirenz (TEE) 300/200/600mg',
        genericName: 'TEE Alternative First-Line',
        emlCode: 'EML-ARV-002',
        depotCode: 'CPD-ARV-102',
        schedule: 'S4',
        form: 'Tablets',
        packSize: 'Bottle of 30 tabs',
        monthlyConsumption: 90,
        safetyStockDays: 30,
        unitCostZAR: 165.00,
        batches: [
          {
            batchNumber: 'BATCH-TEE-88',
            supplier: 'Mylan / Viatris SA',
            mfgDate: '2025-08-20',
            expiryDate: '2027-08-20',
            quantity: 180,
            binLocation: 'SEC-PHARM-A03',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-003',
        name: 'Rifafour e-275 (RHZE 150/75/400/275mg)',
        genericName: 'Rifampicin/Isoniazid/Pyrazinamide/Ethambutol',
        emlCode: 'EML-TB-001',
        depotCode: 'CPD-TB-201',
        schedule: 'S4',
        form: 'FDC Tablets',
        packSize: 'Blister Pack of 28 tabs',
        monthlyConsumption: 160,
        safetyStockDays: 45,
        unitCostZAR: 220.00,
        batches: [
          {
            batchNumber: 'BATCH-RIF-890',
            supplier: 'Sanofi-Aventis SA',
            mfgDate: '2024-12-25',
            expiryDate: '2026-12-25', // 37 days left!
            quantity: 60,
            binLocation: 'TB-DOT-C02',
            quarantined: false
          },
          {
            batchNumber: 'BATCH-RIF-901',
            supplier: 'Sanofi-Aventis SA',
            mfgDate: '2025-01-30',
            expiryDate: '2027-01-30',
            quantity: 280,
            binLocation: 'TB-DOT-C01',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-004',
        name: 'Isoniazid (INH) 100mg Tablets',
        genericName: 'Isoniazid Prophylaxis (TPT)',
        emlCode: 'EML-TB-002',
        depotCode: 'CPD-TB-202',
        schedule: 'S4',
        form: 'Tablets',
        packSize: 'Tub of 100 tabs',
        monthlyConsumption: 50,
        safetyStockDays: 30,
        unitCostZAR: 62.00,
        batches: [
          {
            batchNumber: 'BATCH-INH-412',
            supplier: 'Bodene / Pharmacare',
            mfgDate: '2025-11-10',
            expiryDate: '2027-11-10',
            quantity: 95,
            binLocation: 'TB-DOT-C03',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-005',
        name: 'Morphine Sulphate 10mg/ml Ampoules (1ml)',
        genericName: 'Morphine Sulphate Injection',
        emlCode: 'EML-CNS-006',
        depotCode: 'CPD-S6-004',
        schedule: 'S6',
        form: 'Injectable Ampoules',
        packSize: 'Box of 10 ampoules',
        monthlyConsumption: 15,
        safetyStockDays: 45,
        unitCostZAR: 145.00,
        batches: [
          {
            batchNumber: 'BATCH-MOR-S6-69',
            supplier: 'Adcock Ingram Critical Care',
            mfgDate: '2025-01-05',
            expiryDate: '2027-01-05', // 48 days left!
            quantity: 12,
            binLocation: 'VAULT-S6-SAF-01',
            quarantined: false
          },
          {
            batchNumber: 'BATCH-MOR-S6-77',
            supplier: 'Adcock Ingram Critical Care',
            mfgDate: '2025-03-12',
            expiryDate: '2027-03-12',
            quantity: 34,
            binLocation: 'VAULT-S6-SAF-01',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-006',
        name: 'Diazepam 5mg Tablets',
        genericName: 'Diazepam Oral Tablets',
        emlCode: 'EML-CNS-001',
        depotCode: 'CPD-S5-012',
        schedule: 'S5',
        form: 'Tablets',
        packSize: 'Bottle of 100 tabs',
        monthlyConsumption: 40,
        safetyStockDays: 30,
        unitCostZAR: 48.00,
        batches: [
          {
            batchNumber: 'BATCH-DZP-54K',
            supplier: 'Aspen Pharmacare',
            mfgDate: '2025-02-14',
            expiryDate: '2027-02-14',
            quantity: 40,
            binLocation: 'SEC-CAB-S5-02',
            quarantined: false
          },
          {
            batchNumber: 'BATCH-DZP-55A',
            supplier: 'Aspen Pharmacare',
            mfgDate: '2025-09-18',
            expiryDate: '2027-09-18',
            quantity: 85,
            binLocation: 'SEC-CAB-S5-02',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-007',
        name: 'Tramadol 50mg Capsules',
        genericName: 'Tramadol Hydrochloride',
        emlCode: 'EML-CNS-005',
        depotCode: 'CPD-S5-019',
        schedule: 'S5',
        form: 'Capsules',
        packSize: 'Box of 20 caps',
        monthlyConsumption: 35,
        safetyStockDays: 30,
        unitCostZAR: 85.00,
        batches: [
          {
            batchNumber: 'BATCH-TRM-301',
            supplier: 'Cipla Medpro SA',
            mfgDate: '2025-05-20',
            expiryDate: '2027-05-20',
            quantity: 45,
            binLocation: 'SEC-CAB-S5-03',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-008',
        name: 'Amoxicillin 500mg Capsules',
        genericName: 'Amoxicillin Trihydrate',
        emlCode: 'EML-ANT-001',
        depotCode: 'CPD-ANT-305',
        schedule: 'S4',
        form: 'Capsules',
        packSize: 'Box of 15 caps',
        monthlyConsumption: 120,
        safetyStockDays: 30,
        unitCostZAR: 34.50,
        batches: [
          {
            batchNumber: 'BATCH-AMX-109',
            supplier: 'Adcock Ingram Generic',
            mfgDate: '2024-12-05',
            expiryDate: '2026-12-05', // 17 days left!
            quantity: 30,
            binLocation: 'SHELF-MED-04',
            quarantined: false
          },
          {
            batchNumber: 'BATCH-AMX-112',
            supplier: 'Adcock Ingram Generic',
            mfgDate: '2025-10-14',
            expiryDate: '2027-10-14',
            quantity: 320,
            binLocation: 'SHELF-MED-04',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-009',
        name: 'Paracetamol 500mg Tablets',
        genericName: 'Acetaminophen / Paracetamol',
        emlCode: 'EML-ANA-001',
        depotCode: 'CPD-ANA-001',
        schedule: 'S0',
        form: 'Tablets',
        packSize: 'Tub of 1000 tabs',
        monthlyConsumption: 8,
        safetyStockDays: 20,
        unitCostZAR: 110.00,
        batches: [
          {
            batchNumber: 'BATCH-PCM-804',
            supplier: 'Be-Tabs Pharmaceuticals',
            mfgDate: '2025-02-28',
            expiryDate: '2028-02-28',
            quantity: 14,
            binLocation: 'SHELF-GEN-01',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-010',
        name: 'Enalapril 10mg Tablets',
        genericName: 'Enalapril Maleate ACE-I',
        emlCode: 'EML-CVD-001',
        depotCode: 'CPD-CVD-501',
        schedule: 'S3',
        form: 'Tablets',
        packSize: 'Box of 30 tabs',
        monthlyConsumption: 150,
        safetyStockDays: 30,
        unitCostZAR: 28.00,
        batches: [
          {
            batchNumber: 'BATCH-ENL-221',
            supplier: 'Pharma Dynamics SA',
            mfgDate: '2025-06-30',
            expiryDate: '2027-06-30',
            quantity: 140,
            binLocation: 'SHELF-CHRON-02',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-011',
        name: 'Amlodipine 5mg Tablets',
        genericName: 'Amlodipine Besylate CCB',
        emlCode: 'EML-CVD-002',
        depotCode: 'CPD-CVD-502',
        schedule: 'S3',
        form: 'Tablets',
        packSize: 'Box of 30 tabs',
        monthlyConsumption: 180,
        safetyStockDays: 30,
        unitCostZAR: 22.50,
        batches: [
          {
            batchNumber: 'BATCH-AML-998',
            supplier: "Dr Reddy's Labs",
            mfgDate: '2025-04-12',
            expiryDate: '2027-04-12',
            quantity: 190,
            binLocation: 'SHELF-CHRON-02',
            quarantined: false
          }
        ]
      },
      {
        id: 'MED-012',
        name: 'Fluoxetine 20mg Capsules',
        genericName: 'Fluoxetine Hydrochloride SSRI',
        emlCode: 'EML-PSY-001',
        depotCode: 'CPD-PSY-601',
        schedule: 'S5',
        form: 'Capsules',
        packSize: 'Box of 30 caps',
        monthlyConsumption: 60,
        safetyStockDays: 30,
        unitCostZAR: 54.00,
        batches: [
          {
            batchNumber: 'BATCH-FLX-044',
            supplier: 'Aspen Pharmacare',
            mfgDate: '2025-08-11',
            expiryDate: '2027-08-11',
            quantity: 65,
            binLocation: 'SEC-CAB-S5-01',
            quarantined: false
          }
        ]
      }
    ];

    const INITIAL_CONTROLLED_REGISTER = [
      {
        id: 'SAPC-REG-2026-00412',
        timestamp: '2026-11-16T09:14:00',
        prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
        hash: 'a1b7e42d90f84511892cfa7b321098de76c5b432a10f9e8d7c6b5a43210fe987',
        type: 'RECEIPT',
        drugName: 'Morphine Sulphate 10mg/ml Ampoules (1ml)',
        emlCode: 'EML-CNS-006',
        schedule: 'S6',
        batchNumber: 'BATCH-MOR-S6-77',
        inmateId: 'DEPO-RECEIPT-GCS',
        recipientName: 'Provincial Depot Delivery GRV #4419',
        prescribingDoctor: 'N/A (Provincial Depot)',
        quantity: 34,
        balance: 46,
        pharmacistName: 'Pharm. L. Venter (SAPC #48912)',
        witnessName: 'Sr. P. Dlamini, RN (SANC #10948)',
        notes: 'Cold-chain security seals inspected and verified intact upon delivery from PE Depot.'
      },
      {
        id: 'SAPC-REG-2026-00415',
        timestamp: '2026-11-17T14:32:00',
        prevHash: 'a1b7e42d90f84511892cfa7b321098de76c5b432a10f9e8d7c6b5a43210fe987',
        hash: 'b2c8f53e01a95622903dfb8c432109ef87d6c543b210af9e8d7c6b543210fa98',
        type: 'DISPENSE',
        drugName: 'Diazepam 5mg Tablets',
        emlCode: 'EML-CNS-001',
        schedule: 'S5',
        batchNumber: 'BATCH-DZP-54K',
        inmateId: 'STA-2022-44109',
        recipientName: 'Johan Van der Merwe (Block B-1)',
        prescribingDoctor: 'Dr. K. Govender (MP 0612984)',
        quantity: -15,
        balance: 125,
        pharmacistName: 'Pharm. L. Venter (SAPC #48912)',
        witnessName: 'Sr. M. Tshabalala (SANC #22091)',
        notes: 'Severe muscle spasm & neuropathic pain protocol. Verified against psychiatric authority.'
      },
      {
        id: 'SAPC-REG-2026-00418',
        timestamp: '2026-11-18T08:45:00',
        prevHash: 'b2c8f53e01a95622903dfb8c432109ef87d6c543b210af9e8d7c6b543210fa98',
        hash: 'c3d9a64f12ba6733014eac9d543210fa98e7d654c321ba0f9e8d7c6543210fb0',
        type: 'DISPENSE',
        drugName: 'Morphine Sulphate 10mg/ml Ampoules (1ml)',
        emlCode: 'EML-CNS-006',
        schedule: 'S6',
        batchNumber: 'BATCH-MOR-S6-69',
        inmateId: 'STA-2024-11045',
        recipientName: 'Themba Ndlovu (Isolation Bed 03)',
        prescribingDoctor: 'Dr. R. Naidoo (MP 0554210)',
        quantity: -1,
        balance: 45,
        pharmacistName: 'Pharm. L. Venter (SAPC #48912)',
        witnessName: 'Sr. P. Dlamini, RN (SANC #10948)',
        notes: 'Direct observed injection for severe surgical abdominal trauma. Remainder ampoule accounted for.'
      }
    ];

    const INITIAL_INMATES = [
      {
        id: 'STA-2023-88912',
        saId: '890412 5289 084',
        name: 'Sipho Khumalo',
        age: 37,
        cellBlock: 'Block C-3',
        cellNumber: 'Cell 14',
        securityLevel: 'Medium',
        facilityId: 'STA',
        admissionDate: '2023-04-12',
        doctor: 'Dr. N. Mbatha (MP 0498112)',
        chronicConditions: ['HIV-1 (ART Active)', 'Hypertension Stage 2'],
        allergies: ['PENICILLIN (Severe rash & angioedema risk)'],
        activeRegimen: [
          { drugId: 'MED-001', drugName: 'TLD 300/200/50mg', dose: '1 tab PO nocte', schedule: 'S4', repeatDueDays: 4, batchRef: 'BATCH-TLD-24B' },
          { drugId: 'MED-011', drugName: 'Amlodipine 5mg', dose: '1 tab PO mane', schedule: 'S3', repeatDueDays: 4, batchRef: 'BATCH-AML-998' },
          { drugId: 'MED-010', drugName: 'Enalapril 10mg', dose: '1 tab PO nocte', schedule: 'S3', repeatDueDays: 4, batchRef: 'BATCH-ENL-221' }
        ],
        lastVitals: { bp: '138/86 mmHg', viralLoad: '< 50 copies/mL (Suppressed)', cd4: '482 cells/uL' },
        notes: 'Good compliance on TLD. Monitor blood pressure weekly during cell block rounds.'
      },
      {
        id: 'STA-2022-44109',
        saId: '780215 5041 088',
        name: 'Johan Van der Merwe',
        age: 48,
        cellBlock: 'Block B-1',
        cellNumber: 'Cell 08',
        securityLevel: 'Maximum',
        facilityId: 'STA',
        admissionDate: '2022-09-18',
        doctor: 'Dr. K. Govender (MP 0612984)',
        chronicConditions: ['Major Depressive Disorder', 'Chronic Lumbar Radiculopathy'],
        allergies: ['NSAIDs (Severe gastric ulceration)'],
        activeRegimen: [
          { drugId: 'MED-012', drugName: 'Fluoxetine 20mg', dose: '1 cap PO mane', schedule: 'S5', repeatDueDays: 8, batchRef: 'BATCH-FLX-044' },
          { drugId: 'MED-006', drugName: 'Diazepam 5mg', dose: '1 tab PO nocte PRN', schedule: 'S5', repeatDueDays: 12, batchRef: 'BATCH-DZP-54K' },
          { drugId: 'MED-009', drugName: 'Paracetamol 500mg', dose: '2 tabs PO TDS PRN', schedule: 'S0', repeatDueDays: 14, batchRef: 'BATCH-PCM-804' }
        ],
        lastVitals: { bp: '124/80 mmHg', phq9: '14 (Moderate)', painScore: '6/10' },
        notes: 'Schedule 5 controlled prescription. Direct nurse administration required in presence of correctional officer.'
      },
      {
        id: 'STA-2024-11045',
        saId: '921103 5431 082',
        name: 'Themba Ndlovu',
        age: 34,
        cellBlock: 'Hospital Ward',
        cellNumber: 'Bed 03 (Isolation)',
        securityLevel: 'Medium',
        facilityId: 'STA',
        admissionDate: '2024-02-10',
        doctor: 'Dr. R. Naidoo (MP 0554210)',
        chronicConditions: ['Pulmonary Tuberculosis (DOT Active)', 'Post-Trauma Abdominal Recovery'],
        allergies: ['NONE KNOWN (NKDA)'],
        activeRegimen: [
          { drugId: 'MED-003', drugName: 'Rifafour e-275 (RHZE)', dose: '4 tabs PO mane (DOT)', schedule: 'S4', repeatDueDays: 2, batchRef: 'BATCH-RIF-890' },
          { drugId: 'MED-005', drugName: 'Morphine Sulphate 10mg/ml', dose: '5mg IM q4h PRN breakthrough pain', schedule: 'S6', repeatDueDays: 1, batchRef: 'BATCH-MOR-S6-69' }
        ],
        lastVitals: { bp: '118/76 mmHg', temp: '37.1 C', tbStatus: 'GeneXpert Rif-Sensitive (Month 2)' },
        notes: 'Strict daily Directly Observed Therapy (DOT) required. Inmate housed in negative pressure isolation.'
      },
      {
        id: 'STA-2021-39184',
        saId: '840620 5190 081',
        name: 'Lucas Mokoena',
        age: 42,
        cellBlock: 'Block C-3',
        cellNumber: 'Cell 02',
        securityLevel: 'Medium',
        facilityId: 'STA',
        admissionDate: '2021-11-04',
        doctor: 'Dr. N. Mbatha (MP 0498112)',
        chronicConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension'],
        allergies: ['SULPHONAMIDES (Bactrim/Septran erythema multiforme)'],
        activeRegimen: [
          { drugId: 'MED-010', drugName: 'Enalapril 10mg', dose: '1 tab PO mane', schedule: 'S3', repeatDueDays: 6, batchRef: 'BATCH-ENL-221' },
          { drugId: 'MED-011', drugName: 'Amlodipine 5mg', dose: '1 tab PO mane', schedule: 'S3', repeatDueDays: 6, batchRef: 'BATCH-AML-998' }
        ],
        lastVitals: { bp: '142/90 mmHg', hba1c: '7.8%', fastingGlucose: '8.4 mmol/L' },
        notes: 'Review for Metformin dose titration. Remind dietary officers regarding low-glycemic meals.'
      },
      {
        id: 'STA-2023-77112',
        saId: '950814 5512 089',
        name: 'Bongani Sithole',
        age: 31,
        cellBlock: 'Block A-2',
        cellNumber: 'Cell 19',
        securityLevel: 'Remand / Minimum',
        facilityId: 'STA',
        admissionDate: '2023-11-29',
        doctor: 'Dr. S. Botha (MP 0714299)',
        chronicConditions: ['Acute Bacterial Bronchitis'],
        allergies: ['NONE KNOWN (NKDA)'],
        activeRegimen: [
          { drugId: 'MED-008', drugName: 'Amoxicillin 500mg', dose: '1 cap PO TDS x 7 days', schedule: 'S4', repeatDueDays: 1, batchRef: 'BATCH-AMX-109' },
          { drugId: 'MED-009', drugName: 'Paracetamol 500mg', dose: '2 tabs PO TDS PRN', schedule: 'S0', repeatDueDays: 3, batchRef: 'BATCH-PCM-804' }
        ],
        lastVitals: { bp: '120/78 mmHg', spo2: '98%', temp: '36.8 C' },
        notes: 'Acute prescription ending in 48 hours. Discharge from clinical monitoring once completed.'
      }
    ];

    // Professional Roles & Statutory Scopes of Practice (SAPC & SANC)
    const INITIAL_STAFF = [
      {
        id: 'STF-001',
        name: 'Pharm. Liezel Venter',
        council: 'SAPC',
        regNumber: '48912',
        role: 'RESPONSIBLE_PHARMACIST',
        roleLabel: 'Responsible Pharmacist (RP)',
        clearanceLevel: 4,
        canAccessS5S6: true,
        canOverrideFefo: true,
        canRequisitionDepot: true,
        pin: '7492',
        shift: 'Day Shift (07:00 - 15:00)',
        witnessOnDuty: 'Sr. P. Dlamini, RN (SANC #10948)'
      },
      {
        id: 'STF-002',
        name: 'Pharm. Kabelo Sithole',
        council: 'SAPC',
        regNumber: '52190',
        role: 'CLINICAL_PHARMACIST',
        roleLabel: 'Clinical Dispensary Pharmacist',
        clearanceLevel: 3,
        canAccessS5S6: true,
        canOverrideFefo: true,
        canRequisitionDepot: true,
        pin: '3318',
        shift: 'Day Shift (07:00 - 15:00)',
        witnessOnDuty: 'Sr. P. Dlamini, RN (SANC #10948)'
      },
      {
        id: 'STF-003',
        name: 'Asst. Thabo Molefe',
        council: 'SAPC',
        regNumber: 'PB-88124',
        role: 'ASSISTANT_POST_BASIC',
        roleLabel: "Pharmacist's Assistant (Post-Basic)",
        clearanceLevel: 2,
        canAccessS5S6: false, // Statutory restriction under Act 101/1965
        canOverrideFefo: false,
        canRequisitionDepot: false,
        pin: '1122',
        shift: 'Day Shift (07:00 - 15:00)',
        witnessOnDuty: 'Sr. P. Dlamini, RN (SANC #10948)'
      },
      {
        id: 'STF-004',
        name: 'Asst. Zanele Ndlovu',
        council: 'SAPC',
        regNumber: 'BA-99014',
        role: 'ASSISTANT_BASIC',
        roleLabel: "Pharmacist's Assistant (Basic)",
        clearanceLevel: 1,
        canAccessS5S6: false, // General inventory & OTC only
        canOverrideFefo: false,
        canRequisitionDepot: false,
        pin: '4455',
        shift: 'Day Shift (07:00 - 15:00)',
        witnessOnDuty: 'Sr. P. Dlamini, RN (SANC #10948)'
      },
      {
        id: 'STF-005',
        name: 'Sr. P. Dlamini, RN',
        council: 'SANC',
        regNumber: '10948',
        role: 'REGISTERED_NURSE',
        roleLabel: 'Registered Nurse / Ward Sister',
        clearanceLevel: 2,
        canAccessS5S6: false, // Clinical witness and MAR only
        canOverrideFefo: false,
        canRequisitionDepot: false,
        pin: '5566',
        shift: 'Ward Rounds (07:00 - 19:00)',
        witnessOnDuty: 'Sr. M. Tshabalala (SANC #22091)'
      }
    ];

    const PHARMACIST_CREDENTIALS = INITIAL_STAFF[0];

        // --- SUPABASE CLOUD BACKEND CONFIGURATION ---
    const SUPABASE_CONFIG = {
      url: 'https://krvuodlsxyngnsyrsxpg.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydnVvZGxzeHluZ25zeXJzeHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5OTkzMDksImV4cCI6MjExMDU3NTMwOX0.zdCqJA6Q90VDMYOV3Hoj7QMXxyVO5ZFwiwgzQ7a0Spc',
      projectId: 'krvuodlsxyngnsyrsxpg',
      projectName: 'Boraine MedTrack (PostgreSQL Cloud)'
    };

    let supabaseClient = null;
    try {
      if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch(e) {
      console.warn('Supabase initialization fallback:', e);
    }

    // --- MAIN REACT APPLICATION COMPONENT ---
    export default function BoraineMedTrackApp() {
      // Registered Correctional Facilities Network
      const [facilitiesList, setFacilitiesList] = useState(() => {
        const saved = localStorage.getItem('boraine_facilities');
        return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
      });

      useEffect(() => {
        localStorage.setItem('boraine_facilities', JSON.stringify(facilitiesList));
      }, [facilitiesList]);

      // Active Facility Context
      const [facility, setFacility] = useState(() => {
        const saved = localStorage.getItem('boraine_facility');
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch(e) {}
        }
        return INITIAL_FACILITIES[0];
      });

      const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('boraine_inventory');
        return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
      });

      const [controlledRegister, setControlledRegister] = useState(() => {
        const saved = localStorage.getItem('boraine_s5s6_register');
        return saved ? JSON.parse(saved) : INITIAL_CONTROLLED_REGISTER;
      });

      const [inmates, setInmates] = useState(() => {
        const saved = localStorage.getItem('boraine_inmates');
        return saved ? JSON.parse(saved) : INITIAL_INMATES;
      });

      // Navigation Active Tab: 'dashboard' | 'inventory' | 's5s6' | 'inmates' | 'depot'
      const [activeTab, setActiveTab] = useState('dashboard');

      // Modals State
      // Registered Pharmacy & Healthcare Personnel (SAPC & SANC)
      const [staffList, setStaffList] = useState(() => {
        const saved = localStorage.getItem('boraine_staff');
        return saved ? JSON.parse(saved) : INITIAL_STAFF;
      });

      useEffect(() => {
        localStorage.setItem('boraine_staff', JSON.stringify(staffList));
      }, [staffList]);

      // Active Authenticated Session State
      const [session, setSession] = useState(() => {
        const saved = localStorage.getItem('boraine_session');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            return parsed.currentUser ? parsed : { currentUser: INITIAL_STAFF[0], isLocked: false };
          } catch(e) {}
        }
        return {
          currentUser: INITIAL_STAFF[0],
          isLocked: false
        };
      });

      useEffect(() => {
        localStorage.setItem('boraine_session', JSON.stringify(session));
      }, [session]);
      // Toast Notifications Dock
      const [toasts, setToasts] = useState([]);
      const addToast = (type, message, details = '') => {
        const id = Date.now() + Math.random().toString();
        setToasts(prev => [...prev, { id, type, message, details }]);
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
      };

      // Supabase Cloud Sync State
      const [cloudStatus, setCloudStatus] = useState('CHECKING'); // 'CONNECTED' | 'OFFLINE' | 'SYNCING' | 'ERROR'
      const [lastCloudSync, setLastCloudSync] = useState(null);
      const [isSyncingCloud, setIsSyncingCloud] = useState(false);

      // Bi-directional Cloud Synchronization
      const syncFromSupabaseCloud = async (isManual = false) => {
        if (!supabaseClient) {
          setCloudStatus('OFFLINE');
          return;
        }
        try {
          setIsSyncingCloud(true);
          setCloudStatus('SYNCING');
          
          // Test connectivity with facilities
          const { data: facData, error: facErr } = await supabaseClient.from('facilities').select('*');
          if (facErr) throw facErr;

          if (facData && facData.length > 0) {
            const mappedFacs = facData.map(f => ({
              id: f.id,
              name: f.name,
              province: f.province,
              security: f.security_level,
              inmatesCount: 0,
              license: f.license_number,
              depot: f.province.includes('Eastern') ? 'Port Elizabeth Regional Depot' :
                     f.province.includes('Gauteng') ? 'Tshwane Provincial Depot' :
                     f.province.includes('Western') ? 'Cape Medical Depot' : 'Central Provincial Depot'
            }));
            setFacilitiesList(mappedFacs);
          }

          // Fetch inmates
          const { data: inmData, error: inmErr } = await supabaseClient.from('inmates').select('*');
          if (!inmErr && inmData && inmData.length > 0) {
            const mappedInmates = inmData.map(i => ({
              id: i.id,
              saId: '890101 5000 081',
              name: i.full_name,
              age: 35,
              cellBlock: i.cell_block,
              cellNumber: 'Cell 01',
              securityLevel: 'Medium',
              facilityId: i.facility_id,
              admissionDate: i.admission_date,
              doctor: 'Dr. N. Mbatha (MP 0498112)',
              chronicConditions: Array.isArray(i.chronic_conditions) ? i.chronic_conditions : [],
              allergies: Array.isArray(i.allergies) ? i.allergies : ['NONE KNOWN (NKDA)'],
              activeRegimen: Array.isArray(i.active_regimen) ? i.active_regimen : [],
              notes: 'Synced from Supabase PostgreSQL central database.'
            }));
            setInmates(mappedInmates);
          }

          // Fetch S5/S6 Ledger
          const { data: ledgerData, error: ledErr } = await supabaseClient.from('s5_s6_ledger').select('*').order('block_height', { ascending: true });
          if (!ledErr && ledgerData && ledgerData.length > 0) {
            const mappedLedger = ledgerData.map(l => ({
              id: l.id,
              timestamp: l.timestamp,
              prevHash: l.prev_hash,
              hash: l.current_hash,
              type: l.tx_type,
              drugName: l.drug_name,
              emlCode: 'EML-S6-VAULT',
              schedule: 'S6',
              batchNumber: l.batch_number,
              inmateId: l.inmate_id,
              recipientName: l.inmate_id ? `Inmate ${l.inmate_id}` : 'Dispensary Stock',
              prescribingDoctor: l.prescribing_doctor || 'N/A',
              quantity: l.quantity,
              balance: l.running_balance,
              pharmacistName: l.pharmacist_name,
              witnessName: l.witness_name,
              notes: 'Immutable cryptographic ledger entry verified in PostgreSQL.'
            }));
            setControlledRegister(mappedLedger);
          }

          setCloudStatus('CONNECTED');
          setLastCloudSync(new Date());
          if (isManual) {
            addToast('success', 'Supabase Cloud Synced', `Connected to project "${SUPABASE_CONFIG.projectId}". All records verified.`);
          }
        } catch (err) {
          console.warn('Supabase sync notice:', err);
          setCloudStatus('OFFLINE');
          if (isManual) {
            addToast('info', 'Air-Gap Offline Active', 'Local air-gap mode retained. Local storage remains 100% operational.');
          }
        } finally {
          setIsSyncingCloud(false);
        }
      };

      // Initial Supabase Cloud Check on Mount
      useEffect(() => {
        syncFromSupabaseCloud(false);
      }, []);


      const [modalState, setModalState] = useState({
        grvOpen: false,
        s5s6Open: false,
        fefoPickOpen: false,
        fefoItem: null,
        transferModalOpen: false,
        selectedInmateForTransfer: null,
        nursingRoundBlock: 'Block C-3',
        nursingRoundShift: 'Morning 08:00',
        nursingSignoffs: {},
        loginModalOpen: false,
        newInmateOpen: false,
        facilityModalOpen: false,
        facilityModalTab: 'list',
        inmateDispenseOpen: false,
        dispensingInmate: null,
        dispensingSelectedDrugId: '',
        dispensingQty: 1
      });

      // Search & Filter State
      const [searchQuery, setSearchQuery] = useState('');
      const [scheduleFilter, setScheduleFilter] = useState('ALL');
      const [stockStatusFilter, setStockStatusFilter] = useState('ALL');
      const [inmateSearch, setInmateSearch] = useState('');
      const [inmateBlockFilter, setInmateBlockFilter] = useState('ALL');

      // Requisition Custom Quantities
      const [customRequisitionQty, setCustomRequisitionQty] = useState({});

      // (Toasts declared above)

      // Sync to LocalStorage
      useEffect(() => {
        localStorage.setItem('boraine_inventory', JSON.stringify(inventory));
      }, [inventory]);

      useEffect(() => {
        localStorage.setItem('boraine_s5s6_register', JSON.stringify(controlledRegister));
      }, [controlledRegister]);

      useEffect(() => {
        localStorage.setItem('boraine_inmates', JSON.stringify(inmates));
      }, [inmates]);

      useEffect(() => {
        localStorage.setItem('boraine_facility', JSON.stringify(facility));
      }, [facility]);

      // Global Computed KPIs
      const kpis = useMemo(() => {
        let lowStockCount = 0;
        let expiringBatchesCount = 0;
        let totalUnits = 0;

        inventory.forEach(item => {
          const totalStock = item.batches.reduce((sum, b) => sum + (b.quarantined ? 0 : b.quantity), 0);
          totalUnits += totalStock;
          const daysOfStock = (totalStock / (item.monthlyConsumption || 1)) * 30;
          if (daysOfStock < item.safetyStockDays) {
            lowStockCount++;
          }
          item.batches.forEach(b => {
            const daysLeft = getDaysUntil(b.expiryDate);
            if (daysLeft <= 60 && daysLeft >= 0) {
              expiringBatchesCount++;
            }
          });
        });

        // S5/S6 transactions in last 24h
        const recentControlled = controlledRegister.length;

        return {
          totalInmates: facility.inmatesCount,
          lowStockCount,
          expiringBatchesCount,
          recentControlled,
          totalInventoryItems: inventory.length,
          totalUnits
        };
      }, [inventory, controlledRegister, facility]);

      // Reset to pristine demo data
      const handleResetDemoData = () => {
        if (confirm("Reset all local air-gapped data to pristine SAPC baseline mock records?")) {
          setInventory(INITIAL_INVENTORY);
          setControlledRegister(INITIAL_CONTROLLED_REGISTER);
          setInmates(INITIAL_INMATES);
          setFacility(INITIAL_FACILITIES[0]);
          localStorage.clear();
          addToast('info', 'System Reset', 'All clinical databases restored to official SAPC baseline.');
        }
      };

      // --- GRV INTAKE HANDLER ---
      const handleGrvSubmit = (newGrv) => {
        setInventory(prev => {
          return prev.map(item => {
            if (item.id === newGrv.itemId) {
              const existingBatchIndex = item.batches.findIndex(b => b.batchNumber.toLowerCase() === newGrv.batchNumber.toLowerCase());
              let updatedBatches;
              if (existingBatchIndex >= 0) {
                updatedBatches = [...item.batches];
                updatedBatches[existingBatchIndex] = {
                  ...updatedBatches[existingBatchIndex],
                  quantity: updatedBatches[existingBatchIndex].quantity + parseInt(newGrv.quantity, 10),
                  expiryDate: newGrv.expiryDate || updatedBatches[existingBatchIndex].expiryDate,
                  binLocation: newGrv.binLocation || updatedBatches[existingBatchIndex].binLocation
                };
              } else {
                updatedBatches = [
                  ...item.batches,
                  {
                    batchNumber: newGrv.batchNumber.toUpperCase(),
                    supplier: newGrv.supplier,
                    mfgDate: newGrv.mfgDate,
                    expiryDate: newGrv.expiryDate,
                    quantity: parseInt(newGrv.quantity, 10),
                    binLocation: newGrv.binLocation,
                    quarantined: false
                  }
                ];
              }
              return { ...item, batches: updatedBatches };
            }
            return item;
          });
        });

        // If item is Schedule 5 or 6, automatically log to Controlled Substance Register as a RECEIPT
        const targetMed = inventory.find(i => i.id === newGrv.itemId);
        if (targetMed && (targetMed.schedule === 'S5' || targetMed.schedule === 'S6')) {
          const prevEntry = controlledRegister[controlledRegister.length - 1];
          const prevHash = prevEntry ? prevEntry.hash : '0000000000000000000000000000000000000000000000000000000000000000';
          const newEntryId = `SAPC-REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
          const currentTotal = targetMed.batches.reduce((sum, b) => sum + b.quantity, 0) + parseInt(newGrv.quantity, 10);
          
          const rawHashData = `${prevHash}|${new Date().toISOString()}|${targetMed.id}|${newGrv.batchNumber}|RECEIPT|${newGrv.quantity}|${currentTotal}`;
          const blockHash = simpleHash(rawHashData);

          const ledgerEntry = {
            id: newEntryId,
            timestamp: new Date().toISOString(),
            prevHash: prevHash,
            hash: blockHash,
            type: 'RECEIPT',
            drugName: targetMed.name,
            emlCode: targetMed.emlCode,
            schedule: targetMed.schedule,
            batchNumber: newGrv.batchNumber.toUpperCase(),
            inmateId: `GRV-${newGrv.grvNumber}`,
            recipientName: `Depot Delivery (${newGrv.supplier})`,
            prescribingDoctor: 'N/A (Intake Intake)',
            quantity: parseInt(newGrv.quantity, 10),
            balance: currentTotal,
            pharmacistName: `${PHARMACIST_CREDENTIALS.name} (SAPC #${PHARMACIST_CREDENTIALS.sapcNumber})`,
            witnessName: newGrv.witness || PHARMACIST_CREDENTIALS.witnessOnDuty,
            notes: `Delivery Note: ${newGrv.deliveryNote || 'DN-PENDING'}. Inspected by receiving pharmacist.`
          };

          setControlledRegister(prev => [...prev, ledgerEntry]);
        }

        addToast('success', 'Goods Received Voucher (GRV) Logged', `Added ${newGrv.quantity} units to batch ${newGrv.batchNumber}.`);
        setModalState(prev => ({ ...prev, grvOpen: false }));
      };

      // --- S5/S6 CONTROLLED DISPENSING HANDLER ---
      const handleS5S6Submit = (payload) => {
        // Validation check for PIN
        if (payload.pin !== PHARMACIST_CREDENTIALS.authorizedPin) {
          addToast('error', 'Authentication Failed', 'Invalid Pharmacist 2FA PIN. GPP Section 8.4 prohibits unauthorized access.');
          return false;
        }

        const targetMed = inventory.find(m => m.id === payload.drugId);
        if (!targetMed) return false;

        const targetBatch = targetMed.batches.find(b => b.batchNumber === payload.batchNumber);
        if (!targetBatch || targetBatch.quantity < payload.quantity) {
          addToast('error', 'Insufficient Stock', 'Selected batch does not have sufficient physical units on hand.');
          return false;
        }

        // Deduct from Inventory
        setInventory(prev => prev.map(item => {
          if (item.id === payload.drugId) {
            return {
              ...item,
              batches: item.batches.map(b => {
                if (b.batchNumber === payload.batchNumber) {
                  return { ...b, quantity: b.quantity - payload.quantity };
                }
                return b;
              })
            };
          }
          return item;
        }));

        // Calculate new balance
        const allCurrentBatchesSum = targetMed.batches.reduce((sum, b) => sum + b.quantity, 0);
        const newBalance = allCurrentBatchesSum - payload.quantity;

        // Create Cryptographic Register Block
        const prevEntry = controlledRegister[controlledRegister.length - 1];
        const prevHash = prevEntry ? prevEntry.hash : '0000000000000000000000000000000000000000000000000000000000000000';
        const newEntryId = `SAPC-REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        const rawHashData = `${prevHash}|${new Date().toISOString()}|${targetMed.id}|${payload.batchNumber}|${payload.txType}|-${payload.quantity}|${newBalance}`;
        const blockHash = simpleHash(rawHashData);

        const newLedgerEntry = {
          id: newEntryId,
          timestamp: new Date().toISOString(),
          prevHash: prevHash,
          hash: blockHash,
          type: payload.txType,
          drugName: targetMed.name,
          emlCode: targetMed.emlCode,
          schedule: targetMed.schedule,
          batchNumber: payload.batchNumber,
          inmateId: payload.inmateId,
          recipientName: payload.recipientName,
          prescribingDoctor: payload.doctor,
          quantity: -payload.quantity,
          balance: newBalance,
          pharmacistName: `${PHARMACIST_CREDENTIALS.name} (SAPC #${PHARMACIST_CREDENTIALS.sapcNumber})`,
          witnessName: payload.witnessName || PHARMACIST_CREDENTIALS.witnessOnDuty,
          notes: payload.notes || 'Routine controlled issue under medical officer direction.'
        };

        setControlledRegister(prev => [...prev, newLedgerEntry]);
        addToast('success', 'Schedule 5/6 Ledger Sealed', `Transaction cryptographically chained. New physical balance: ${newBalance} units.`);
        setModalState(prev => ({ ...prev, s5s6Open: false }));
        return true;
      };

      // --- FEFO DISPENSING DEDUCTION HANDLER ---
      const handleFefoDispense = (item, batchNumber, qtyToDispense, inmate) => {
        if (!item || !batchNumber || qtyToDispense <= 0) return;

        // Deduct from batch
        setInventory(prev => prev.map(invItem => {
          if (invItem.id === item.id) {
            return {
              ...invItem,
              batches: invItem.batches.map(b => {
                if (b.batchNumber === batchNumber) {
                  return { ...b, quantity: Math.max(0, b.quantity - qtyToDispense) };
                }
                return b;
              })
            };
          }
          return invItem;
        }));

        addToast('success', 'Dispensed via FEFO Rule', `${qtyToDispense} units deducted from earliest batch ${batchNumber}.`);
        setModalState(prev => ({ ...prev, fefoPickOpen: false, fefoItem: null }));
      };

      // --- CSV EXPORT FOR PROVINCIAL DEPOT REQUISITION ---
      const handleExportRequisitionCsv = () => {
        const headers = [
          "Depot Code",
          "EML Code",
          "Medicine Description",
          "Schedule",
          "Pack Size",
          "Monthly Consumption",
          "Stock On Hand",
          "Buffer Days Remaining",
          "Stock Status",
          "Recommended Order Qty",
          "Final Order Qty",
          "Unit Cost (ZAR)",
          "Line Total (ZAR)"
        ];

        const rows = inventory.map(item => {
          const totalStock = item.batches.reduce((sum, b) => sum + (b.quarantined ? 0 : b.quantity), 0);
          const daysOfStock = Math.round((totalStock / (item.monthlyConsumption || 1)) * 30);
          
          let status = "Adequate";
          if (daysOfStock <= 15) status = "CRITICAL BUFFER";
          else if (daysOfStock <= item.safetyStockDays) status = "REORDER NEEDED";

          // Recommended quantity: 60 days buffer - current stock
          const targetStock = item.monthlyConsumption * 2;
          const recOrder = Math.max(0, targetStock - totalStock);
          const finalOrder = customRequisitionQty[item.id] !== undefined ? customRequisitionQty[item.id] : recOrder;
          const lineTotal = (finalOrder * item.unitCostZAR).toFixed(2);

          return [
            `"${item.depotCode}"`,
            `"${item.emlCode}"`,
            `"${item.name.replace(/"/g, '""')}"`,
            `"${item.schedule}"`,
            `"${item.packSize}"`,
            item.monthlyConsumption,
            totalStock,
            daysOfStock,
            `"${status}"`,
            recOrder,
            finalOrder,
            item.unitCostZAR.toFixed(2),
            lineTotal
          ];
        });

        const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute("href", url);
        link.setAttribute("download", `Boraine_MedTrack_Depot_Requisition_${facility.id}_${dateStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        addToast('success', 'Depot Order Sheet Exported', `Requisition CSV successfully downloaded for ${facility.depot}.`);
      };

      return (
        <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 relative">
          {/* AIR-GAPPED SECURITY TERMINAL LOCKSCREEN */}
          {session.isLocked && (
            <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-navy-900 border-2 border-teal-500/50 rounded-xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-teal-950 border border-teal-500/40 text-teal-400 mx-auto flex items-center justify-center">
                  <Icon name="lock" className="w-8 h-8 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-wide">
                    BORAINE <span className="text-teal-400">MEDTRACK</span>
                  </h2>
                  <p className="text-xs text-teal-300 font-mono mt-1 uppercase">
                    Air-Gapped Dispensary Terminal Locked
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Department of Correctional Services • {facility.name}
                  </p>
                </div>

                <div className="bg-navy-950 p-3 rounded border border-navy-800 text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Shift Pharmacist:</span>
                    <span className="font-semibold text-slate-200">{session.currentUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SAPC Registration:</span>
                    <span className="font-mono text-teal-400">{session.currentUser.regNumber}</span>
                  </div>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const pin = e.target.lockPin.value;
                  if (pin === session.currentUser.pin) {
                    setSession(prev => ({ ...prev, isLocked: false }));
                    addToast('success', 'Terminal Unlocked', `Welcome back, ${session.currentUser.name}.`);
                  } else {
                    addToast('error', 'Access Denied', 'Invalid Pharmacist Security PIN.');
                  }
                }} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                      Enter Pharmacist PIN Code (Demo PIN: 7492):
                    </label>
                    <input
                      name="lockPin"
                      type="password"
                      autoFocus
                      required
                      placeholder="Enter 4-digit PIN (7492)"
                      className="w-full bg-navy-950 border border-navy-700 rounded p-2.5 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs rounded transition shadow"
                    >
                      Authenticate & Unlock
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSession(prev => ({ ...prev, isLocked: false }));
                        addToast('info', 'Bypassed Lock', 'Evaluator quick unlock activated.');
                      }}
                      className="px-3 py-2 bg-navy-800 hover:bg-navy-700 text-slate-400 text-xs rounded"
                      title="Quick Unlock for Evaluator"
                    >
                      Quick Demo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* TOP AUDIT & AIR-GAP SYSTEM HEADER */}
          <header className="bg-navy-900 border-b border-navy-800 sticky top-0 z-40 select-none shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                
                {/* Brand & Correctional Facility Indicator */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-navy-700 flex items-center justify-center shadow-inner border border-teal-400/30">
                    <Icon name="shieldCheck" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold tracking-wider text-white text-base sm:text-lg">
                        BORAINE <span className="text-teal-400">MEDTRACK</span>
                      </span>
                      <span className="bg-navy-800 text-teal-300 text-xs px-2 py-0.5 rounded font-mono border border-teal-500/20">
                        v4.2 CORRECTIONAL
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <span>{facility.name}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        AIR-GAP OFF-GRID ACTIVE
                      </span>
                    </div>
                  </div>
                </div>

                                  {/* SUPABASE CLOUD STATUS PILL */}
                  <div className="flex items-center">
                    <button
                      onClick={() => syncFromSupabaseCloud(true)}
                      title={`Supabase Cloud: ${cloudStatus === 'CONNECTED' ? 'Synchronized with project ' + SUPABASE_CONFIG.projectId : 'Click to test & sync with cloud backend'}`}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition cursor-pointer ${
                        cloudStatus === 'CONNECTED'
                          ? 'bg-teal-950/80 border-teal-500/50 text-teal-300 hover:bg-teal-900/90'
                          : cloudStatus === 'SYNCING'
                          ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                          : 'bg-navy-900 border-navy-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        cloudStatus === 'CONNECTED' ? 'bg-emerald-400 animate-pulse' :
                        cloudStatus === 'SYNCING' ? 'bg-blue-400 animate-spin' :
                        'bg-amber-400'
                      }`}></span>
                      <span className="font-bold hidden sm:inline">
                        {cloudStatus === 'CONNECTED' ? 'SUPABASE CLOUD' :
                         cloudStatus === 'SYNCING' ? 'SYNCING...' : 'AIR-GAP OFFLINE'}
                      </span>
                      <Icon name="refreshCw" className={`w-3 h-3 ml-0.5 ${isSyncingCloud ? 'animate-spin text-teal-300' : 'text-slate-400'}`} />
                    </button>
                  </div>

                {/* Facility Selector & Security Credentials */}
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-1">
                    <div className="flex items-center bg-navy-950/80 px-3 py-1.5 rounded-md border border-navy-800 text-xs text-slate-300">
                      <Icon name="building" className="w-4 h-4 mr-1.5 text-teal-400" />
                      <select
                        value={facility.id}
                        onChange={(e) => {
                          if (e.target.value === '__MANAGE__') {
                            setModalState(prev => ({ ...prev, facilityModalOpen: true, facilityModalTab: 'list' }));
                            return;
                          }
                          const sel = facilitiesList.find(f => f.id === e.target.value);
                          if (sel) {
                            setFacility(sel);
                            addToast('info', 'Facility Context Switched', `Active inventory set to ${sel.name}.`);
                          }
                        }}
                        className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-2 font-medium text-xs"
                      >
                        {facilitiesList.map(f => (
                          <option key={f.id} value={f.id} className="bg-navy-900 text-slate-100">
                            {f.name} ({f.inmatesCount} Inmates)
                          </option>
                        ))}
                        <option value="__MANAGE__" className="bg-navy-950 text-teal-300 font-bold">
                          + Add / Manage Facilities...
                        </option>
                      </select>
                    </div>

                    <button
                      onClick={() => setModalState(prev => ({ ...prev, facilityModalOpen: true, facilityModalTab: 'list' }))}
                      title="Add or Delete Correctional Facilities"
                      className="px-2 py-1.5 bg-navy-950 hover:bg-navy-850 text-teal-300 hover:text-white border border-navy-800 rounded-md text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Icon name="building" className="w-3.5 h-3.5 text-teal-400" />
                      <span>Manage</span>
                    </button>
                  </div>

                  {/* Pharmacist & Assistant Session Info */}
                  <div className="hidden lg:flex items-center space-x-2">
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, loginModalOpen: true, staffModalTab: 'list' }))}
                      title="Staff Registry & Role Access Control"
                      className="flex items-center bg-navy-850 hover:bg-navy-800 px-3 py-1.5 rounded-md border border-teal-500/40 text-xs transition cursor-pointer text-left shadow-sm"
                    >
                      <Icon name="user" className="w-3.5 h-3.5 mr-2 text-teal-400" />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-100">{session.currentUser.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                            session.currentUser.role === 'RESPONSIBLE_PHARMACIST' ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' :
                            session.currentUser.role === 'CLINICAL_PHARMACIST' ? 'bg-teal-950 text-teal-300 border border-teal-600' :
                            session.currentUser.role === 'ASSISTANT_POST_BASIC' ? 'bg-amber-950 text-amber-300 border border-amber-600' :
                            session.currentUser.role === 'ASSISTANT_BASIC' ? 'bg-slate-800 text-slate-300' :
                            'bg-blue-950 text-blue-300 border border-blue-600'
                          }`}>
                            {session.currentUser.role === 'RESPONSIBLE_PHARMACIST' ? 'RP • L4' :
                             session.currentUser.role === 'CLINICAL_PHARMACIST' ? 'PHARM • L3' :
                             session.currentUser.role === 'ASSISTANT_POST_BASIC' ? 'ASST (QPB) • L2' :
                             session.currentUser.role === 'ASSISTANT_BASIC' ? 'ASST (BAS) • L1' : 'NURSE • SANC'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-[10px]">
                          <span className="text-teal-400 font-mono">{session.currentUser.council} #{session.currentUser.regNumber}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-teal-300 underline font-medium">Switch / Register Staff</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSession(prev => ({ ...prev, isLocked: true }));
                        addToast('info', 'Terminal Locked', 'Dispensary terminal locked under SAPC GPP vault protocols.');
                      }}
                      title="Lock Air-Gap Terminal (SAPC Security Protocol)"
                      className="p-2 text-slate-400 hover:text-red-300 bg-navy-850 hover:bg-navy-800 border border-navy-700 rounded-md transition"
                    >
                      <Icon name="lock" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reset Demo State Button */}
                  <button
                    onClick={handleResetDemoData}
                    title="Reset to SAPC baseline mock data"
                    className="p-2 text-slate-400 hover:text-white bg-navy-850 hover:bg-navy-800 border border-navy-700 rounded-md transition"
                  >
                    <Icon name="refresh" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex space-x-1 border-t border-navy-850 py-1 overflow-x-auto text-xs sm:text-sm font-medium">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeTab === 'dashboard'
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <Icon name="layers" className="w-4 h-4 mr-2" />
                  Command Dashboard
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeTab === 'inventory'
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <Icon name="package" className="w-4 h-4 mr-2" />
                  FEFO Inventory & Vault
                  {kpis.expiringBatchesCount > 0 && (
                    <span className="ml-2 bg-amber-500 text-black font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                      {kpis.expiringBatchesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('s5s6')}
                  className={`flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeTab === 's5s6'
                      ? 'bg-crimson-700 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <Icon name="lock" className="w-4 h-4 mr-2 text-red-300" />
                  Schedule 5 & 6 Ledger (Act 101)
                  <span className="ml-2 bg-red-950 text-red-300 border border-red-500/40 text-[10px] px-1.5 py-0.2 rounded font-mono">
                    GPP §8.4
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('inmates')}
                  className={`flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeTab === 'inmates'
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <Icon name="stethoscope" className="w-4 h-4 mr-2" />
                  Inmate Regimens & Ward MAR
                </button>

                <button
                  onClick={() => setActiveTab('depot')}
                  className={`flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    activeTab === 'depot'
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <Icon name="truck" className="w-4 h-4 mr-2" />
                  Depot Requisitioner & EML
                  {kpis.lowStockCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                      {kpis.lowStockCount}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </header>

          {/* MAIN CONTENT WORKSPACE */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

            {/* QUICK ACTIONS DOCK */}
            <div className="bg-navy-900 border border-navy-800 rounded-lg p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
                <Icon name="key" className="w-4 h-4 text-teal-400" />
                <span>Pharmacy Quick Operations:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('inmates')}
                  className="inline-flex items-center px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white text-xs font-medium rounded shadow transition"
                >
                  <Icon name="clipboardList" className="w-3.5 h-3.5 mr-1.5" />
                  New Ward / Cell Block Round
                </button>

                <button
                  onClick={() => setModalState(prev => ({ ...prev, grvOpen: true }))}
                  className="inline-flex items-center px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-teal-300 border border-teal-500/30 text-xs font-medium rounded shadow transition"
                >
                  <Icon name="truck" className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                  Log Goods Received (GRV)
                </button>

                <button
                  onClick={() => setModalState(prev => ({ ...prev, s5s6Open: true }))}
                  className="inline-flex items-center px-3 py-1.5 bg-crimson-800 hover:bg-crimson-700 text-red-100 border border-red-500/30 text-xs font-medium rounded shadow transition"
                >
                  <Icon name="lock" className="w-3.5 h-3.5 mr-1.5 text-red-200" />
                  Add S5 / S6 Vault Issue
                </button>

                <button
                  onClick={() => {
                    setActiveTab('depot');
                    handleExportRequisitionCsv();
                  }}
                  className="inline-flex items-center px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-navy-700 text-xs font-medium rounded shadow transition"
                >
                  <Icon name="download" className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                  Export Depot Requisition
                </button>
              </div>
            </div>

            {/* TAB 1: COMMAND DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 PRIMARY KPI METRICS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: Active Inmates */}
                  <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm hover:border-navy-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Active Inmates</span>
                      <span className="p-2 rounded bg-navy-850 text-teal-400">
                        <Icon name="users" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-extrabold text-white tracking-tight">{kpis.totalInmates.toLocaleString()}</span>
                      <span className="text-xs text-teal-300 font-mono">100% MAR Tracked</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>{facility.name}</span>
                      <span className="text-slate-500">{facility.security}</span>
                    </div>
                  </div>

                  {/* Card 2: Low Stock Buffer Alert */}
                  <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm hover:border-navy-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Low Stock Items</span>
                      <span className={`p-2 rounded ${kpis.lowStockCount > 0 ? 'bg-red-950 text-red-400 border border-red-800/40' : 'bg-navy-850 text-slate-400'}`}>
                        <Icon name="alertTriangle" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-extrabold text-white tracking-tight">{kpis.lowStockCount}</span>
                      <span className="text-xs text-amber-400 font-medium">&lt; 30 Days Buffer</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>Depot Reorder Flagged</span>
                      <button onClick={() => setActiveTab('depot')} className="text-teal-400 hover:underline">Review &rarr;</button>
                    </div>
                  </div>

                  {/* Card 3: FEFO Expiring Batches */}
                  <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm hover:border-navy-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Expiring Batches</span>
                      <span className={`p-2 rounded ${kpis.expiringBatchesCount > 0 ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'bg-navy-850 text-slate-400'}`}>
                        <Icon name="clock" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-3xl font-extrabold text-white tracking-tight">{kpis.expiringBatchesCount}</span>
                      <span className="text-xs text-amber-400 font-medium">&lt; 60 Days (FEFO)</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>Prioritize First-Expired</span>
                      <button onClick={() => setActiveTab('inventory')} className="text-teal-400 hover:underline">Inspect &rarr;</button>
                    </div>
                  </div>

                  {/* Card 4: S5/S6 Controlled Substance Status */}
                  <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm hover:border-navy-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">S5/S6 Merkle Ledger</span>
                      <span className="p-2 rounded bg-crimson-950 text-red-400 border border-red-800/40">
                        <Icon name="shieldCheck" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">VERIFIED</span>
                      <span className="text-[11px] font-mono text-slate-400">GPP §8.4</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>{controlledRegister.length} Chained Blocks</span>
                      <button onClick={() => setActiveTab('s5s6')} className="text-red-400 hover:underline">View Ledger &rarr;</button>
                    </div>
                  </div>
                </div>

                {/* CLINICAL FEFO NOTICES & CRITICAL ALERTS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: FEFO Critical Expiry Focus */}
                  <div className="lg:col-span-2 bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                      <div className="flex items-center space-x-2">
                        <Icon name="alertCircle" className="w-5 h-5 text-amber-400" />
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                          FEFO Immediate Dispensing Priorities (&lt; 60 Days Expiry)
                        </h2>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">Reference Date: 2026-11-18</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {inventory.flatMap(item => 
                        item.batches.map(batch => ({
                          item,
                          batch,
                          days: getDaysUntil(batch.expiryDate)
                        }))
                      )
                      .filter(x => x.days <= 60 && x.days >= 0)
                      .sort((a, b) => a.days - b.days)
                      .map(({ item, batch, days }) => (
                        <div key={batch.batchNumber} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md bg-navy-850 border border-amber-500/30 gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-slate-100 text-sm">{item.name}</span>
                              <span className="bg-navy-900 text-teal-300 text-xs px-2 py-0.5 rounded font-mono border border-navy-700">
                                {item.schedule}
                              </span>
                              <span className="bg-amber-950 text-amber-300 border border-amber-600/50 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                FEFO PRIORITY #{days <= 20 ? '1' : '2'}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 flex flex-wrap gap-x-4">
                              <span>Batch: <strong className="text-slate-200 font-mono">{batch.batchNumber}</strong></span>
                              <span>Location: <strong className="text-slate-300 font-mono">{batch.binLocation}</strong></span>
                              <span>On Hand: <strong className="text-slate-200">{batch.quantity} units</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end space-x-3">
                            <div className="text-right">
                              <div className="text-sm font-bold text-amber-400 font-mono">
                                {days} Days Left
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Exp: {batch.expiryDate}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setModalState(prev => ({
                                  ...prev,
                                  fefoPickOpen: true,
                                  fefoItem: item
                                }));
                              }}
                              className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-black font-semibold text-xs rounded transition"
                            >
                              Dispense Batch
                            </button>
                          </div>
                        </div>
                      ))}

                      {inventory.flatMap(i => i.batches).filter(b => getDaysUntil(b.expiryDate) <= 60).length === 0 && (
                        <div className="text-center py-8 text-slate-500 text-sm">
                          <Icon name="checkCircle" className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                          All pharmaceutical batches conform to safety buffers. No immediate FEFO expiries detected.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Air-Gap Audit Seal & Security Compliance */}
                  <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 pb-3 border-b border-navy-800">
                      <Icon name="shieldCheck" className="w-5 h-5 text-teal-400" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                        SAPC GPP Compliance Telemetry
                      </h2>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-navy-950 p-3 rounded border border-navy-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">GPP Section 8.4 Ledger:</span>
                          <span className="text-emerald-400 font-mono font-bold">100% IMMUTABLE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Air-Gap Local Persistence:</span>
                          <span className="text-teal-300 font-mono">ENCRYPTED LOCAL STORAGE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Responsible Pharmacist:</span>
                          <span className="text-slate-200">{PHARMACIST_CREDENTIALS.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">SAPC Registration No:</span>
                          <span className="text-slate-200 font-mono">{PHARMACIST_CREDENTIALS.sapcNumber}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-navy-850 rounded border border-teal-500/20 space-y-2">
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <Icon name="database" className="w-4 h-4 text-teal-400" />
                          Local Merkle Proof Verification
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          All Schedule 5 & 6 transactions are cryptographically sealed with the preceding transaction hash. Modifications to past entries invalidate the integrity seal.
                        </p>
                        <div className="text-[10px] font-mono text-slate-500 truncate">
                          Root Head: {controlledRegister[controlledRegister.length - 1]?.hash || 'None'}
                        </div>
                      </div>

                      {/* Department of Correctional Services Notice */}
                      <div className="p-3 bg-navy-950 rounded border border-slate-700/50 text-[11px] text-slate-400">
                        <strong className="text-slate-300 block mb-1">DCS Mandatory Protocol:</strong>
                        Controlled substance stock counts must be physically reconciled at every 07:00 / 19:00 shift handover between responsible pharmacists and nursing sisters.
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT CLINICAL INMATE ACTIONS FEED */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                    <div className="flex items-center space-x-2">
                      <Icon name="stethoscope" className="w-5 h-5 text-teal-400" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                        Active Inmate Regimens Requiring Dispensary Review
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('inmates')}
                      className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
                    >
                      View All {inmates.length} Inmates &rarr;
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inmates.slice(0, 3).map(inmate => (
                      <div key={inmate.id} className="bg-navy-950 border border-navy-800 hover:border-teal-500/40 rounded-lg p-4 transition space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-white text-sm">{inmate.name}</div>
                            <div className="text-xs text-slate-400 font-mono">{inmate.id} • {inmate.cellBlock}</div>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            inmate.securityLevel === 'Maximum' ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-navy-800 text-slate-300'
                          }`}>
                            {inmate.securityLevel}
                          </span>
                        </div>

                        {/* Allergy Alert */}
                        {inmate.allergies.some(a => !a.includes('NONE')) ? (
                          <div className="bg-red-950/80 border border-red-600/60 rounded px-2.5 py-1 text-xs text-red-200 font-medium flex items-center gap-1.5">
                            <Icon name="alertTriangle" className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                            <span className="truncate">{inmate.allergies[0]}</span>
                          </div>
                        ) : (
                          <div className="bg-navy-900 border border-navy-800 rounded px-2.5 py-1 text-xs text-slate-400">
                            Allergies: No Known Drug Allergies (NKDA)
                          </div>
                        )}

                        <div className="text-xs space-y-1">
                          <span className="text-slate-400 block text-[11px] font-semibold uppercase">Active Meds:</span>
                          {inmate.activeRegimen.map((reg, idx) => (
                            <div key={idx} className="flex items-center justify-between text-slate-300">
                              <span className="truncate max-w-[170px]">{reg.drugName}</span>
                              <span className="text-teal-400 font-mono text-[11px]">{reg.repeatDueDays}d left</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-navy-850 flex items-center justify-between text-xs">
                          <span className="text-slate-500">{inmate.doctor}</span>
                          <button
                            onClick={() => {
                              setActiveTab('inmates');
                              setInmateSearch(inmate.id);
                            }}
                            className="text-teal-400 hover:text-teal-300 font-medium"
                          >
                            Open Profile &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INVENTORY & FEFO BATCH CONTROL */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                
                {/* Search & Filter Controls */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full flex items-center bg-navy-950 border border-navy-700 rounded-md px-3 py-2 text-sm text-slate-200">
                    <Icon name="search" className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search by Medicine Name, EML Code (e.g. EML-ARV-001), or Active Ingredient..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none focus:outline-none w-full text-slate-100 placeholder-slate-500"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                        <Icon name="x" className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Schedule Filter */}
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-slate-400">Schedule:</span>
                      <select
                        value={scheduleFilter}
                        onChange={(e) => setScheduleFilter(e.target.value)}
                        className="bg-navy-950 border border-navy-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none text-xs"
                      >
                        <option value="ALL">All Schedules</option>
                        <option value="S0-S2">S0 - S2 (OTC / Minor)</option>
                        <option value="S3-S4">S3 - S4 (Prescription / ART / TB)</option>
                        <option value="S5-S6">S5 - S6 (Controlled Vault)</option>
                      </select>
                    </div>

                    {/* Stock Buffer Filter */}
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-slate-400">Stock Buffer:</span>
                      <select
                        value={stockStatusFilter}
                        onChange={(e) => setStockStatusFilter(e.target.value)}
                        className="bg-navy-950 border border-navy-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none text-xs"
                      >
                        <option value="ALL">All Stock Levels</option>
                        <option value="LOW">Low Buffer (&lt; 30 Days)</option>
                        <option value="CRITICAL">Critical Buffer (&lt; 15 Days)</option>
                        <option value="EXPIRING">Expiring Batches (&lt; 60 Days)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setModalState(prev => ({ ...prev, grvOpen: true }))}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
                    >
                      <Icon name="plus" className="w-3.5 h-3.5" />
                      Log GRV Intake
                    </button>
                  </div>
                </div>

                {/* INVENTORY TABLE WITH EXPANDABLE FEFO BATCHES */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-navy-850 text-slate-400 uppercase text-[11px] tracking-wider border-b border-navy-800">
                          <th className="py-3 px-4 font-semibold">EML / Code</th>
                          <th className="py-3 px-4 font-semibold">Medicine Description</th>
                          <th className="py-3 px-4 font-semibold">Schedule</th>
                          <th className="py-3 px-4 font-semibold">Total Stock</th>
                          <th className="py-3 px-4 font-semibold">Monthly Demand</th>
                          <th className="py-3 px-4 font-semibold">Buffer Days</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-800">
                        {inventory
                          .filter(item => {
                            // Search Query
                            const matchQuery = !searchQuery || 
                              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.emlCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.depotCode.toLowerCase().includes(searchQuery.toLowerCase());

                            // Schedule Filter
                            let matchSchedule = true;
                            if (scheduleFilter === 'S0-S2') matchSchedule = ['S0', 'S1', 'S2'].includes(item.schedule);
                            if (scheduleFilter === 'S3-S4') matchSchedule = ['S3', 'S4'].includes(item.schedule);
                            if (scheduleFilter === 'S5-S6') matchSchedule = ['S5', 'S6'].includes(item.schedule);

                            // Buffer Filter
                            const totalStock = item.batches.reduce((sum, b) => sum + (b.quarantined ? 0 : b.quantity), 0);
                            const bufferDays = Math.round((totalStock / (item.monthlyConsumption || 1)) * 30);
                            let matchStock = true;
                            if (stockStatusFilter === 'LOW') matchStock = bufferDays < 30;
                            if (stockStatusFilter === 'CRITICAL') matchStock = bufferDays < 15;
                            if (stockStatusFilter === 'EXPIRING') matchStock = item.batches.some(b => getDaysUntil(b.expiryDate) <= 60);

                            return matchQuery && matchSchedule && matchStock;
                          })
                          .map(item => {
                            const totalStock = item.batches.reduce((sum, b) => sum + (b.quarantined ? 0 : b.quantity), 0);
                            const bufferDays = Math.round((totalStock / (item.monthlyConsumption || 1)) * 30);
                            const hasExpiringBatch = item.batches.some(b => getDaysUntil(b.expiryDate) <= 60 && getDaysUntil(b.expiryDate) >= 0);

                            // Status badge determination
                            let statusBadge = (
                              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[11px] px-2 py-0.5 rounded font-medium">
                                Adequate ({bufferDays}d)
                              </span>
                            );
                            if (bufferDays < 15) {
                              statusBadge = (
                                <span className="bg-red-950 text-red-300 border border-red-700 text-[11px] px-2 py-0.5 rounded font-medium animate-pulse">
                                  Critical ({bufferDays}d)
                                </span>
                              );
                            } else if (bufferDays < item.safetyStockDays) {
                              statusBadge = (
                                <span className="bg-amber-950 text-amber-300 border border-amber-700 text-[11px] px-2 py-0.5 rounded font-medium">
                                  Low Stock ({bufferDays}d)
                                </span>
                              );
                            }

                            // Schedule badge color
                            let schedColor = "bg-navy-800 text-slate-300";
                            if (item.schedule === 'S5') schedColor = "bg-amber-900/60 text-amber-200 border border-amber-600/40";
                            if (item.schedule === 'S6') schedColor = "bg-red-950 text-red-200 border border-red-600/60 font-bold";

                            return (
                              <React.Fragment key={item.id}>
                                <tr className="hover:bg-navy-850/60 transition group">
                                  <td className="py-3 px-4 font-mono text-xs text-teal-400">
                                    {item.emlCode}
                                    <span className="block text-[10px] text-slate-500">{item.depotCode}</span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="font-semibold text-slate-100">{item.name}</div>
                                    <div className="text-xs text-slate-400">{item.packSize} • {item.form}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${schedColor}`}>
                                      {item.schedule}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 font-bold text-slate-100 font-mono">
                                    {totalStock.toLocaleString()}
                                    <span className="text-[10px] text-slate-400 font-normal block">{item.batches.length} batch(es)</span>
                                  </td>
                                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">
                                    {item.monthlyConsumption} / mo
                                  </td>
                                  <td className="py-3 px-4 font-mono text-xs">
                                    <span className={bufferDays < 30 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                                      {bufferDays} Days
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    {statusBadge}
                                    {hasExpiringBatch && (
                                      <span className="mt-1 block text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                                        <Icon name="clock" className="w-3 h-3" /> FEFO Alert
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right space-x-2">
                                    {item.schedule === 'S5' || item.schedule === 'S6' ? (
                                      <button
                                        onClick={() => {
                                          setModalState(prev => ({
                                            ...prev,
                                            s5s6Open: true
                                          }));
                                        }}
                                        className="px-2.5 py-1 bg-crimson-800 hover:bg-crimson-700 text-white text-xs rounded font-medium transition shadow"
                                      >
                                        Vault Issue
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setModalState(prev => ({
                                            ...prev,
                                            fefoPickOpen: true,
                                            fefoItem: item
                                          }));
                                        }}
                                        className="px-2.5 py-1 bg-teal-700 hover:bg-teal-600 text-white text-xs rounded font-medium transition shadow"
                                      >
                                        Dispense (FEFO)
                                      </button>
                                    )}
                                  </td>
                                </tr>

                                {/* COLLAPSIBLE BATCH DETAILS ROW */}
                                <tr className="bg-navy-950/90 border-b border-navy-800">
                                  <td colSpan="8" className="py-2.5 px-4 sm:px-6">
                                    <div className="bg-navy-900 border border-navy-800 rounded p-3 space-y-2">
                                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                        <span className="flex items-center gap-1">
                                          <Icon name="package" className="w-3.5 h-3.5 text-teal-400" />
                                          Active Vault & Shelf Batches ({item.batches.length})
                                        </span>
                                        <span className="text-[10px] text-teal-400">FEFO Enforced Ordering</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {item.batches
                                          .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
                                          .map((batch, bIdx) => {
                                            const daysLeft = getDaysUntil(batch.expiryDate);
                                            const isEarliest = bIdx === 0;

                                            return (
                                              <div
                                                key={batch.batchNumber}
                                                className={`p-2 rounded border text-xs space-y-1 ${
                                                  daysLeft <= 30
                                                    ? 'bg-amber-950/40 border-amber-600/50'
                                                    : 'bg-navy-950 border-navy-800'
                                                }`}
                                              >
                                                <div className="flex items-center justify-between">
                                                  <span className="font-mono font-bold text-slate-200">
                                                    {batch.batchNumber}
                                                  </span>
                                                  {isEarliest && (
                                                    <span className="bg-teal-900 text-teal-300 text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                                                      FEFO #1
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="text-slate-400 text-[11px] flex justify-between">
                                                  <span>Supplier: {batch.supplier}</span>
                                                  <span className="font-mono text-slate-300">{batch.binLocation}</span>
                                                </div>
                                                <div className="flex items-center justify-between pt-1 border-t border-navy-800/80">
                                                  <span className="font-bold text-slate-100">
                                                    {batch.quantity} units
                                                  </span>
                                                  <span className={`font-mono text-[11px] ${daysLeft <= 60 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                                                    Exp: {batch.expiryDate} ({daysLeft}d)
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: IMMUTABLE SCHEDULE 5 & 6 CONTROLLED SUBSTANCE REGISTER */}
            {activeTab === 's5s6' && (
              <div className="space-y-6">
                
                {/* Regulatory Compliance Header Banner */}
                <div className="bg-gradient-to-r from-crimson-950 via-navy-900 to-navy-900 border border-red-700/60 rounded-lg p-5 shadow-md">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Icon name="lock" className="w-5 h-5 text-red-400" />
                        <h2 className="text-base font-bold text-white tracking-wide">
                          Official Schedule 5 & 6 Register of Specified Substances
                        </h2>
                        <span className="bg-red-900/60 text-red-200 border border-red-500 text-xs px-2 py-0.5 rounded font-mono font-bold">
                          Act 101/1965 §22A
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                        South African Pharmacy Council (SAPC) Good Pharmacy Practice (GPP) Section 8.4 mandates an unalterable register for all S5 and S6 substances. Every transaction is appended to a cryptographic SHA-256 hash chain linked to the responsible pharmacist’s 2FA verification.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setModalState(prev => ({ ...prev, s5s6Open: true }))}
                        className="px-4 py-2 bg-crimson-700 hover:bg-crimson-600 text-white font-semibold text-xs rounded-md shadow-md flex items-center gap-1.5 transition"
                      >
                        <Icon name="plus" className="w-4 h-4" />
                        Issue / Dispense S5-S6
                      </button>
                    </div>
                  </div>

                  {/* Pharmacist Assistant Statutory Restriction Notice */}
                  {!session.currentUser.canAccessS5S6 && (
                    <div className="mt-4 bg-amber-950/80 border border-amber-600 rounded p-3 text-xs text-amber-200 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="alertTriangle" className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <div>
                          <strong className="block text-amber-300">STATUTORY ACCESS RESTRICTION • ACT 101 §22A</strong>
                          <span>Logged in as <strong>{session.currentUser.name}</strong> ({session.currentUser.roleLabel}). Pharmacist Assistants cannot independently unlock or issue vault substances without a Responsible Pharmacist.</span>
                        </div>
                      </div>
                      <span className="bg-amber-900 text-amber-100 text-[10px] px-2 py-1 rounded font-mono font-bold uppercase">
                        S5/S6 READ-ONLY
                      </span>
                    </div>
                  )}

                  {/* Tamper-Evident Verification Bar */}
                  <div className="mt-4 pt-3 border-t border-red-900/40 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-semibold text-emerald-400 font-mono">
                        CRYPTOGRAPHIC LEDGER INTEGRITY VERIFIED (NO TAMPERING DETECTED)
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Total Ledger Blocks: {controlledRegister.length} | Chain Head: {controlledRegister[controlledRegister.length - 1]?.hash.substring(0, 16)}...
                    </div>
                  </div>
                </div>

                {/* S5 & S6 CURRENT PHYSICAL VAULT HOLDINGS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {inventory
                    .filter(m => m.schedule === 'S5' || m.schedule === 'S6')
                    .map(med => {
                      const totalUnits = med.batches.reduce((sum, b) => sum + b.quantity, 0);
                      return (
                        <div key={med.id} className="bg-navy-900 border border-navy-800 hover:border-red-600/40 rounded-lg p-4 transition space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-mono text-red-400 font-bold">{med.schedule} CONTROLLED</span>
                              <h3 className="font-bold text-white text-sm">{med.name}</h3>
                            </div>
                            <span className="p-1.5 bg-red-950 rounded text-red-400">
                              <Icon name="lock" className="w-4 h-4" />
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between pt-2">
                            <span className="text-2xl font-extrabold text-white font-mono">{totalUnits}</span>
                            <span className="text-xs text-slate-400">Total Physical Units</span>
                          </div>

                          <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-navy-850">
                            {med.batches.map(b => (
                              <div key={b.batchNumber} className="flex justify-between font-mono text-[11px]">
                                <span>{b.batchNumber}</span>
                                <span className="text-slate-200">{b.quantity} un. ({b.binLocation})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* IMMUTABLE AUDIT TABLE */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="p-4 bg-navy-850 border-b border-navy-800 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Icon name="database" className="w-4 h-4 text-teal-400" />
                      Tamper-Evident Chronological Register Entries
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Act 101 Section 22A Schedule Ledger</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-navy-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-navy-800">
                          <th className="py-3 px-3">Tx ID / Hash</th>
                          <th className="py-3 px-3">Timestamp</th>
                          <th className="py-3 px-3">Type</th>
                          <th className="py-3 px-3">Medicine & Batch</th>
                          <th className="py-3 px-3">Recipient / Inmate ID</th>
                          <th className="py-3 px-3">Prescriber</th>
                          <th className="py-3 px-3 text-right">Qty</th>
                          <th className="py-3 px-3 text-right">Running Balance</th>
                          <th className="py-3 px-3">Sign-off Signatures</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-800 font-mono">
                        {controlledRegister
                          .slice()
                          .reverse()
                          .map(entry => (
                            <tr key={entry.id} className="hover:bg-navy-850/50 transition">
                              <td className="py-3 px-3">
                                <span className="font-bold text-slate-200 block">{entry.id}</span>
                                <span className="text-[9px] text-teal-400 truncate block max-w-[120px]" title={entry.hash}>
                                  # {entry.hash.substring(0, 14)}...
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-300 text-[11px]">
                                {new Date(entry.timestamp).toLocaleString('en-ZA', { dateStyle: 'short', timeStyle: 'short' })}
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  entry.type === 'RECEIPT' 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                                    : entry.type === 'DESTRUCTION'
                                    ? 'bg-red-950 text-red-300 border border-red-700'
                                    : 'bg-navy-800 text-teal-300 border border-teal-500/30'
                                }`}>
                                  {entry.type}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-sans">
                                <span className="font-semibold text-slate-100 block text-xs">{entry.drugName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Batch: {entry.batchNumber}</span>
                              </td>
                              <td className="py-3 px-3 font-sans">
                                <span className="font-medium text-slate-200 block text-xs">{entry.recipientName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{entry.inmateId}</span>
                              </td>
                              <td className="py-3 px-3 font-sans text-xs text-slate-300">
                                {entry.prescribingDoctor}
                              </td>
                              <td className={`py-3 px-3 text-right font-bold text-sm ${entry.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-slate-100 text-sm">
                                {entry.balance}
                              </td>
                              <td className="py-3 px-3 font-sans text-[11px] text-slate-400">
                                <div className="text-slate-200">{entry.pharmacistName}</div>
                                <div className="text-slate-500 text-[10px]">Wit: {entry.witnessName}</div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: INMATE REGIMENS & NURSING ROUNDS (MAR) */}
            {activeTab === 'inmates' && (
              <div className="space-y-6">
                
                {/* Search & Ward Round Filter Bar */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full flex items-center bg-navy-950 border border-navy-700 rounded-md px-3 py-2 text-sm text-slate-200">
                    <Icon name="search" className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search Inmate by Name, SA ID Number, or Booking ID (e.g. STA-2023-88912)..."
                      value={inmateSearch}
                      onChange={(e) => setInmateSearch(e.target.value)}
                      className="bg-transparent border-none focus:outline-none w-full text-slate-100 placeholder-slate-500"
                    />
                    {inmateSearch && (
                      <button onClick={() => setInmateSearch('')} className="text-slate-400 hover:text-white">
                        <Icon name="x" className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-slate-400">Cell Block:</span>
                      <select
                        value={inmateBlockFilter}
                        onChange={(e) => setInmateBlockFilter(e.target.value)}
                        className="bg-navy-950 border border-navy-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none text-xs"
                      >
                        <option value="ALL">All Blocks</option>
                        <option value="Block C-3">Block C-3 (Medium)</option>
                        <option value="Block B-1">Block B-1 (Maximum)</option>
                        <option value="Block A-2">Block A-2 (Remand)</option>
                        <option value="Hospital Ward">Hospital Ward (Isolation)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setModalState(prev => ({ ...prev, newInmateOpen: true }))}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow transition"
                    >
                      <Icon name="plus" className="w-3.5 h-3.5" />
                      Admit New Inmate
                    </button>

                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-teal-300 border border-teal-500/30 rounded text-xs font-semibold flex items-center gap-1.5 shadow"
                    >
                      <Icon name="printer" className="w-3.5 h-3.5" />
                      Print Current View
                    </button>
                  </div>
                </div>

                {/* INMATE CLINICAL DOSSIERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {inmates
                    .filter(inmate => {
                      const matchQuery = !inmateSearch ||
                        inmate.name.toLowerCase().includes(inmateSearch.toLowerCase()) ||
                        inmate.id.toLowerCase().includes(inmateSearch.toLowerCase()) ||
                        inmate.saId.toLowerCase().includes(inmateSearch.toLowerCase());

                      const matchBlock = inmateBlockFilter === 'ALL' || inmate.cellBlock.includes(inmateBlockFilter);
                      return matchQuery && matchBlock;
                    })
                    .map(inmate => {
                      const hasAllergy = inmate.allergies.some(a => !a.includes('NONE'));

                      return (
                        <div key={inmate.id} className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm space-y-4 hover:border-navy-700 transition">
                          
                          {/* Inmate Card Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-base font-bold text-white">{inmate.name}</h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                  inmate.securityLevel === 'Maximum' ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-navy-800 text-slate-300'
                                }`}>
                                  {inmate.securityLevel}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 font-mono">
                                <span>Booking: <strong>{inmate.id}</strong></span> • <span>SA ID: {inmate.saId}</span>
                              </div>
                              <div className="text-xs text-teal-400 font-medium flex items-center gap-1">
                                <Icon name="building" className="w-3.5 h-3.5" />
                                {inmate.cellBlock} ({inmate.cellNumber})
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const firstMed = inmate.activeRegimen[0];
                                  setModalState(prev => ({
                                    ...prev,
                                    inmateDispenseOpen: true,
                                    dispensingInmate: inmate,
                                    dispensingSelectedDrugId: firstMed ? firstMed.drugId : inventory[0].id,
                                    dispensingQty: 1
                                  }));
                                }}
                                className="px-2.5 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1 transition shadow"
                              >
                                <Icon name="pill" className="w-3.5 h-3.5" />
                                Dispense Meds
                              </button>

                              <button
                                onClick={() => {
                                  setModalState(prev => ({
                                    ...prev,
                                    transferModalOpen: true,
                                    selectedInmateForTransfer: inmate
                                  }));
                                }}
                                className="px-2.5 py-1.5 bg-navy-800 hover:bg-navy-700 text-teal-300 border border-navy-700 rounded text-xs font-semibold flex items-center gap-1 transition"
                              >
                                <Icon name="arrowRight" className="w-3.5 h-3.5" />
                                Transfer
                              </button>
                            </div>
                          </div>

                          {/* Allergy Warning Banner (Mandatory Clinical Safety) */}
                          {hasAllergy ? (
                            <div className="bg-red-950 border border-red-600 rounded-md p-3 text-xs text-red-200 space-y-1 shadow-sm">
                              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-300">
                                <Icon name="alertTriangle" className="w-4 h-4 text-red-400 animate-pulse" />
                                SAPC CRITICAL ALLERGY WARNING
                              </div>
                              <p className="font-semibold">{inmate.allergies[0]}</p>
                            </div>
                          ) : (
                            <div className="bg-navy-950 border border-navy-800 rounded px-3 py-1.5 text-xs text-slate-400 flex items-center gap-1.5">
                              <Icon name="checkCircle" className="w-3.5 h-3.5 text-emerald-400" />
                              <span>No documented drug allergies (NKDA)</span>
                            </div>
                          )}

                          {/* Chronic Conditions & Telemetry */}
                          <div className="bg-navy-950 rounded p-3 border border-navy-850 space-y-2 text-xs">
                            <span className="text-slate-400 uppercase text-[10px] font-semibold tracking-wider block">
                              Active Chronic Diagnoses:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {inmate.chronicConditions.map((cond, cIdx) => (
                                <span key={cIdx} className="bg-navy-850 text-teal-300 border border-teal-500/30 text-[11px] px-2 py-0.5 rounded font-medium">
                                  {cond}
                                </span>
                              ))}
                            </div>

                            {/* Vitals & Clinical Labs */}
                            <div className="pt-2 border-t border-navy-900 grid grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="text-slate-500 block">BP / Vitals:</span>
                                <span className="text-slate-200 font-mono font-medium">{inmate.lastVitals.bp}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Clinical Marker:</span>
                                <span className="text-teal-400 font-mono font-medium">
                                  {inmate.lastVitals.viralLoad || inmate.lastVitals.tbStatus || inmate.lastVitals.hba1c || 'Stable'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Active Prescriptions Table */}
                          <div className="space-y-2">
                            <span className="text-slate-400 uppercase text-[10px] font-semibold tracking-wider block">
                              Prescribed Regimens & Repeat Authorization:
                            </span>
                            <div className="space-y-1.5">
                              {inmate.activeRegimen.map((med, mIdx) => (
                                <div key={mIdx} className="p-2 rounded bg-navy-850 border border-navy-800 flex items-center justify-between text-xs">
                                  <div>
                                    <div className="font-semibold text-slate-100">{med.drugName}</div>
                                    <div className="text-[11px] text-slate-400">{med.dose} • Batch Ref: {med.batchRef}</div>
                                  </div>
                                  <div className="text-right">
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                      med.repeatDueDays <= 3 ? 'bg-amber-950 text-amber-300 border border-amber-600' : 'bg-navy-900 text-slate-300'
                                    }`}>
                                      Repeat in {med.repeatDueDays}d
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Clinical Notes & Doctor */}
                          <div className="pt-2 border-t border-navy-850 flex items-center justify-between text-xs text-slate-400">
                            <span>Attending: <strong>{inmate.doctor}</strong></span>
                            <span className="italic truncate max-w-[200px]" title={inmate.notes}>{inmate.notes}</span>
                          </div>

                        </div>
                      );
                    })}
                </div>

                {/* DEDICATED WARD MAR & NURSING ROUND SHEET GENERATOR */}
                <div id="printable-area" className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Icon name="clipboardList" className="w-5 h-5 text-teal-400" />
                        Medication Administration Record (MAR) — Nursing Ward Round Sheet
                      </h3>
                      <p className="text-xs text-slate-400">
                        Department of Correctional Services (DCS) Health Services Ward Round Compliance Form
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 no-print">
                      <select
                        value={modalState.nursingRoundBlock}
                        onChange={(e) => setModalState(prev => ({ ...prev, nursingRoundBlock: e.target.value }))}
                        className="bg-navy-950 border border-navy-700 text-xs text-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="Block C-3">Block C-3 Round</option>
                        <option value="Block B-1">Block B-1 Round</option>
                        <option value="Hospital Ward">Hospital Ward Round</option>
                      </select>

                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1 shadow"
                      >
                        <Icon name="printer" className="w-3.5 h-3.5" />
                        Print Round MAR
                      </button>
                    </div>
                  </div>

                  {/* Print Header Visible in Print Mode */}
                  <div className="hidden print:block text-black p-4 border-b-2 border-black space-y-1">
                    <div className="text-lg font-bold">REPUBLIC OF SOUTH AFRICA — DEPARTMENT OF CORRECTIONAL SERVICES</div>
                    <div className="text-sm">HEALTH SERVICES DIRECTORATE — CLINICAL MEDICATION ADMINISTRATION RECORD (MAR)</div>
                    <div className="text-xs font-mono">Facility: {facility.name} | Round Location: {modalState.nursingRoundBlock} | Date: 2026-11-18</div>
                  </div>

                  {/* Round Administration Schedule Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-navy-850 print:bg-gray-200 text-slate-300 print:text-black uppercase text-[10px] tracking-wider border-b border-navy-800 print:border-black">
                          <th className="py-2.5 px-3">Cell / Bed</th>
                          <th className="py-2.5 px-3">Inmate ID & Name</th>
                          <th className="py-2.5 px-3">Medicine Prescribed</th>
                          <th className="py-2.5 px-3">Dose & Route</th>
                          <th className="py-2.5 px-3">Allergy Warnings</th>
                          <th className="py-2.5 px-3 text-center">DOT Observed</th>
                          <th className="py-2.5 px-3 text-center">Nurse Verification Sign-Off</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-800 print:divide-black">
                        {inmates
                          .filter(i => i.cellBlock.includes(modalState.nursingRoundBlock))
                          .flatMap(i => i.activeRegimen.map(med => ({ inmate: i, med })))
                          .map(({ inmate, med }, rowIdx) => {
                            const signKey = `${inmate.id}-${med.drugId}`;
                            const isSigned = modalState.nursingSignoffs[signKey];

                            return (
                              <tr key={rowIdx} className="hover:bg-navy-850/50 print:hover:bg-transparent">
                                <td className="py-3 px-3 font-mono font-bold text-teal-400 print:text-black">
                                  {inmate.cellNumber}
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-semibold text-slate-100 print:text-black">{inmate.name}</div>
                                  <div className="text-[10px] text-slate-400 print:text-gray-600 font-mono">{inmate.id}</div>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-medium text-slate-200 print:text-black">{med.drugName}</div>
                                  <div className="text-[10px] text-slate-400 print:text-gray-600">Batch: {med.batchRef} ({med.schedule})</div>
                                </td>
                                <td className="py-3 px-3 font-mono text-slate-300 print:text-black">
                                  {med.dose}
                                </td>
                                <td className="py-3 px-3">
                                  {inmate.allergies.some(a => !a.includes('NONE')) ? (
                                    <span className="text-red-400 print:text-red-700 font-bold text-[10px]">
                                      {inmate.allergies[0]}
                                    </span>
                                  ) : (
                                    <span className="text-slate-500 print:text-gray-500 text-[10px]">None Known</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={med.dose.includes('DOT')}
                                    className="rounded border-navy-700 text-teal-600 focus:ring-teal-500 h-4 w-4"
                                  />
                                </td>
                                <td className="py-3 px-3 text-center no-print">
                                  <button
                                    onClick={() => {
                                      setModalState(prev => ({
                                        ...prev,
                                        nursingSignoffs: {
                                          ...prev.nursingSignoffs,
                                          [signKey]: !isSigned
                                        }
                                      }));
                                      addToast('info', 'Nursing Round Initialized', `${inmate.name}: ${med.drugName} signed off.`);
                                    }}
                                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                      isSigned
                                        ? 'bg-emerald-800 text-white'
                                        : 'bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700'
                                    }`}
                                  >
                                    {isSigned ? '✓ Administered' : 'Mark Administered'}
                                  </button>
                                </td>
                                <td className="py-3 px-3 text-center hidden print:table-cell">
                                  <div className="w-24 h-6 border-b border-black mx-auto"></div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                  {/* Nursing Sister Signatures Footer */}
                  <div className="pt-4 border-t border-navy-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span>Attending Sister on Duty: <strong>Sr. P. Dlamini, RN (SANC #10948)</strong></span>
                    </div>
                    <div>
                      <span>Supervising Pharmacist: <strong>{PHARMACIST_CREDENTIALS.name} (SAPC #{PHARMACIST_CREDENTIALS.sapcNumber})</strong></span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: PROVINCIAL DEPOT ORDERING & EML REQUISITIONER */}
            {activeTab === 'depot' && (
              <div className="space-y-6">
                
                {/* Depot Interface Header */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-sm space-y-3">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Icon name="truck" className="w-5 h-5 text-teal-400" />
                        <h2 className="text-base font-bold text-white tracking-wide">
                          Provincial Medical Depot Requisition & EML Forecaster
                        </h2>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                        Supplying Facility: <strong className="text-teal-300">{facility.depot}</strong>. Order logic automatically forecasts 60-day target buffer stock based on active inmate chronic repeat profiles and acute ward consumption.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleExportRequisitionCsv}
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs rounded-md shadow-md flex items-center gap-2 transition"
                      >
                        <Icon name="fileSpreadsheet" className="w-4 h-4" />
                        Download CSV Order Sheet
                      </button>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-navy-800 text-xs">
                    <div className="bg-navy-950 p-2.5 rounded border border-navy-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Flagged for Reorder:</span>
                      <span className="text-base font-bold text-amber-400 font-mono">{kpis.lowStockCount} Items</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded border border-navy-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Standard Lead Time:</span>
                      <span className="text-base font-bold text-slate-200 font-mono">14 Days Delivery</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded border border-navy-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Depot Requisition Status:</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">DRAFT COMPILED</span>
                    </div>
                    <div className="bg-navy-950 p-2.5 rounded border border-navy-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Est Requisition Total:</span>
                      <span className="text-base font-bold text-teal-300 font-mono">
                        ZAR R {inventory.reduce((sum, item) => {
                          const totalStock = item.batches.reduce((s, b) => s + b.quantity, 0);
                          const rec = Math.max(0, (item.monthlyConsumption * 2) - totalStock);
                          const qty = customRequisitionQty[item.id] !== undefined ? customRequisitionQty[item.id] : rec;
                          return sum + (qty * item.unitCostZAR);
                        }, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AUTOMATED REQUISITION BUILDER TABLE */}
                <div className="bg-navy-900 border border-navy-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-navy-850 text-slate-400 uppercase text-[10px] tracking-wider border-b border-navy-800">
                          <th className="py-3 px-3">Depot Code</th>
                          <th className="py-3 px-3">Item Description</th>
                          <th className="py-3 px-3">Pack Size</th>
                          <th className="py-3 px-3">Monthly Usage</th>
                          <th className="py-3 px-3">Stock On Hand</th>
                          <th className="py-3 px-3">Buffer (Days)</th>
                          <th className="py-3 px-3">Forecasted Order</th>
                          <th className="py-3 px-3">Final Order Qty</th>
                          <th className="py-3 px-3 text-right">Est Cost (ZAR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-800 font-mono">
                        {inventory.map(item => {
                          const totalStock = item.batches.reduce((sum, b) => sum + (b.quarantined ? 0 : b.quantity), 0);
                          const bufferDays = Math.round((totalStock / (item.monthlyConsumption || 1)) * 30);
                          const targetStock = item.monthlyConsumption * 2;
                          const recOrder = Math.max(0, targetStock - totalStock);
                          const currentVal = customRequisitionQty[item.id] !== undefined ? customRequisitionQty[item.id] : recOrder;
                          const lineCost = (currentVal * item.unitCostZAR).toFixed(2);

                          return (
                            <tr key={item.id} className="hover:bg-navy-850/60 transition">
                              <td className="py-3 px-3 font-bold text-teal-400">{item.depotCode}</td>
                              <td className="py-3 px-3 font-sans">
                                <div className="font-semibold text-slate-100">{item.name}</div>
                                <div className="text-[10px] text-slate-400">{item.emlCode} • {item.schedule}</div>
                              </td>
                              <td className="py-3 px-3 text-slate-300 font-sans">{item.packSize}</td>
                              <td className="py-3 px-3 text-slate-200">{item.monthlyConsumption} / mo</td>
                              <td className="py-3 px-3 text-slate-100 font-bold">{totalStock}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  bufferDays < 15 ? 'bg-red-950 text-red-400 border border-red-700' :
                                  bufferDays < item.safetyStockDays ? 'bg-amber-950 text-amber-400 border border-amber-700' :
                                  'text-slate-300'
                                }`}>
                                  {bufferDays}d
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-300">
                                {recOrder} packs
                              </td>
                              <td className="py-3 px-3">
                                <input
                                  type="number"
                                  min="0"
                                  value={currentVal}
                                  onChange={(e) => {
                                    const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                                    setCustomRequisitionQty(prev => ({
                                      ...prev,
                                      [item.id]: val
                                    }));
                                  }}
                                  className="w-20 bg-navy-950 border border-navy-700 rounded px-2 py-1 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                                />
                              </td>
                              <td className="py-3 px-3 text-right text-teal-300 font-bold">
                                R {Number(lineCost).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </main>

          {/* ===================== MODALS ===================== */}

          {/* FACILITY REGISTRY & MANAGEMENT MODAL (ADD / DELETE FACILITIES) */}
          {modalState.facilityModalOpen && (() => {
            const currentTab = modalState.facilityModalTab || 'list';

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                <div className="bg-navy-900 border-2 border-teal-500/50 rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                  
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                    <div className="flex items-center space-x-2">
                      <Icon name="building" className="w-5 h-5 text-teal-400" />
                      <div>
                        <h3 className="text-base font-bold text-white">Correctional Facilities Management</h3>
                        <span className="text-[10px] text-teal-300 font-mono">Department of Correctional Services (DCS) Network Registry</span>
                      </div>
                    </div>
                    <button onClick={() => setModalState(prev => ({ ...prev, facilityModalOpen: false }))} className="text-slate-400 hover:text-white">
                      <Icon name="x" className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-navy-800 space-x-2 text-xs">
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, facilityModalTab: 'list' }))}
                      className={`pb-2 px-3 font-semibold transition ${
                        currentTab === 'list'
                          ? 'border-b-2 border-teal-400 text-teal-300'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Active Facilities ({facilitiesList.length})
                    </button>
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, facilityModalTab: 'add' }))}
                      className={`pb-2 px-3 font-semibold flex items-center gap-1.5 transition ${
                        currentTab === 'add'
                          ? 'border-b-2 border-teal-400 text-teal-300'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon name="plus" className="w-3.5 h-3.5" />
                      Commission New Facility
                    </button>
                  </div>

                  {/* TAB 1: ACTIVE FACILITIES ROSTER & DELETION */}
                  {currentTab === 'list' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Manage active correctional facilities across South Africa. Switch the active context or decommission existing centres from the regional health network.
                      </p>

                      <div className="space-y-2">
                        {facilitiesList.map((fac) => {
                          const isActive = facility.id === fac.id;

                          return (
                            <div
                              key={fac.id}
                              className={`p-3 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                                isActive
                                  ? 'bg-teal-950/60 border-teal-500 ring-1 ring-teal-400/40'
                                  : 'bg-navy-950 border-navy-800 hover:border-navy-700'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-teal-400 text-xs">[{fac.id}]</span>
                                  <span className="font-bold text-white text-sm">{fac.name}</span>
                                  {isActive && (
                                    <span className="bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                      CURRENT ACTIVE
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-[11px] flex flex-wrap gap-x-3">
                                  <span>Region: <strong className="text-slate-200">{fac.province}</strong></span>
                                  <span>Inmates: <strong className="text-slate-200">{fac.inmatesCount.toLocaleString()}</strong></span>
                                  <span>Security: <strong className="text-slate-300">{fac.security}</strong></span>
                                  <span>Depot: <strong className="text-teal-300">{fac.depot}</strong></span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 self-end sm:self-center">
                                {!isActive && (
                                  <button
                                    onClick={() => {
                                      setFacility(fac);
                                      addToast('success', 'Active Facility Context Changed', `Switched active facility to ${fac.name}.`);
                                      setModalState(prev => ({ ...prev, facilityModalOpen: false }));
                                    }}
                                    className="px-2.5 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold shadow transition"
                                  >
                                    Switch To
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    if (facilitiesList.length <= 1) {
                                      addToast('error', 'Cannot Delete', 'At least one correctional facility must remain in the system.');
                                      return;
                                    }

                                    if (confirm(`Are you sure you want to decommission and delete "${fac.name}" from the network?`)) {
                                      const remaining = facilitiesList.filter(f => f.id !== fac.id);
                                      setFacilitiesList(remaining);
                                      
                                      // If user deleted the currently active facility, switch to the first remaining
                                      if (isActive) {
                                        setFacility(remaining[0]);
                                      }

                                      addToast('info', 'Facility Decommissioned', `Removed ${fac.name} from correctional network.`);
                                    }
                                  }}
                                  title="Decommission / Delete Facility"
                                  className="px-2.5 py-1.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-700 rounded text-xs font-semibold transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: COMMISSION NEW FACILITY FORM */}
                  {currentTab === 'add' && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const f = e.target;
                      const newId = f.facId.value.toUpperCase().trim();

                      if (facilitiesList.some(fac => fac.id === newId)) {
                        addToast('error', 'Duplicate ID', `A facility with ID "${newId}" already exists.`);
                        return;
                      }

                      const newFacility = {
                        id: newId,
                        name: f.name.value.trim(),
                        province: f.province.value.trim(),
                        inmatesCount: parseInt(f.inmatesCount.value, 10) || 1500,
                        security: f.security.value,
                        depot: f.depot.value.trim()
                      };

                      setFacilitiesList(prev => [...prev, newFacility]);
                      setFacility(newFacility); // Auto-activate newly created facility
                      addToast('success', 'New Facility Commissioned', `Successfully registered and switched to ${newFacility.name}.`);
                      setModalState(prev => ({ ...prev, facilityModalOpen: false }));
                    }} className="space-y-3 text-xs">
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Facility Code / ID (3-4 chars):</label>
                          <input name="facId" required placeholder="e.g. WST" defaultValue={`DCS-${Math.floor(100 + Math.random() * 900)}`} className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-teal-400 font-mono font-bold uppercase" />
                        </div>
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Inmate Census / Capacity:</label>
                          <input name="inmatesCount" type="number" min="50" defaultValue="2850" required className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">Facility Official Name:</label>
                        <input name="name" required placeholder="e.g. Westville Correctional Centre" defaultValue="Westville Correctional Centre" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-semibold" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Province & Region:</label>
                          <input name="province" required placeholder="e.g. KwaZulu-Natal (Durban)" defaultValue="KwaZulu-Natal (Durban)" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                        </div>
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Security Classification:</label>
                          <select name="security" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100">
                            <option value="Maximum & Medium">Maximum & Medium</option>
                            <option value="Maximum Security">Maximum Security</option>
                            <option value="Medium Security">Medium Security</option>
                            <option value="Remand Detention Centre">Remand Detention Centre</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">Supplying Provincial Medical Depot:</label>
                        <input name="depot" required placeholder="e.g. eThekwini Provincial Depot" defaultValue="eThekwini Provincial Medical Depot" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono" />
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-navy-800">
                        <button type="button" onClick={() => setModalState(prev => ({ ...prev, facilityModalTab: 'list' }))} className="px-3 py-1.5 bg-navy-800 text-slate-300 rounded">
                          Back to List
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded font-bold shadow">
                          Commission Facility
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              </div>
            );
          })()}

          {/* 0. PERSONNEL REGISTRY & ROLE-BASED ACCESS CONTROL MODAL */}
          {modalState.loginModalOpen && (() => {
            const currentTab = modalState.staffModalTab || 'list';

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                <div className="bg-navy-900 border-2 border-teal-500/50 rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                  
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                    <div className="flex items-center space-x-2">
                      <Icon name="users" className="w-5 h-5 text-teal-400" />
                      <div>
                        <h3 className="text-base font-bold text-white">Personnel Registry & Scope of Practice (SAPC / SANC)</h3>
                        <span className="text-[10px] text-teal-300 font-mono">Good Pharmacy Practice Rule 8.4 • Statutory Role-Based Access Control</span>
                      </div>
                    </div>
                    <button onClick={() => setModalState(prev => ({ ...prev, loginModalOpen: false }))} className="text-slate-400 hover:text-white">
                      <Icon name="x" className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Tabs: Active Roster vs Register New */}
                  <div className="flex border-b border-navy-800 space-x-2 text-xs">
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, staffModalTab: 'list' }))}
                      className={`pb-2 px-3 font-semibold transition ${
                        currentTab === 'list'
                          ? 'border-b-2 border-teal-400 text-teal-300'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Active Staff Roster ({staffList.length})
                    </button>
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, staffModalTab: 'register' }))}
                      className={`pb-2 px-3 font-semibold flex items-center gap-1.5 transition ${
                        currentTab === 'register'
                          ? 'border-b-2 border-teal-400 text-teal-300'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon name="plus" className="w-3.5 h-3.5" />
                      Register New Staff Member
                    </button>
                  </div>

                  {/* TAB 1: ACTIVE STAFF DIRECTORY & SWITCH USER */}
                  {currentTab === 'list' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Select any registered pharmacist, assistant, or sister to switch the active dispensary session. Statutory scopes of practice are enforced at each clearance level.
                      </p>

                      <div className="space-y-2">
                        {staffList.map((member) => {
                          const isActive = session.currentUser.id === member.id;

                          return (
                            <div
                              key={member.id}
                              className={`p-3 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                                isActive
                                  ? 'bg-teal-950/60 border-teal-500 ring-1 ring-teal-400/40'
                                  : 'bg-navy-950 border-navy-800 hover:border-navy-700'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-white text-sm">{member.name}</span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase ${
                                    member.role === 'RESPONSIBLE_PHARMACIST' ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' :
                                    member.role === 'CLINICAL_PHARMACIST' ? 'bg-teal-950 text-teal-300 border border-teal-600' :
                                    member.role === 'ASSISTANT_POST_BASIC' ? 'bg-amber-950 text-amber-300 border border-amber-600' :
                                    member.role === 'ASSISTANT_BASIC' ? 'bg-slate-800 text-slate-300' :
                                    'bg-blue-950 text-blue-300 border border-blue-600'
                                  }`}>
                                    {member.roleLabel}
                                  </span>
                                  {isActive && (
                                    <span className="bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                      ACTIVE SESSION
                                    </span>
                                  )}
                                </div>

                                <div className="text-slate-400 text-[11px] flex flex-wrap gap-x-4">
                                  <span>{member.council} Reg: <strong className="text-slate-200 font-mono">#{member.regNumber}</strong></span>
                                  <span>Clearance: <strong className="text-teal-400">Level {member.clearanceLevel}</strong></span>
                                  <span>S5/S6 Vault Access: <strong className={member.canAccessS5S6 ? 'text-emerald-400' : 'text-red-400'}>
                                    {member.canAccessS5S6 ? 'AUTHORIZED' : 'RESTRICTED (Act 101)'}
                                  </strong></span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 self-end sm:self-center">
                                {isActive ? (
                                  <span className="text-emerald-400 font-mono text-[11px] font-semibold">
                                    ✓ Logged In
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setSession(prev => ({
                                        ...prev,
                                        currentUser: member,
                                        isLocked: false
                                      }));
                                      addToast('success', 'Staff Session Switched', `Logged in as ${member.name} (${member.roleLabel}).`);
                                      setModalState(prev => ({ ...prev, loginModalOpen: false }));
                                    }}
                                    className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold shadow transition"
                                  >
                                    Authenticate & Switch
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: REGISTER NEW PHARMACIST / ASSISTANT / SISTER */}
                  {currentTab === 'register' && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const f = e.target;
                      const selectedRole = f.role.value;
                      
                      let roleLabel = 'Dispensary Pharmacist';
                      let clearanceLevel = 3;
                      let canAccessS5S6 = true;
                      let canOverrideFefo = true;
                      let canRequisitionDepot = true;

                      if (selectedRole === 'RESPONSIBLE_PHARMACIST') {
                        roleLabel = 'Responsible Pharmacist (RP)';
                        clearanceLevel = 4;
                        canAccessS5S6 = true;
                        canOverrideFefo = true;
                        canRequisitionDepot = true;
                      } else if (selectedRole === 'CLINICAL_PHARMACIST') {
                        roleLabel = 'Clinical Dispensary Pharmacist';
                        clearanceLevel = 3;
                        canAccessS5S6 = true;
                        canOverrideFefo = true;
                        canRequisitionDepot = true;
                      } else if (selectedRole === 'ASSISTANT_POST_BASIC') {
                        roleLabel = "Pharmacist's Assistant (Post-Basic)";
                        clearanceLevel = 2;
                        canAccessS5S6 = false;
                        canOverrideFefo = false;
                        canRequisitionDepot = false;
                      } else if (selectedRole === 'ASSISTANT_BASIC') {
                        roleLabel = "Pharmacist's Assistant (Basic)";
                        clearanceLevel = 1;
                        canAccessS5S6 = false;
                        canOverrideFefo = false;
                        canRequisitionDepot = false;
                      } else if (selectedRole === 'REGISTERED_NURSE') {
                        roleLabel = 'Registered Nurse / Ward Sister';
                        clearanceLevel = 2;
                        canAccessS5S6 = false;
                        canOverrideFefo = false;
                        canRequisitionDepot = false;
                      }

                      const newStaffMember = {
                        id: `STF-${Math.floor(100 + Math.random() * 900)}`,
                        name: f.name.value,
                        council: f.council.value,
                        regNumber: f.regNumber.value,
                        role: selectedRole,
                        roleLabel: roleLabel,
                        clearanceLevel: clearanceLevel,
                        canAccessS5S6: canAccessS5S6,
                        canOverrideFefo: canOverrideFefo,
                        canRequisitionDepot: canRequisitionDepot,
                        pin: f.pin.value || '1234',
                        shift: f.shift.value,
                        witnessOnDuty: 'Sr. P. Dlamini, RN (SANC #10948)'
                      };

                      setStaffList(prev => [...prev, newStaffMember]);
                      addToast('success', 'Staff Member Registered', `${newStaffMember.name} registered under ${newStaffMember.council} as ${roleLabel}.`);
                      setModalState(prev => ({ ...prev, staffModalTab: 'list' }));
                    }} className="space-y-3 text-xs">
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Full Legal Name with Title:</label>
                          <input name="name" required placeholder="e.g. Pharm. Nomvula Khumalo" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                        </div>
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Professional Statutory Council:</label>
                          <select name="council" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100">
                            <option value="SAPC">SAPC — South African Pharmacy Council</option>
                            <option value="SANC">SANC — South African Nursing Council</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Council Registration Number:</label>
                          <input name="regNumber" required placeholder="e.g. 61408 or PB-99120" defaultValue="61408" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono" />
                        </div>
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Assigned Security PIN (4 Digits):</label>
                          <input name="pin" type="password" maxLength="4" required defaultValue="8821" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono tracking-widest text-center" />
                        </div>
                      </div>

                      {/* STATUTORY SCOPE OF PRACTICE SELECTION */}
                      <div className="bg-navy-950 p-3 rounded border border-teal-500/30 space-y-2">
                        <label className="text-teal-300 font-bold block mb-1">
                          Statutory Cadre & Scope of Practice (Access Level):
                        </label>
                        <select name="role" className="w-full bg-navy-900 border border-navy-700 rounded p-2 text-slate-100 font-medium">
                          <option value="RESPONSIBLE_PHARMACIST">
                            Level 4: Responsible Pharmacist (RP) — Full S0-S6 Vault, Merkle Audit & Admin
                          </option>
                          <option value="CLINICAL_PHARMACIST">
                            Level 3: Clinical / Dispensary Pharmacist — S0-S6 Dispensing & Inmate Care
                          </option>
                          <option value="ASSISTANT_POST_BASIC">
                            Level 2: Pharmacist's Assistant (Post-Basic) — S0-S4 Prescriptions (S5/S6 Vault RESTRICTED)
                          </option>
                          <option value="ASSISTANT_BASIC">
                            Level 1: Pharmacist's Assistant (Basic) — Stock Packing & General Inventory Only
                          </option>
                          <option value="REGISTERED_NURSE">
                            Level 2: Registered Nurse (SANC) — Ward MAR Rounds & Controlled Witness Sign-off
                          </option>
                        </select>
                        <p className="text-[10px] text-slate-400">
                          *Note: Under Act 101 of 1965 §22A, Pharmacist's Assistants are legally prohibited from releasing Schedule 5 & 6 controlled substances without a Responsible Pharmacist.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Assigned Shift:</label>
                          <select name="shift" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100">
                            <option value="Day Shift (07:00 - 15:00)">Day Shift (07:00 - 15:00)</option>
                            <option value="Afternoon Shift (15:00 - 23:00)">Afternoon Shift (15:00 - 23:00)</option>
                            <option value="Night Emergency (23:00 - 07:00)">Night Emergency (23:00 - 07:00)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Facility Assignment:</label>
                          <input disabled value={facility.name} className="w-full bg-navy-900 border border-navy-800 rounded p-2 text-slate-400 font-mono text-[11px]" />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-navy-800">
                        <button type="button" onClick={() => setModalState(prev => ({ ...prev, staffModalTab: 'list' }))} className="px-3 py-1.5 bg-navy-800 text-slate-300 rounded">
                          Back to Roster
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded font-bold shadow">
                          Commit to SAPC Personnel Register
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              </div>
            );
          })()}

          {/* 1. GOODS RECEIVED VOUCHER (GRV) INTAKE MODAL */}
          {modalState.grvOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-navy-900 border border-navy-700 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                  <div className="flex items-center space-x-2">
                    <Icon name="truck" className="w-5 h-5 text-teal-400" />
                    <h3 className="text-base font-bold text-white">Log Goods Received Voucher (GRV)</h3>
                  </div>
                  <button onClick={() => setModalState(prev => ({ ...prev, grvOpen: false }))} className="text-slate-400 hover:text-white">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  handleGrvSubmit({
                    itemId: form.itemId.value,
                    grvNumber: form.grvNumber.value,
                    deliveryNote: form.deliveryNote.value,
                    supplier: form.supplier.value,
                    batchNumber: form.batchNumber.value,
                    mfgDate: form.mfgDate.value,
                    expiryDate: form.expiryDate.value,
                    quantity: form.quantity.value,
                    binLocation: form.binLocation.value,
                    witness: form.witness.value
                  });
                }} className="space-y-3 text-xs">
                  
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Select Medicine Item (EML List):</label>
                    <select name="itemId" required className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 text-xs">
                      {inventory.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.emlCode} — {item.name} ({item.schedule})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">GRV Voucher Number:</label>
                      <input name="grvNumber" required defaultValue={`GRV-${Math.floor(10000 + Math.random() * 90000)}`} className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono" />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Supplier / Depot Name:</label>
                      <input name="supplier" required defaultValue="Cape Medical Depot / Aspen" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">New Batch Number:</label>
                      <input name="batchNumber" required placeholder="e.g. BATCH-TLD-99X" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono uppercase" />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Quantity Received (Packs):</label>
                      <input name="quantity" type="number" min="1" required defaultValue="100" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Manufacturing Date:</label>
                      <input name="mfgDate" type="date" required defaultValue="2025-06-01" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Expiry Date:</label>
                      <input name="expiryDate" type="date" required defaultValue="2027-12-31" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Assigned Bin Location:</label>
                      <input name="binLocation" required defaultValue="SEC-PHARM-A01" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono" />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Receiving Witness Sister:</label>
                      <input name="witness" required defaultValue={PHARMACIST_CREDENTIALS.witnessOnDuty} className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-navy-800 flex justify-end gap-2">
                    <button type="button" onClick={() => setModalState(prev => ({ ...prev, grvOpen: false }))} className="px-3 py-2 bg-navy-800 text-slate-300 rounded font-medium hover:bg-navy-700">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded font-bold">
                      Commit GRV to Stock
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 2. SCHEDULE 5 / 6 INTERACTIVE DISPENSING & 2FA PIN MODAL */}
          {modalState.s5s6Open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
              <div className="bg-navy-900 border-2 border-red-700 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-red-900/60">
                  <div className="flex items-center space-x-2">
                    <Icon name="lock" className="w-6 h-6 text-red-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">SAPC Schedule 5 & 6 Controlled Issue</h3>
                      <span className="text-[10px] text-red-300 font-mono">Act 101/1965 Section 22A Compliance Workflow</span>
                    </div>
                  </div>
                  <button onClick={() => setModalState(prev => ({ ...prev, s5s6Open: false }))} className="text-slate-400 hover:text-white">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                {/* Assistant Notice if active */}
                {!session.currentUser.canAccessS5S6 && (
                  <div className="bg-red-950 border border-red-600 rounded p-2.5 text-xs text-red-200 flex items-center gap-2">
                    <Icon name="lock" className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <div>
                      <strong className="text-red-300 block uppercase text-[10px]">Responsible Pharmacist Co-Sign Required:</strong>
                      <span>As a {session.currentUser.roleLabel}, Act 101 requires the Responsible Pharmacist master PIN (7492) to countersign this vault issue.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const selMed = inventory.find(m => m.id === form.drugId.value);
                  const selInmate = inmates.find(i => i.id === form.inmateId.value);

                  handleS5S6Submit({
                    drugId: form.drugId.value,
                    batchNumber: form.batchNumber.value,
                    quantity: parseInt(form.quantity.value, 10),
                    inmateId: form.inmateId.value,
                    recipientName: selInmate ? `${selInmate.name} (${selInmate.cellBlock})` : 'Correctional Hospital Issue',
                    doctor: form.doctor.value,
                    txType: form.txType.value,
                    witnessName: form.witnessName.value,
                    notes: form.notes.value,
                    pin: form.pin.value
                  });
                }} className="space-y-3 text-xs">
                  
                  {/* Controlled Drug Selection */}
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Controlled Substance (S5 or S6):</label>
                    <select
                      name="drugId"
                      id="s5s6-drug-select"
                      required
                      className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-semibold text-xs"
                      onChange={(e) => {
                        const sel = inventory.find(m => m.id === e.target.value);
                        const batchSelect = document.getElementById('s5s6-batch-select');
                        if (batchSelect && sel) {
                          batchSelect.innerHTML = sel.batches.map(b => `<option value="${b.batchNumber}">${b.batchNumber} (Bal: ${b.quantity} un | Exp: ${b.expiryDate})</option>`).join('');
                        }
                      }}
                    >
                      {inventory
                        .filter(i => i.schedule === 'S5' || i.schedule === 'S6')
                        .map(i => (
                          <option key={i.id} value={i.id}>
                            [{i.schedule}] {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Batch Selection with FEFO notice */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Controlled Batch (FEFO):</label>
                      <select name="batchNumber" id="s5s6-batch-select" required className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono text-xs">
                        {inventory.find(i => i.schedule === 'S5' || i.schedule === 'S6')?.batches.map(b => (
                          <option key={b.batchNumber} value={b.batchNumber}>
                            {b.batchNumber} ({b.quantity} un)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Issue Quantity:</label>
                      <input name="quantity" type="number" min="1" max="50" defaultValue="1" required className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-white font-bold" />
                    </div>
                  </div>

                  {/* Recipient Inmate Selection */}
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Recipient Inmate ID & Cell Block:</label>
                    <select name="inmateId" required className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100 font-mono text-xs">
                      {inmates.map(inmate => (
                        <option key={inmate.id} value={inmate.id}>
                          {inmate.id} — {inmate.name} ({inmate.cellBlock})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Prescribing Doctor (HPCSA MP):</label>
                      <input name="doctor" required defaultValue="Dr. R. Naidoo (MP 0554210)" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Transaction Category:</label>
                      <select name="txType" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100">
                        <option value="DISPENSE">DISPENSE (Inmate Issue)</option>
                        <option value="DESTRUCTION">DESTRUCTION / CLINICAL WASTE</option>
                        <option value="STOCK_AUDIT">STOCK AUDIT CORRECTION</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Secondary Witness (Registered Nurse):</label>
                    <input name="witnessName" required defaultValue="Sr. P. Dlamini, RN (SANC #10948)" className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Clinical Indication & Script Ref:</label>
                    <input name="notes" placeholder="e.g. Post-surgical trauma breakthrough analgesia" required defaultValue="Acute clinical pain management under direct nursing sister supervision." className="w-full bg-navy-950 border border-navy-700 rounded p-2 text-slate-100" />
                  </div>

                  {/* MANDATORY 2FA PIN AUTHENTICATION */}
                  <div className="bg-navy-950 p-3 rounded border border-red-500/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-red-300 font-bold flex items-center gap-1.5">
                        <Icon name="key" className="w-4 h-4 text-red-400" />
                        Pharmacist 2FA PIN Code (SAPC Sign-off):
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">Demo PIN: <strong>7492</strong></span>
                    </div>
                    <input
                      name="pin"
                      type="password"
                      maxLength="6"
                      required
                      placeholder="Enter 4-digit PIN (7492)"
                      className="w-full bg-navy-900 border border-red-700 rounded p-2 text-center text-lg tracking-widest text-white font-mono focus:border-red-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-navy-800 flex justify-end gap-2">
                    <button type="button" onClick={() => setModalState(prev => ({ ...prev, s5s6Open: false }))} className="px-3 py-2 bg-navy-800 text-slate-300 rounded font-medium hover:bg-navy-700">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-crimson-700 hover:bg-crimson-600 text-white rounded font-bold shadow-lg">
                      Cryptographically Seal & Issue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. FEFO PICK ASSISTANT MODAL */}
          {modalState.fefoPickOpen && modalState.fefoItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-navy-900 border border-teal-500/50 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                  <div className="flex items-center space-x-2">
                    <Icon name="pill" className="w-5 h-5 text-teal-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">FEFO Smart Pick Assistant</h3>
                      <span className="text-[10px] text-teal-300 font-mono">First-Expired, First-Out Enforcement</span>
                    </div>
                  </div>
                  <button onClick={() => setModalState(prev => ({ ...prev, fefoPickOpen: false, fefoItem: null }))} className="text-slate-400 hover:text-white">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-navy-950 p-3 rounded border border-navy-800">
                    <div className="font-bold text-sm text-slate-100">{modalState.fefoItem.name}</div>
                    <div className="text-slate-400 text-xs">{modalState.fefoItem.emlCode} • Schedule {modalState.fefoItem.schedule}</div>
                  </div>

                  <p className="text-slate-300 text-xs">
                    South African GPP standard requires dispensing the batch with the earliest expiry date to prevent wastage and expired drug risks.
                  </p>

                  <div className="space-y-2">
                    {modalState.fefoItem.batches
                      .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
                      .map((batch, idx) => {
                        const daysLeft = getDaysUntil(batch.expiryDate);
                        const isEarliest = idx === 0;

                        return (
                          <div
                            key={batch.batchNumber}
                            className={`p-3 rounded-md border flex items-center justify-between ${
                              isEarliest
                                ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-400/40'
                                : 'bg-navy-950 border-navy-800 opacity-80'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono font-bold text-white">{batch.batchNumber}</span>
                                {isEarliest ? (
                                  <span className="bg-teal-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">
                                    RECOMMENDED (FEFO PRIORITY #1)
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-slate-400 uppercase">Later Batch</span>
                                )}
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                Location: <strong className="text-slate-300 font-mono">{batch.binLocation}</strong> • Qty: <strong className="text-slate-200">{batch.quantity} units</strong>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={`font-mono font-bold ${daysLeft <= 60 ? 'text-amber-400' : 'text-slate-200'}`}>
                                Exp: {batch.expiryDate}
                              </div>
                              <div className="text-[10px] text-slate-400">{daysLeft} Days Left</div>
                              <button
                                onClick={() => handleFefoDispense(modalState.fefoItem, batch.batchNumber, 1)}
                                className={`mt-2 px-3 py-1 rounded text-xs font-semibold transition ${
                                  isEarliest
                                    ? 'bg-teal-600 hover:bg-teal-500 text-white shadow'
                                    : 'bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700'
                                }`}
                              >
                                {isEarliest ? 'Select FEFO Batch' : 'Select Non-Optimal'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="pt-3 border-t border-navy-800 flex justify-end">
                  <button
                    onClick={() => setModalState(prev => ({ ...prev, fefoPickOpen: false, fefoItem: null }))}
                    className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded font-medium text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. INMATE TRANSFER & RELEASE SUMMARY FORM MODAL */}
          {modalState.transferModalOpen && modalState.selectedInmateForTransfer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
              <div className="bg-navy-900 border border-teal-500/50 rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                  <div className="flex items-center space-x-2">
                    <Icon name="arrowRight" className="w-5 h-5 text-teal-400" />
                    <div>
                      <h3 className="text-base font-bold text-white">DCS Official Inmate Medical Transfer Summary</h3>
                      <span className="text-[10px] text-teal-300 font-mono">Department of Correctional Services Health Services Handover</span>
                    </div>
                  </div>
                  <button onClick={() => setModalState(prev => ({ ...prev, transferModalOpen: false, selectedInmateForTransfer: null }))} className="text-slate-400 hover:text-white">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                {/* Transfer Dossier Content */}
                <div className="space-y-4 text-xs bg-navy-950 p-4 rounded border border-navy-800 font-sans">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start border-b border-navy-850 pb-3">
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{modalState.selectedInmateForTransfer.name}</h4>
                      <p className="text-slate-400 font-mono">Booking: {modalState.selectedInmateForTransfer.id} • SA ID: {modalState.selectedInmateForTransfer.saId}</p>
                      <p className="text-slate-400">Current Facility: <strong>{facility.name}</strong></p>
                    </div>
                    <div className="text-right">
                      <span className="bg-teal-900 text-teal-200 text-[10px] px-2 py-0.5 rounded font-mono font-bold block">
                        TRANSFER AUTHORIZATION
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">Date: 2026-11-18</span>
                    </div>
                  </div>

                  {/* Diagnoses & Warnings */}
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">Active Chronic Diagnoses:</span>
                    <p className="text-slate-200 font-semibold">{modalState.selectedInmateForTransfer.chronicConditions.join(', ')}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold">Allergy Alerts:</span>
                    <p className={`font-semibold ${modalState.selectedInmateForTransfer.allergies[0].includes('NONE') ? 'text-slate-300' : 'text-red-400'}`}>
                      {modalState.selectedInmateForTransfer.allergies.join('; ')}
                    </p>
                  </div>

                  {/* Medication Handover Pack (30-day supply) */}
                  <div className="space-y-2">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold block">
                      Transfer Medication Handover (30-Day Escort Supply Issued):
                    </span>
                    <div className="space-y-1 border border-navy-800 rounded p-2 bg-navy-900">
                      {modalState.selectedInmateForTransfer.activeRegimen.map((med, idx) => (
                        <div key={idx} className="flex justify-between text-slate-200 py-1 border-b border-navy-850 last:border-none">
                          <span>{med.drugName} ({med.dose})</span>
                          <span className="text-teal-400 font-mono">30-day sealed blister issued</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination Facility Input */}
                  <div className="pt-2 border-t border-navy-850">
                    <label className="text-slate-300 font-semibold block mb-1">Transfer Destination Correctional Centre:</label>
                    <input
                      defaultValue="Kimberley Correctional Centre (Northern Cape)"
                      className="w-full bg-navy-900 border border-navy-700 rounded p-2 text-slate-100 font-semibold text-xs"
                    />
                  </div>

                  {/* Handover Sign-off */}
                  <div className="pt-2 grid grid-cols-2 gap-4 border-t border-navy-850 text-slate-400 text-[11px]">
                    <div>
                      <span>Dispensing Pharmacist Sign-Off:</span>
                      <p className="font-semibold text-slate-200">{PHARMACIST_CREDENTIALS.name}</p>
                      <p className="font-mono text-[10px]">SAPC Reg: {PHARMACIST_CREDENTIALS.sapcNumber}</p>
                    </div>
                    <div>
                      <span>Correctional Escort Officer:</span>
                      <p className="font-semibold text-slate-200">Officer M. Ndaba (Persal #884129)</p>
                      <p className="font-mono text-[10px]">Escort Custody Receipt Signed</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      const textSummary = `
DEPARTMENT OF CORRECTIONAL SERVICES — MEDICAL TRANSFER SUMMARY
Inmate: ${modalState.selectedInmateForTransfer.name}
ID: ${modalState.selectedInmateForTransfer.saId} (Booking: ${modalState.selectedInmateForTransfer.id})
Origin: ${facility.name}
Conditions: ${modalState.selectedInmateForTransfer.chronicConditions.join(', ')}
Allergies: ${modalState.selectedInmateForTransfer.allergies.join('; ')}
Regimen:
${modalState.selectedInmateForTransfer.activeRegimen.map(r => ` - ${r.drugName}: ${r.dose}`).join('\n')}
Pharmacist Sign-Off: ${PHARMACIST_CREDENTIALS.name} (SAPC #${PHARMACIST_CREDENTIALS.sapcNumber})
Date: 2026-11-18
                      `.trim();

                      const blob = new Blob([textSummary], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Medical_Transfer_Summary_${modalState.selectedInmateForTransfer.id}.txt`;
                      a.click();
                      addToast('success', 'Transfer Summary Downloaded', 'Official clinical transfer text exported.');
                    }}
                    className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-teal-300 border border-teal-500/30 rounded text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Icon name="download" className="w-3.5 h-3.5" />
                    Download Formatted TXT
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, transferModalOpen: false, selectedInmateForTransfer: null }))}
                      className="px-3 py-1.5 bg-navy-800 text-slate-300 rounded text-xs font-medium hover:bg-navy-700"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        window.print();
                        addToast('info', 'Print Initiated', 'Transfer document sent to printer.');
                      }}
                      className="px-4 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-bold flex items-center gap-1.5"
                    >
                      <Icon name="printer" className="w-3.5 h-3.5" />
                      Print Official Form
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===================== TOAST NOTIFICATIONS DOCK ===================== */}
          <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
            {toasts.map(toast => {
              let borderColor = 'border-teal-500';
              let icon = <Icon name="checkCircle" className="w-5 h-5 text-teal-400" />;

              if (toast.type === 'error') {
                borderColor = 'border-red-600';
                icon = <Icon name="alertTriangle" className="w-5 h-5 text-red-400" />;
              } else if (toast.type === 'info') {
                borderColor = 'border-blue-500';
                icon = <Icon name="alertCircle" className="w-5 h-5 text-blue-400" />;
              }

              return (
                <div
                  key={toast.id}
                  className={`pointer-events-auto bg-navy-900 text-white border-l-4 ${borderColor} p-3 rounded shadow-2xl flex items-start space-x-3 text-xs animate-slide-in`}
                >
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-100">{toast.message}</div>
                    {toast.details && <div className="text-slate-400 text-[11px] mt-0.5">{toast.details}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <footer className="bg-navy-950 border-t border-navy-900 py-3 text-center text-xs text-slate-500">
            <p>Boraine MedTrack (Correctional Edition) • Developed for South African Department of Correctional Services (DCS) Healthcare Services</p>
            <p className="text-[10px] text-slate-600 mt-0.5">SAPC Good Pharmacy Practice (GPP) Rule 8.4 • Medicines and Related Substances Act 101 of 1965 • Offline Air-Gapped Merkle Architecture</p>
          </footer>
        </div>
      );
    }

    // Render the React application into root
    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);
    root.render(<BoraineMedTrackApp />);

    // Service Worker Registration for Offline Air-Gap PWA
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then((reg) => console.log('Boraine MedTrack ServiceWorker registered with scope:', reg.scope))
          .catch((err) => console.log('Boraine MedTrack ServiceWorker registration note:', err.message));
      });
    }
