import RequestAPI from './RequestAPI';
import dayjs from 'dayjs';

export const getAllOrders = async () => {
  return await RequestAPI.getRequest('/api/orders');
};

export const placeOrder = async (order) => {
  try {
    if (order === undefined) throw new Error('Order cannot be undefined');
    if (order === null) throw new Error('Order cannot be null');
    if (
      order.medicineId === undefined ||
      isNaN(order.medicineId) ||
      order.medicineId < 1
    )
      throw new Error('Medicine id must be a positive number');
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
    return await RequestAPI.postRequest('/api/orders', JSON.stringify(order));
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: { message: error.message } };
  }
};
