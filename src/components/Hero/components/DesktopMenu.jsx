import PropTypes from 'prop-types';
import { BUTTON_SIZES, BUTTON_VARIANTS, Button } from '../../common';

const DesktopMenu = ({ navigation, resumeData }) => {
	return (
		<div className="align-center hidden lg:flex lg:gap-x-12">
			{navigation.map((item) => (
				<Button
					key={item.label}
					size={BUTTON_SIZES.SMALL}
					variant={BUTTON_VARIANTS.TERTIARY}
					link
					linkUrl={item.link}
					ariaLabel={`${item.label} button`}
				>
					{item.label}
				</Button>
			))}
			<Button
				size={BUTTON_SIZES.LARGE}
				leadingIcon={resumeData.icon()}
				link
				linkUrl={resumeData.link}
				ariaLabel={`${resumeData.text} button`}
			>
				{resumeData.text}
			</Button>
		</div>
	);
};

DesktopMenu.propTypes = {
	navigation: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
		}),
	).isRequired,
	resumeData: PropTypes.shape({
		text: PropTypes.string.isRequired,
		link: PropTypes.string.isRequired,
		icon: PropTypes.elementType.isRequired,
	}).isRequired,
};

export default DesktopMenu;
