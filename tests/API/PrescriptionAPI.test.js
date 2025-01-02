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

	it('should throw if prescription.id is not a positive number', async () => {
		jest.spyOn(console, 'error').mockImplementation();

		await fillPrescription({ id: undefined });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await fillPrescription({ id: null });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await fillPrescription({ id: 'id' });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await fillPrescription({ id: 0 });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		console.error.mockRestore();
	});

	it('should throw if prescription.status is not NEW', async () => {
		jest.spyOn(console, 'error').mockImplementationOnce();
		const data = { status: 'AWAITING_SHIPMENT' };

		await markPickedUp(data);

		expect(console.error).toHaveBeenCalledWith(
			new Error('Only NEW prescriptions can be FILLED')
		);

		console.error.mockRestore();
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
	const requestSpy = jest.spyOn(RequestAPI, 'putRequest');

	it('should call RequestAPI.putRequest with correct args', async () => {
		const data = {
			id: 123456,
			prescriptionId: 654321,
			medicineId: 456789,
			patientId: 987654,
			quantity: 999,
			instructions: 'instructions',
			status: 'FILLED',
		};
		const dataString = JSON.stringify({ ...data, status: 'PICKED_UP' });
		const endpoint = `/api/prescriptions/${data.id}`;

		await markPickedUp(data);
		expect(requestSpy).toHaveBeenCalledWith(endpoint, dataString);
	});

	it('should throw if prescription.id is not a positive number', async () => {
		jest.spyOn(console, 'error').mockImplementation();

		await markPickedUp({ id: undefined });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await markPickedUp({ id: null });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await markPickedUp({ id: 'id' });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		await markPickedUp({ id: 0 });
		expect(console.error).toHaveBeenCalledWith(
			new Error('Prescription id must be a positive number')
		);

		console.error.mockRestore();
	});

	it('should throw if prescription.status is not FILLED', async () => {
		jest.spyOn(console, 'error').mockImplementationOnce();
		const data = { status: 'NEW' };

		await markPickedUp(data);

		expect(console.error).toHaveBeenCalledWith(
			new Error('Only FILLED prescriptions can be picked up')
		);

		console.error.mockRestore();
	});

	it('should throw if prescription arg is undefined or null', async () => {
		jest.spyOn(console, 'error').mockImplementation();
		let response;

		response = await markPickedUp();
		expect(console.error).toHaveBeenCalledWith(
			new Error('No prescription provided')
		);
		expect(response.status).toBe(400);

		response = await markPickedUp(null);
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

		const response = await markPickedUp({});
		expect(response).toBe(expectedResult);
	});
});
