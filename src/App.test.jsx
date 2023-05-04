import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Shows H1 Heading', () => {
    const headingEl = screen.getByRole('heading', { level: 1 });
    expect(headingEl).toBeInTheDocument();
  });
});
