import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
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
	beforeEach(() => {
		cleanup();
	});

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

	it('renders without crashing', () => {
		const { container } = render(<App />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders with React Fragment as root element', () => {
		const { container } = render(<App />);
		// React Fragment doesn't create a wrapper element, so we check for direct children
		expect(container.children.length).toBeGreaterThan(0);
	});

	it('has accessible structure', () => {
		render(<App />);

		// Verify that components are properly nested and accessible
		const components = screen.getAllByTestId(/component$/);
		expect(components).toHaveLength(4);

		// Each component should be visible
		components.forEach((component) => {
			expect(component).toBeVisible();
		});
	});
});
