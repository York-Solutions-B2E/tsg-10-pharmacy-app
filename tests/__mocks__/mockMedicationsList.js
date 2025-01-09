const mockMedicationsList = [
  {
    id: 1,
    medicine: {
      id: 1,
      name: 'ChocoRelief',
      code: 'CRX-001',
      createdAt: '2025-01-06T21:30:42.035039Z',
      updatedAt: '2025-01-06T21:30:42.035039Z',
    },
    stockQuantity: 100,
    sufficientStock: true,
    minimumOrderCount: 0,
    deliveryDate: '2025-01-11',
  },
  {
    id: 2,
    medicine: {
      id: 2,
      name: 'MintyCure',
      code: 'MCX-002',
      createdAt: '2025-01-06T21:30:42.037949Z',
      updatedAt: '2025-01-06T21:30:42.037949Z',
    },
    stockQuantity: 200,
    sufficientStock: false,
    minimumOrderCount: 120,
    deliveryDate: '2025-01-16',
  },
  {
    id: 3,
    medicine: {
      id: 3,
      name: 'Caramelex',
      code: 'CEX-003',
      createdAt: '2025-01-06T21:30:42.038488Z',
      updatedAt: '2025-01-06T21:30:42.038488Z',
    },
    stockQuantity: 150,
    sufficientStock: true,
    minimumOrderCount: 0,
    deliveryDate: '2025-01-13',
  },
];

export default mockMedicationsList;
