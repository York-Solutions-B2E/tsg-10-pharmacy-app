jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import {
	getAllPrescriptions,
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
		const putRequestSpy = jest.spyOn(RequestAPI, 'putRequest');

		it('should throw if prescription.id is not a positive number', async () => {
			await fillPrescription({ id: undefined });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await fillPrescription({ id: null });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await fillPrescription({ id: 'id' });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await fillPrescription({ id: 0 });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);
		});

		it('should throw if prescription.status is not NEW', async () => {
			const data = { id: 123456, status: 'AWAITING_SHIPMENT' };

			await fillPrescription(data);

			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Only NEW prescriptions can be FILLED')
			);
		});

		it('should throw if prescription arg is undefined or null', async () => {
			let response;

			response = await fillPrescription();
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('No prescription provided')
			);
			expect(response.status).toBe(400);

			response = await fillPrescription(null);
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Provided prescription is null')
			);
			expect(response.status).toBe(400);
		});
	});

	describe('markPickedUp', () => {
		const putRequestSpy = jest.spyOn(RequestAPI, 'putRequest');

		it('should throw if prescription.id is not a positive number', async () => {
			await markPickedUp({ id: undefined });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await markPickedUp({ id: null });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await markPickedUp({ id: 'id' });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);

			await markPickedUp({ id: 0 });
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Prescription id must be a positive number')
			);
		});

		it('should throw if prescription.status is not FILLED', async () => {
			const data = { id: 123456, status: 'NEW' };

			await markPickedUp(data);

			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Only FILLED prescriptions can be picked up')
			);
		});

		it('should throw if prescription arg is undefined or null', async () => {
			let response;

			response = await markPickedUp();
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('No prescription provided')
			);
			expect(response.status).toBe(400);

			response = await markPickedUp(null);
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('Provided prescription is null')
			);
			expect(response.status).toBe(400);
		});
	});
});
