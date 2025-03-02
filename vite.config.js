import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),tailwindcss()],
	server: {
		port: 3000,
		open: true,
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.js'],
		testMatch: ['./src/**/*.test.jsx'],
		passWithNoTests: true,
		globals: true
	}
});
