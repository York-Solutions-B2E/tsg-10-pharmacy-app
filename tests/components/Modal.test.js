import { render, screen, cleanup } from '@testing-library/react';
import { toBeInTheDocument, toBeVisible } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Modal from '../../src/components/Modal';

describe('Modal', () => {
	afterEach(() => {
		cleanup();
	});

	it('should render', () => {
		render(<Modal>test-modal</Modal>);

		expect(screen.getByText(/test-modal/i)).toBeInTheDocument();
	});
});
