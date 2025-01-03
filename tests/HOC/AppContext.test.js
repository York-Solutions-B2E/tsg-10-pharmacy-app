import { render, screen, cleanup } from '@testing-library/react';
import { toBeInTheDocument, toBeVisible } from '@testing-library/jest-dom';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, useAppContext } from '../../src/HOC/AppContext';
import AppProvider from '../../src/HOC/AppContext';

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
