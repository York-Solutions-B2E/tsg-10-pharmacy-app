jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import {
  getAllMedications,
  updateMedicationStock,
  adjustMedicationStock,
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
      sufficientStock: true,
    };
    const dataString = JSON.stringify({
      ...data,
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

describe('adjustMedicationStock', () => {
  it('should call RequestAPI.putRequest with correct args', async () => {
    const data = { id: 123456 };
    const stockAdjustment = 57;
    const endpoint = `/api/inventory/${data.id}/adjust-stock/${stockAdjustment}`;

    await adjustMedicationStock(data, stockAdjustment);

    expect(putRequestSpy).toHaveBeenCalledWith(endpoint);
  });

  it('should return result of RequestAPI.putRequest', async () => {
    const expectedResult = 'result';
    putRequestSpy.mockImplementationOnce(() => expectedResult);

    const response = adjustMedicationStock({ id: 123456 }, -38);

    expect(response).toBe(expectedResult);
  });

  it('should return response.ok if stockAdjustment == 0', async () => {
    const response = adjustMedicationStock({ id: 123456 }, 0);

    expect(response.ok).toBe(true);
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
      await updateMedicationStock({ id: undefined }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: null }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 'NaN' }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 0 }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );
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

      await updateMedicationStock({ id: 123456 }, 'NaN');
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );

      await updateMedicationStock({ id: 123456 }, -15);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a non-negative number')
      );
    });

    it('should throw if inventory provided is undefined or null', async () => {
      let response;

      response = await updateMedicationStock();
      expect(errorSpy).toHaveBeenCalledWith(new Error('No inventory provided'));
      expect(response.status).toBe(400);

      response = await updateMedicationStock(null);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Provided inventory is null')
      );
      expect(response.status).toBe(400);
    });
  });

  describe('adjustMedicationStock', () => {
    it('should throw if inventory.id is not a positive number', async () => {
      await updateMedicationStock({ id: undefined }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: null }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 'NaN' }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );

      await updateMedicationStock({ id: 0 }, 100);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Inventory id must be a positive number')
      );
    });

    it('should throw if stockAdjustment is not a number', async () => {
      await updateMedicationStock({ id: 123456 });
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a number')
      );

      await updateMedicationStock({ id: 123456 }, null);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a number')
      );

      await updateMedicationStock({ id: 123456 }, 'NaN');
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Updated quantity must be a number')
      );
    });

    it('should throw if inventory provided is undefined or null', async () => {
      let response;

      response = await adjustMedicationStock();
      expect(errorSpy).toHaveBeenCalledWith(new Error('No inventory provided'));
      expect(response.status).toBe(400);

      response = await adjustMedicationStock(null);
      expect(errorSpy).toHaveBeenCalledWith(
        new Error('Provided inventory is null')
      );
      expect(response.status).toBe(400);
    });
  });
});
