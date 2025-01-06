export const domain = 'http://localhost:8080';

/**
 * Makes a fetch request using http://localhost:8080 as the base URL
 * @Optional
 * @Param {Object} args: {endpoint: String, method: String, body: String}
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 * @Throws when fetch() returns undefined || null
 * @Default fetch method is GET
 */
export const request = async (args) => {
	let { endpoint, method, body } = args ?? {
		endpoint: null,
		method: 'GET',
		body: null,
	};

	endpoint = `${domain}${endpoint}`;

	if (method === undefined) method = 'GET';
	else if (
		method !== 'GET' &&
		method !== 'PUT' &&
		method !== 'POST' &&
		method !== 'DELETE'
	)
		return { ok: false, status: 405, body: null };

	try {
		const response = await fetch(endpoint, {
			method: method,
			body: body,
			headers: { 'content-type': 'application/json' },
		});

		if (response === undefined || response === null)
			throw new Error('An unexpected error occurred');

		const ret = {
			ok: true,
			status: response.status,
			body: await response.text(),
		};

		return ret;
	} catch (error) {
		console.error(error);
		return { ok: false, status: 600, body: null };
	}
};
