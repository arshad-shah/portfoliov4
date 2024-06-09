import { useState } from 'react';
import { menuObject, contentObject } from './data';
import { MobileMenu, Logo, DesktopMenu, MobileMenuButton } from './components';
import HeroContent from './components/HeroContent';

function Hero() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<Logo />
					</div>
					<div className="flex lg:hidden">
						<MobileMenuButton
							onClick={() => setMobileMenuOpen(true)}
						/>
					</div>
					<DesktopMenu
						navigation={menuObject}
						resumeData={contentObject.hero.ctaButtons[0]}
					/>
				</nav>
				<MobileMenu
					isOpen={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
					navigation={menuObject}
				/>
			</header>
			<HeroContent contentObject={contentObject} />
		</div>
	);
}

export default Hero;
