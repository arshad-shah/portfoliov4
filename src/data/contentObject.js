import {
	FaDownload,
	FaLinkedin,
	FaGithub,
	FaEnvelope,
	FaHackerrank,
} from 'react-icons/fa';
import Resume from '../assets/Resume.pdf';
export const contentObject = {
	hero: {
		headline: '👋 Hi, I am Arshad Shah ',
		subheadline:
			'Creating maintainable, scalable applications across web, mobile, and cloud platforms.',
		ctaButtons: [
			{
				text: 'Resume',
				link: Resume,
				icon: FaDownload,
			},
		],
		socialLinks: [
			{
				platform: 'LinkedIn',
				url: 'https://www.linkedin.com/in/arshadshah',
				icon: FaLinkedin,
			},
			{
				platform: 'GitHub',
				url: 'https://github.com/arshad-shah',
				icon: FaGithub,
			},
			{
				platform: 'Email',
				url: 'mailto:arshad@arshadshah.com',
				icon: FaEnvelope,
			},
			{
				platform: 'Hackerrank',
				url: 'https://www.hackerrank.com/shaharshad57',
				icon: FaHackerrank,
			},
		],
	},
};
