import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the child components
vi.mock('./components', () => ({
	Hero: () => <div data-testid="hero-component">Hero Component</div>,
	Experience: () => (
		<div data-testid="experience-component">Experience Component</div>
	),
	Projects: () => (
		<div data-testid="projects-component">Projects Component</div>
	),
}));

vi.mock('./components/ContactSection', () => ({
	default: () => (
		<div data-testid="contact-section-component">
			Contact Section Component
		</div>
	),
}));

describe('App Component', () => {
	it('renders all child components correctly', () => {
		render(<App />);

		// Check if each component is rendered
		expect(screen.getByTestId('hero-component')).toBeInTheDocument();
		expect(screen.getByTestId('experience-component')).toBeInTheDocument();
		expect(screen.getByTestId('projects-component')).toBeInTheDocument();
		expect(
			screen.getByTestId('contact-section-component'),
		).toBeInTheDocument();
	});

	it('renders components in the correct order', () => {
		render(<App />);

		const components = screen.getAllByTestId(/component$/);

		// Check order of components based on their appearance in the DOM
		expect(components[0]).toHaveTextContent('Hero Component');
		expect(components[1]).toHaveTextContent('Experience Component');
		expect(components[2]).toHaveTextContent('Projects Component');
		expect(components[3]).toHaveTextContent('Contact Section Component');
	});
});
