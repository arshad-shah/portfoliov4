import PropTypes from 'prop-types';
import { BUTTON_SIZES, BUTTON_VARIANTS, IconButton } from '../../common';

const HeroContent = ({ contentObject }) => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="container mx-auto px-6 py-20">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div className="flex flex-col justify-center">
						<h1 className="text-4xl font-bold text-gray-800">
							{contentObject.hero.headline}
						</h1>
						<p className="mt-4 text-lg text-gray-600">
							{contentObject.hero.subheadline}
						</p>
						<div className="mt-8 flex">
							{contentObject.hero.socialLinks.map(
								(link, index) => (
									<IconButton
										key={index}
										icon={link.icon}
										label={link.platform}
										variant={BUTTON_VARIANTS.TERTIARY}
										size={BUTTON_SIZES.LARGE}
										onClick={() => window.open(link.url)}
									/>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

HeroContent.propTypes = {
	contentObject: PropTypes.shape({
		hero: PropTypes.shape({
			headline: PropTypes.string.isRequired,
			subheadline: PropTypes.string.isRequired,
			ctaButtons: PropTypes.arrayOf(
				PropTypes.shape({
					text: PropTypes.string.isRequired,
					link: PropTypes.string.isRequired,
					icon: PropTypes.elementType.isRequired,
				}),
			).isRequired,
			socialLinks: PropTypes.arrayOf(
				PropTypes.shape({
					platform: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired,
					icon: PropTypes.elementType.isRequired,
				}),
			).isRequired,
		}).isRequired,
	}).isRequired,
};

export default HeroContent;
