import {
	Linkedin,
	Github,
	Mail,
	MapPin,
	Award,
	Clock,
	Phone,
	Calendar,
	Briefcase,
	ExternalLink,
} from 'lucide-react';
import { memo } from 'react';
import contactData from '../data/Contact.json';
import SectionHeader from './common/SectionHeader';
import PropTypes from 'prop-types';

// Icon mapping to dynamically render icons based on string names from JSON
const iconComponents = {
	Linkedin,
	Github,
	Mail,
	MapPin,
	Award,
	Clock,
	Phone,
	Calendar,
	Briefcase,
};

// Contact Info Item Component
const ContactInfoItem = memo(({ item, renderIcon }) => (
	<div className="group flex items-start">
		<div className="mr-4 rounded-lg bg-gray-900 p-3 transition-colors group-hover:bg-gray-800">
			{renderIcon(item.icon)}
		</div>
		<div className="flex-1">
			<h4 className="mb-1 font-medium text-white">{item.label}</h4>
			{item.link ? (
				<a
					href={item.link}
					className="inline-flex items-center gap-1 text-gray-400 transition-colors duration-200 hover:text-indigo-400"
					target={
						item.link.startsWith('mailto:') ? '_self' : '_blank'
					}
					rel={
						item.link.startsWith('mailto:')
							? ''
							: 'noopener noreferrer'
					}
				>
					{item.value}
					{!item.link.startsWith('mailto:') && (
						<ExternalLink className="h-3 w-3" />
					)}
				</a>
			) : (
				<p className="text-gray-400">{item.value}</p>
			)}
		</div>
	</div>
));

ContactInfoItem.propTypes = {
	item: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		link: PropTypes.string,
		value: PropTypes.string.isRequired,
	}).isRequired,
	renderIcon: PropTypes.func.isRequired,
};

ContactInfoItem.displayName = 'ContactInfoItem';

// Social Profile Link Component
const SocialProfileLink = memo(({ profile, renderIcon }) => (
	<a
		href={profile.url}
		target="_blank"
		rel="noopener noreferrer"
		className="group flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all duration-200 hover:scale-105 hover:border-indigo-400 hover:bg-gray-800"
		aria-label={`Visit my ${profile.label} profile`}
		title={profile.label}
	>
		{renderIcon(profile.icon)}
	</a>
));

SocialProfileLink.propTypes = {
	profile: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired,
	renderIcon: PropTypes.func.isRequired,
};

SocialProfileLink.displayName = 'SocialProfileLink';

// Working Hours Item Component
const WorkingHoursItem = memo(({ item, renderIcon, isLast }) => (
	<div
		className={`-m-2 flex items-center justify-between rounded-lg p-2 transition-colors duration-200 hover:bg-gray-800/50 ${
			!isLast ? 'mb-3 border-b border-gray-800 pb-3' : ''
		}`}
	>
		<div className="flex items-center">
			<div className="mr-3 text-indigo-400">{renderIcon(item.icon)}</div>
			<span className="font-medium text-gray-300">{item.label}</span>
		</div>
		{item.badge ? (
			<span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-blue-100 shadow-sm">
				{item.badge.text}
			</span>
		) : (
			<span className="font-mono text-sm text-gray-400">
				{item.value}
			</span>
		)}
	</div>
));

WorkingHoursItem.propTypes = {
	item: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		badge: PropTypes.shape({
			text: PropTypes.string.isRequired,
		}),
		value: PropTypes.string.isRequired,
	}).isRequired,
	renderIcon: PropTypes.func.isRequired,
	isLast: PropTypes.bool.isRequired,
};

WorkingHoursItem.displayName = 'WorkingHoursItem';

// Expertise Skill Tag Component
const SkillTag = memo(({ skill, index }) => (
	<span
		className="cursor-default rounded-full border border-indigo-900 bg-indigo-900/30 px-3 py-1.5 text-sm text-indigo-300 transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-800/40 hover:text-indigo-200"
		style={{
			animationDelay: `${index * 50}ms`,
		}}
	>
		{skill}
	</span>
));

SkillTag.displayName = 'SkillTag';

SkillTag.propTypes = {
	skill: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

// Card Component for better reusability
const Card = memo(({ children, className = '' }) => (
	<div
		className={`rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all duration-200 hover:border-gray-700 ${className}`}
	>
		{children}
	</div>
));

Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Card.displayName = 'Card';

// Card Header Component
const CardHeader = memo(({ title }) => (
	<h3 className="mb-4 text-xl font-bold text-white">
		<span className="text-indigo-400">&gt;</span> {title}
	</h3>
));

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
	title: PropTypes.string.isRequired,
};

const ContactSection = () => {
	// Dynamically render an icon based on its name in the JSON
	const renderIcon = (iconName) => {
		const IconComponent = iconComponents[iconName];
		return IconComponent ? (
			<IconComponent className="h-5 w-5 text-indigo-400" />
		) : null;
	};

	const currentYear = new Date().getFullYear();

	return (
		<section
			id="contact"
			className="bg-gray-950 py-24"
			aria-label="Contact Information"
		>
			<div className="mx-auto max-w-7xl px-6">
				<SectionHeader>
					<span className="text-indigo-400">#</span>{' '}
					{contactData.title}
				</SectionHeader>

				<div className="grid gap-12 lg:grid-cols-2">
					{/* Contact Info - Left Column */}
					<div className="space-y-8">
						<div className="max-w-md">
							<h3 className="mb-4 text-2xl font-bold text-white">
								{contactData.intro.heading}
							</h3>
							<p className="mb-8 leading-relaxed text-gray-400">
								{contactData.intro.description}
							</p>

							{/* Contact Information Grid */}
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
								{contactData.contactInfo.map((item, index) => (
									<ContactInfoItem
										key={`contact-${index}`}
										item={item}
										renderIcon={renderIcon}
									/>
								))}
							</div>
						</div>

						{/* Social Profiles */}
						<div>
							<h4 className="mb-6 text-lg font-semibold text-white">
								{contactData.socialProfiles.heading}
							</h4>
							<div className="flex flex-wrap gap-4">
								{contactData.socialProfiles.profiles.map(
									(profile, index) => (
										<SocialProfileLink
											key={`social-${index}`}
											profile={profile}
											renderIcon={renderIcon}
										/>
									),
								)}
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="flex flex-col gap-8">
						<Card>
							<CardHeader
								title={contactData.workingHours.heading}
							/>
							<div className="space-y-1">
								{contactData.workingHours.items.map(
									(item, index) => (
										<WorkingHoursItem
											key={`hours-${item.label}`}
											item={item}
											renderIcon={renderIcon}
											isLast={
												index ===
												contactData.workingHours.items
													.length -
													1
											}
										/>
									),
								)}
							</div>
						</Card>

						{/* Expertise Card */}
						<Card>
							<CardHeader title={contactData.expertise.heading} />
							<div className="mb-6">
								<p className="leading-relaxed text-gray-400">
									{contactData.expertise.description}
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{contactData.expertise.skills.map(
									(skill, index) => (
										<SkillTag
											key={`skill-${index}`}
											skill={skill}
											index={index}
										/>
									),
								)}
							</div>
						</Card>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer
				className="mt-24 border-t border-gray-800 pt-8"
				role="contentinfo"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div className="text-center md:text-left">
							<div className="text-xl font-bold text-white">
								<span className="text-indigo-400">
									{contactData.footer.name.first}
								</span>{' '}
								{contactData.footer.name.last}
							</div>
							<div className="mt-2 text-sm text-gray-400">
								{contactData.footer.tagline}
							</div>
						</div>

						<div className="text-center md:text-right">
							<div className="flex items-center justify-center gap-1 text-sm text-gray-400 md:justify-end">
								{contactData.footer.message}{' '}
								<span className="animate-pulse text-red-500">
									❤
								</span>
							</div>
							<div className="mt-2 text-xs text-gray-500">
								© {currentYear} {contactData.footer.name.first}{' '}
								{contactData.footer.name.last} • All Rights
								Reserved
							</div>
						</div>
					</div>
				</div>
			</footer>
		</section>
	);
};

export default memo(ContactSection);
