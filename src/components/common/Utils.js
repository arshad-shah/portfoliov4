/**
 * Get the CSS class based on the variant.
 * @param {Variant} variant - The variant of the button.
 * @typedef {'primary' | 'secondary' | 'tertiary'} Variant
 * @returns {string} - The CSS class.
 */
const getVariantClass = (variant) => {
	switch (variant) {
		case 'primary':
			return 'bg-blue-500 hover:bg-blue-700 text-white';
		case 'secondary':
			return 'bg-gray-300 hover:bg-gray-400 text-gray-800';
		case 'tertiary':
			return 'bg-transparent hover:bg-gray-100 text-gray-800';
		default:
			return 'bg-gray-300 hover:bg-gray-400 text-gray-800';
	}
};

/**
 * Get the CSS class based on the size.
 * @param {Size} size - The size of the button.
 * @typedef {'small' | 'medium' | 'large'} Size
 * @returns {string} - The CSS class.
 */
const getSizeClass = (size) => {
	switch (size) {
		case 'small':
			return 'text-sm';
		case 'medium':
			return 'text-base';
		case 'large':
			return 'text-lg';
		default:
			return 'text-base';
	}
};

export { getVariantClass, getSizeClass };
