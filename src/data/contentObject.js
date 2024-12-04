import {
	FaDownload,
	FaLinkedin,
	FaGithub,
	FaEnvelope,
	FaHackerrank,
} from 'react-icons/fa';
import Resume from '../assets/Resume.pdf';

import { DiReact, DiNodejs, DiDocker } from 'react-icons/di';
import { SiTypescript, SiJavascript, SiKubernetes } from 'react-icons/si';

import { DiPostgresql } from 'react-icons/di';
import {
	SiJest,
	SiPlaywright,
	SiGraphql,
	SiHasura,
	SiSpring,
} from 'react-icons/si';
import { GitMerge, FileJson } from 'lucide-react';

const featuredTech = [
	// Frontend Core
	{
		icon: DiReact,
		label: 'React',
	},
	{
		icon: SiTypescript,
		label: 'TypeScript',
	},
	{
		icon: SiJavascript,
		label: 'JavaScript',
	},

	// Backend & Data
	{
		icon: SiSpring,
		label: 'Spring Boot',
	},
	{
		icon: DiPostgresql,
		label: 'PostgreSQL',
	},
	{
		icon: SiHasura,
		label: 'Hasura',
	},
	{
		icon: DiNodejs,
		label: 'Node.js',
	},

	// Infrastructure
	{
		icon: SiKubernetes,
		label: 'Kubernetes',
	},
	{
		icon: DiDocker,
		label: 'Docker',
	},
	{
		icon: GitMerge,
		label: 'CI/CD',
	},

	// Testing Suite
	{
		icon: SiJest,
		label: 'Jest',
	},
	{
		icon: SiPlaywright,
		label: 'Playwright',
	},

	// APIs & Tools
	{
		icon: SiGraphql,
		label: 'GraphQL',
	},
	{
		icon: FileJson,
		label: 'REST APIs',
	},
];

export const contentObject = {
	hero: {
		headline: "👋 Hi, I'm Arshad Shah",
		subheadline:
			'Software Engineer passionate about crafting elegant solutions',
		description:
			'Specializing in building robust, scalable applications with React, Node.js, and Cloud Technologies.',
		currentStatus: {
			role: 'Software Engineer',
			company: 'HMH',
			location: 'Abbeyleix, Ireland',
		},
		featuredTech,
		ctaButtons: [
			{
				text: 'Download Resume',
				link: Resume,
				icon: FaDownload,
				primary: true,
			},
		],
		socialLinks: [
			{
				platform: 'LinkedIn',
				url: 'https://www.linkedin.com/in/arshadshah',
				icon: FaLinkedin,
				label: 'Connect on LinkedIn',
			},
			{
				platform: 'GitHub',
				url: 'https://github.com/arshad-shah',
				icon: FaGithub,
				label: 'Check out my code',
			},
			{
				platform: 'Email',
				url: 'mailto:arshad@arshadshah.com',
				icon: FaEnvelope,
				label: 'Get in touch',
			},
			{
				platform: 'Hackerrank',
				url: 'https://www.hackerrank.com/shaharshad57',
				icon: FaHackerrank,
				label: 'View my problem-solving skills',
			},
		],
		availability: {
			forHire: false,
			preferredRoles: ['Full Stack Developer', 'Frontend Engineer'],
			location: {
				current: 'Ireland',
				openTo: ['Remote', 'Hybrid'],
				preferredLocations: ['Ireland'],
			},
		},
	},
};
