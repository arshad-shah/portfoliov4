import PropTypes from 'prop-types';
import { MapPin } from 'lucide-react';
import MyPic from '../../../assets/aboutme.png';

// First, define the component with platform-specific styling
const SocialLink = ({ icon: Icon, platform, url, label }) => {
	// Custom colors and hover colors for each platform
	const platformStyles = {
		LinkedIn: {
			base: 'text-[#0077B5] bg-blue-50 hover:bg-[#0077B5]',
			hover: 'group-hover:text-white',
		},
		GitHub: {
			base: 'text-[#333] bg-gray-50 hover:bg-[#333]',
			hover: 'group-hover:text-white',
		},
		Email: {
			base: 'text-[#EA4335] bg-red-50 hover:bg-[#EA4335]',
			hover: 'group-hover:text-white',
		},
		Hackerrank: {
			base: 'text-[#2EC866] bg-green-50 hover:bg-[#2EC866]',
			hover: 'group-hover:text-white',
		},
	};

	const style = platformStyles[platform];

	return (
		<button
			onClick={() => window.open(url)}
			className={`group relative flex items-center justify-center rounded-lg p-3 transition-all duration-300 ${style.base}`}
			aria-label={label}
		>
			<Icon
				className={`relative h-5 w-5 transition-colors duration-300 ${style.hover}`}
			/>
			<span className="invisible absolute -bottom-8 w-auto min-w-max scale-0 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
				{label}
			</span>
		</button>
	);
};

const HeroContent = ({ contentObject }) => {
	const { hero } = contentObject;

	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />

			{/* Decorative Elements */}
			<div className="absolute left-0 top-0 h-64 w-64 animate-blob rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-xl filter" />
			<div className="animation-delay-2000 absolute right-0 top-0 h-64 w-64 animate-blob rounded-full bg-purple-100 opacity-70 mix-blend-multiply blur-xl filter" />
			<div className="animation-delay-4000 absolute -bottom-8 left-20 h-64 w-64 animate-blob rounded-full bg-pink-100 opacity-70 mix-blend-multiply blur-xl filter" />

			<div className="container relative mx-auto px-6 py-20">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					{/* Content Side */}
					<div className="flex flex-col justify-center space-y-8">
						{/* Main Content */}
						<div className="space-y-6">
							<h1 className="animate-fade-in-up text-3xl font-bold text-gray-900 md:text-2xl lg:text-5xl">
								{hero.headline}
							</h1>
							<p className="animation-delay-200 max-w-2xl animate-fade-in-up text-xl text-gray-600">
								{hero.subheadline}
							</p>
							<p className="animation-delay-300 animate-fade-in-up text-lg text-gray-600">
								{hero.description}
							</p>
						</div>

						{/* Current Status & Location */}
						<div className="animation-delay-400 animate-fade-in-up">
							<div className="rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 p-4 shadow-sm backdrop-blur-sm">
								{/* Work Preferences */}
								<div className="animation-delay-700 animate-fade-in-up">
									{hero.availability.forHire ? (
										<div className="mb-2 rounded-lg border border-green-200 bg-green-50/50 p-2">
											<div className="flex flex-wrap items-center gap-2">
												<span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
													<span className="mr-1.5 h-2 w-2 rounded-full bg-green-600" />
													Open to Work
												</span>

												<div className="flex flex-wrap gap-2">
													{hero.availability.preferredRoles.map(
														(type, index) => (
															<span
																key={index}
																className="rounded-full bg-white/80 px-3 py-1 text-sm text-gray-700 shadow-sm"
															>
																{type}
															</span>
														),
													)}
												</div>
											</div>
										</div>
									) : (
										<div className="mb-2 flex items-center space-x-2">
											<div className="flex items-center space-x-2 text-lg">
												<span className="font-semibold text-indigo-950">
													{hero.currentStatus.role}
												</span>
												<span className="text-indigo-400">
													@
												</span>
												<span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text font-medium text-transparent">
													{hero.currentStatus.company}
												</span>
											</div>
										</div>
									)}
								</div>

								{/* Location */}
								<div className="flex items-center gap-1.5 text-indigo-600">
									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
										<MapPin className="h-4 w-4 text-indigo-600" />
									</div>
									<span className="text-sm font-medium">
										{hero.currentStatus.location}
									</span>
								</div>
							</div>
						</div>

						{/* Tech Highlights */}
						<div className="animation-delay-500 animate-fade-in-up">
							<div className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50/50 via-indigo-50/30 to-blue-50/50 p-4 backdrop-blur-sm">
								<div className="mb-3 flex items-center">
									<span className="text-base font-semibold text-gray-800">
										🛠️ Tech Stack
									</span>
									<div className="ml-3 h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
								</div>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:md:grid-cols-3">
									{hero.featuredTech.map((tech, index) => (
										<div
											key={index}
											className="group flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md"
										>
											<tech.icon className="h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
											<span className="text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-indigo-700">
												{tech.label}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div className="animation-delay-900 animate-fade-in-up">
							<div className="flex flex-col items-center gap-6">
								<div className="flex w-full items-center gap-4 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-purple-200 before:to-purple-200 after:h-px after:flex-1 after:bg-gradient-to-l after:from-transparent after:via-purple-200 after:to-purple-200">
									<span className="text-base font-semibold text-gray-800">
										🔗 Connect
									</span>
								</div>
								<div className="flex items-center gap-6">
									{hero.socialLinks.map((link, index) => (
										<SocialLink key={index} {...link} />
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Image Side */}
					<div className="relative hidden items-center justify-center lg:flex">
						<div className="relative">
							{/* Decorative Background Elements */}
							<div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 opacity-70 blur-xl" />
							<div className="absolute -inset-8 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 opacity-50 blur-md" />

							{/* Main Image Container */}
							<div className="relative z-10">
								{/* Spinning Border with Gradient */}
								<div className="absolute -inset-2 animate-spin-slow rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm" />
								<div className="animation-delay-2000 absolute -inset-4 animate-spin-slow rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 blur-md" />

								{/* Image */}
								<div className="relative rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
									<div className="rounded-full bg-white p-2">
										<img
											src={MyPic}
											alt="Profile Picture"
											className="h-80 w-80 rounded-full object-cover shadow-2xl"
										/>
									</div>
								</div>

								{/* Decorative Rings */}
								<div className="absolute -inset-4 animate-spin-slow rounded-full border-2 border-indigo-100" />
								<div className="animation-delay-4000 absolute -inset-8 animate-spin-slow rounded-full border border-purple-50" />

								{/* Decorative Dots */}
								<div className="absolute -right-12 -top-12 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 blur-sm" />
								<div className="absolute -bottom-8 -left-8 h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-sm" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// SocialLink PropTypes
SocialLink.propTypes = {
	icon: PropTypes.elementType.isRequired,
	platform: PropTypes.oneOf(['LinkedIn', 'GitHub', 'Email', 'Hackerrank'])
		.isRequired,
	url: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

// HeroContent PropTypes
HeroContent.propTypes = {
	contentObject: PropTypes.shape({
		hero: PropTypes.shape({
			headline: PropTypes.string.isRequired,
			subheadline: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			currentStatus: PropTypes.shape({
				role: PropTypes.string.isRequired,
				company: PropTypes.string.isRequired,
				location: PropTypes.string.isRequired,
			}).isRequired,
			ctaButtons: PropTypes.arrayOf(
				PropTypes.shape({
					text: PropTypes.string.isRequired,
					link: PropTypes.string.isRequired,
					icon: PropTypes.elementType,
					primary: PropTypes.bool,
				}),
			).isRequired,
			socialLinks: PropTypes.arrayOf(
				PropTypes.shape({
					platform: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired,
					icon: PropTypes.elementType.isRequired,
					label: PropTypes.string.isRequired,
				}),
			).isRequired,
			featuredTech: PropTypes.arrayOf(
				PropTypes.shape({
					icon: PropTypes.elementType.isRequired,
					label: PropTypes.string.isRequired,
				}),
			).isRequired,
			availability: PropTypes.shape({
				forHire: PropTypes.bool.isRequired,
				preferredRoles: PropTypes.arrayOf(PropTypes.string),
				location: PropTypes.shape({
					current: PropTypes.string.isRequired,
					openTo: PropTypes.arrayOf(PropTypes.string).isRequired,
					preferredLocations: PropTypes.arrayOf(PropTypes.string)
						.isRequired,
				}).isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};
export default HeroContent;
