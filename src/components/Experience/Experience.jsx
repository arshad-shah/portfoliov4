import TimeLine from './TimeLine';
import { experienceObject } from '../../data';
import { Briefcase } from 'lucide-react';

const Experience = () => {
	return (
		<div className="mx-auto max-w-4xl px-4 py-16">
			<div className="mb-12 text-center">
				<div className="mb-6 flex items-center justify-center space-x-3">
					<div className="relative rounded-xl p-0.5 shadow-lg">
						<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
						<div className="relative rounded-xl bg-white p-3">
							<Briefcase className="h-8 w-8 text-indigo-600" />
						</div>
					</div>
					<h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
						{experienceObject.workExperience.title}
					</h2>
				</div>
				<div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
			</div>
			<TimeLine jobs={experienceObject.workExperience.jobs} />
		</div>
	);
};

export default Experience;
