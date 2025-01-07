/**
 * Helper function for validating the order argument passed to placeOrder and markOrderReceived
 * */
export const validateOrder = (order) => {
  if (order === undefined) throw new Error('Order cannot be undefined');
  if (order === null) throw new Error('Order cannot be null');
  if (
    order.inventoryId === undefined ||
    isNaN(order.inventoryId) ||
    order.inventoryId < 1
  )
    throw new Error('Inventory id must be a positive number');
  if (
    order.quantity === undefined ||
    isNaN(order.quantity) ||
    order.quantity < 1
  )
    throw new Error('Order quantity must be a positive number');
};

/**
 * Helper function for validating the prescription argument passed to fillPrescription and markPickedUp
 * */
export const validatePrescription = (prescription) => {
  if (prescription === undefined)
    throw new Error('Prescription cannot be undefined');
  if (prescription === null) throw new Error('Prescription cannot be null');
  if (
    prescription.id === undefined ||
    isNaN(prescription.id) ||
    prescription.id < 1
  )
    throw new Error('Prescription id must be a positive number');
  if (prescription.status === undefined || prescription.status === null)
    throw new Error('Prescription must have a status');
};

/**
 * Helper function for validating the inventory argument passed to updateInventory
 * */
export const validateInventory = (inventory) => {
  if (inventory === undefined) throw new Error('Inventory cannot be undefined');
  if (inventory === null) throw new Error('Inventory cannot be null');
  if (inventory.id === undefined || isNaN(inventory.id) || inventory.id < 1)
    throw new Error('Inventory id must be a positive number');
};
