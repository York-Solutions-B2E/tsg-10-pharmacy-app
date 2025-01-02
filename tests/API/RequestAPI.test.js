jest.mock('../../src/API/request');

import * as request from '../../src/API/request';
import RequestAPI from '../../src/API/RequestAPI';

const errorSpy = jest.spyOn(console, 'error').mockImplementation();
const requestSpy = jest.spyOn(request, 'request');

afterEach(() => {
	jest.resetAllMocks();
});

describe('RequestAPI.getRequest', () => {
	
	it('should call request with correct args', async () => {
		const endpoint = "/endpoint";
		await RequestAPI.getRequest(endpoint);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "GET"});
	});

	it('should return result from request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.getRequest();

		expect(response).toBe(expectedResult);
	});

});