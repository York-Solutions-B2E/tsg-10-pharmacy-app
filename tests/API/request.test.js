import * as API from '../../src/API/request';

const request = API.request;

const isHttpResponse = (obj) => {
	if (obj === undefined || obj == null) return false;
	if (obj.ok === undefined) return false;
	if (obj.status === undefined || obj.status === null) return false;
	if (obj.body === undefined) return false;
	return true;
};

describe('request', () => {
	const unmockedFetch = global.fetch;

	afterEach(() => {
		global.fetch = unmockedFetch;
	});

	it('should return http response', async () => {
		global.fetch = jest.fn(async () =>
			Promise.resolve({ ok: true, status: 200, body: null })
		);
		const response = await request();

		expect(isHttpResponse(response)).toBe(true);
	});

	it('should return 405 for unsupported HTTP methods', async () => {
		const response = await request({
			endpoint: '/',
			method: 'unsupported method',
		});
		expect(response.status).toBe(405);
	});

	it('should default to GET method', async () => {
		const mockFetch = jest.fn(async () =>
			Promise.resolve({ ok: true, status: 200 })
		);
		global.fetch = mockFetch;

		await request({ endpoint: '/' });

		expect(mockFetch).toHaveBeenCalledWith(`${API.domain}/`, {
			method: 'GET',
		});
	});

	describe('exceptions', () => {
		const unmockedError = console.error;
		const errorSpy = jest.spyOn(console, 'error').mockImplementation();

		afterAll(() => {
			console.error = unmockedError;
		});

		afterEach(() => {
			errorSpy.mockReset();
		});

		it('should throw error on undefined response', async () => {
			global.fetch = jest.fn(async () => Promise.resolve());

			const response = await request({ endpoint: '/' });

			expect(errorSpy).toHaveBeenCalled();
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('An unexpected error occurred')
			);

			expect(isHttpResponse(response)).toBe(true);
			expect(response.status).toBe(600);
		});

		it('should throw error on null response', async () => {
			global.fetch = jest.fn(async () => Promise.resolve(null));

			const response = await request({ endpoint: '/' });

			expect(errorSpy).toHaveBeenCalled();
			expect(errorSpy).toHaveBeenCalledWith(
				new Error('An unexpected error occurred')
			);

			expect(isHttpResponse(response)).toBe(true);
			expect(response.status).toBe(600);
		});
	});
});
