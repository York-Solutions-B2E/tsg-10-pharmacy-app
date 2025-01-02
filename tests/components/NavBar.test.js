import { render, screen, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../../src/components/NavBar';

describe('NavBar', () => {
	afterEach(() => {
		cleanup();
	});

	it('should render', () => {
		throw new Error();
	});

	it('should navigate to prescriptions page', async () => {
		throw new Error();
	});

	it('should navigate to inventory page', async () => {
		throw new Error();
	});

	it('should navigate to orders page', async () => {
		throw new Error();
	});
});
