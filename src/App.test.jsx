import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
	it('renders learn react link', () => {
		render(<App />);
		const linkElement = screen.queryByText(/learn react/i);
		expect(linkElement).not.toBeInTheDocument();
	});
});
