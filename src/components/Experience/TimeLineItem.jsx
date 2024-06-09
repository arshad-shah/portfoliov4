import PropTypes from 'prop-types';

const TimeLineItem = ({
	position,
	company,
	duration,
	location,
	responsibilities,
}) => {
	return (
		<li className="mb-10 ml-4">
			<div className="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
			<time className='"mb-1 text-gray-400" text-sm font-normal leading-none'>
				{duration}
			</time>
			<h3 className="text-lg font-semibold text-gray-900">{position}</h3>
			<p className="text-gray-600">{company}</p>
			<p className="text-gray-600">{location}</p>
			<ul className="ml-5 list-disc text-gray-600">
				{responsibilities &&
					responsibilities.map((responsibility, index) => (
						<li key={index}>{responsibility}</li>
					))}
			</ul>
		</li>
	);
};

TimeLineItem.propTypes = {
	position: PropTypes.string.isRequired,
	company: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TimeLineItem;
