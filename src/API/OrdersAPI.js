import RequestAPI from './RequestAPI';

export const getAllOrders = async () => {
  return await RequestAPI.getRequest('/api/orders');
};
