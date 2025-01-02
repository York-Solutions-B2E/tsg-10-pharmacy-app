jest.mock('../../src/API/RequestAPI');

import RequestAPI from '../../src/API/RequestAPI';
import {
	getAllPrescriptions,
	fillPrescription,
	markPickedUp,
} from '../../src/API/PrescriptionAPI';

const requestSpy = jest.spyOn(RequestAPI, 'getRequest');

afterEach(() => {
	requestSpy.mockReset();
});

describe('getAllPrescriptions', () => {
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
