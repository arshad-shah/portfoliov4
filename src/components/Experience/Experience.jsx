import TimeLine from './TimeLine';
import { experienceObject } from '../../data';

const Experience = () => {
	return (
		<div className="mx-auto max-w-3xl">
			<h2 className="mb-4 text-center text-3xl font-bold">
				{experienceObject.workExperience.title}
			</h2>
			<TimeLine jobs={experienceObject.workExperience.jobs} />
		</div>
	);
};

export default Experience;
