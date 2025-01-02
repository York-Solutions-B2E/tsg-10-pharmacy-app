jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import {
	getAllPrescriptions,
	fillPrescription,
	markPickedUp,
} from '../../src/API/PrescriptionAPI';

afterEach(() => {
	jest.resetAllMocks();
});

describe('getAllPrescriptions', () => {
	const requestSpy = jest.spyOn(RequestAPI, 'getRequest');

	it('should call RequestAPI.getRequest with correct args', async () => {
		await getAllPrescriptions();

		expect(requestSpy).toHaveBeenCalledWith('/api/prescriptions');
	});

	it('should return result of RequestAPI.getRequest', async () => {
		const expectedResult = 'result';
		RequestAPI.getRequest = jest
			.fn()
			.mockImplementationOnce(() => expectedResult);

		const response = await getAllPrescriptions();
		expect(response).toBe(expectedResult);
	});
});

describe('fillPrescription', () => {
	const requestSpy = jest.spyOn(RequestAPI, 'putRequest');

	it('should call RequestAPI.putRequest with correct args', async () => {
		const data = {
			id: 123456,
			prescriptionId: 654321,
			medicineId: 456789,
			patientId: 987654,
			quantity: 999,
			instructions: 'instructions',
			status: 'AWAITING_SHIPMENT',
		};
		const dataString = JSON.stringify({ ...data, status: 'FILLED' });
		const endpoint = `/api/prescriptions/${data.id}`;

		await fillPrescription(data);
		expect(requestSpy).toHaveBeenCalledWith(endpoint, dataString);
	});

	it('should throw if prescription arg is undefined or null', async () => {
		jest.spyOn(console, 'error').mockImplementation();
		let response;

		response = await fillPrescription();
		expect(console.error).toHaveBeenCalledWith(
			new Error('No prescription provided')
		);
		expect(response.status).toBe(400);

		response = await fillPrescription(null);
		expect(console.error).toHaveBeenCalledWith(
			new Error('Provided prescription is null')
		);
		expect(response.status).toBe(400);

		console.error.mockRestore();
	});

	it('should return result of RequestAPI.putRequest', async () => {
		const expectedResult = 'result';
		RequestAPI.putRequest = jest
			.fn()
			.mockImplementationOnce(() => expectedResult);

		const response = await fillPrescription({});
		expect(response).toBe(expectedResult);
	});
});

describe('markPickedUp', () => {
	it('should call RequestAPI.putRequest with correct args', async () => {
		throw new Error();
	});

	it('should throw if prescription arg is undefined or null', async () => {
		throw new Error();
	});

	it('should return result of RequestAPI.putRequest', async () => {
		throw new Error();
	});
});
