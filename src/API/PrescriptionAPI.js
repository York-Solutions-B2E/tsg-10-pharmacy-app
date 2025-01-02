import RequestAPI from './RequestAPI';

export const getAllPrescriptions = async () => {
	return await RequestAPI.getRequest('/api/prescriptions');
};

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
			JSON.stringify({ ...prescription, status: 'FILLED' })
		);
	} catch (error) {
		console.error(error);
		return { ok: false, status: 400, body: null };
	}
};

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
			JSON.stringify({ ...prescription, status: 'PICKED_UP' })
		);
	} catch (error) {
		console.error(error);
		return { ok: false, status: 400, body: null };
	}
};
