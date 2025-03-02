import PropTypes from 'prop-types';

const SectionHeader = ({ children }) => {
	return (
		<div className="mb-16 flex items-center">
			<h2 className="mr-6 text-3xl font-bold text-white md:text-4xl">
				{children}
			</h2>
			<div className="ml-6 h-px flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
		</div>
	);
};

SectionHeader.propTypes = {
	children: PropTypes.node,
};
export default SectionHeader;
