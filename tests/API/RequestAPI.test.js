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
		const dataString = JSON.stringify(data);
		await RequestAPI.postRequest(data, endpoint);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "POST", body: dataString});
	});

	it('should return result from good request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.postRequest({test: "test-data"}, "/post/good/request");

		expect(response).toBe(expectedResult);
	});

	describe('exceptions', () => {

		afterEach(() => {
			errorSpy.mockReset();
		});

		it('should throw when data arg is undefined', async () => {
			const response = await RequestAPI.postRequest();

			expect(errorSpy).toHaveBeenCalledWith(new Error("Post request body cannot be undefined"));
			expect(response.status).toBe(400);
		});

		it('should throw when data arg is null', async () => {
			const response = await RequestAPI.postRequest(null);

			expect(errorSpy).toHaveBeenCalledWith(new Error("Post request body cannot be null"));
			expect(response.status).toBe(400);
		});
	
		it('should throw when data arg is not a json object', async () => {
			const response = await RequestAPI.postRequest("string");

			expect(errorSpy).toHaveBeenCalledWith(new Error("Post request body must be a JSON object"));
			expect(response.status).toBe(400);
		});

	});

});

describe('RequestAPI.putRequest', () => {
	
	it('should call request with correct args', async () => {
		const endpoint = "/put";
		const data = {test: "test-data"};
		const dataString = JSON.stringify(data);
		await RequestAPI.putRequest(data, endpoint);

		expect(requestSpy).toHaveBeenCalledWith({endpoint: endpoint, method: "PUT", body: dataString});
	});

	it('should return result from good request call', async () => {
		const expectedResult = "result"
		request.request = requestSpy.mockImplementation(() => expectedResult);

		const response = await RequestAPI.putRequest({test: "test-data"}, "/put/good/request");

		expect(response).toBe(expectedResult);
	});

	describe('exceptions', () => {

		afterEach(() => {
			errorSpy.mockReset();
		});

		it('should throw when data arg is undefined', async () => {
			const response = await RequestAPI.putRequest();

			expect(errorSpy).toHaveBeenCalledWith(new Error("Put request body cannot be undefined"));
			expect(response.status).toBe(400);
		});

		it('should throw when data arg is null', async () => {
			const response = await RequestAPI.putRequest(null);

			expect(errorSpy).toHaveBeenCalledWith(new Error("Put request body cannot be null"));
			expect(response.status).toBe(400);
		});
	
		it('should throw when data arg is not a json object', async () => {
			const response = await RequestAPI.putRequest("string");

			expect(errorSpy).toHaveBeenCalledWith(new Error("Put request body must be a JSON object"));
			expect(response.status).toBe(400);
		});

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