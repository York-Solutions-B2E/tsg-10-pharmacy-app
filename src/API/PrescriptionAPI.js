import RequestAPI from './RequestAPI';

export const getAllPrescriptions = async () => {
	return await RequestAPI.getRequest('/api/prescriptions');
};

export const fillPrescription = async (prescription) => {
	try {
		if (prescription === undefined) throw new Error('No prescription provided');
		if (prescription === null) throw new Error('Provided prescription is null');
		return await RequestAPI.putRequest(
			`/api/prescriptions/${prescription.id}`,
			JSON.stringify({ ...prescription, status: 'FILLED' })
		);
	} catch (error) {
		console.error(error);
		return { ok: false, status: 400, body: null };
	}
};
