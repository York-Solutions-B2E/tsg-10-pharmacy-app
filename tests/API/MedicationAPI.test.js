jest.mock('../../src/API/RequestAPI');
jest.mock('../../src/util/ValidateAPI');

import * as ValidateAPI from '../../src/util/ValidateAPI';
import RequestAPI from '../../src/API/RequestAPI';
import {
  getAllMedications,
  updateMedicationStock,
} from '../../src/API/MedicationAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');
const putRequestSpy = jest.spyOn(RequestAPI, 'putRequest');

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

describe('updateMedicationStock', () => {
  it('should call RequestAPI.putRequest with correct args', async () => {
    const updatedQuantity = 200;
    const data = {
      id: 56,
      stockQuantity: 300,
    };
    const dataString = JSON.stringify({
      stockQuantity: updatedQuantity,
    });
    const endpoint = `/api/inventory/${data.id}`;
    await updateMedicationStock(data, updatedQuantity);

    expect(putRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
  });

  it('should return result of RequestAPI.putRequest', async () => {
    const expectedResult = 'result';
    putRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await updateMedicationStock(
      {
        id: 123456,
        stockQuantity: 400,
        sufficientStock: false,
      },
      250
    );

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

  describe('updateMedicationStock', () => {
    it('should throw if validateInventory throws', async () => {
      jest
        .spyOn(ValidateAPI, 'validateInventory')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      const response = await updateMedicationStock(
        {
          id: 12,
        },
        800
      );

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(400);
    });

    it('should throw if updatedQuantity is not a number >= 0', async () => {
      await updateMedicationStock({ id: 123456 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 123456 }, null);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 123456 }, 'gdsfg');
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 123456 }, -15);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      expect(errorSpy).toHaveBeenCalledTimes(4);
    });
  });
});
