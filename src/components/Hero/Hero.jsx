import { contentObject } from '../../data';
import { Header, HeroContent } from './components';

function Hero() {
	return (
		<div className="bg-white">
			<Header contentObject={contentObject} />
			<HeroContent contentObject={contentObject} />
		</div>
	);
}

export default Hero;
