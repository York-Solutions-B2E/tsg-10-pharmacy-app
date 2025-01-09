import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomModal from '../../src/components/CustomModal';

describe('CustomModal', () => {
  let rootElement;

  beforeAll(() => {
    // Create a root element and append it to the document body
    rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');
    document.body.appendChild(rootElement);
  });

  afterAll(() => {
    // Clean up the root element after all tests
    if (rootElement && rootElement.parentNode) {
      rootElement.parentNode.removeChild(rootElement);
    }
  });

  test('renders the modal with children when open', () => {
    render(
      <CustomModal
        isOpen={true}
        onRequestClose={() => {}}
        contentLabel="Test Modal"
      >
        <div>Modal Content</div>
      </CustomModal>,
      { container: rootElement }
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render the modal when closed', () => {
    render(
      <CustomModal
        isOpen={false}
        onRequestClose={() => {}}
        contentLabel="Test Modal"
      >
        <div>Modal Content</div>
      </CustomModal>,
      { container: rootElement }
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onRequestClose when the close button is clicked', () => {
    const onRequestClose = jest.fn();
    render(
      <CustomModal
        isOpen={true}
        onRequestClose={onRequestClose}
        contentLabel="Test Modal"
      >
        <div>Modal Content</div>
      </CustomModal>,
      { container: rootElement }
    );

    fireEvent.click(screen.getByText('Close'));
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  test('calls onRequestConfirm when the close button is clicked', () => {
    const onRequestConfirm = jest.fn();
    render(
      <CustomModal
        isOpen={true}
        onRequestConfirm={onRequestConfirm}
        contentLabel="Test Modal"
      >
        <div>Modal Content</div>
      </CustomModal>,
      { container: rootElement }
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(onRequestConfirm).toHaveBeenCalledTimes(1);
  });
});
