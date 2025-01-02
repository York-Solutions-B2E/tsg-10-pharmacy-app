import { request } from './request';

class RequestAPI {

	static getRequest = async (endpoint) => {
		return await request({endpoint: endpoint, method: "GET"});
	}

}

export default RequestAPI;