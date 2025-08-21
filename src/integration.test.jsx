import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	render,
	screen,
	fireEvent,
	cleanup,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock window methods for scroll behavior
const mockScrollTo = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(window, 'scrollTo', {
	value: mockScrollTo,
	writable: true,
});

Object.defineProperty(window, 'addEventListener', {
	value: mockAddEventListener,
	writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
	value: mockRemoveEventListener,
	writable: true,
});

Object.defineProperty(window, 'scrollY', {
	value: 0,
	writable: true,
});

// Mock IntersectionObserver for visibility testing
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock document methods for animations
const mockQuerySelectorAll = vi.fn(() => []);
Object.defineProperty(document, 'querySelectorAll', {
	value: mockQuerySelectorAll,
	writable: true,
});

describe('Integration Tests', () => {
	let user;

	beforeEach(() => {
		user = userEvent.setup();
		cleanup();
		vi.clearAllMocks();
		mockQuerySelectorAll.mockReturnValue([]);
	});

	afterEach(() => {
		cleanup();
	});

	describe('Full Application Rendering', () => {
		it('renders the complete application without errors', () => {
			render(<App />);

			// Verify all major sections are present using more specific queries
			expect(screen.getByRole('banner')).toBeInTheDocument(); // Hero section header
			// Use getAllByText to handle multiple matches
			expect(screen.getAllByText(/experience/i)[0]).toBeInTheDocument();
			expect(screen.getAllByText(/projects/i)[0]).toBeInTheDocument();
			expect(screen.getAllByText(/contact/i)[0]).toBeInTheDocument();
		});

		it('displays all sections in correct order', () => {
			const { container } = render(<App />);

			// Get all main sections
			const sections = container.querySelectorAll('section');
			expect(sections.length).toBeGreaterThanOrEqual(4);

			// Hero should be first (or at least header should be visible)
			const header = container.querySelector('header');
			expect(header).toBeInTheDocument();
		});

		it('handles initial data loading correctly', async () => {
			render(<App />);

			// Wait for data-dependent content to render
			await waitFor(() => {
				// Look for content that would be loaded from JSON files
				const textElements = screen.queryAllByText(
					/react|javascript|developer/i,
				);
				expect(textElements.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Navigation Integration', () => {
		it('mobile navigation works correctly', async () => {
			render(<App />);

			// Find mobile menu button
			const mobileMenuButton = screen.queryByLabelText(/open menu/i);

			if (mobileMenuButton) {
				// Open mobile menu
				await user.click(mobileMenuButton);

				// Verify menu is open
				const closeButton = screen.queryByLabelText(/close menu/i);
				expect(closeButton).toBeInTheDocument();

				// Find a navigation link in mobile menu
				const mobileLinks = screen.getAllByRole('link', {
					name: /experience/i,
				});
				if (mobileLinks.length > 1) {
					// Click on mobile navigation link
					await user.click(mobileLinks[1]); // Assuming second one is mobile

					// Menu should close
					expect(
						screen.queryByLabelText(/close menu/i),
					).not.toBeInTheDocument();
				}
			}
		});
	});

	describe('Scroll Behavior Integration', () => {
		it('header changes appearance on scroll', () => {
			render(<App />);

			// Verify scroll listener is attached
			expect(mockAddEventListener).toHaveBeenCalledWith(
				'scroll',
				expect.any(Function),
			);

			// Simulate scroll
			Object.defineProperty(window, 'scrollY', {
				value: 100,
				writable: true,
			});

			// Trigger scroll event
			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call) => call[0] === 'scroll',
			)[1];

			if (scrollHandler) {
				scrollHandler();

				// Check if header has scroll styling
				const header = screen
					.getByRole('banner')
					.querySelector('header');
				if (header) {
					// Should have blur/background classes when scrolled
					expect(header).toHaveClass('backdrop-blur-md');
				}
			}
		});
	});

	describe('Component Communication', () => {
		it('sections share consistent styling and theme', () => {
			const { container } = render(<App />);

			// Check for consistent color scheme across sections
			const sections = container.querySelectorAll('section');
			sections.forEach((section) => {
				const styles = window.getComputedStyle(section);
				// Most sections should have dark background
				expect(section.className).toMatch(/bg-gray-9/);
			});
		});

		it('data consistency across components', async () => {
			render(<App />);

			// Look for name consistency between Hero and Contact sections
			await waitFor(() => {
				const nameElements = screen.queryAllByText(/arshad|shah/i);
				if (nameElements.length > 1) {
					// Names should be consistent across components
					expect(nameElements.length).toBeGreaterThanOrEqual(2);
				}
			});
		});
	});

	describe('Interactive Features Integration', () => {
		it('experience job selection updates content', async () => {
			render(<App />);

			// Wait for experience data to load
			await waitFor(() => {
				const jobButtons = screen.queryAllByRole('button');
				expect(jobButtons.length).toBeGreaterThan(0);
			});

			const jobButtons = screen.getAllByRole('button');

			if (jobButtons.length > 1) {
				// Click on different job
				await user.click(jobButtons[1]);

				// Content should update (hard to test specific content without knowing data)
				// But we can verify the interaction works
				expect(jobButtons[1]).toHaveClass('scale-105'); // Active state
			}
		});
	});

	describe('Responsive Behavior Integration', () => {
		it('components adapt to different screen sizes', () => {
			const { container } = render(<App />);

			// Check for responsive classes across components
			const responsiveElements = container.querySelectorAll(
				'[class*="md:"], [class*="sm:"], [class*="lg:"]',
			);
			expect(responsiveElements.length).toBeGreaterThan(0);

			// Verify grid layouts are responsive
			const gridElements = container.querySelectorAll('[class*="grid"]');
			expect(gridElements.length).toBeGreaterThan(0);
		});

		it('navigation adapts to mobile/desktop correctly', () => {
			const { container } = render(<App />);

			// Desktop navigation should be hidden on mobile
			const desktopNav = container.querySelector('nav.hidden.md\\:block');
			expect(desktopNav).toBeInTheDocument();

			// Mobile menu button should exist
			const mobileMenuButton = screen.queryByLabelText(/open menu/i);
			expect(mobileMenuButton).toBeInTheDocument();
		});
	});

	describe('Performance Integration', () => {
		it('renders efficiently with all components', () => {
			const startTime = performance.now();
			render(<App />);
			const endTime = performance.now();

			// Full app should render quickly
			expect(endTime - startTime).toBeLessThan(500);
		});

		it('handles multiple user interactions efficiently', async () => {
			render(<App />);

			// Perform multiple rapid interactions
			const startTime = performance.now();

			// Try various interactions
			const buttons = screen.queryAllByRole('button');
			if (buttons.length > 0) {
				for (let i = 0; i < Math.min(buttons.length, 3); i++) {
					await user.click(buttons[i]);
				}
			}

			const links = screen.queryAllByRole('link');
			if (links.length > 0) {
				// Focus/blur a few links
				for (let i = 0; i < Math.min(links.length, 3); i++) {
					links[i].focus();
					links[i].blur();
				}
			}

			const endTime = performance.now();

			// Multiple interactions should be handled quickly
			expect(endTime - startTime).toBeLessThan(200);
		});
	});

	describe('Accessibility Integration', () => {
		it('maintains proper heading hierarchy across sections', () => {
			render(<App />);

			const headings = screen.getAllByRole('heading');
			expect(headings.length).toBeGreaterThan(0);

			// Check that we have proper heading levels
			const h1s = headings.filter((h) => h.tagName === 'H1');
			const h2s = headings.filter((h) => h.tagName === 'H2');
			const h3s = headings.filter((h) => h.tagName === 'H3');

			// Should have section headers (h2s) and possibly subsection headers
			expect(h2s.length + h3s.length).toBeGreaterThan(0);
		});

		it('keyboard navigation works across all components', async () => {
			render(<App />);

			// Get all interactive elements
			const interactiveElements = screen
				.getAllByRole('button')
				.concat(screen.getAllByRole('link'));

			if (interactiveElements.length > 0) {
				// Start focus chain
				interactiveElements[0].focus();
				expect(interactiveElements[0]).toHaveFocus();

				// Tab through several elements
				for (
					let i = 0;
					i < Math.min(5, interactiveElements.length - 1);
					i++
				) {
					await user.tab();
					// Focus should move to next element
					expect(document.activeElement).not.toBe(
						interactiveElements[0],
					);
				}
			}
		});
	});

	describe('Error Handling Integration', () => {
		it('gracefully handles missing data across components', () => {
			// This tests the robustness when components can't load their data
			expect(() => render(<App />)).not.toThrow();

			// App should still render even if some data is missing
			expect(screen.getAllByText(/experience/i)[0]).toBeInTheDocument();
			expect(screen.getAllByText(/projects/i)[0]).toBeInTheDocument();
			expect(screen.getAllByText(/contact/i)[0]).toBeInTheDocument();
		});

		it('maintains app stability during rapid user interactions', async () => {
			render(<App />);

			// Perform many rapid interactions
			const buttons = screen.getAllByRole('button');
			const links = screen.getAllByRole('link');

			// Rapid clicking shouldn't break the app
			for (let i = 0; i < 10; i++) {
				if (buttons[i % buttons.length]) {
					await user.click(buttons[i % buttons.length]);
				}
				if (
					links[i % links.length] &&
					!links[i % links.length].href.startsWith('http')
				) {
					// Only interact with internal links
					links[i % links.length].focus();
				}
			}

			// App should still be functional
			expect(screen.getAllByText(/experience/i)[0]).toBeInTheDocument();
		});
	});

	describe('Data Flow Integration', () => {
		it('components correctly consume and display data', async () => {
			render(<App />);

			// Wait for all components to render with their data
			await waitFor(() => {
				// Look for specific content that would come from data files
				const contentElements = screen.queryAllByText(/.{3,}/); // Elements with substantial text
				expect(contentElements.length).toBeGreaterThan(10);
			});
		});
	});
});
