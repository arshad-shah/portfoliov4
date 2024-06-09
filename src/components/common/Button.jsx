import PropTypes from 'prop-types';
import { getSizeClass, getVariantClass } from './Utils';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';

/**
 * Button component.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {React.ReactNode} props.leadingIcon - The leading icon of the button.
 * @param {React.ReactNode} props.endIcon - The end icon of the button.
 * @param {Size} props.size - The size of the button. Can be 'small', 'medium', or 'large'.
 * @typedef {BUTTON_SIZES.SMALL | BUTTON_SIZES.MEDIUM | BUTTON_SIZES.LARGE} Size
 * @param {Variant} props.variant - The variant of the button. Can be 'primary', 'secondary', or 'tertiary'.
 * @typedef {BUTTON_VARIANTS.PRIMARY | BUTTON_VARIANTS.SECONDARY | BUTTON_VARIANTS.TERTIARY} Variant
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.ariaLabel - The aria-label for the button.
 * @param {Boolean} props.link - Determines if the button should be used as a link.
 * @param {string} props.linkUrl - The URL for the link button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>} props.rest - The rest of the button props to be passed to the button element.
 * This allows you to pass any button attribute to the component.
 * @see {@link https://reactjs.org/docs/react-api.html#react.component | React.Component | React API}
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = ({
	children,
	leadingIcon,
	endIcon,
	size,
	variant,
	onClick,
	ariaLabel,
	link,
	linkUrl,
	...rest
}) => {
	const sizeClass = getSizeClass(size);
	const variantClass = getVariantClass(variant);

	if (link) {
		return (
			<a
				className={`flex items-center justify-center rounded-lg px-6 py-3 ${sizeClass} ${variantClass}`}
				href={linkUrl}
				aria-label={ariaLabel}
				onClick={onClick}
				{...rest}
			>
				{leadingIcon && (
					<span className="leading-icon">{leadingIcon}</span>
				)}
				<span className="px-2">{children}</span>
				{endIcon && <span className="end-icon">{endIcon}</span>}
			</a>
		);
	}

	return (
		<button
			className={`flex items-center justify-center rounded-lg px-6 py-3 ${sizeClass} ${variantClass}`}
			aria-label={ariaLabel}
			onClick={onClick}
			{...rest}
		>
			{leadingIcon && <span className="leading-icon">{leadingIcon}</span>}
			<span className="px-2">{children}</span>
			{endIcon && <span className="end-icon">{endIcon}</span>}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	leadingIcon: PropTypes.node,
	endIcon: PropTypes.node,
	size: PropTypes.oneOf([...Object.values(BUTTON_SIZES)]),
	variant: PropTypes.oneOf([...Object.values(BUTTON_VARIANTS)]),
	onClick: PropTypes.func.isRequired,
	ariaLabel: PropTypes.string.isRequired,
	link: PropTypes.bool,
	linkUrl: PropTypes.string,
};

Button.defaultProps = {
	size: BUTTON_SIZES.MEDIUM,
	variant: BUTTON_VARIANTS.PRIMARY,
	ariaLabel: 'Button',
	link: false,
};

export default Button;
