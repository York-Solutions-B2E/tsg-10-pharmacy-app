import RequestAPI from './RequestAPI';

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
 * @Params {Object} prescription
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const fillPrescription = async (prescription) => {
	try {
		if (prescription === undefined) throw new Error('No prescription provided');
		if (prescription === null) throw new Error('Provided prescription is null');
		if (isNaN(prescription.id) || prescription.id <= 0)
			throw new Error('Prescription id must be a positive number');
		if (prescription.status !== 'NEW')
			throw new Error('Only NEW prescriptions can be FILLED');
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
 * @Params {Object} prescription
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const markPickedUp = async (prescription) => {
	try {
		if (prescription === undefined) throw new Error('No prescription provided');
		if (prescription === null) throw new Error('Provided prescription is null');
		if (isNaN(prescription.id) || prescription.id <= 0)
			throw new Error('Prescription id must be a positive number');
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

const PrescriptionAPI = { getAllPrescriptions, fillPrescription, markPickedUp };
export default PrescriptionAPI;
