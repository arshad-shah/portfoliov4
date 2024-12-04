import PropTypes from 'prop-types';
import { useState } from 'react';
import { Store, Github, ExternalLink, ChevronRight } from 'lucide-react';

const ProjectCard = ({
	project: {
		heading,
		description,
		languages,
		linkAriaLabel,
		shopLink,
		repoLink,
		siteLink,
	},
	index,
}) => {
	const [, setIsHovered] = useState(false);

	return (
		<div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
			style={{
				animationDelay: `${index * 100}ms`,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Decorative gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

			{/* Top accent line */}
			<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

			<div className="relative p-8">
				{/* Header */}
				<div className="mb-6">
					<h3 className="mb-3 text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-indigo-600">
						{heading}
					</h3>
					<p className="line-clamp-3 text-base leading-relaxed text-gray-600">
						{description}
					</p>
				</div>

				{/* Technologies */}
				<div className="mb-8 flex flex-wrap gap-2">
					{languages.map((language, index) => (
						<span
							key={index}
							className="inline-flex items-center rounded-full bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600 ring-1 ring-gray-100 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200"
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
						/>
					)}
					{repoLink && (
						<ProjectLink
							href={repoLink}
							aria-label={`View ${heading} on GitHub`}
							icon={<Github className="h-4 w-4" />}
							text="Code"
							variant="secondary"
						/>
					)}
					{siteLink && (
						<ProjectLink
							href={siteLink}
							aria-label={`Visit ${heading} website`}
							icon={<ExternalLink className="h-4 w-4" />}
							text="Live"
							variant="primary"
						/>
					)}
				</div>
			</div>

			{/* Animation keyframes */}
			<style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.group {
					animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)
						forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	);
};

const ProjectLink = ({
	href,
	icon,
	text,
	'aria-label': ariaLabel,
	variant = 'primary',
}) => {
	const baseClasses =
		'group/link inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300';

	const variants = {
		primary:
			'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 hover:bg-indigo-100 hover:ring-indigo-200',
		secondary:
			'bg-gray-50 text-gray-600 ring-1 ring-gray-100 hover:bg-gray-100 hover:ring-gray-200',
	};

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={ariaLabel}
			className={`${baseClasses} ${variants[variant]}`}
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
		linkAriaLabel: PropTypes.string.isRequired,
		shopLink: PropTypes.string,
		repoLink: PropTypes.string,
		siteLink: PropTypes.string,
	}).isRequired,
	index: PropTypes.number.isRequired,
};

ProjectLink.propTypes = {
	href: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
	'aria-label': PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default ProjectCard;
