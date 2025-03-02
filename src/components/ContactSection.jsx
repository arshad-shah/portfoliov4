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
} from 'lucide-react';
import contactData from '../data/Contact.json';
import SectionHeader from './common/SectionHeader';

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

const ContactSection = () => {
	// Dynamically render an icon based on its name in the JSON
	const renderIcon = (iconName) => {
		const IconComponent = iconComponents[iconName];
		return IconComponent ? (
			<IconComponent className="h-5 w-5 text-indigo-400" />
		) : null;
	};

	return (
		<section id="contact" className="bg-gray-950 py-24">
			<div className="mx-auto max-w-7xl px-6">
				<SectionHeader>
					<span className="text-indigo-400">#</span>{' '}
					{contactData.title}
				</SectionHeader>

				<div className="grid gap-12 md:grid-cols-2">
					{/* Contact Info - Left Column */}
					<div>
						<div className="max-w-md">
							<h3 className="mb-4 text-xl font-bold text-white">
								{contactData.intro.heading}
							</h3>
							<p className="mb-8 text-gray-400">
								{contactData.intro.description}
							</p>

							{/* Contact Information Grid */}
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								{contactData.contactInfo.map((item, index) => (
									<div
										key={index}
										className="flex items-start"
									>
										<div className="mr-4 rounded-lg bg-gray-900 p-3">
											{renderIcon(item.icon)}
										</div>
										<div>
											<h4 className="font-medium text-white">
												{item.label}
											</h4>
											{item.link ? (
												<a
													href={item.link}
													className="text-gray-400 hover:text-indigo-400"
												>
													{item.value}
												</a>
											) : (
												<p className="text-gray-400">
													{item.value}
												</p>
											)}
										</div>
									</div>
								))}
							</div>

							{/* Social Profiles */}
							<div className="mt-10">
								<h4 className="mb-4 font-medium text-white">
									{contactData.socialProfiles.heading}
								</h4>
								<div className="grid grid-cols-4 gap-4">
									{contactData.socialProfiles.profiles.map(
										(profile, index) => (
											<a
												key={index}
												href={profile.url}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-colors hover:border-indigo-400"
												aria-label={profile.label}
											>
												{renderIcon(profile.icon)}
											</a>
										),
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="flex flex-col">
						{/* Availability Card */}
						<div className="mb-8 rounded-lg border border-gray-800 bg-gray-900 p-6">
							<h3 className="mb-4 text-xl font-bold text-white">
								<span className="text-indigo-400">&gt;</span>{' '}
								{contactData.workingHours.heading}
							</h3>
							<div className="space-y-4">
								{contactData.workingHours.items.map(
									(item, index) => (
										<div
											key={index}
											className={`flex items-center justify-between ${
												index <
												contactData.workingHours.items
													.length -
													1
													? 'border-b border-gray-800 pb-3'
													: ''
											}`}
										>
											<div className="flex items-center">
												<div className="mr-3">
													{renderIcon(item.icon)}
												</div>
												<span className="text-gray-300">
													{item.label}
												</span>
											</div>
											{item.badge ? (
												<span
													className={`rounded-full bg-${item.badge.color}-900 px-3 py-1 text-xs font-medium text-${item.badge.color}-400`}
												>
													{item.badge.text}
												</span>
											) : (
												<span className="text-gray-400">
													{item.value}
												</span>
											)}
										</div>
									),
								)}
							</div>
						</div>

						{/* Skills Card */}
						<div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
							<h3 className="mb-4 text-xl font-bold text-white">
								<span className="text-indigo-400">&gt;</span>{' '}
								{contactData.expertise.heading}
							</h3>
							<div className="mb-6">
								<p className="text-gray-400">
									{contactData.expertise.description}
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{contactData.expertise.skills.map(
									(skill, index) => (
										<span
											key={index}
											className="rounded-full border border-indigo-900 bg-indigo-900/30 px-3 py-1 text-sm text-indigo-400"
										>
											{skill}
										</span>
									),
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="mt-24 border-t border-gray-800 pt-8">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<div>
							<div className="text-lg font-bold text-white">
								<span className="text-indigo-400">
									{contactData.footer.name.first}
								</span>{' '}
								{contactData.footer.name.last}
							</div>
							<div className="mt-1 text-sm text-gray-400">
								{contactData.footer.tagline}
							</div>
						</div>

						<div className="text-center md:text-right">
							<div className="text-sm text-gray-400">
								{contactData.footer.message}{' '}
								<span className="text-red-500">❤</span>
							</div>
							<div className="mt-1 text-xs text-gray-600">
								© {new Date().getFullYear()}{' '}
								{contactData.footer.name.first}{' '}
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

export default ContactSection;
