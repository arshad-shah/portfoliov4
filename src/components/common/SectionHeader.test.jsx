import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';

describe('SectionHeader Component', () => {
	it('renders the children content correctly', () => {
		render(<SectionHeader>Experience</SectionHeader>);

		expect(screen.getByText('Experience')).toBeInTheDocument();
		expect(screen.getByText('Experience')).toHaveClass(
			'text-3xl',
			'font-bold',
			'text-white',
		);
	});

	it('renders with the correct structure and classes', () => {
		const { container } = render(
			<SectionHeader>Test Section</SectionHeader>,
		);

		// Check the main container div
		const mainDiv = container.firstChild;
		expect(mainDiv).toHaveClass('mb-16', 'flex', 'items-center');

		// Check the heading
		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass(
			'mr-6',
			'text-3xl',
			'font-bold',
			'text-white',
			'md:text-4xl',
		);

		// Check the divider line
		const divider = container.querySelector('div.h-px');
		expect(divider).toBeInTheDocument();
		expect(divider).toHaveClass(
			'ml-6',
			'h-px',
			'flex-grow',
			'bg-gradient-to-r',
			'from-gray-800',
			'to-transparent',
		);
	});

	it('accepts and renders different children content', () => {
		const { rerender } = render(
			<SectionHeader>First Header</SectionHeader>,
		);
		expect(screen.getByText('First Header')).toBeInTheDocument();

		rerender(<SectionHeader>Second Header</SectionHeader>);
		expect(screen.getByText('Second Header')).toBeInTheDocument();
		expect(screen.queryByText('First Header')).not.toBeInTheDocument();
	});

	it('renders complex children content', () => {
		render(
			<SectionHeader>
				<span data-testid="complex-child">Complex</span> Header
			</SectionHeader>,
		);

		expect(screen.getByTestId('complex-child')).toBeInTheDocument();
		expect(screen.getByText(/Header/)).toBeInTheDocument();
	});

	it('renders without children', () => {
		const { container } = render(<SectionHeader />);

		// Component should still render even without children
		const mainDiv = container.firstChild;
		expect(mainDiv).toBeInTheDocument();
		expect(mainDiv).toHaveClass('mb-16', 'flex', 'items-center');

		// Heading should exist but be empty
		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('');
	});
});
