/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'fade-in-down': {
					from: {
						opacity: '0',
						transform: 'translateY(-10px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)',
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)',
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
				},
				float: {
					'0%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-20px)',
					},
					'100%': {
						transform: 'translateY(0px)',
					},
				},
				'spin-slow': {
					from: {
						transform: 'rotate(0deg)',
					},
					to: {
						transform: 'rotate(360deg)',
					},
				},
				'spin-counter': {
					from: {
						transform: 'rotate(360deg)',
					},
					to: {
						transform: 'rotate(0deg)',
					},
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeInSlide: {
					from: {
						opacity: '0',
						transform: 'translateX(-20px)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				fadeInUp: {
					from: {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
				blob: 'blob 7s infinite',
				float: 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 6s linear infinite',
				'spin-counter': 'spin-counter 6s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				fadeInSlide: 'fadeInSlide 0.6s ease-out forwards',
				fadeInUp:
					'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
			},
			// Custom animation delays
			transitionDelay: {
				200: '200ms',
				300: '300ms',
				400: '400ms',
				500: '500ms',
				600: '600ms',
				700: '700ms',
				800: '800ms',
				900: '900ms',
				2000: '2000ms',
				4000: '4000ms',
			},
			// Custom border gradient
			backgroundImage: {
				'gradient-border':
					'linear-gradient(to bottom, #6366f1, #a855f7, #ec4899)',
			},
		},
	},
	plugins: [
		// Plugin to handle the list item animation delays
		function ({ addUtilities }) {
			const listAnimationDelays = {
				'.list-animation-1': { 'animation-delay': '0.1s' },
				'.list-animation-2': { 'animation-delay': '0.2s' },
				'.list-animation-3': { 'animation-delay': '0.3s' },
				'.list-animation-4': { 'animation-delay': '0.4s' },
				'.list-animation-5': { 'animation-delay': '0.5s' },
			};
			addUtilities(listAnimationDelays);
		},
	],
};
