import RequestAPI from './RequestAPI';
import dayjs from 'dayjs';

export const validateOrder = (order) => {
  if (order === undefined) return new Error('Order cannot be undefined');
  if (order === null) return new Error('Order cannot be null');
  if (
    order.medicineId === undefined ||
    isNaN(order.medicineId) ||
    order.medicineId < 1
  )
    return new Error('Medicine id must be a positive number');
  if (
    order.quantity === undefined ||
    isNaN(order.quantity) ||
    order.quantity < 1
  )
    return new Error('Order quantity must be a positive number');
  if (
    order.deliveryDate === undefined ||
    order.deliveryDate === null ||
    !dayjs(order.deliveryDate).isValid() ||
    dayjs().isAfter(order.deliveryDate)
  )
    return new Error('Delivery date must be a date in the future');
  return true;
};

export const getAllOrders = async () => {
  return await RequestAPI.getRequest('/api/orders');
};

export const placeOrder = async (order) => {
  try {
    const orderValid = validateOrder(order);
    if (orderValid instanceof Error) throw orderValid;
    return await RequestAPI.postRequest('/api/orders', JSON.stringify(order));
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: { message: error.message } };
  }
};

export const markOrderReceived = async (order) => {
  try {
    const orderValid = validateOrder(order);
    if (orderValid instanceof Error) throw orderValid;
    if (isNaN(order.id) || order.id < 1)
      throw new Error('Order id must be a positive number');
    if (order.status === 'RECEIVED') throw new Error('Order already received');
    return await RequestAPI.putRequest(
      `/api/orders/received/${order.id}`,
      JSON.stringify(order)
    );
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: { message: error.message } };
  }
};

const OrdersAPI = {
  validateOrder,
  getAllOrders,
  placeOrder,
  markOrderReceived,
};
export default OrdersAPI;
