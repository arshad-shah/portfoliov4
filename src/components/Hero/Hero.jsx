import { useState, useEffect } from 'react';
import {
	MapPin,
	Download,
	Linkedin,
	Github,
	Mail,
	Award,
	ArrowRight,
	ChevronDown,
	X,
} from 'lucide-react';
import MyPic from '../../assets/aboutme.png';
import Resume from '../../assets/Resume.pdf';

// Import data from external file
import heroData from '../../data/HeroData.json';

const Hero = () => {
	// States for interactive elements
	const [scroll, setScroll] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Icon mapping object
	const iconMap = {
		Github: Github,
		Linkedin: Linkedin,
		Mail: Mail,
		Award: Award,
		ArrowRight: ArrowRight,
		Download: Download,
	};

	// Handle scroll for sticky header
	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu when clicking a navigation link
	const handleNavClick = () => {
		setMobileMenuOpen(false);
	};

	return (
		<section className="relative bg-gray-950 text-white">
			{/* Header */}
			<header
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scroll ? 'bg-gray-950/90 backdrop-blur-md' : 'bg-transparent'}`}
			>
				<div className="mx-auto max-w-7xl px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<a href="#" className="text-xl font-bold text-white">
							<span className="text-indigo-400">
								{heroData.name.first.charAt(0)}
							</span>
							{heroData.name.first.slice(1)}{' '}
							<span className="text-indigo-400">
								{heroData.name.last.charAt(0)}
							</span>
							{heroData.name.last.slice(1)}
						</a>

						{/* Navigation */}
						<nav className="hidden md:block">
							<ul className="flex space-x-8">
								{heroData.navigationLinks.map((item) => (
									<li key={item}>
										<a
											href={`#${item.toLowerCase()}`}
											className="text-sm font-medium text-gray-300 transition-colors hover:text-indigo-400"
										>
											{item}
										</a>
									</li>
								))}
							</ul>
						</nav>

						{/* Resume Button */}
						<a
							href={Resume}
							download="Arshad_Shah_Resume.pdf"
							className="hidden rounded border border-indigo-400 px-4 py-2 text-sm font-medium text-indigo-400 transition-all hover:bg-indigo-400 hover:text-white md:block"
						>
							Resume
						</a>

						{/* Mobile menu button */}
						<button
							className="text-white md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label={
								mobileMenuOpen ? 'Close menu' : 'Open menu'
							}
						>
							{mobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden">
						<div className="border-t border-gray-800 bg-gray-900/95 p-6 shadow-lg backdrop-blur-md">
							<nav className="space-y-6">
								<ul className="space-y-4">
									{heroData.navigationLinks.map((item) => (
										<li key={item}>
											<a
												href={`#${item.toLowerCase()}`}
												className="block text-base font-medium text-gray-300 transition-colors hover:text-indigo-400"
												onClick={handleNavClick}
											>
												{item}
											</a>
										</li>
									))}
								</ul>

								<div className="border-t border-gray-800 pt-4">
									<a
										href={Resume}
										download="Arshad_Shah_Resume.pdf"
										className="flex w-full items-center justify-center gap-2 rounded border border-indigo-400 px-5 py-2 text-sm font-medium text-indigo-400 transition-all hover:bg-indigo-400 hover:text-gray-950"
									>
										Resume
										<Download className="h-4 w-4" />
									</a>
								</div>

								{/* Mobile Social Links */}
								<div className="border-t border-gray-800 pt-4">
									<div className="flex items-center justify-around">
										{heroData.socialLinks.map(
											(link, index) => {
												const IconComponent =
													iconMap[link.icon];
												return (
													<a
														key={index}
														href={link.url}
														target="_blank"
														rel="noopener noreferrer"
														className="p-2 text-gray-400 transition-colors hover:text-indigo-400"
														aria-label={
															link.platform
														}
													>
														{IconComponent && (
															<IconComponent className="h-5 w-5" />
														)}
													</a>
												);
											},
										)}
									</div>
								</div>
							</nav>
						</div>
					</div>
				)}
			</header>

			{/* Hero Content */}
			<div className="relative min-h-screen overflow-hidden">
				{/* Particles/stars background effect */}
				<div className="absolute inset-0 overflow-hidden">
					{heroData.particles.map((particle, index) => {
						let className = '';

						if (particle.type === 'normal') {
							className =
								'absolute h-2 w-2 rounded-full bg-indigo-400 opacity-70';
						} else if (particle.type === 'large') {
							className =
								'absolute h-3 w-3 rounded-full bg-indigo-500 opacity-80';
						} else if (particle.type === 'small') {
							className =
								'absolute h-1 w-1 rounded-full bg-indigo-300 opacity-60';
						}

						return (
							<div
								key={index}
								className={className}
								style={{
									top: particle.top,
									left: particle.left,
								}}
							></div>
						);
					})}
				</div>

				{/* Main content */}
				<div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:flex md:min-h-screen md:flex-col md:justify-center">
					<div className="grid items-center gap-12 md:grid-cols-5 md:gap-16 lg:grid-cols-12 lg:gap-24">
						{/* Text content - left side */}
						<div className="md:col-span-3 lg:col-span-7">
							<div className="space-y-8">
								{/* Headline */}
								<div className="space-y-1">
									<p className="font-mono text-indigo-400">
										Hello, my name is
									</p>
									<h1 className="text-5xl font-bold text-white md:text-6xl">
										{heroData.name.first}{' '}
										{heroData.name.last}.
									</h1>
									<h2 className="text-3xl font-bold text-gray-400 md:text-4xl">
										{heroData.title}
									</h2>
								</div>

								{/* Description */}
								<p className="max-w-lg leading-relaxed text-gray-400">
									{heroData.description}
								</p>

								{/* Location and status */}
								<div className="flex items-center gap-2 text-gray-400">
									<MapPin className="h-4 w-4 text-indigo-400" />
									<span>{heroData.location}</span>
								</div>

								{/* Key Technologies */}
								<div className="space-y-3">
									<p className="text-gray-400">
										Technologies I work with:
									</p>
									<div className="flex flex-wrap gap-2">
										{heroData.mainTechnologies.map(
											(tech) => (
												<span
													key={tech}
													className="rounded border border-indigo-400/30 bg-indigo-400/5 px-3 py-1 font-mono text-xs text-indigo-300"
												>
													{tech}
												</span>
											),
										)}
									</div>
								</div>

								{/* CTA buttons */}
								<div className="flex flex-wrap gap-4">
									{/* First button stays the same */}
									<a
										href={heroData.ctaButtons[0].url}
										className="group flex items-center gap-2 rounded border-2 border-indigo-400 bg-indigo-400 px-6 py-3 font-medium text-gray-950 transition-all hover:bg-transparent hover:text-indigo-400"
									>
										{heroData.ctaButtons[0].text}
										<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
									</a>

									{/* Resume download button */}
									<a
										href={Resume}
										download="Arshad_Shah_Resume.pdf"
										className="group flex items-center gap-2 rounded border-2 border-indigo-400 px-6 py-3 font-medium text-indigo-400 transition-all hover:bg-indigo-400 hover:text-gray-950"
									>
										Resume
										<Download className="h-4 w-4" />
									</a>
								</div>

								{/* Social Links */}
								<div className="flex items-center gap-6">
									{heroData.socialLinks.map((link, index) => {
										const IconComponent =
											iconMap[link.icon];
										return (
											<a
												key={index}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-400 transition-colors hover:text-indigo-400"
												aria-label={link.platform}
											>
												{IconComponent && (
													<IconComponent className="h-5 w-5" />
												)}
											</a>
										);
									})}
								</div>
							</div>
						</div>

						{/* Image - right side */}
						<div className="md:col-span-2 lg:col-span-5">
							<div className="relative mx-auto max-w-xs">
								{/* Border frame */}
								<div className="absolute inset-0 translate-x-5 translate-y-5 border-2 border-indigo-400 transition-transform"></div>

								{/* Image */}
								<div className="relative overflow-hidden bg-gray-900 transition-transform">
									<img
										src={MyPic}
										alt={`${heroData.name.first} ${heroData.name.last}`}
										className="mix-blend-lighten contrast-125 grayscale transition-all duration-300 hover:filter-none"
									/>

									{/* Overlay */}
									<div className="absolute inset-0 bg-indigo-900/20 transition-colors duration-300 hover:bg-transparent"></div>
								</div>
							</div>
						</div>
					</div>

					{/* Scroll indicator */}
					<div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
						<a
							href="#experience"
							className="flex flex-col items-center text-gray-500 transition-colors hover:text-indigo-400"
						>
							<span className="mb-2 text-xs">Scroll down</span>
							<ChevronDown className="h-4 w-4 animate-bounce" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
