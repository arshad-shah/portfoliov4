// DesktopMenu Component
import { FileText } from 'lucide-react';
import PropTypes from 'prop-types';

// Header Component
const Header = ({ contentObject }) => {
	const resumeData = contentObject.hero.ctaButtons[0];
	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<div className="mx-auto max-w-7xl">
				<nav
					className="flex items-center justify-end p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex items-center gap-x-6">
						<div className="animate-fade-in-down">
							<a
								href={resumeData.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative inline-flex items-center overflow-hidden rounded-full bg-gray-900 px-8 py-3 text-white transition-all duration-300 hover:bg-gray-800"
								aria-label={`${resumeData.text} button`}
							>
								{/* Background animation */}
								<span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>

								{/* Icon */}
								<span className="relative mr-2 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
									{resumeData.icon ? (
										resumeData.icon()
									) : (
										<FileText className="h-5 w-5" />
									)}
								</span>

								{/* Text */}
								<span className="relative font-semibold transition-transform duration-300 group-hover:translate-x-1">
									{resumeData.text}
								</span>
							</a>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

Header.propTypes = {
	contentObject: PropTypes.shape({
		hero: PropTypes.shape({
			ctaButtons: PropTypes.arrayOf(
				PropTypes.shape({
					text: PropTypes.string.isRequired,
					link: PropTypes.string.isRequired,
					icon: PropTypes.func,
					primary: PropTypes.bool,
				}),
			).isRequired,
		}).isRequired,
	}).isRequired,
};

// Default props in case some optional props are not provided
Header.defaultProps = {
	contentObject: {
		hero: {
			ctaButtons: [
				{
					text: 'Download Resume',
					link: '#',
					icon: FileText,
					primary: true,
				},
			],
		},
	},
};

export default Header;
