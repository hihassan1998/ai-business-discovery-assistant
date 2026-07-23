import React from 'react';
import { render, screen } from '@testing-library/react';
import { EffortChart } from '../ui/EffortChart';

describe('EffortChart Component', () => {
  it('renders doughnut chart successfully', () => {
    const mockEstimate = {
      frontend: 35,
      backend: 30,
      design: 15,
      testing: 15,
      management: 5,
    };

    render(<EffortChart scopeEstimate={mockEstimate} />);

    // Checks that the mocked doughnut renders successfully
    expect(screen.getByTestId('mock-doughnut')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText(/total effort/i)).toBeInTheDocument();
  });
});
