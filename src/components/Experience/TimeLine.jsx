import PropTypes from 'prop-types';
import TimeLineItem from './TimeLineItem';

const TimeLine = ({ jobs }) => {
	return (
		<ol className="border-gradient-to-b relative border-l-2 from-indigo-100 via-purple-100 to-pink-100">
			{jobs.map((job, index) => (
				<TimeLineItem
					key={index}
					{...job}
					isLast={index === jobs.length - 1}
				/>
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
