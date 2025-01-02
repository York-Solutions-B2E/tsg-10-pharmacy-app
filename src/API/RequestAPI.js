import { request } from './request';

class RequestAPI {

	static getRequest = async (endpoint) => {
		return await request({endpoint: endpoint, method: "GET"});
	}

	static postRequest = async (endpoint, data) => {
		return await request({endpoint: endpoint, method: "POST", body: data});
	}

	static putRequest = async (endpoint, data) => {
		return await request({endpoint: endpoint, method: "PUT", body: data});
	}

	static deleteRequest = async (endpoint) => {
		return await request({endpoint: endpoint, method: "DELETE"});
	}

}

export default RequestAPI;