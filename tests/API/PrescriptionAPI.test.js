jest.mock('../../src/API/RequestAPI');
jest.mock('../../src/util/ValidateAPI');

import * as ValidateAPI from '../../src/util/ValidateAPI';
import RequestAPI from '../../src/API/RequestAPI';
import {
	getAllPrescriptions,
	getAllActivePrescriptions,
	fillPrescription,
	markPickedUp,
} from '../../src/API/PrescriptionAPI';

const getRequestSpy = jest.spyOn(RequestAPI, 'getRequest');
const putRequestSpy = jest.spyOn(RequestAPI, 'putRequest');

afterEach(() => {
	jest.resetAllMocks();
});

describe('getAllPrescriptions', () => {
	it('should call RequestAPI.getRequest with correct args', async () => {
		await getAllPrescriptions();

		expect(getRequestSpy).toHaveBeenCalledWith('/api/prescriptions');
	});

	it('should return result of RequestAPI.getRequest', async () => {
		const expectedResult = 'result';
		getRequestSpy.mockImplementationOnce(() => expectedResult);

		const response = await getAllPrescriptions();
		expect(response).toBe(expectedResult);
	});
});

describe('getAllActivePrescriptions', () => {
	it('should call RequestAPI.getRequest with correct args', async () => {
		await getAllActivePrescriptions();

		expect(getRequestSpy).toHaveBeenCalledWith('/api/prescriptions/active');
	});

	it('should return result of RequestAPI.getRequest', async () => {
		const expectedResult = 'result';
		getRequestSpy.mockImplementationOnce(() => expectedResult);

		const response = await getAllActivePrescriptions();
		expect(response).toBe(expectedResult);
	});
});

describe('fillPrescription', () => {
	it('should call RequestAPI.putRequest with correct args', async () => {
		const data = {
			id: 123456,
			status: 'NEW',
		};
		const dataString = JSON.stringify({ ...data, status: 'FILLED' });
		const endpoint = `/api/prescriptions/${data.id}`;

		await fillPrescription(data);
		expect(putRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
	});

	it('should return result of RequestAPI.putRequest', async () => {
		const expectedResult = 'result';
		putRequestSpy.mockImplementationOnce(() => expectedResult);

		const response = await fillPrescription({ id: 123456, status: 'NEW' });
		expect(response).toBe(expectedResult);
	});
});

describe('markPickedUp', () => {
	it('should call RequestAPI.putRequest with correct args', async () => {
		const data = {
			id: 123456,
			status: 'FILLED',
		};
		const dataString = JSON.stringify({ ...data, status: 'PICKED_UP' });
		const endpoint = `/api/prescriptions/${data.id}`;

		await markPickedUp(data);
		expect(putRequestSpy).toHaveBeenCalledWith(endpoint, dataString);
	});

	it('should return result of RequestAPI.putRequest', async () => {
		const expectedResult = 'result';
		putRequestSpy.mockImplementationOnce(() => expectedResult);

		const response = await markPickedUp({ id: 123456, status: 'FILLED' });
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

	describe('fillPrescription', () => {
		it('should throw if validatePrescription throws', async () => {
			jest
				.spyOn(ValidateAPI, 'validatePrescription')
				.mockImplementationOnce(() => {
					throw new Error();
				});

			const response = await fillPrescription({ id: 123, status: 'NEW' });

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(response.status).toBe(400);
		});

		it('should throw if prescription.status is not NEW or STOCK_RECEIVED', async () => {
			const data = { id: 123456, status: 'AWAITING_SHIPMENT' };

			await fillPrescription(data);

			expect(errorSpy).toHaveBeenCalledWith(
				new Error(
					'Only prescriptions with a status of NEW or STOCK_RECEIVED can be FILLED'
				)
			);

			expect(errorSpy).toHaveBeenCalledTimes(1);

			await fillPrescription({ ...data, status: 'NEW' });
			await fillPrescription({ ...data, status: 'STOCK_RECEIVED' });

			expect(errorSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('markPickedUp', () => {
		it('should throw if validatePrescription throws', async () => {
			jest
				.spyOn(ValidateAPI, 'validatePrescription')
				.mockImplementationOnce(() => {
					throw new Error();
				});

			const response = await markPickedUp({ id: 123, status: 'NEW' });

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(response.status).toBe(400);
		});

		it('should throw if prescription.status is not FILLED', async () => {
			const data = { id: 123456, status: 'NEW' };

			await markPickedUp(data);

			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Only FILLED prescriptions can be picked up')
			);
		});
	});
});
