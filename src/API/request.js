export const request = async (args) => {
	let { endpoint, method, body } = args ?? {endpoint: null, method: "GET", body: null};

	endpoint = `http://localhost:8080${endpoint}`;

	if (method === undefined)
		method = "GET";
	else if (method !== "GET" && method !== "PUT" && method !== "POST" && method !== "DELETE")
		return {ok: false, status: 405, body: null};

	try {
		const response = await fetch(endpoint, {method: method, body: body});

		if (response === undefined || response === null)
			throw new Error("An unexpected error occurred");

		return response;
	} catch (error) {
		console.error(error);
		return {ok: false, status: 600, body: null};
	}
}