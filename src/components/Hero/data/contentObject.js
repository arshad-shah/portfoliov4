import {
	FaDownload,
	FaLinkedin,
	FaGithub,
	FaEnvelope,
	FaHackerrank,
} from 'react-icons/fa';
import Resume from '../../../assets/Resume.pdf';
export const contentObject = {
	hero: {
		headline: 'Arshad Shah - Passionate Software Engineer',
		subheadline:
			'Creating robust and scalable applications with a focus on problem-solving and innovation.',
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
