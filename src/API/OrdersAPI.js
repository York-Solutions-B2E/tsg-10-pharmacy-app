import RequestAPI from './RequestAPI';
import { validateOrder } from '../util/ValidateAPI';
import dayjs from 'dayjs';

/**
 * Sends a get request to get all medications from remote server
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: {Object}}
 */
export const getAllOrders = async () => {
  return await RequestAPI.getRequest('/api/orders');
};

/**
 * Sends a POST request to the server to create a new order
 * @Param {Object} order: {medicineId: {Integer}, quantity: {Integer}, deliveryDate: {dayjs}, }
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: {Object}}
 * */
export const placeOrder = async (order) => {
  try {
    validateOrder(order);
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

/**
 * Sends a PUT request to the server to update an existing order to 'RECEIVED' status
 * @Param {Object} order: {id: {Integer}, medicineId: {Integer}, quantity: {Integer}, deliveryDate: {dayjs}, status: 'ORDERED'}
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: {Object}}
 * */
export const markOrderReceived = async (order) => {
  try {
    validateOrder(order);
    if (isNaN(order.id) || order.id < 1)
      throw new Error('Order id must be a positive number');
    if (order.status === 'RECEIVED') throw new Error('Order already received');
    return await RequestAPI.putRequest(`/api/orders/received/${order.id}`);
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: { message: error.message } };
  }
};

const OrdersAPI = {
  getAllOrders,
  placeOrder,
  markOrderReceived,
};
export default OrdersAPI;
