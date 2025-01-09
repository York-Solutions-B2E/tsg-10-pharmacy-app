import RequestAPI from './RequestAPI';
import { validatePrescription } from '../util/ValidateAPI';

/**
 * Sends a get request to get all prescriptions from remote server
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const getAllPrescriptions = async () => {
	return await RequestAPI.getRequest('/api/prescriptions');
};

/**
 * Sends a get request to get all active prescriptions from remote server
 * Excludes CANCELLED and PICKED_UP prescriptions
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const getAllActivePrescriptions = async () => {
	return await RequestAPI.getRequest('/api/prescriptions/active');
};

/**
 * Sends put request to update the prescription status to FILLED
 * @Params {Object} {
 * 	id: {Integer},
 * 	status: {String},
 * 	quantity: {Integer},
 * 	instructions: {String},
 * 	medicine: {
 * 		id: {Integer},
 * 		name: {String},
 * 		code: {String}
 * 	}
 * }
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const fillPrescription = async (prescription) => {
	try {
		validatePrescription(prescription);
		if (
			prescription.status !== 'NEW' &&
			prescription.status !== 'STOCK_RECEIVED'
		)
			throw new Error(
				'Only prescriptions with a status of NEW or STOCK_RECEIVED can be FILLED'
			);
		return await RequestAPI.putRequest(
			`/api/prescriptions/${prescription.id}`,
			JSON.stringify({ id: prescription.id, status: 'FILLED' })
		);
	} catch (error) {
		console.error(error);
		return { ok: false, status: 400, body: null };
	}
};

/**
 * Sends put request to update the prescription status to PICKED_UP
 * @Params {Object} {
 * 	id: {Integer},
 * 	status: {String},
 * 	quantity: {Integer},
 * 	instructions: {String},
 * 	medicine: {
 * 		id: {Integer},
 * 		name: {String},
 * 		code: {String}
 * 	}
 * }
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const markPickedUp = async (prescription) => {
	try {
		validatePrescription(prescription);
		if (prescription.status !== 'FILLED')
			throw new Error('Only FILLED prescriptions can be picked up');
		return await RequestAPI.putRequest(
			`/api/prescriptions/${prescription.id}`,
			JSON.stringify({ id: prescription.id, status: 'PICKED_UP' })
		);
	} catch (error) {
		console.error(error);
		return { ok: false, status: 400, body: null };
	}
};

const PrescriptionAPI = { getAllActivePrescriptions, getAllPrescriptions, fillPrescription, markPickedUp };
export default PrescriptionAPI;
