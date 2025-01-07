jest.mock('../../src/API/RequestAPI');
jest.mock('../../src/util/ValidateAPI');

import RequestAPI from '../../src/API/RequestAPI';
import dayjs from 'dayjs';

import OrdersAPI from '../../src/API/OrdersAPI';
import * as ValidateAPI from '../../src/util/ValidateAPI';
const { getAllOrders, placeOrder, markOrderReceived } = OrdersAPI;

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');
const postRequestSpy = jest.spyOn(RequestAPI, 'postRequest');
const putRequestSpy = jest.spyOn(RequestAPI, 'putRequest');

afterEach(() => {
  jest.resetAllMocks();
});

/**
 * Tests for getAllOrders
 * */
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

/**
 * Tests for placeOrder
 * */
describe('placeOrder', () => {
  it('should call RequestAPI.postRequest with correct args', async () => {
    const data = {
      medicineId: 1,
      quantity: 100,
      deliveryDate: dayjs().add(1, 'week'),
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
      deliveryDate: dayjs().add(1, 'week'),
    });

    expect(response).toBe(expectedResult);
  });
});

/**
 * Tests for markOrderReceived
 * */
describe('markOrderReceived', () => {
  it('should call RequestAPI.putRequest with correct args', async () => {
    const data = {
      id: 12,
      medicineId: 23,
      quantity: 45,
      deliveryDate: dayjs().add(1, 'week'),
      status: 'ORDERED',
    };
    const endpoint = `/api/orders/received/${data.id}`;

    await markOrderReceived(data);

    expect(putRequestSpy).toHaveBeenCalledWith(endpoint);
  });

  it('should return result of RequestAPI.putRequest', async () => {
    const expectedResult = 'result';
    putRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await markOrderReceived({
      id: 12,
      medicineId: 23,
      quantity: 45,
      deliveryDate: dayjs().add(1, 'week'),
      status: 'ORDERED',
    });

    expect(response).toBe(expectedResult);
  });
});

/**
 * Tests for exception cases
 * */
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
    it('should throw if validateOrder throws', async () => {
      jest.spyOn(ValidateAPI, 'validateOrder').mockImplementationOnce(() => {
        throw new Error();
      });

      const response = await placeOrder({
        inventoryId: 23,
        quantity: 45,
        deliveryDate: dayjs().add(1, 'week'),
      });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(400);
    });

    it('should throw if order.deliveryDate is not a date in the future', async () => {
      let response;
      const invalidArgs = [undefined, null, 'hello', '2000-01-01'];
      for (var i = 0; i < invalidArgs.length; i++) {
        try {
          response = await placeOrder({
            inventoryId: 201,
            quantity: 105,
            deliveryDate: invalidArgs[i],
          });
        } catch (error) {
          console.error(error);
        }
        expect(errorSpy).toHaveBeenCalledWith(
          new Error('Delivery date must be a date in the future')
        );
        expect(response.status).toBe(400);
      }
      expect(errorSpy).toHaveBeenCalledTimes(invalidArgs.length);
    });
  });

  describe('markOrderReceived', () => {
    it('should throw if order.id is not a positive number', async () => {
      let response;
      const invalidArgs = [undefined, null, 'hello', -45];
      for (var i = 0; i < invalidArgs.length; i++) {
        try {
          response = await markOrderReceived({
            id: invalidArgs[i],
            inventoryId: 23,
            quantity: 300,
            deliveryDate: dayjs().add(1, 'week'),
          });
        } catch (error) {
          console.error(error);
        }
        expect(errorSpy).toHaveBeenCalledWith(
          new Error('Order id must be a positive number')
        );
        expect(response.status).toBe(400);
      }
      expect(errorSpy).toHaveBeenCalledTimes(invalidArgs.length);
    });

    it('should throw if validateOrder throws', async () => {
      jest.spyOn(ValidateAPI, 'validateOrder').mockImplementationOnce(() => {
        throw new Error();
      });
      let response;

      response = await markOrderReceived({
        id: 79,
        inventoryId: 23,
        quantity: 45,
        deliveryDate: dayjs().add(1, 'week'),
        status: 'ORDERED',
      });
      expect(errorSpy).toHaveBeenCalledWith(new Error());
      expect(response.status).toBe(400);
    });

    it('should throw if order already received', async () => {
      const response = await markOrderReceived({
        id: 12,
        medicineId: 23,
        quantity: 45,
        deliveryDate: dayjs().add(1, 'week'),
        status: 'RECEIVED',
      });

      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Order already received')
      );
      expect(response.status).toBe(400);
    });
  });
});
