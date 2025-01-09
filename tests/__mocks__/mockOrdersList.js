const mockOrdersList = [
  {
    id: 1,
    inventory: {
      id: 1,
      medicine: {
        id: 1,
        name: 'ChocoRelief',
        code: 'CRX-001',
        createdAt: '2025-01-06T16:39:13.726428Z',
        updatedAt: '2025-01-06T16:39:13.726428Z',
      },
      stockQuantity: 100,
      sufficientStock: true,
    },
    quantity: 100,
    deliveryDate: '2025-01-11',
    status: 'ORDERED',
    createdAt: '2025-01-06T16:39:13.918578Z',
    updatedAt: '2025-01-06T16:39:13.918578Z',
  },
  {
    id: 2,
    inventory: {
      id: 2,
      medicine: {
        id: 2,
        name: 'MintyCure',
        code: 'MCX-002',
        createdAt: '2025-01-06T16:39:13.793217Z',
        updatedAt: '2025-01-06T16:39:13.793217Z',
      },
      stockQuantity: 200,
      sufficientStock: true,
    },
    quantity: 200,
    deliveryDate: '2025-01-16',
    status: 'RECEIVED',
    createdAt: '2025-01-06T16:39:13.925269Z',
    updatedAt: '2025-01-06T16:39:13.925269Z',
  },
];

export default mockOrdersList;
