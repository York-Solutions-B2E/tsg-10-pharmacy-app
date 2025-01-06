jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';

import { getAllOrders } from '../../src/API/OrdersAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');

afterEach(() => {
  jest.resetAllMocks();
});

describe('getAllOrders', () => {
  it('should call RequestAPI.getRequest with correct args', async () => {
    await getAllOrders();

    expect(getRequestSpy).toHaveBeenCalledWith('/api/orders');
  });

  it('should return result of RequestAPI.getRequest', async () => {
    const expectedResult = 'result';
    getRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await getAllOrders();

    expect(response).toBe(expectedResult);
  });
});

describe('placeOrder', () => {
  it('should call RequestAPI.postRequest with correct args', async () => {
    throw new Error();
  });

  it('should return result of RequestAPI.postRequest', async () => {
    throw new Error();
  });
});
