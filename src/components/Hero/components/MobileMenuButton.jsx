import { Bars3Icon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

function MobileMenuButton({ onClick }) {
	return (
		<button
			type="button"
			className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
			onClick={onClick}
		>
			<span className="sr-only">Open main menu</span>
			<Bars3Icon className="h-6 w-6" aria-hidden="true" />
		</button>
	);
}

MobileMenuButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default MobileMenuButton;
