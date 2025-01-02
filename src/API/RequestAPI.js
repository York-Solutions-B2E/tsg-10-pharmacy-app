import { request } from './request';

class RequestAPI {

	static getRequest = async (endpoint) => {
		return await request({endpoint: endpoint, method: "GET"});
	}

	static postRequest = async (data, endpoint) => {
		try {
			if (data === undefined)
				throw new Error("Post request body cannot be undefined");
			if (data === null)
				throw new Error("Post request body cannot be null");
			if (data.constructor !== Object)
				throw new Error("Post request body must be a JSON object");

			return await request({endpoint: endpoint, method: "POST", body: JSON.stringify(data)});
		} catch (error) {
			console.error(error);
			return {ok: false, status: 400, body: "Client error"};
		}
	}

	static putRequest = async (data, endpoint) => {
		try {
			if (data === undefined)
				throw new Error("Put request body cannot be undefined");
			if (data === null)
				throw new Error("Put request body cannot be null");
			if (data.constructor !== Object)
				throw new Error("Put request body must be a JSON object");

			return await request({endpoint: endpoint, method: "PUT", body: JSON.stringify(data)});
		} catch (error) {
			console.error(error);
			return {ok: false, status: 400, body: "Client error"};
		}
	}

}

export default RequestAPI;