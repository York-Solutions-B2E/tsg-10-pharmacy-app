jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';

import { getAllOrders, placeOrder } from '../../src/API/OrdersAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');
const postRequestSpy = jest.spyOn(RequestAPI, 'postRequest');

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
    const data = {
      medicineId: 1,
      quantity: 100,
      deliveryDate: '2025-02-17',
    };
    const dataString = JSON.stringify(data);
    const endpoint = '/api/orders';
    await placeOrder(data);

    expect(postRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
  });

  it('should return result of RequestAPI.postRequest', async () => {
    const expectedResult = 'result';
    postRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await placeOrder({
      medicineId: 4,
      quantity: 300,
      deliveryDate: '2025-06-26',
    });

    expect(response).toBe(expectedResult);
  });
});

describe('exceptions', () => {
  const unmockedError = console.error;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation();

  afterAll(() => {
    console.error = unmockedError;
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  describe('placeOrder', () => {
    it('should throw if medicineId is not a positive number', async () => {
      throw new Error();
    });

    it('should throw if order quantity is not a positive number', async () => {
      throw new Error();
    });

    it('should throw if deliveryDate is not in the future', async () => {
      throw new Error();
    });

    it('should throw if order is undefined or null', async () => {
      throw new Error();
    });
  });
});
