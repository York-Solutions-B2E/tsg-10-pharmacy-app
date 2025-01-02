import RequestAPI from './RequestAPI';

export const getAllPrescriptions = async () => {
	return await RequestAPI.getRequest('/api/prescriptions');
};
