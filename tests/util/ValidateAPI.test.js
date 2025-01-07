import dayjs from 'dayjs';
import { validateOrder } from '../../src/util/ValidateAPI';

const unmockedError = console.error;
const errorSpy = jest.spyOn(console, 'error').mockImplementation();

afterAll(() => {
  console.error = unmockedError;
});

afterEach(() => {
  errorSpy.mockReset();
});

/**
 * Tests for validateOrder
 * */
describe('validateOrder', () => {
  it('should not throw if order is valid', async () => {
    try {
      validateOrder({
        inventoryId: 22,
        quantity: 50,
        deliveryDate: dayjs().add(1, 'week'),
      });
    } catch (error) {
      console.error(error);
    }
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });

  it('should throw if order.inventoryId is not a positive number', async () => {
    const invalidArgs = [undefined, null, 'hello', -45];
    for (var i = 0; i < invalidArgs.length; i++) {
      try {
        validateOrder({
          inventoryId: invalidArgs[i],
          quantity: 300,
          deliveryDate: dayjs().add(1, 'week'),
        });
      } catch (error) {
        console.error(error);
      }
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );
    }
    expect(errorSpy).toHaveBeenCalledTimes(invalidArgs.length);
  });

  it('should throw if order.quantity is not a positive number', async () => {
    const invalidArgs = [undefined, null, 'hello', -45];
    for (var i = 0; i < invalidArgs.length; i++) {
      try {
        validateOrder({
          inventoryId: 201,
          quantity: invalidArgs[i],
          deliveryDate: dayjs().add(1, 'week'),
        });
      } catch (error) {
        console.error(error);
      }
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Order quantity must be a positive number')
      );
    }
    expect(errorSpy).toHaveBeenCalledTimes(invalidArgs.length);
  });

  it('should throw if order is undefined or null', async () => {
    try {
      validateOrder();
    } catch (error) {
      console.error(error);
    }

    try {
      validateOrder(null);
    } catch (error) {
      console.error(error);
    }

    expect(errorSpy).toHaveBeenCalledWith(
      new Error('Order cannot be undefined')
    );
    expect(errorSpy).toHaveBeenCalledWith(new Error('Order cannot be null'));

    expect(errorSpy).toHaveBeenCalledTimes(2);
  });
});
