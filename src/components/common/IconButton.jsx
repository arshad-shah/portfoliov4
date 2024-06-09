import PropTypes from 'prop-types';
import { getSizeClass, getVariantClass } from './Utils';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';

/**
 * @typedef {Object} IconButtonProps
 * @property {() => React.ReactNode} icon - The icon component to render.
 * @property {string} label - The label for the button.
 * @property {() => void} onClick - The click event handler for the button.
 * @property {Variant} [variant] - The variant of the button. Can be 'primary', 'secondary', or 'tertiary'.
 * @typedef {'primary' | 'secondary' | 'tertiary'} Variant
 * @property {Size} [size] - The size of the button. Can be 'small', 'medium', or 'large'.
 * @typedef {'small' | 'medium' | 'large'} Size
 * @property {string} [className] - Additional CSS class name(s) for the button.
 */

/**
 * A universal icon button component.
 * @param {IconButtonProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const IconButton = ({ icon, label, onClick, variant, size, className }) => {
	const buttonClasses = `flex items-center justify-center p-4 m-1 rounded-full ${getVariantClass(variant)} ${getSizeClass(size)} ${className || ''}`;

	return (
		<button className={buttonClasses} onClick={onClick} aria-label={label}>
			<span className="text-xl">{icon()}</span>
		</button>
	);
};

IconButton.propTypes = {
	icon: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf([...Object.values(BUTTON_VARIANTS)]),
	size: PropTypes.oneOf([...Object.values(BUTTON_SIZES)]),
	className: PropTypes.string,
};

IconButton.defaultProps = {
	variant: BUTTON_VARIANTS.PRIMARY,
	size: BUTTON_SIZES.MEDIUM,
};

export default IconButton;
