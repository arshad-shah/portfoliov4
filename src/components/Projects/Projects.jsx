/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from 'react';
import {
	Code,
	ExternalLink,
	ChevronRight,
	Filter,
	ArrowUpRight,
	Github,
	ShoppingBag,
} from 'lucide-react';
import ProjectsData from '../../data/Projects.json';
import SectionHeader from '../common/SectionHeader';

const ProjectsSection = () => {
	const [filter, setFilter] = useState('all');
	const [activeProject, setActiveProject] = useState(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// Apply fade-in animations when component mounts
	useEffect(() => {
		const timer = setTimeout(() => {
			const projects = document.querySelectorAll('.project-card');
			projects.forEach((project, index) => {
				setTimeout(() => {
					project.classList.add('opacity-100');
					project.classList.add('translate-y-0');
				}, index * 100);
			});
		}, 100);

		return () => clearTimeout(timer);
	}, [filter]);

	// Filter projects by category
	const filteredProjects =
		filter === 'all'
			? ProjectsData
			: ProjectsData.filter((project) => project.colorScheme === filter);

	// Open project details modal
	const openProjectDetails = (project) => {
		setActiveProject(project);
		setIsDetailsOpen(true);
	};

	// Close project details modal
	const closeProjectDetails = () => {
		setIsDetailsOpen(false);
	};

	// Animation classes for projects
	const projectInitialClass = 'opacity-0 translate-y-4';
	const projectAnimatedClass = 'transition-all duration-500';

	return (
		<section
			id="projects"
			className="relative min-h-screen bg-gray-950 py-12 text-white"
		>
			{/* Background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
				<div className="absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-blue-900/10 blur-3xl"></div>
			</div>

			<div className="relative mx-auto max-w-6xl px-6">
				<SectionHeader>
					<span className="mr-2 font-mono text-indigo-400">
						{'<'}
					</span>{' '}
					Projects
					<span className="ml-2 font-mono text-indigo-400">
						{'/>'}
					</span>
				</SectionHeader>

				{/* Category Filter */}
				<div className="mb-10 flex justify-center">
					<div className="inline-flex items-center rounded-lg border border-gray-800 bg-gray-900/50 p-1">
						<Filter className="mx-2 h-4 w-4 text-indigo-400" />
						{['all', 'web', 'mobile'].map((category) => (
							<button
								key={category}
								onClick={() => setFilter(category)}
								className={`relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
									filter === category
										? category === 'mobile'
											? 'bg-emerald-500/20 text-emerald-400'
											: 'bg-indigo-500/20 text-indigo-400'
										: 'text-gray-400 hover:text-white'
								}`}
							>
								<span className="relative">
									{category.charAt(0).toUpperCase() +
										category.slice(1)}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Projects Grid with animation */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredProjects.map((project, index) => {
						const isWebProject = project.colorScheme === 'web';
						const accentColor = isWebProject ? 'indigo' : 'emerald';

						return (
							<div
								key={index}
								className={`project-card ${projectInitialClass} ${projectAnimatedClass} group relative cursor-pointer overflow-hidden rounded-lg border border-gray-800 bg-gray-900/80 backdrop-blur-sm md:hover:-translate-y-2 md:hover:shadow-lg`}
								style={{ transitionDelay: `${index * 50}ms` }}
								onClick={(e) => {
									// Only open modal if the click is directly on the card (not on links or other interactive elements)
									if (
										e.target === e.currentTarget ||
										e.target.closest('.card-content') ===
											e.currentTarget
									) {
										openProjectDetails(project);
									}
								}}
							>
								{/* Project header */}
								<div className="card-content border-b border-gray-800 p-4">
									<div className="mb-3 flex items-center justify-between">
										<div className="flex items-center">
											<div
												className={`mr-3 rounded-full bg-${accentColor}-400/20 p-2`}
											>
												<Code
													className={`h-4 w-4 text-${accentColor}-400`}
												/>
											</div>
											<div className="flex space-x-2">
												<span
													className={`rounded-full bg-${accentColor}-400/10 px-2 py-1 font-mono text-xs text-${accentColor}-400`}
												>
													{isWebProject
														? 'Web'
														: 'Mobile'}
												</span>
											</div>
										</div>

										{/* Project links */}
										<div className="flex space-x-2">
											{project.repoLink && (
												<a
													href={project.repoLink}
													target="_blank"
													rel="noopener noreferrer"
													className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
													aria-label={`View ${project.heading} on GitHub`}
												>
													<Github className="h-4 w-4" />
												</a>
											)}
											{project.siteLink && (
												<a
													href={project.siteLink}
													target="_blank"
													rel="noopener noreferrer"
													className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
													aria-label={`Visit ${project.heading} website`}
												>
													<ExternalLink className="h-4 w-4" />
												</a>
											)}
											{project.shopLink && (
												<a
													href={project.shopLink}
													target="_blank"
													rel="noopener noreferrer"
													className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
													aria-label={`Download ${project.heading} from store`}
												>
													<ShoppingBag className="h-4 w-4" />
												</a>
											)}
										</div>
									</div>

									<h3
										className={`mb-2 text-xl font-bold text-white transition-colors group-hover:text-${accentColor}-400`}
									>
										{project.heading}
									</h3>

									{/* Description with gradient overlay for text truncation */}
									<div className="relative max-h-24 overflow-hidden">
										<p className="text-sm text-gray-400">
											{project.description}
										</p>
										<div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
									</div>
								</div>

								{/* Technologies */}
								<div className="card-content p-4">
									<h4 className="mb-3 font-mono text-xs text-indigo-400">
										// Tech Stack
									</h4>
									<div className="flex flex-wrap gap-2">
										{project.languages
											.slice(0, 4)
											.map((lang, idx) => (
												<span
													key={idx}
													className={`rounded-full border border-gray-700 bg-gray-800/50 px-2 py-1 text-xs text-gray-300 transition-colors hover:border-${accentColor}-400/50 hover:bg-${accentColor}-400/10 hover:text-white`}
												>
													{lang}
												</span>
											))}
										{project.languages.length > 4 && (
											<span className="rounded-full border border-gray-700 bg-gray-800/50 px-2 py-1 text-xs text-gray-400">
												+{project.languages.length - 4}{' '}
												more
											</span>
										)}
									</div>
								</div>

								{/* View Details Button - Always visible on mobile, revealed on hover for desktop */}
								<div className="flex justify-end border-t border-gray-800 p-4 md:absolute md:inset-x-0 md:bottom-0 md:translate-y-full md:border-t-0 md:bg-gradient-to-t md:from-gray-900 md:via-gray-900 md:to-transparent md:transition-transform md:duration-300 md:group-hover:translate-y-0">
									<button
										onClick={() =>
											openProjectDetails(project)
										}
										className={`flex items-center rounded-full bg-${accentColor}-400/10 px-4 py-2 text-sm font-medium text-${accentColor}-400 transition-colors hover:bg-${accentColor}-400 hover:text-gray-900`}
									>
										<span>View Details</span>
										<ArrowUpRight className="ml-1 h-4 w-4" />
									</button>
								</div>

								{/* Side accent bar */}
								<div
									className={`absolute top-0 left-0 h-full w-1 bg-${accentColor}-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
								></div>
							</div>
						);
					})}
				</div>

				{/* Show more projects button */}
				<div className="mt-10 flex justify-center">
					<a
						href="https://github.com/arshad-shah?tab=repositories"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 rounded-md border border-indigo-400/30 bg-indigo-400/5 px-6 py-3 font-medium text-indigo-400 transition-all hover:border-indigo-400 hover:bg-indigo-400 hover:text-gray-900"
					>
						View All Projects
						<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>

			{/* Project Details Modal */}
			{isDetailsOpen && activeProject && (
				<div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
					<div
						className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
						onClick={closeProjectDetails}
					></div>
					<div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-gray-800 bg-gray-900 shadow-2xl">
						{/* Close button */}
						<button
							onClick={closeProjectDetails}
							className="absolute top-4 right-4 rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{/* Modal content */}
						<div className="p-6">
							<div className="mb-6 flex items-center">
								<div
									className={`mr-4 rounded-full bg-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-400/20 p-3`}
								>
									<Code
										className={`h-6 w-6 text-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-400`}
									/>
								</div>
								<h2 className="text-2xl font-bold text-white">
									{activeProject.heading}
								</h2>
							</div>

							<p className="mb-6 text-gray-400">
								{activeProject.description}
							</p>

							{/* Features */}
							{activeProject.features && (
								<div className="mb-6">
									<h3 className="mb-3 text-lg font-bold text-white">
										Key Features
									</h3>
									<ul className="grid gap-2 sm:grid-cols-2">
										{activeProject.features.map(
											(feature, idx) => (
												<li
													key={idx}
													className="flex items-start"
												>
													<div
														className={`mt-1 mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-400`}
													></div>
													<span className="text-sm text-gray-300">
														{feature}
													</span>
												</li>
											),
										)}
									</ul>
								</div>
							)}

							{/* Technical Details */}
							{activeProject.techDetails && (
								<div className="mb-6">
									<h3 className="mb-3 text-lg font-bold text-white">
										Technical Implementation
									</h3>
									<div className="rounded-lg border border-gray-800 bg-gray-800 p-4 text-sm text-gray-300">
										{activeProject.techDetails}
									</div>
								</div>
							)}

							{/* Technologies */}
							<div className="mb-6">
								<h3 className="mb-3 text-lg font-bold text-white">
									Technologies Used
								</h3>
								<div className="flex flex-wrap gap-2">
									{activeProject.languages.map(
										(lang, idx) => (
											<span
												key={idx}
												className={`rounded-full border border-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-400/30 bg-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-400/10 px-3 py-1 text-sm text-${activeProject.colorScheme === 'mobile' ? 'emerald' : 'indigo'}-300`}
											>
												{lang}
											</span>
										),
									)}
								</div>
							</div>

							{/* Links */}
							<div className="flex flex-wrap gap-3">
								{activeProject.shopLink && (
									<a
										href={activeProject.shopLink}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center gap-2 rounded-md bg-emerald-400 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-emerald-500"
									>
										<ShoppingBag className="h-4 w-4" />
										<span>View in Store</span>
									</a>
								)}
								{activeProject.siteLink && (
									<a
										href={activeProject.siteLink}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center gap-2 rounded-md bg-indigo-400 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-indigo-500"
									>
										<ExternalLink className="h-4 w-4" />
										<span>Live Demo</span>
									</a>
								)}
								{activeProject.repoLink && (
									<a
										href={activeProject.repoLink}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:border-gray-600 hover:bg-gray-700"
									>
										<Github className="h-4 w-4" />
										<span>View Code</span>
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ProjectsSection;
