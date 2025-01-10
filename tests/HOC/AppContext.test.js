import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider, {
  AppContext,
  useAppContext,
} from '../../src/HOC/AppContext';

const mockContextValues = {
  updateMedications: jest.fn(),
  updateOrders: jest.fn(),
  updatePrescriptions: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation();
});

afterAll(() => {
  console.warn.mockRestore();
});

describe('AppProvider', () => {
  it('should render', () => {
    render(<AppProvider>test-provider</AppProvider>, {
      wrapper: BrowserRouter,
    });
  });

  it('should pass navigate through to AppContext.Provider', () => {
    const TestChild = () => {
      const value = useAppContext(AppContext);
      expect(value).not.toBeUndefined();
      expect(value).not.toBeNull();
      return <div />;
    };

    render(
      <AppProvider>
        <TestChild />
      </AppProvider>,
      {
        wrapper: BrowserRouter,
      }
    );
  });
});

describe('useAppContext', () => {
  it('should return value passed to AppContext.Provider', () => {
    const TestChild = () => {
      const value = useAppContext();
      return <div data-testid={value} />;
    };

    render(
      <AppContext.Provider value="context-provider-test">
        <TestChild />
      </AppContext.Provider>
    );

    expect(screen.getByTestId(/context-provider-test/i)).toBeInTheDocument();
  });
});

describe('AppContext update functions', () => {
  it('should update orders list', () => {
    const TestChild = () => {
      const { updateOrders } = useAppContext();
      updateOrders('new-orders-list');
      return <div />;
    };

    render(
      <AppContext.Provider value={mockContextValues}>
        <TestChild />
      </AppContext.Provider>
    );

    expect(mockContextValues.updateOrders).toHaveBeenCalledWith(
      'new-orders-list'
    );
  });

  it('should update medications list', () => {
    const TestChild = () => {
      const { updateMedications } = useAppContext();
      updateMedications('new-medications-list');
      return <div />;
    };

    render(
      <AppContext.Provider value={mockContextValues}>
        <TestChild />
      </AppContext.Provider>
    );

    expect(mockContextValues.updateMedications).toHaveBeenCalledWith(
      'new-medications-list'
    );
  });

  it('should update prescriptions list', () => {
    const TestChild = () => {
      const { updatePrescriptions } = useAppContext();
      updatePrescriptions('new-prescriptions-list');
      return <div />;
    };

    render(
      <AppContext.Provider value={mockContextValues}>
        <TestChild />
      </AppContext.Provider>
    );

    expect(mockContextValues.updatePrescriptions).toHaveBeenCalledWith(
      'new-prescriptions-list'
    );
  });
});
