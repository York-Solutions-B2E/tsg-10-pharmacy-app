const mockPrescriptionsList = [
  {
    id: '1',
    prescriptionNumber: 123456,
    patientId: 32567548,
    medicine: {
      id: '1',
      name: 'ChocoRelief',
      code: 'CRX-001',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '60',
    instructions: 'Take 1 tablet every 4 hours',
    status: 'NEW',
  },
  {
    id: '2',
    prescriptionNumber: 123457,
    patientId: 32567549,
    medicine: {
      id: '2',
      name: 'MintyCure',
      code: 'MCX-002',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '30',
    instructions: 'Take 1 tablet every 6 hours',
    status: 'OUT_OF_STOCK',
  },
  {
    id: '3',
    prescriptionNumber: 123458,
    patientId: 32567550,
    medicine: {
      id: '3',
      name: 'Caramelex',
      code: 'CEX-003',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '90',
    instructions: 'Take 1 tablet every 8 hours',
    status: 'AWAITING_SHIPMENT',
  },
  {
    id: '4',
    prescriptionNumber: 123459,
    patientId: 32567551,
    medicine: {
      id: '4',
      name: 'GummyVita',
      code: 'GVX-004',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '120',
    instructions: 'Take 1 tablet every 12 hours',
    status: 'STOCK_RECEIVED',
  },
  {
    id: '5',
    prescriptionNumber: 123460,
    patientId: 32567552,
    medicine: {
      id: '5',
      name: 'Lollipoprin',
      code: 'LPX-005',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '150',
    instructions: 'Take 1 tablet every 24 hours',
    status: 'FILLED',
  },
  {
    id: '6',
    prescriptionNumber: 123461,
    patientId: 32567553,
    medicine: {
      id: '6',
      name: 'CandyCaps',
      code: 'CCX-006',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '180',
    instructions: 'Take 1 tablet every 48 hours',
    status: 'PICKED_UP',
  },
];

export default mockPrescriptionsList;
