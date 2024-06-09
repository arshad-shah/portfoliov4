import { contentObject } from '../../data';
import { DesktopMenu } from './components';
import HeroContent from './components/HeroContent';

function Hero() {
	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-end p-6 lg:px-8"
					aria-label="Global"
				>
					<DesktopMenu
						resumeData={contentObject.hero.ctaButtons[0]}
					/>
				</nav>
			</header>
			<HeroContent contentObject={contentObject} />
		</div>
	);
}

export default Hero;
