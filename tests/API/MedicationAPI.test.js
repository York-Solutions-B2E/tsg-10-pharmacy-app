jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import { getAllMedications } from '../../src/API/MedicationAPI';

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
    const data = {
      id: 56,
      stockQuantity: 300,
      sufficientStock: true,
    };
    const dataString = JSON.stringify(data);
    const endpoint = `/api/inventory/${data.id}`;
    await updateMedicationStock(data);

    expect(putRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
  });

  it('should return result of RequestAPI.putRequest', async () => {
    const expectedResult = 'result';
    putRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = await updateMedicationStock({
      id: 123456,
      stockQuantity: 400,
      sufficientStock: false,
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

  describe('updateMedicationStock', () => {
    it('should throw if inventory.id is not a positive number', async () => {
      await updateMedicationStock({ id: undefined, stockQuantity: 300 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: null, stockQuantity: 300 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 'NaN', stockQuantity: 300 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 0, stockQuantity: 300 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );
    });

    it('should throw if updatedQuantity is not a number >= 0', async () => {
      await updateMedicationStock({ id: undefined, stockQuantity: undefined });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: null, stockQuantity: null });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 'NaN', stockQuantity: 'NaN' });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 300, stockQuantity: -5 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );
    });
  });
});
