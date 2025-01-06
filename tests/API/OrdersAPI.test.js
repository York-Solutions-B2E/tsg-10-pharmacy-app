jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';

import { getAllOrders } from '../../src/API/OrdersAPI';

afterEach(() => {
  jest.resetAllMocks();
});

describe('getAllOrders', () => {
  it('should call RequestAPI.getRequest with correct args', async () => {
    throw new Error();
  });

  it('should return result of RequestAPI.getRequest', async () => {
    throw new Error();
  });
});
