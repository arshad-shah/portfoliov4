import { useState } from 'react';
import PropTypes from 'prop-types';
// import from react-icons
import { FaGithub as Github } from 'react-icons/fa';
import { Store, ExternalLink, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, index = 0 }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const {
		heading,
		description,
		languages,
		features,
		techDetails,
		linkAriaLabel,
		shopLink,
		repoLink,
		siteLink,
		colorScheme = 'web',
	} = project;

	// Custom color schemes for different types of projects
	const colorSchemes = {
		mobile: {
			gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
			accent: 'from-emerald-500 via-teal-500 to-cyan-500',
			hover: 'text-teal-600',
			badge: 'hover:bg-teal-50 hover:text-teal-600 hover:ring-teal-200',
			button: {
				primary:
					'bg-teal-50 text-teal-600 ring-1 ring-teal-100 hover:bg-teal-100 hover:ring-teal-200',
				secondary:
					'bg-gray-50 text-gray-600 ring-1 ring-gray-100 hover:bg-teal-50 hover:text-teal-600',
			},
		},
		web: {
			gradient: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
			accent: 'from-indigo-500 via-purple-500 to-pink-500',
			hover: 'text-indigo-600',
			badge: 'hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200',
			button: {
				primary:
					'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 hover:bg-indigo-100 hover:ring-indigo-200',
				secondary:
					'bg-gray-50 text-gray-600 ring-1 ring-gray-100 hover:bg-indigo-50 hover:text-indigo-600',
			},
		},
	};

	const scheme = colorSchemes[colorScheme] || colorSchemes.web;

	return (
		<div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
			style={{
				animationDelay: `${index * 100}ms`,
			}}
		>
			{/* Decorative gradient background */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
			/>

			{/* Top accent line */}
			<div
				className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${scheme.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
			/>

			<div className="relative p-8">
				{/* Header */}
				<div className="mb-6">
					<h3
						className={`mb-3 text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:${scheme.hover}`}
					>
						{heading}
					</h3>
					<p
						className={`text-base leading-relaxed text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}
					>
						{description}
					</p>

					<div
						className={`transition-all duration-300 ${isExpanded ? 'mt-6 opacity-100' : 'h-0 overflow-hidden opacity-0'}`}
					>
						{/* Features */}
						{features && features.length > 0 && (
							<div className="mb-6">
								<h4 className="mb-2 font-semibold text-gray-700">
									Key Features:
								</h4>
								<ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
									{features.map((feature, idx) => (
										<li key={idx}>{feature}</li>
									))}
								</ul>
							</div>
						)}

						{/* Technical Details */}
						{techDetails && (
							<div className="mb-6">
								<h4 className="mb-2 font-semibold text-gray-700">
									Technical Implementation:
								</h4>
								<p className="text-sm text-gray-600">
									{techDetails}
								</p>
							</div>
						)}
					</div>

					{(description.length > 150 || features || techDetails) && (
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
								colorScheme === 'mobile'
									? 'bg-teal-50 text-teal-600 ring-1 ring-teal-100 hover:bg-teal-100 hover:ring-teal-200'
									: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 hover:bg-indigo-100 hover:ring-indigo-200'
							}`}
						>
							{isExpanded ? 'Show less' : 'Read more'}
							<ChevronRight
								className={`h-4 w-4 transition-transform duration-300 ${
									isExpanded ? 'rotate-90' : ''
								}`}
							/>
						</button>
					)}
				</div>

				{/* Technologies */}
				<div className="mb-8 flex flex-wrap gap-2">
					{languages &&
						languages.map((language, index) => (
							<span
								key={index}
								className={`inline-flex items-center rounded-full bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600 ring-1 ring-gray-100 transition-all duration-300 ${scheme.badge}`}
							>
								{language}
							</span>
						))}
				</div>

				{/* Links */}
				<div className="flex flex-wrap gap-3">
					{shopLink && (
						<ProjectLink
							href={shopLink}
							aria-label={linkAriaLabel}
							icon={<Store className="h-4 w-4" />}
							text="Store"
							variant="primary"
							colorScheme={scheme.button}
						/>
					)}
					{repoLink && (
						<ProjectLink
							href={repoLink}
							aria-label={`View ${heading} on GitHub`}
							icon={<Github className="h-4 w-4" />}
							text="Code"
							variant="secondary"
							colorScheme={scheme.button}
						/>
					)}
					{siteLink && (
						<ProjectLink
							href={siteLink}
							aria-label={`Visit ${heading} website`}
							icon={<ExternalLink className="h-4 w-4" />}
							text="Live"
							variant="primary"
							colorScheme={scheme.button}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const ProjectLink = ({
	href,
	icon,
	text,
	'aria-label': ariaLabel,
	variant = 'primary',
	colorScheme,
}) => {
	const baseClasses =
		'group/link inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300';

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={ariaLabel}
			className={`${baseClasses} ${colorScheme[variant]}`}
		>
			{icon}
			<span>{text}</span>
			<ChevronRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:opacity-100" />
		</a>
	);
};

ProjectCard.propTypes = {
	project: PropTypes.shape({
		heading: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		languages: PropTypes.arrayOf(PropTypes.string).isRequired,
		features: PropTypes.arrayOf(PropTypes.string),
		techDetails: PropTypes.string,
		linkAriaLabel: PropTypes.string,
		shopLink: PropTypes.string,
		repoLink: PropTypes.string,
		siteLink: PropTypes.string,
		colorScheme: PropTypes.oneOf(['mobile', 'web']),
	}).isRequired,
	index: PropTypes.number,
};

ProjectLink.propTypes = {
	href: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
	'aria-label': PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary']),
	colorScheme: PropTypes.shape({
		primary: PropTypes.string,
		secondary: PropTypes.string,
	}).isRequired,
};

ProjectCard.defaultProps = {
	index: 0,
};

ProjectLink.defaultProps = {
	variant: 'primary',
};

export default ProjectCard;
