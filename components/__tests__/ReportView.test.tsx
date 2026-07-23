import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportView } from '../ui/ReportView';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReportData } from '@/types';

describe('ReportView Component', () => {
  const mockData: ReportData = {
    customerOverview: 'Overview Test Content',
    businessProblems: ['Problem 1', 'Problem 2'],
    painPoints: ['Pain 1'],
    solutionProposal: 'Solution proposal details',
    functionalRequirements: ['FR-001: Requirement 1'],
    userStories: ['As a user...'],
    technicalArchitecture: 'Next.js and Tailwind',
    scopeEstimate: {
      frontend: 40,
      backend: 25,
      design: 15,
      testing: 15,
      management: 5,
    },
  };

  const mockOnUpdate = jest.fn();

  it('displays all sections correctly', () => {
    render(
      <LanguageProvider>
        <ReportView data={mockData} onUpdate={mockOnUpdate} />
      </LanguageProvider>
    );

    expect(screen.getByText('Overview Test Content')).toBeInTheDocument();
    expect(screen.getByText('Problem 1')).toBeInTheDocument();
    expect(screen.getByText('Problem 2')).toBeInTheDocument();
    expect(screen.getByText('Pain 1')).toBeInTheDocument();
    expect(screen.getByText('Solution proposal details')).toBeInTheDocument();
    expect(screen.getByText('FR-001: Requirement 1')).toBeInTheDocument();
    expect(screen.getByText('As a user...')).toBeInTheDocument();
    expect(screen.getByText('Next.js and Tailwind')).toBeInTheDocument();
  });

  it('triggers edit mode and update handler', () => {
    render(
      <LanguageProvider>
        <ReportView data={mockData} onUpdate={mockOnUpdate} />
      </LanguageProvider>
    );

    // Get the first edit button (for Customer Overview)
    const editBtns = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editBtns[0]);

    // Input/Textarea should appear with the initial content
    const textarea = screen.getByDisplayValue('Overview Test Content');
    expect(textarea).toBeInTheDocument();

    // Change text and save
    fireEvent.change(textarea, { target: { value: 'Updated overview content' } });
    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        customerOverview: 'Updated overview content',
      })
    );
  });
});
