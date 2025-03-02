/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';
import {
	Briefcase,
	Calendar,
	MapPin,
	ChevronRight,
	Code,
	Server,
	Database,
} from 'lucide-react';

// Import data from external file
import experienceData from '../../data/Experience.json';
import { Layers } from 'lucide-react';
import { GitBranch } from 'lucide-react';
import { GitMerge } from 'lucide-react';
import { BarChart } from 'lucide-react';
import { GitPullRequest } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const Experience = () => {
	const [activeJob, setActiveJob] = useState(0);

	// Map icon strings to actual components
	// Map icon strings to actual components
	const iconMap = {
		Code: Code,
		Server: Server,
		Database: Database,
		Briefcase: Briefcase,
		Layers: Layers,
		GitBranch: GitBranch,
		GitMerge: GitMerge,
		BarChart: BarChart,
		GitPullRequest: GitPullRequest,
	};

	// Process technologies to replace string icon names with actual components
	const processedJobs = experienceData.jobs.map((job) => ({
		...job,
		technologies: job.technologies.map((tech) => ({
			...tech,
			icon: iconMap[tech.icon],
		})),
	}));

	return (
		<section id="experience" className="bg-gray-950 py-24">
			<div className="mx-auto max-w-7xl px-6">
				<SectionHeader>
					<span className="font-mono text-indigo-400">function</span>{' '}
					Experience<span className="text-indigo-400">()</span>
				</SectionHeader>

				{/* Enhanced Timeline System */}
				<div className="grid gap-8 md:grid-cols-12">
					{/* Left side - Year markers and selectors */}
					<div className="md:col-span-3">
						<div className="sticky top-24 space-y-6">
							{processedJobs.map((job, index) => (
								<button
									key={index}
									onClick={() => setActiveJob(index)}
									className={`group w-full text-left transition-all ${
										activeJob === index
											? 'scale-105'
											: 'opacity-70 hover:opacity-100'
									}`}
								>
									<div className="mb-1 flex items-center gap-2">
										<div
											className={`h-3 w-3 rounded-full ${
												activeJob === index
													? 'bg-indigo-400'
													: 'bg-gray-700 group-hover:bg-indigo-400/50'
											}`}
										></div>
										<span
											className={`font-mono text-sm font-medium ${
												activeJob === index
													? 'text-indigo-400'
													: 'text-gray-400 group-hover:text-indigo-400/70'
											}`}
										>
											{job.duration.split(' - ')[0]}
										</span>
									</div>

									<div
										className={`ml-5 transition-all ${
											activeJob === index
												? 'text-white'
												: 'text-gray-500 group-hover:text-gray-300'
										}`}
									>
										<h4 className="font-medium">
											{job.position}
										</h4>
										<p className="text-sm">{job.company}</p>
									</div>
								</button>
							))}

							{/* Terminal-like decoration */}
							<div className="mt-6 rounded-md border border-gray-800 bg-gray-900 p-3 font-mono text-xs text-gray-400">
								<div className="mb-1 flex items-center space-x-1">
									<div className="h-2 w-2 rounded-full bg-red-500"></div>
									<div className="h-2 w-2 rounded-full bg-yellow-500"></div>
									<div className="h-2 w-2 rounded-full bg-green-500"></div>
								</div>
								<div className="space-y-1">
									<p>
										<span className="text-indigo-400">
											const
										</span>{' '}
										experience ={' '}
										<span className="text-green-400">
											{experienceData.jobs.length}
										</span>
										;
									</p>
									<p>
										<span className="text-indigo-400">
											let
										</span>{' '}
										current ={' '}
										<span className="text-green-400">
											{activeJob}
										</span>
										;
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right side - Job details with animated transitions */}
					<div className="relative md:col-span-9">
						{/* Vertical code line with technology badges */}
						<div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/70 to-indigo-500/0">
							{processedJobs[activeJob].technologies.map(
								(tech, idx) => (
									<div
										key={idx}
										className="absolute flex items-center"
										style={{ top: `${(idx + 1) * 14}%` }}
									>
										<div
											className={`-ml-3 flex h-6 w-6 items-center justify-center rounded-full ${tech.color}`}
										>
											<tech.icon className="h-4 w-4 text-white" />
										</div>
										<div className="ml-4 rounded bg-gray-900/80 px-2 py-1 font-mono text-xs text-gray-300">
											{tech.name}
										</div>
									</div>
								),
							)}
						</div>

						{/* Active job content */}
						<div className="ml-36 rounded-lg border border-gray-800 bg-gray-900/70 p-6 backdrop-blur-sm transition-all">
							{/* Job header with gradient */}
							<div className="mb-6 rounded-md border border-gray-800 bg-gray-900 p-4">
								<h3 className="text-xl font-bold text-white">
									{processedJobs[activeJob].position}{' '}
									<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
										@ {processedJobs[activeJob].company}
									</span>
								</h3>

								{/* Duration & Location */}
								<div className="mt-3 flex flex-wrap gap-4">
									<div className="flex items-center text-gray-400">
										<Calendar className="mr-2 h-4 w-4 text-indigo-400" />
										<span className="font-mono text-sm">
											{processedJobs[activeJob].duration}
										</span>
									</div>
									<div className="flex items-center text-gray-400">
										<MapPin className="mr-2 h-4 w-4 text-indigo-400" />
										<span className="font-mono text-sm">
											{processedJobs[activeJob].location}
										</span>
									</div>
								</div>
							</div>

							{/* Responsibilities with syntax-like elements */}
							<div className="space-y-5">
								<h4 className="font-mono text-sm text-indigo-400">
									// Key Responsibilities:
								</h4>
								<ul className="space-y-4">
									{processedJobs[
										activeJob
									].responsibilities.map(
										(responsibility, idx) => (
											<li
												key={idx}
												className="group flex transition-all hover:-translate-y-1"
											>
												<div className="mr-3 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 group-hover:bg-indigo-500/20">
													<ChevronRight className="h-4 w-4 text-indigo-400" />
												</div>
												<span className="text-gray-300 group-hover:text-white">
													{responsibility}
												</span>
											</li>
										),
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Skills Section with code block styling */}
				<div className="mt-20 rounded-lg border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm">
					<h3 className="mb-6 font-mono text-xl font-bold text-white">
						<span className="text-indigo-400">import</span>{' '}
						<span className="text-green-400">Technologies</span>{' '}
						<span className="text-indigo-400">from</span>{' '}
						<span className="text-orange-400">
							&apos;./skills&apos;
						</span>
						;
					</h3>

					<div className="flex flex-wrap gap-3">
						{experienceData.skills.map((tech, index) => (
							<span
								key={index}
								className="relative overflow-hidden rounded-md border border-gray-700 bg-gray-800 px-4 py-2 font-mono text-sm text-gray-300 transition-all hover:-translate-y-1 hover:border-indigo-400 hover:text-white"
							>
								<span className="relative z-10">{tech}</span>
								<div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
