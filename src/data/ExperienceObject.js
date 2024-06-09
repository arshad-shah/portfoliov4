const experienceObject = {
	workExperience: {
		title: 'Work Experience',
		jobs: [
			{
				position: 'Software Engineer',
				company: 'Houghton Mifflin Harcourt',
				duration: 'Mar 2024 - Present',
				location: 'Dublin, Ireland',
				responsibilities: [
					'Leading the integration of real-time classroom systems with third-party educational solutions, enhancing user engagement and learning environments.',
					'Enhancing developer experience within a large-scale monorepo for a microfrontend architecture, accelerating development cycles and minimizing continuous integration times.',
					'Managing the resolution of complex codebase issues related to phantom and circular dependencies, successfully resolving 100% of symlink loops in over 600 packages.',
					'Developing and maintaining backend services for robust session management, leveraging GraphQL and PostgreSQL for optimized performance and scalability.',
				],
			},
			{
				position: 'Associate Software Engineer',
				company: 'Houghton Mifflin Harcourt',
				duration: 'June 2023 - Mar 2024',
				location: 'Dublin, Ireland',
				responsibilities: [
					'Responsible for the frontend ED Platform and RCE product',
					'Implemented session management and insights data collection',
					'Migrated universal analytics to GA4 for all products',
					'Created and deployed concourse pipeline for backend service',
					'Implemented and deployed session management service to Kubernetes cluster',
					'Migrated the Mono repo to a new performant package manager, resulting in a 50 percent time saving per build',
				],
			},
		],
	},
};

export default experienceObject;
