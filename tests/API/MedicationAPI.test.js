jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import { getAllMedications } from '../../src/API/MedicationAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');

afterEach(() => {
  jest.resetAllMocks();
});

describe('getAllMedications', () => {
  it('should call RequestAPI.getRequest with correct args', async () => {
    await getAllMedications();

    expect(getRequestSpy).toHaveBeenCalledWith('/api/inventory');
  });

  it('should return result of RequestAPI.getRequest', async () => {
    const expectedResult = 'result';
    getRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await getAllMedications();

    expect(response).toBe(expectedResult);
  });
});

describe('exceptions', () => {
  it('', async () => {
    // throw new Error();
  });
});
