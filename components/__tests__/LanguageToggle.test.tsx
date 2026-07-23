import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '../ui/LanguageToggle';
import { LanguageProvider } from '@/context/LanguageContext';

describe('LanguageToggle Component', () => {
  it('renders correctly and switches language', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    const svBtn = screen.getByRole('button', { name: /sv/i });
    const enBtn = screen.getByRole('button', { name: /en/i });

    expect(svBtn).toBeInTheDocument();
    expect(enBtn).toBeInTheDocument();

    // Default language is Swedish (so SV button should have active class styles)
    expect(svBtn).toHaveClass('bg-[#9B2740]');

    // Click English button
    fireEvent.click(enBtn);
    expect(enBtn).toHaveClass('bg-[#9B2740]');
    expect(svBtn).not.toHaveClass('bg-[#9B2740]');
  });
});
