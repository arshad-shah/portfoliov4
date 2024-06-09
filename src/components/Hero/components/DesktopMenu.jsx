import PropTypes from 'prop-types';
import { BUTTON_SIZES, Button } from '../../common';

const DesktopMenu = ({ resumeData }) => {
	return (
		<div className="align-center">
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
	resumeData: PropTypes.shape({
		text: PropTypes.string.isRequired,
		link: PropTypes.string.isRequired,
		icon: PropTypes.elementType.isRequired,
	}).isRequired,
};

export default DesktopMenu;
