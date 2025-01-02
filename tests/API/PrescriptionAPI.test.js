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
		throw new Error();
	});

	it('should throw if prescription arg is undefined or null', async () => {
		throw new Error();
	});

	it('should return result of RequestAPI.putRequest', async () => {
		throw new Error();
	});
});
