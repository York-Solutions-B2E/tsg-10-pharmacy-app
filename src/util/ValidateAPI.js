import dayjs from 'dayjs';

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
  if (
    order.deliveryDate === undefined ||
    order.deliveryDate === null ||
    !dayjs(order.deliveryDate).isValid() ||
    dayjs().isAfter(order.deliveryDate)
  )
    throw new Error('Delivery date must be a date in the future');
};
