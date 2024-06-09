import PropTypes from 'prop-types';
import TimeLineItem from './TimeLineItem';

const TimeLine = ({ jobs }) => {
	return (
		<ol className="relative border-l border-gray-200 dark:border-gray-700">
			{jobs.map((job, index) => (
				<TimeLineItem key={index} {...job} />
			))}
		</ol>
	);
};

TimeLine.propTypes = {
	jobs: PropTypes.arrayOf(
		PropTypes.shape({
			position: PropTypes.string.isRequired,
			company: PropTypes.string.isRequired,
			duration: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
		}),
	).isRequired,
};

export default TimeLine;
