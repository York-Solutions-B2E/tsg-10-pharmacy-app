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
		const endpoint = "/get";
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

describe('RequestAPI.postRequest', () => {
	
	it('should call request with correct args', async () => {
		const endpoint = "/post";
		const data = {test: "test-data"};
		await RequestAPI.postRequest(endpoint, data);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "POST", body: data});
	});

	it('should return result from good request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.postRequest("/post/good/request", {test: "test-data"});

		expect(response).toBe(expectedResult);
	});

});

describe('RequestAPI.putRequest', () => {
	
	it('should call request with correct args', async () => {
		const endpoint = "/put";
		const data = {test: "test-data"};
		await RequestAPI.putRequest(endpoint, data);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "PUT", body: data});
	});

	it('should return result from good request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.putRequest("/put/good/request", {test: "test-data"});

		expect(response).toBe(expectedResult);
	});

});

describe('RequestAPI.deleteRequest', () => {

	it('should call request with correct args', async () => {
		const endpoint = "/delete";
		await RequestAPI.deleteRequest(endpoint);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "DELETE"});
	});

	it('should return result from request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.deleteRequest();

		expect(response).toBe(expectedResult);
	});

});