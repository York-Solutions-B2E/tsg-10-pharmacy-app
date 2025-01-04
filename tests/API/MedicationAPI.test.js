jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');

afterEach(() => {
  jest.resetAllMocks();
});

describe('getAllMedications', () => {
  it('should call RequestAPI.getRequest with correct args', async () => {
    throw new Error();
  });

  it('should return result of RequestAPI.getRequest', async () => {
    throw new Error();
  });
});

describe('exceptions', () => {
  it('', async () => {
    // throw new Error();
  });
});
