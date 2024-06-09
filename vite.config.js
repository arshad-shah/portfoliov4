import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.js'],
		testMatch: ['./src/**/*.test.jsx'],
		globals: true
	}
});
