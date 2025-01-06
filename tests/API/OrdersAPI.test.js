jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import dayjs from 'dayjs';

import OrdersAPI from '../../src/API/OrdersAPI';

const { validateOrder, getAllOrders, placeOrder, markOrderReceived } =
  OrdersAPI;

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
    const dataString = JSON.stringify(data);
    const endpoint = `/api/orders/received/${data.id}`;

    await markOrderReceived(data);

    expect(putRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
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
 * Tests for validateOrder
 * */
describe('validateOrder', () => {
  it('should return true if order is valid', async () => {
    const orderValid = validateOrder({
      medicineId: 22,
      quantity: 50,
      deliveryDate: dayjs().add(1, 'week'),
    });

    expect(orderValid).toBe(true);
  });

  it('should return error if order.medicineId is not a positive number', async () => {
    let orderValid;

    orderValid = await validateOrder({
      quantity: 300,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: null,
      quantity: 300,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 'hello',
      quantity: 300,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: -45,
      quantity: 300,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);
  });

  it('should return error if order.quantity is not a positive number', async () => {
    let orderValid;

    orderValid = await validateOrder({
      medicineId: 201,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: null,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: 'NaN',
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: -78,
      deliveryDate: dayjs().add(1, 'week'),
    });
    expect(orderValid instanceof Error).toBe(true);
  });

  it('should return error if oder.deliveryDate is not a date in the future', async () => {
    let orderValid;

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: 300,
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: 300,
      deliveryDate: null,
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: 300,
      deliveryDate: 'hello',
    });
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder({
      medicineId: 201,
      quantity: 300,
      deliveryDate: dayjs('2000-01-01'),
    });
    expect(orderValid instanceof Error).toBe(true);
  });

  it('should return error if order is undefined or null', async () => {
    let orderValid;

    orderValid = await validateOrder();
    expect(orderValid instanceof Error).toBe(true);

    orderValid = await validateOrder(null);
    expect(orderValid instanceof Error).toBe(true);
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

  describe('markOrderReceived', () => {
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
