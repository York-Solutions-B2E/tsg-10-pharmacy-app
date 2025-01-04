import { request } from './request';

/**
 * Interface for the request function
 * @AllStatic
 * @AllAsync
 * @Function getRequest
 * @Function postRequest
 * @Function putRequest
 * @Function deleteRequest
 * */
class RequestAPI {
	/**
	 * Makes request call to the given endpoint using the GET method
	 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
	 * @Optional
	 * @Param String endpoint
	 */
	static getRequest = async (endpoint) => {
		return await request({ endpoint: endpoint, method: 'GET' });
	};

	/**
	 * Makes request call to the given endpoint using the POST method and supplied data payload
	 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
	 * @Optional
	 * @Param String endpoint
	 * @Optional
	 * @Param String body
	 */
	static postRequest = async (endpoint, data) => {
		return await request({ endpoint: endpoint, method: 'POST', body: data });
	};

	/**
	 * Makes request call to the given endpoint using the PUT method and supplied data payload
	 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
	 * @Optional
	 * @Param String endpoint
	 * @Optional
	 * @Param String body
	 */
	static putRequest = async (endpoint, data) => {
		return await request({ endpoint: endpoint, method: 'PUT', body: data });
	};

	/**
	 * Makes request call to the given endpoint using the DELETE method
	 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
	 * @Optional
	 * @Param String endpoint
	 */
	static deleteRequest = async (endpoint) => {
		return await request({ endpoint: endpoint, method: 'DELETE' });
	};
}

export default RequestAPI;
